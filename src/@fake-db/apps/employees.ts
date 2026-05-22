import { ThemeColor } from 'src/@core/layouts/types'

export type MockEmployee = {
  id: number
  fullName: string
  username: string
  email: string
  taxCode: string
  role: string
  company: string
  baseSalary: number
  contact: string
  avatar: string
  avatarColor?: ThemeColor
}

export const CLIENT_EMPLOYEE_TAX_CODE = '1245000003'

export const mockEmployees: MockEmployee[] = [
  {
    id: 1,
    fullName: 'Nguyễn Thị A',
    username: 'nguyenthia',
    email: 'nguyenthia@uit.edu.vn',
    taxCode: CLIENT_EMPLOYEE_TAX_CODE,
    role: 'client',
    company: 'Công ty A',
    baseSalary: 30000000,
    contact: '0901122334',
    avatar: '/images/avatars/2.png'
  },
  {
    id: 2,
    fullName: 'Lê Văn B',
    username: 'levanb',
    email: 'levanb@uit.edu.vn',
    taxCode: '1245000001',
    role: 'staff_teacher',
    company: 'Công ty A',
    baseSalary: 22000000,
    contact: '0902233445',
    avatar: '',
    avatarColor: 'primary'
  },
  {
    id: 3,
    fullName: 'Lương Văn C',
    username: 'luongvanc',
    email: 'luongvanc@uit.edu.vn',
    taxCode: '1245000002',
    role: 'staff_teacher',
    company: 'Công ty A',
    baseSalary: 24000000,
    contact: '0903344556',
    avatar: '/images/avatars/1.png'
  },
  {
    id: 4,
    fullName: 'Nguyễn Thị Thùy D',
    username: 'nguyenthithuyd',
    email: 'nguyenthithuyd@uit.edu.vn',
    taxCode: '1245000004',
    role: 'accountant',
    company: 'Công ty A',
    baseSalary: 26000000,
    contact: '0904455667',
    avatar: '',
    avatarColor: 'success'
  },
  {
    id: 5,
    fullName: 'Võ Thị E',
    username: 'vothie',
    email: 'vothie@uit.edu.vn',
    taxCode: '1245000005',
    role: 'staff_teacher',
    company: 'Công ty A',
    baseSalary: 23000000,
    contact: '0905566778',
    avatar: '/images/avatars/3.png'
  }
]

export const getMockEmployeeByTaxCode = (taxCode: string) => mockEmployees.find(employee => employee.taxCode === taxCode)

export const clientEmployee = getMockEmployeeByTaxCode(CLIENT_EMPLOYEE_TAX_CODE)!
