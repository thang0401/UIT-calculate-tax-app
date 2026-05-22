import { ThemeColor } from 'src/@core/layouts/types'

/** Một dòng nhập tay thành phần TNCN (theo template Excel) */
export type PitRecordType = {
  id: number
  fullName: string
  taxCode: string
  email: string

  /** Nội dung — vd. TNTT tháng 1/2026 */
  noiDung: string
  quy: number
  nam: number

  /** Khoản miễn thuế, không tính thuế TNCN */
  comTrua: number
  phuCapDiLai: number
  phuCapCongCu: number
  tongMienThue: number

  /** Các khoản giảm trừ */
  giamTruBanThan: number
  soNguoiPhuThuoc: number
  soGiamPhuThuoc: number
  baoHiem?: number
  avatar: string
  avatarColor?: ThemeColor
}

export type PitRecordInput = Omit<PitRecordType, 'id' | 'avatar' | 'avatarColor' | 'email' | 'tongMienThue' | 'noiDung'>

export type PitListResponse = {
  records: PitRecordType[]
  allData: PitRecordType[]
  total: number
  params: Record<string, unknown>
}
