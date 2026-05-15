// ** Mock
import mock from 'src/@fake-db/mock'

// ** Types
import { CardStatsType } from 'src/@fake-db/types'
import { UsersType, ProjectListDataType } from 'src/types/apps/userTypes'

const data: { users: UsersType[] } = {
  users: [
    {
      id: 1,
      billing: 'Theo bảng lương',
      fullName: 'Nguyễn Cao Thăng',
      company: 'Đại học ABC',
      role: 'client',
      username: 'thangnc@uit.edu.vn',
      taxCode: '0101234567',
      baseSalary: 22000000,
      password: '0101234567',
      country: 'Việt Nam',
      contact: '0335874542',
      email: 'thangnc@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'primary'
    },
    {
      id: 2,
      billing: 'Theo bảng lương',
      fullName: 'Trần Quốc Bảo',
      company: 'Đại học ABC',
      role: 'accountant',
      username: 'quocbao@uit.edu.vn',
      taxCode: '0101234568',
      baseSalary: 15500000,
      password: '0101234568',
      country: 'Việt Nam',
      contact: '0902233445',
      email: 'quocbao@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 3,
      billing: 'Theo bảng lương',
      fullName: 'Lê Thị Thu Hà',
      company: 'Khoa Công nghệ thông tin',
      role: 'staff_teacher',
      username: 'thuha@uit.edu.vn',
      taxCode: '0101234569',
      baseSalary: 18700000,
      password: '0101234569',
      country: 'Việt Nam',
      contact: '0903344556',
      email: 'thuha@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 4,
      billing: 'Theo bảng lương',
      fullName: 'Phạm Văn Đức',
      company: 'Khoa Kinh tế',
      role: 'staff_teacher',
      username: 'vanduc@uit.edu.vn',
      taxCode: '0101234570',
      baseSalary: 16500000,
      password: '0101234570',
      country: 'Việt Nam',
      contact: '0904455667',
      email: 'vanduc@uit.edu.vn',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 5,
      billing: 'Theo bảng lương',
      fullName: 'Vũ Thanh Tùng',
      company: 'Phòng đào tạo',
      role: 'admin',
      username: 'thanhtung@uit.edu.vn',
      taxCode: '0101234571',
      baseSalary: 21000000,
      password: '0101234571',
      country: 'Việt Nam',
      contact: '0905566778',
      email: 'thanhtung@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 6,
      billing: 'Theo bảng lương',
      fullName: 'Đặng Thị Hồng',
      company: 'Phòng tài chính',
      role: 'accountant',
      username: 'thihong@uit.edu.vn',
      taxCode: '0101234572',
      baseSalary: 14800000,
      password: '0101234572',
      country: 'Việt Nam',
      contact: '0906677889',
      email: 'thihong@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'error'
    },
    {
      id: 7,
      billing: 'Theo bảng lương',
      fullName: 'Ngô Quốc Việt',
      company: 'Khoa Ngoại ngữ',
      role: 'staff_teacher',
      username: 'quocviet@uit.edu.vn',
      taxCode: '0101234573',
      baseSalary: 17200000,
      password: '0101234573',
      country: 'Việt Nam',
      contact: '0907788990',
      email: 'quocviet@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'warning'
    },
    {
      id: 8,
      billing: 'Theo bảng lương',
      fullName: 'Lý Gia Hân',
      company: 'Khoa Y',
      role: 'staff_teacher',
      username: 'giahan@uit.edu.vn',
      taxCode: '0101234574',
      baseSalary: 19500000,
      password: '0101234574',
      country: 'Việt Nam',
      contact: '0908899001',
      email: 'giahan@uit.edu.vn',
      currentPlan: 'basic',
      status: 'pending',
      avatar: '/images/avatars/4.png'
    },
    {
      id: 9,
      billing: 'Theo bảng lương',
      fullName: 'Bùi Ngọc Lan',
      company: 'Phòng tài chính',
      role: 'accountant',
      username: 'ngoclan@uit.edu.vn',
      taxCode: '0101234575',
      baseSalary: 15200000,
      password: '0101234575',
      country: 'Việt Nam',
      contact: '0909900112',
      email: 'ngoclan@uit.edu.vn',
      currentPlan: 'basic',
      status: 'inactive',
      avatar: '/images/avatars/2.png'
    },
    {
      id: 10,
      billing: 'Theo bảng lương',
      fullName: 'Trần Việt Phương',
      company: 'Phòng công tác sinh viên',
      role: 'admin',
      username: 'vietphuong@uit.edu.vn',
      taxCode: '0101234576',
      baseSalary: 20500000,
      password: '0101234576',
      country: 'Việt Nam',
      contact: '0910011223',
      email: 'vietphuong@uit.edu.vn',
      currentPlan: 'basic',
      status: 'active',
      avatar: '',
      avatarColor: 'error'
    }
  ]
}

const projectListData: ProjectListDataType[] = [
  {
    id: 1,
    hours: '88:19h',
    progressValue: 78,
    totalTask: '214/627',
    progressColor: 'success',
    projectType: 'Vuejs Project',
    projectTitle: 'Vue Admin template',
    img: '/images/icons/project-icons/vue-label.png'
  },
  {
    id: 2,
    hours: '12:12h',
    progressValue: 69,
    totalTask: '12/20',
    progressColor: 'info',
    projectType: 'Official Event',
    projectTitle: 'Online Webinar',
    img: '/images/icons/project-icons/event-label.png'
  },
  {
    id: 3,
    hours: '76h',
    progressValue: 43,
    totalTask: '56/183',
    progressColor: 'warning',
    projectType: 'HTML Project',
    projectTitle: 'Hoffman Website',
    img: '/images/icons/project-icons/html-label.png'
  },
  {
    id: 4,
    hours: '45h',
    progressValue: 49,
    totalTask: '12/86',
    progressColor: 'warning',
    projectType: 'iPhone Project',
    projectTitle: 'Foodista mobile app',
    img: '/images/icons/project-icons/sketch-label.png'
  },
  {
    id: 5,
    hours: '89h',
    totalTask: '9/50',
    progressValue: 15,
    progressColor: 'error',
    projectType: 'UI/UX Project',
    projectTitle: 'Falcon Logo Design',
    img: '/images/icons/project-icons/xd-label.png'
  },
  {
    id: 6,
    hours: '67:10h',
    progressValue: 73,
    totalTask: '234/378',
    progressColor: 'info',
    projectType: 'React Project',
    projectTitle: 'Dojo React Project',
    img: '/images/icons/project-icons/vue-label.png'
  },
  {
    id: 7,
    hours: '129:45h',
    progressValue: 90,
    totalTask: '100/190',
    progressColor: 'success',
    projectType: 'Vuejs Project',
    projectTitle: 'Dashboard Design',
    img: '/images/icons/project-icons/html-label.png'
  },
  {
    id: 8,
    hours: '108:39h',
    progressValue: 81,
    totalTask: '264/537',
    progressColor: 'success',
    projectType: 'Crypto Website',
    projectTitle: 'HTML Project',
    img: '/images/icons/project-icons/html-label.png'
  },
  {
    id: 9,
    hours: '138:39h',
    progressValue: 95,
    totalTask: '104/137',
    progressColor: 'success',
    projectType: 'Python Project',
    projectTitle: 'Blockchain Website',
    img: '/images/icons/project-icons/sketch-label.png'
  },
  {
    id: 10,
    hours: '210:30h',
    progressValue: 60,
    totalTask: '122/240',
    progressColor: 'info',
    projectType: 'React Project',
    projectTitle: 'BGC eCommerce App',
    img: '/images/icons/project-icons/react-label.png'
  },
  {
    id: 11,
    hours: '26:02h',
    progressValue: 53,
    totalTask: '148/280',
    progressColor: 'info',
    projectType: 'UI/UX Project',
    projectTitle: 'Admin template Project',
    img: '/images/icons/project-icons/xd-label.png'
  }
]

const buildUserCardStats = (): CardStatsType['statsHorizontal'] => {
  const users = data.users
  const total = users.length
  const staffCount = users.filter(u => u.role === 'staff_teacher').length
  const inactiveCount = users.filter(u => u.status === 'inactive').length
  const accountantCount = users.filter(u => u.role === 'accountant').length

  return [
    {
      stats: String(total),
      trendNumber: 0,
      title: 'Tổng nhân sự',
      subtitle: 'Đang quản lý trong hệ thống',
      avatarIcon: 'bx:user'
    },
    {
      stats: String(staffCount),
      trendNumber: 0,
      title: 'Số nhân viên',
      avatarColor: 'primary',
      subtitle: 'Nhân viên / Giảng viên',
      avatarIcon: 'bx:briefcase-alt'
    },
    {
      stats: String(accountantCount),
      trendNumber: 0,
      title: 'Kế toán',
      avatarColor: 'warning',
      subtitle: 'Theo vai trò được gán',
      avatarIcon: 'bx:wallet'
    },
    {
      stats: String(inactiveCount),
      trendNumber: 0,
      title: 'Ngưng hoạt động',
      avatarColor: 'secondary',
      subtitle: 'Tài khoản tạm ngưng',
      avatarIcon: 'bx:user-x'
    }
  ]
}

// POST: Add new user
mock.onPost('/apps/users/add-user').reply(config => {
  // Get event from post data
  const user = JSON.parse(config.data).data

  const lastId = Math.max(...data.users.map(u => u.id), 0)

  user.id = lastId + 1

  data.users.unshift({
    ...user,
    avatar: '',
    avatarColor: 'primary',
    status: (user.status as string) === 'inactive' ? 'inactive' : 'active'
  })

  return [201, { user }]
})

mock.onPut('/apps/users/update-user').reply(config => {
  const body = JSON.parse(config.data)
  const { id, data: patch } = body
  const idx = data.users.findIndex(u => u.id === id)
  if (idx === -1) {
    return [404, { message: 'Not found' }]
  }
  data.users[idx] = { ...data.users[idx], ...patch }

  return [200, { user: data.users[idx] }]
})

mock.onGet('/apps/users/stats').reply(() => {
  return [200, buildUserCardStats()]
})

// GET: DATA
mock.onGet('/apps/users/list').reply(config => {
  const { q = '', role = null, status = null } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = data.users.filter(
    user =>
      (user.username.toLowerCase().includes(queryLowered) ||
        user.fullName.toLowerCase().includes(queryLowered) ||
        user.role.toLowerCase().includes(queryLowered) ||
        (user.email.toLowerCase().includes(queryLowered) && user.status.toLowerCase().includes(queryLowered))) &&
      user.role === (role || user.role) &&
      user.status === (status || user.status)
  )

  return [
    200,
    {
      allData: data.users,
      users: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// DELETE: Deletes User
mock.onDelete('/apps/users/delete').reply(config => {
  // Get user id from URL
  const userId = config.data

  const userIndex = data.users.findIndex(t => t.id === userId)
  data.users.splice(userIndex, 1)

  return [200]
})

// GET: DATA
mock.onGet('/apps/users/project-list').reply(config => {
  const { q = '' } = config.params ?? ''

  const queryLowered = q.toLowerCase()

  const filteredData = projectListData.filter(
    user =>
      user.projectTitle.toLowerCase().includes(queryLowered) ||
      user.projectType.toLowerCase().includes(queryLowered) ||
      user.totalTask.toLowerCase().includes(queryLowered) ||
      user.hours.toLowerCase().includes(queryLowered) ||
      String(user.progressValue).toLowerCase().includes(queryLowered)
  )

  return [200, filteredData]
})
