// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { getMockEmployeeByTaxCode } from 'src/@fake-db/apps/employees'

type IncomeLineInput = {
  id: number
  stt: number | null
  fullName: string
  taxCode: string
  tenKhoanTien: string
  workingDays: number | null
  amount: number
  paymentDate: string | null
  note: string
  quy?: number
  nam?: number
}

const DEFAULT_NAM = 2026

const parseDateParts = (paymentDate: string | null) => {
  if (!paymentDate) {
    return null
  }

  const parts = paymentDate.split('/')
  if (parts.length !== 3) {
    return null
  }

  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)

  return Number.isNaN(month) || Number.isNaN(year) ? null : { month, year }
}

const inferQuy = (tenKhoanTien: string, paymentDate: string | null): number => {
  const dateParts = parseDateParts(paymentDate)
  if (dateParts) {
    return Math.ceil(dateParts.month / 3)
  }

  const match = tenKhoanTien.match(/tháng\s*(\d+)/i)
  if (match) {
    return Math.ceil(parseInt(match[1], 10) / 3)
  }

  return 1
}

const inferNam = (paymentDate: string | null): number => {
  const dateParts = parseDateParts(paymentDate)

  return dateParts?.year ?? DEFAULT_NAM
}

const withEmployeeProfile = (line: IncomeLineInput): InvoiceType => {
  const employee = getMockEmployeeByTaxCode(line.taxCode)
  const fullName = employee?.fullName ?? line.fullName
  const email = employee?.email ?? ''
  const quy = line.quy ?? inferQuy(line.tenKhoanTien, line.paymentDate)
  const nam = line.nam ?? inferNam(line.paymentDate)
  const dateLabel = line.paymentDate ?? `Q${quy}/${nam}`

  return {
    ...line,
    fullName,
    email,
    quy,
    nam,
    avatar: employee?.avatar ?? '',
    avatarColor: employee?.avatarColor,
    name: fullName,
    total: line.amount,
    service: line.tenKhoanTien,
    dueDate: dateLabel,
    address: '',
    company: employee?.company ?? '',
    country: 'Việt Nam',
    contact: employee?.contact ?? '',
    issuedDate: dateLabel,
    companyEmail: email || line.taxCode,
    balance: line.amount,
    invoiceStatus: 'Paid'
  }
}

const incomeLines: InvoiceType[] = [
  {
    id: 1,
    stt: 1,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Lương cơ bản tháng 1/2026',
    workingDays: 26,
    amount: 9_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 2,
    stt: 2,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'TNTT tháng 1/2026',
    workingDays: 26,
    amount: 42_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 3,
    stt: 3,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Lương cơ bản tháng 2/2026',
    workingDays: 26,
    amount: 9_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 4,
    stt: 4,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'TNTT tháng 2/2026',
    workingDays: 26,
    amount: 42_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 5,
    stt: 5,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Lương cơ bản tháng 3/2026',
    workingDays: 26,
    amount: 9_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 6,
    stt: 6,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'TNTT tháng 3/2026',
    workingDays: 26,
    amount: 42_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 7,
    stt: 7,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thưởng Tết Nguyên Đán năm 2026',
    workingDays: null,
    amount: 100_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 8,
    stt: 8,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thù lao HĐ và các ban tháng 11/2025',
    workingDays: null,
    amount: 15_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 9,
    stt: 9,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thù lao QLCP CC tháng 11/2025',
    workingDays: null,
    amount: 9_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 10,
    stt: 10,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thù lao HĐ và các ban tháng 12/2025',
    workingDays: null,
    amount: 15_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 11,
    stt: 11,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thù lao QLCP CC tháng 12/2025',
    workingDays: null,
    amount: 9_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 12,
    stt: 12,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi khen thưởng danh hiệu thi đua 2025',
    workingDays: null,
    amount: 8_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 13,
    stt: 13,
    fullName: 'Nguyễn Thị A',
    taxCode: '1245000003',
    tenKhoanTien: 'Chi thưởng 08/3/2026',
    workingDays: null,
    amount: 600_000,
    paymentDate: '08/03/2026',
    note: ''
  },
  {
    id: 14,
    stt: 14,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'Lương cơ bản tháng 1/2026',
    workingDays: 26,
    amount: 22_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 15,
    stt: 15,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'Lương cơ bản tháng 1/2026',
    workingDays: 26,
    amount: 24_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 16,
    stt: 16,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'Lương cơ bản tháng 1/2026',
    workingDays: 26,
    amount: 26_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 17,
    stt: 17,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'Lương cơ bản tháng 1/2026',
    workingDays: 26,
    amount: 23_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 18,
    stt: 18,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'TNTT tháng 1/2026',
    workingDays: 26,
    amount: 5_500_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 19,
    stt: 19,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'TNTT tháng 1/2026',
    workingDays: 26,
    amount: 6_000_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 20,
    stt: 20,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'TNTT tháng 1/2026',
    workingDays: 26,
    amount: 6_500_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 21,
    stt: 21,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'TNTT tháng 1/2026',
    workingDays: 26,
    amount: 5_800_000,
    paymentDate: '31/01/2026',
    note: ''
  },
  {
    id: 22,
    stt: 22,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'Lương cơ bản tháng 2/2026',
    workingDays: 26,
    amount: 22_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 23,
    stt: 23,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'Lương cơ bản tháng 2/2026',
    workingDays: 26,
    amount: 24_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 24,
    stt: 24,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'Lương cơ bản tháng 2/2026',
    workingDays: 26,
    amount: 26_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 25,
    stt: 25,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'Lương cơ bản tháng 2/2026',
    workingDays: 26,
    amount: 23_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 26,
    stt: 26,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'TNTT tháng 2/2026',
    workingDays: 26,
    amount: 5_500_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 27,
    stt: 27,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'TNTT tháng 2/2026',
    workingDays: 26,
    amount: 6_000_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 28,
    stt: 28,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'TNTT tháng 2/2026',
    workingDays: 26,
    amount: 6_500_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 29,
    stt: 29,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'TNTT tháng 2/2026',
    workingDays: 26,
    amount: 5_800_000,
    paymentDate: '28/02/2026',
    note: ''
  },
  {
    id: 30,
    stt: 30,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'Lương cơ bản tháng 3/2026',
    workingDays: 26,
    amount: 22_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 31,
    stt: 31,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'Lương cơ bản tháng 3/2026',
    workingDays: 26,
    amount: 24_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 32,
    stt: 32,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'Lương cơ bản tháng 3/2026',
    workingDays: 26,
    amount: 26_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 33,
    stt: 33,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'Lương cơ bản tháng 3/2026',
    workingDays: 26,
    amount: 23_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 34,
    stt: 34,
    fullName: 'Lê Văn B',
    taxCode: '1245000001',
    tenKhoanTien: 'TNTT tháng 3/2026',
    workingDays: 26,
    amount: 5_500_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 35,
    stt: 35,
    fullName: 'Lương Văn C',
    taxCode: '1245000002',
    tenKhoanTien: 'TNTT tháng 3/2026',
    workingDays: 26,
    amount: 6_000_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 36,
    stt: 36,
    fullName: 'Nguyễn Thị Thùy D',
    taxCode: '1245000004',
    tenKhoanTien: 'TNTT tháng 3/2026',
    workingDays: 26,
    amount: 6_500_000,
    paymentDate: '31/03/2026',
    note: ''
  },
  {
    id: 37,
    stt: 37,
    fullName: 'Võ Thị E',
    taxCode: '1245000005',
    tenKhoanTien: 'TNTT tháng 3/2026',
    workingDays: 26,
    amount: 5_800_000,
    paymentDate: '31/03/2026',
    note: ''
  }
].map(withEmployeeProfile)

const data: { invoices: InvoiceType[]; totalAmount: number } = {
  invoices: incomeLines,
  totalAmount: incomeLines.reduce((sum, line) => sum + line.amount, 0)
}

const matchesEmployeeQuery = (line: InvoiceType, queryLowered: string) => {
  if (!queryLowered) {
    return true
  }

  return (
    line.fullName.toLowerCase().includes(queryLowered) ||
    line.taxCode.toLowerCase().includes(queryLowered) ||
    line.email.toLowerCase().includes(queryLowered)
  )
}

const matchesQuy = (line: InvoiceType, quy: string) => {
  if (!quy) {
    return true
  }

  return line.quy === Number(quy)
}

const matchesNam = (line: InvoiceType, nam: string) => {
  if (!nam) {
    return true
  }

  return line.nam === Number(nam)
}

// ------------------------------------------------
// GET: Return income lines list
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  const { q = '', quy = '', nam = '' } = config.params ?? {}
  const queryLowered = String(q).toLowerCase()
  const filteredData = data.invoices.filter(
    line => matchesEmployeeQuery(line, queryLowered) && matchesQuy(line, String(quy)) && matchesNam(line, String(nam))
  )
  const filteredTotal = filteredData.reduce((sum, line) => sum + line.amount, 0)

  return [
    200,
    {
      params: config.params,
      allData: data.invoices,
      invoices: filteredData,
      total: filteredData.length,
      totalAmount: filteredTotal
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Line
// ------------------------------------------------
mock.onGet('apps/invoice/single-invoice').reply(config => {
  const { id } = config.params

  const invoiceData = data.invoices.filter(line => line.id === parseInt(id, 10))
  if (invoiceData.length) {
    const responseData = {
      invoice: invoiceData[0],
      paymentDetails: {
        totalDue: `${data.totalAmount.toLocaleString('vi-VN')} VNĐ`,
        bankName: 'VietComBank',
        country: 'Việt Nam',
        iban: '0335874542',
        swiftCode: 'BR91905'
      }
    }

    return [200, responseData]
  } else {
    return [404, { message: 'Unable to find the requested invoice!' }]
  }
})

// ------------------------------------------------
// GET: Return unique employees (for selects)
// ------------------------------------------------
mock.onGet('/apps/invoice/clients').reply(() => {
  const seen = new Set<string>()
  const clients = data.invoices
    .filter(line => {
      if (seen.has(line.taxCode)) {
        return false
      }
      seen.add(line.taxCode)

      return true
    })
    .map(line => ({
      name: line.fullName,
      address: '',
      company: '',
      country: 'Việt Nam',
      contact: '',
      companyEmail: line.email || line.taxCode
    }))

  return [200, clients]
})

type ImportIncomeRow = {
  stt: number | null
  fullName: string
  taxCode: string
  tenKhoanTien: string
  workingDays: number | null
  amount: number
  paymentDate: string | null
  note: string
}

// ------------------------------------------------
// POST: Import income lines from Excel
// ------------------------------------------------
mock.onPost('/apps/invoice/import').reply(config => {
  const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
  const rows = (body?.rows ?? []) as ImportIncomeRow[]

  if (!Array.isArray(rows) || rows.length === 0) {
    return [400, { message: 'Danh sách import trống.' }]
  }

  let nextId = data.invoices.reduce((max, line) => Math.max(max, line.id), 0) + 1
  const imported: InvoiceType[] = rows.map(row =>
    withEmployeeProfile({
      id: nextId++,
      stt: row.stt,
      fullName: row.fullName.trim(),
      taxCode: row.taxCode.trim(),
      tenKhoanTien: row.tenKhoanTien.trim(),
      workingDays: row.workingDays,
      amount: row.amount,
      paymentDate: row.paymentDate,
      note: row.note?.trim() ?? ''
    })
  )

  data.invoices.push(...imported)
  data.totalAmount = data.invoices.reduce((sum, line) => sum + line.amount, 0)

  return [200, { imported: imported.length, totalAmount: data.totalAmount }]
})

// ------------------------------------------------
// DELETE: Deletes Line
// ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  const invoiceId = Number(config.data)
  const invoiceIndex = data.invoices.findIndex(t => t.id === invoiceId)
  if (invoiceIndex >= 0) {
    data.invoices.splice(invoiceIndex, 1)
    data.totalAmount = data.invoices.reduce((sum, line) => sum + line.amount, 0)
  }

  return [200]
})
