// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

// ** Types
import { UserDataType } from 'src/context/types'
import { clientEmployee } from 'src/@fake-db/apps/employees'

/**
 * Fake JWT-style tokens for axios-mock only.
 * Do not use `jsonwebtoken` here — it breaks in the browser bundle (Node crypto / instanceof errors).
 */

const MOCK_TOKEN_PREFIX = 'sneat-mock.v1.'

type MockTokenPayload = { id: number; exp: number }

function base64UrlEncode(json: string): string {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(json, 'utf8').toString('base64url')
  }
  throw new Error('[fake-db] base64 encode unavailable')
}

function base64UrlDecode(segment: string): string {
  const pad = segment.length % 4 === 0 ? '' : '='.repeat(4 - (segment.length % 4))
  const b64 = segment.replace(/-/g, '+').replace(/_/g, '/') + pad
  if (typeof globalThis.atob === 'function') {
    return globalThis.atob(b64)
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64').toString('utf8')
  }
  throw new Error('[fake-db] base64 decode unavailable')
}

/** Default session length for mock tokens (seconds). */
function getMockTtlSeconds(): number {
  const raw = process.env.NEXT_PUBLIC_JWT_EXPIRATION
  const trimmed = typeof raw === 'string' ? raw.trim().replace(/^["']|["']$/g, '') : ''
  if (!trimmed) return 60 * 60 * 24 * 7
  const match = trimmed.match(/^(\d+)([smhd])$/i)
  if (!match) return 60 * 60 * 24 * 7
  const n = Number(match[1])
  const u = match[2].toLowerCase()
  const mult = u === 's' ? 1 : u === 'm' ? 60 : u === 'h' ? 3600 : 86400

  return n * mult
}

function createAccessToken(userId: number): string {
  const exp = Math.floor(Date.now() / 1000) + getMockTtlSeconds()
  const payload: MockTokenPayload = { id: userId, exp }

  return `${MOCK_TOKEN_PREFIX}${base64UrlEncode(JSON.stringify(payload))}`
}

function parseAccessTokenStrict(token: string): MockTokenPayload | null {
  if (!token.startsWith(MOCK_TOKEN_PREFIX)) return null
  try {
    const json = base64UrlDecode(token.slice(MOCK_TOKEN_PREFIX.length))
    const p = JSON.parse(json) as MockTokenPayload
    if (typeof p.id !== 'number' || typeof p.exp !== 'number') return null
    if (p.exp < Math.floor(Date.now() / 1000)) return null

    return p
  } catch {
    return null
  }
}

/** Decode mock token even if expired (for refreshToken flow). */
function parseAccessTokenLax(token: string): MockTokenPayload | null {
  if (!token.startsWith(MOCK_TOKEN_PREFIX)) return null
  try {
    const json = base64UrlDecode(token.slice(MOCK_TOKEN_PREFIX.length))
    const p = JSON.parse(json) as MockTokenPayload
    if (typeof p.id !== 'number' || typeof p.exp !== 'number') return null

    return p
  } catch {
    return null
  }
}

const users: UserDataType[] = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    fullName: 'Quản trị viên',
    username: 'admin',
    email: 'admin@uit.edu.vn'
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    fullName: clientEmployee.fullName,
    username: clientEmployee.username,
    email: clientEmployee.email,
    taxCode: clientEmployee.taxCode,
    avatar: clientEmployee.avatar || null
  }
]

function parseRequestBody(data: unknown): Record<string, unknown> {
  if (data == null) return {}
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  if (typeof data === 'object') return data as Record<string, unknown>

  return {}
}

mock.onPost('/jwt/login').reply(request => {
  const body = parseRequestBody(request.data) as { email?: string; password?: string }
  const emailIn = body.email
  const passwordIn = body.password

  const normalizedEmail = String(emailIn ?? '')
    .trim()
    .toLowerCase()
  const normalizedPassword = String(passwordIn ?? '')

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[fake-db] POST /jwt/login', { email: normalizedEmail, passwordLen: normalizedPassword.length })
  }

  let error = {
    email: ['Something went wrong']
  }

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword)

  if (user) {
    const accessToken = createAccessToken(user.id)

    const response = {
      accessToken,
      userData: { ...user, password: undefined }
    }

    return [200, response]
  }

  error = {
    email: ['email or Password is Invalid']
  }

  return [400, { error }]
})

mock.onPost('/jwt/register').reply(request => {
  if (request.data && String(request.data).length > 0) {
    const { email, password, username } = parseRequestBody(request.data) as {
      email?: string
      password?: string
      username?: string
    }
    if (!email || !password || !username) {
      return [401, { error: 'Invalid Data' }]
    }
    const isEmailAlreadyInUse = users.find(user => user.email === email)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)
    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }

    if (!error.username && !error.email) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }
      const userData = {
        id: lastIndex + 1,
        email,
        password,
        username,
        avatar: null,
        fullName: '',
        role: 'admin'
      }

      users.push(userData)

      const accessToken = createAccessToken(userData.id)

      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})

mock.onGet('/auth/me').reply(config => {
  // ** Get token from header
  // @ts-ignore
  const token = config.headers?.Authorization as string | undefined

  if (!token) {
    return [401, { error: { error: 'Invalid User' } }]
  }

  const strict = parseAccessTokenStrict(token)
  if (strict) {
    const userRecord = users.find((u: UserDataType) => u.id === strict.id)
    if (!userRecord) {
      return [401, { error: { error: 'Invalid User' } }]
    }
    const userData = JSON.parse(JSON.stringify(userRecord)) as UserDataType
    Reflect.deleteProperty(userData, 'password')

    return [200, { userData }]
  }

  if (defaultAuthConfig.onTokenExpiration === 'logout') {
    return [401, { error: { error: 'Invalid User' } }]
  }

  const lax = parseAccessTokenLax(token)
  if (!lax) {
    return [401, { error: { error: 'Invalid User' } }]
  }

  const user = users.find(u => u.id === lax.id)
  if (!user) {
    return [401, { error: { error: 'Invalid User' } }]
  }

  const accessToken = createAccessToken(lax.id)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
  }

  return [200, { userData: { ...user, password: undefined } }]
})
