// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
//import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

//import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import type { FieldErrors } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Alert } from '@mui/material'

// ** Styled Components
const LoginIllustration = styled('img')({
  height: 'auto',
  maxWidth: '100%'
})

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@uit.edu.vn'
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()

  const bgColors: UseBgColorType = useBgColor()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Var
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  const onInvalid = (validationErrors: FieldErrors<FormData>) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[login] validation blocked submit (no axios call)', validationErrors)
    }
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoginIllustration
            width={700}
            alt='login-illustration'
            src={`/images/pages/boy-with-rocket-${theme.palette.mode}.png`}
          />
        </Box>
      ) : null}
      <RightWrapper
        sx={{ ...(skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <svg width={32} height={32} viewBox='0 0 566 567' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <rect width='566' height='567' fill={theme.palette.common.white} />
              <g
                transform='translate(0,567) scale(0.1,-0.1)'
                fill={theme.palette.primary.main}
                stroke='none'
              >
                <path d='M2140 5281 c-140 -48 -300 -101 -355 -118 -81 -25 -101 -35 -103 -51 -2 -12 11 -122 27 -246 17 -123 31 -230 31 -238 0 -7 -13 -22 -30 -31 -16 -10 -76 -53 -134 -96 l-103 -78 -224 103 c-123 57 -229 103 -235 104 -14 0 -277 -349 -443 -588 l-23 -32 33 -38 c18 -20 75 -84 128 -141 53 -57 101 -109 106 -115 6 -7 27 -30 48 -52 l37 -40 -25 -63 c-14 -34 -37 -103 -50 -153 -13 -50 -26 -92 -28 -95 -2 -2 -107 -21 -233 -43 -126 -22 -239 -42 -252 -45 l-22 -5 2 -392 3 -392 249 -48 c137 -26 251 -49 253 -51 2 -2 12 -38 23 -79 11 -42 33 -112 49 -155 l29 -80 -91 -99 c-50 -54 -128 -139 -174 -189 -46 -49 -81 -95 -79 -102 6 -16 176 -251 336 -465 l117 -156 104 48 c57 26 163 75 234 107 l130 60 80 -62 c44 -34 103 -77 130 -95 28 -18 52 -34 53 -36 2 -1 -8 -113 -24 -247 -15 -135 -24 -251 -21 -259 3 -8 40 -25 84 -37 43 -13 206 -66 362 -118 251 -84 286 -93 296 -79 6 8 63 111 125 228 l113 213 168 0 167 0 93 -175 c129 -246 149 -280 160 -280 6 0 94 29 197 64 103 36 267 90 364 121 164 53 178 59 173 78 -7 36 -57 489 -53 491 2 1 61 44 131 94 70 51 132 92 136 92 9 0 136 -59 351 -163 63 -31 115 -55 116 -54 101 149 264 377 346 486 59 79 108 146 108 150 0 5 -125 140 -316 340 l-42 44 24 52 c12 29 37 98 54 153 l31 100 252 49 252 49 0 394 0 394 -40 8 c-147 26 -458 88 -462 92 -3 3 -16 42 -29 88 -13 46 -36 115 -52 154 l-28 70 178 184 c100 103 176 190 173 197 -6 16 -180 256 -340 469 l-121 160 -230 -107 c-126 -59 -233 -104 -239 -100 -61 48 -170 123 -210 146 -27 16 -51 30 -53 31 -3 2 55 462 63 501 5 20 -3 24 -82 48 -49 15 -215 69 -370 121 -155 52 -284 94 -287 94 -3 0 -29 -44 -59 -97 -30 -54 -86 -156 -126 -228 l-72 -130 -163 0 -163 0 -125 225 c-69 124 -131 226 -139 226 -8 1 -129 -37 -269 -85z m980 -457 c761 -109 1399 -638 1640 -1361 21 -65 51 -176 67 -248 25 -121 27 -147 28 -375 0 -257 -5 -309 -51 -495 -125 -504 -416 -917 -854 -1209 -534 -357 -1224 -432 -1832 -200 -401 153 -755 439 -983 794 -380 593 -424 1351 -114 1989 250 514 702 891 1261 1050 273 78 551 96 838 55z' />
                <path d='M2713 4739 c-355 -27 -734 -176 -1003 -393 -461 -372 -711 -888 -711 -1466 0 -297 54 -541 180 -805 287 -602 853 -1000 1515 -1064 60 -6 122 -11 138 -11 l28 0 0 249 0 249 68 7 c293 26 519 108 739 266 193 139 354 341 448 560 222 516 117 1093 -271 1495 -114 118 -224 199 -376 275 -156 79 -389 139 -540 139 l-68 0 -2 253 c-3 244 -4 252 -23 253 -11 1 -66 -2 -122 -7z m149 -1081 l3 -583 35 -6 c57 -9 99 -37 131 -87 27 -42 30 -54 27 -113 -5 -100 -60 -166 -157 -191 l-41 -10 0 -585 0 -584 -82 6 c-526 42 -960 351 -1172 834 -120 273 -142 627 -57 921 135 471 544 852 1021 953 108 23 116 24 207 26 l83 1 2 -582z m1188 -438 c0 -133 -1 -140 -20 -140 -15 0 -20 7 -20 25 0 33 -35 107 -63 133 -38 35 -104 63 -162 69 l-56 6 3 -417 3 -418 24 -19 c16 -13 39 -19 72 -19 42 0 49 -3 49 -20 0 -19 -7 -20 -242 -21 -134 0 -253 -2 -265 -5 -19 -3 -23 1 -23 21 0 23 4 25 44 25 31 0 50 6 69 24 35 32 39 83 35 496 l-3 345 -63 -2 c-105 -3 -187 -68 -215 -171 -11 -41 -40 -72 -51 -54 -2 4 -2 69 1 145 l6 137 438 0 439 0 0 -140z' />
                <path d='M1950 3340 c0 -14 7 -20 24 -20 34 0 93 -27 100 -45 3 -9 6 -191 6 -404 0 -376 -1 -388 -20 -409 -15 -16 -32 -22 -65 -22 -38 0 -45 -3 -45 -20 0 -19 7 -20 261 -20 242 0 260 1 257 17 -2 13 -17 20 -53 25 -89 13 -85 -6 -85 440 l0 389 25 24 c18 19 35 25 70 25 38 0 45 3 45 20 0 19 -7 20 -260 20 -253 0 -260 -1 -260 -20z' />
                <path d='M2805 3065 c-61 -16 -118 -73 -135 -136 -28 -101 40 -222 139 -249 23 -6 45 -9 47 -7 3 2 3 94 2 204 l-3 200 -50 -12z' />
              </g>
            </svg>
            <Typography
              variant='h5'
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: '-0.45px',
                textTransform: 'lowercase',
                fontSize: '1.75rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Typography variant='h6' sx={{ mb: 1.5 }}>
            Welcome to {themeConfig.templateName}! 👋🏻
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Please sign-in to your account and start the adventure
          </Typography>
          <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
            <Typography variant='caption' sx={{ mb: 2, display: 'block', color: 'primary.main' }}>
              Admin: <strong>admin@uit.edu.vn</strong> / Pass: <strong>admin</strong>
            </Typography>
            <Typography variant='caption' sx={{ display: 'block', color: 'primary.main' }}>
              Client: <strong>nguyenthia@uit.edu.vn</strong> / Pass: <strong>client</strong>
            </Typography>
          </Alert>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='admin@uit.edu.vn'
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon fontSize={20} icon={showPassword ? 'bx:show' : 'bx:hide'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: 'text.secondary' } }}
                control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
              />
              <LinkStyled href='/forgot-password'>Forgot Password?</LinkStyled>
            </Box>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
              Sign in
            </Button>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2 }}>
                New on our platform?
              </Typography>
              <Typography>
                <LinkStyled href='/register'>Create an account</LinkStyled>
              </Typography>
            </Box>
            <Divider sx={{ my: `${theme.spacing(6)} !important` }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#497ce2' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='bxl:facebook-circle' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#1da1f2' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='bxl:twitter' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                sx={{ color: theme.palette.mode === 'light' ? '#272727' : 'grey.300' }}
              >
                <Icon icon='bxl:github' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#db4437' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='bxl:google' />
              </IconButton>
            </Box> */}
          </form>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
