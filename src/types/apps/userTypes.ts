// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
  role: string
  email: string
  status: string
  avatar: string
  billing: string
  company: string
  country: string
  contact: string
  taxCode: string
  /** Lương cứng (VNĐ) — phục vụ tính thuế TNCN, không hiển thị trên bảng danh sách */
  baseSalary: number
  fullName: string
  username: string
  password?: string
  currentPlan: string
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
