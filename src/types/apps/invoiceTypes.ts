import { ThemeColor } from 'src/@core/layouts/types'

export type InvoiceStatus = 'Paid' | string

export type InvoiceLayoutProps = {
  id: string | undefined
}

export type InvoiceClientType = {
  name: string
  address: string
  company: string
  country: string
  contact: string
  companyEmail: string
}

/** Một dòng thu nhập theo tên khoản tiền (lương, thưởng, phụ cấp, …) */
export type InvoiceType = {

  /** STT — dùng làm id cho DataGrid; null nếu dòng không có STT (vd. thưởng) */
  id: number
  stt: number | null
  fullName: string
  taxCode: string
  email: string

  /** Tên khoản tiền — vd. Chi lương tháng 1, Chi thưởng */
  tenKhoanTien: string

  /** Quý (1–4) — phục vụ bộ lọc theo quý */
  quy: number

  /** Năm — phục vụ bộ lọc kèm quý */
  nam: number

  /** NGÀY CÔNG */
  workingDays: number | null

  /** SỐ TIỀN (VNĐ) */
  amount: number

  /** Ngày chi trả — định dạng dd/MM/yyyy */
  paymentDate: string | null

  /** GHI CHÚ */
  note: string
  avatar: string
  avatarColor?: ThemeColor
  name: string
  total: number
  service: string
  dueDate: string
  address: string
  company: string
  country: string
  contact: string
  issuedDate: string
  companyEmail: string
  balance: string | number
  invoiceStatus: InvoiceStatus
}

export type InvoiceListResponse = {
  invoices: InvoiceType[]
  totalAmount: number
}

export type InvoicePaymentType = {
  iban: string
  totalDue: string
  bankName: string
  country: string
  swiftCode: string
}

export type SingleInvoiceType = {
  invoice: InvoiceType
  paymentDetails: InvoicePaymentType
}
