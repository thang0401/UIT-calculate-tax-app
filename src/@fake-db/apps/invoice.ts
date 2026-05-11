// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Utils Import
import { getDateRange } from 'src/@core/utils/get-daterange'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

const now = new Date()

//const currentMonth = now.toLocaleString('default', { month: 'short' })

const data: { invoices: InvoiceType[] } = {
  invoices: [
    {
      id: 4987,
      issuedDate: `13 Tháng 7 ${now.getFullYear()}`,
      address: '123 Nguyễn Huệ, Quận 1',
      company: 'Công ty TNHH Minh Phát',
      companyEmail: 'minhphat@nguyen.com',
      country: 'Việt Nam',
      contact: '(028) 1234-5678',
      name: 'Trần Văn Hùng',
      service: 'Phát triển phần mềm',
      total: 3428,
      avatar: '',
      avatarColor: 'primary',
      invoiceStatus: 'Paid',
      balance: '17.500.000 VNĐ',
      dueDate: `23 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4988,
      issuedDate: `17 Tháng 7 ${now.getFullYear()}`,
      address: '45 Lê Lợi, Quận Hải Châu',
      company: 'Công ty Cổ phần Hoàng Anh',
      companyEmail: 'hoanganh@tran.com',
      country: 'Việt Nam',
      contact: '(0236) 234-5678',
      name: 'Lê Thị Hồng',
      service: 'Thiết kế & Phát triển UI/UX',
      total: 5219,
      avatar: '/images/avatars/1.png',
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: `15 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4989,
      issuedDate: `19 Tháng 7 ${now.getFullYear()}`,
      address: '78 Trần Phú, Quận 5',
      company: 'Công ty TNHH Quang Vinh',
      companyEmail: 'quangvinh@pham.com',
      country: 'Việt Nam',
      contact: '(028) 345-6789',
      name: 'Phạm Minh Tuấn',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 3719,
      avatar: '/images/avatars/2.png',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `03 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4990,
      issuedDate: `06 Tháng 7 ${now.getFullYear()}`,
      address: '12 Lý Thường Kiệt, Quận Hoàn Kiếm',
      company: 'Công ty Cổ phần Việt Hưng',
      companyEmail: 'viethung@ngo.com',
      country: 'Việt Nam',
      contact: '(024) 456-7890',
      name: 'Ngô Quang Anh',
      service: 'Phát triển phần mềm',
      total: 4749,
      avatar: '/images/avatars/3.png',
      invoiceStatus: 'Sent',
      balance: 0,
      dueDate: `11 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4991,
      issuedDate: `08 Tháng 7 ${now.getFullYear()}`,
      address: '56 Hai Bà Trưng, Quận 3',
      company: 'Công ty TNHH An Phát',
      companyEmail: 'anphat@bui.com',
      country: 'Việt Nam',
      contact: '(028) 567-8901',
      name: 'Bùi Thị Lan',
      service: 'Thiết kế & Phát triển UI/UX',
      total: 4056,
      avatar: '/images/avatars/4.png',
      invoiceStatus: 'Draft',
      balance: '19.000.000 VNĐ',
      dueDate: `30 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4992,
      issuedDate: `26 Tháng 7 ${now.getFullYear()}`,
      address: '89 Phạm Văn Đồng, Quận Cầu Giấy',
      company: 'Công ty Cổ phần Thành Công',
      companyEmail: 'thanhcong@vu.com',
      country: 'Việt Nam',
      contact: '(024) 678-9012',
      name: 'Vũ Thị Mai',
      service: 'Thiết kế & Phát triển UI/UX',
      total: 2771,
      avatar: '',
      avatarColor: 'secondary',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `24 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4993,
      issuedDate: `17 Tháng 7 ${now.getFullYear()}`,
      address: '34 Tôn Đức Thắng, Quận Đống Đa',
      company: 'Công ty TNHH Hòa Bình',
      companyEmail: 'hoabinh@do.com',
      country: 'Việt Nam',
      contact: '(024) 789-0123',
      name: 'Đỗ Văn Nam',
      service: 'Thiết kế & Phát triển UI/UX',
      total: 2713,
      avatar: '',
      avatarColor: 'success',
      invoiceStatus: 'Draft',
      balance: '9.500.000 VNĐ',
      dueDate: `22 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4994,
      issuedDate: `11 Tháng 7 ${now.getFullYear()}`,
      address: '67 Nguyễn Trãi, Quận Thanh Xuân',
      company: 'Công ty Cổ phần Đại Phát',
      companyEmail: 'daiphat@hoang.com',
      country: 'Việt Nam',
      contact: '(024) 890-1234',
      name: 'Hoàng Văn Dũng',
      service: 'Tùy chỉnh giao diện',
      total: 4309,
      avatar: '/images/avatars/5.png',
      invoiceStatus: 'Paid',
      balance: '-4.800.000 VNĐ',
      dueDate: `10 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4995,
      issuedDate: `26 Tháng 7 ${now.getFullYear()}`,
      address: '23 Lê Duẩn, Quận 1',
      company: 'Công ty TNHH Hưng Thịnh',
      companyEmail: 'hungthinh@tran.com',
      country: 'Việt Nam',
      contact: '(028) 901-2345',
      name: 'Trần Thị Ngọc',
      service: 'Phát triển phần mềm',
      total: 3367,
      avatar: '/images/avatars/6.png',
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: `24 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4994,
      issuedDate: `15 Tháng 7 ${now.getFullYear()}`,
      address: '45 Nguyễn Văn Cừ, Quận Ninh Kiều',
      company: 'Công ty Cổ phần Việt Anh',
      companyEmail: 'vietanh@le.com',
      country: 'Việt Nam',
      contact: '(0292) 012-3456',
      name: 'Lê Thị Thảo',
      service: 'Phát triển phần mềm',
      total: 4776,
      avatar: '/images/avatars/7.png',
      invoiceStatus: 'Downloaded',
      balance: '7.100.000 VNĐ',
      dueDate: `02 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4997,
      issuedDate: `27 Tháng 7 ${now.getFullYear()}`,
      address: '78 Hùng Vương, Quận Hải Châu',
      company: 'Công ty TNHH Quang Minh',
      companyEmail: 'quangminh@pham.com',
      country: 'Việt Nam',
      contact: '(0236) 123-4567',
      name: 'Phạm Văn Hào',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 3789,
      avatar: '/images/avatars/8.png',
      invoiceStatus: 'Partial Payment',
      balance: '15.500.000 VNĐ',
      dueDate: `18 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4998,
      issuedDate: `31 Tháng 7 ${now.getFullYear()}`,
      address: '56 Trường Chinh, Quận Tân Bình',
      company: 'Công ty Cổ phần Thành Đạt',
      companyEmail: 'thanhdat@nguyen.com',
      country: 'Việt Nam',
      contact: '(028) 234-5678',
      name: 'Nguyễn Thị Linh',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 5200,
      avatar: '/images/avatars/1.png',
      invoiceStatus: 'Partial Payment',
      balance: 0,
      dueDate: `17 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 4999,
      issuedDate: `14 Tháng 7 ${now.getFullYear()}`,
      address: '89 Lý Tự Trọng, Quận 1',
      company: 'Công ty TNHH An Thịnh',
      companyEmail: 'anthinh@vu.com',
      country: 'Việt Nam',
      contact: '(028) 345-6789',
      name: 'Vũ Văn Tâm',
      service: 'Phát triển phần mềm',
      total: 4558,
      avatar: '/images/avatars/2.png',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `01 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5000,
      issuedDate: `21 Tháng 7 ${now.getFullYear()}`,
      address: '12 Nguyễn Đình Chiểu, Quận 3',
      company: 'Công ty Cổ phần Minh Tâm',
      companyEmail: 'minhtam@bui.com',
      country: 'Việt Nam',
      contact: '(028) 456-7890',
      name: 'Bùi Văn Long',
      service: 'Tùy chỉnh giao diện',
      total: 3503,
      avatar: '/images/avatars/3.png',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `22 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5001,
      issuedDate: `30 Tháng 7 ${now.getFullYear()}`,
      address: '34 Điện Biên Phủ, Quận Ba Đình',
      company: 'Công ty TNHH Việt Phát',
      companyEmail: 'vietphat@ngo.com',
      country: 'Việt Nam',
      contact: '(024) 567-8901',
      name: 'Ngô Thị Hương',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 5285,
      avatar: '/images/avatars/4.png',
      invoiceStatus: 'Partial Payment',
      balance: '-4.700.000 VNĐ',
      dueDate: `02 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5002,
      issuedDate: `21 Tháng 7 ${now.getFullYear()}`,
      address: '67 Võ Văn Tần, Quận 3',
      company: 'Công ty Cổ phần Hoàng Phát',
      companyEmail: 'hoangphat@tran.com',
      country: 'Việt Nam',
      contact: '(028) 678-9012',
      name: 'Trần Thị Mai',
      service: 'Thiết kế & Phát triển UI/UX',
      total: 3668,
      avatar: '/images/avatars/5.png',
      invoiceStatus: 'Downloaded',
      balance: '17.000.000 VNĐ',
      dueDate: `15 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5003,
      issuedDate: `30 Tháng 7 ${now.getFullYear()}`,
      address: '23 Nguyễn Thị Minh Khai, Quận 1',
      company: 'Công ty TNHH Đại Lợi',
      companyEmail: 'dailoi@le.com',
      country: 'Việt Nam',
      contact: '(028) 789-0123',
      name: 'Lê Văn Dũng',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 4372,
      avatar: '',
      avatarColor: 'warning',
      invoiceStatus: 'Sent',
      balance: '-8.000.000 VNĐ',
      dueDate: `17 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5004,
      issuedDate: `27 Tháng 7 ${now.getFullYear()}`,
      address: '56 Phạm Ngọc Thạch, Quận 3',
      company: 'Công ty Cổ phần Việt Thành',
      companyEmail: 'vietthanh@pham.com',
      country: 'Việt Nam',
      contact: '(028) 890-1234',
      name: 'Phạm Thị Hồng',
      service: 'Tùy chỉnh giao diện',
      total: 3198,
      avatar: '/images/avatars/6.png',
      invoiceStatus: 'Partial Payment',
      balance: '-5.900.000 VNĐ',
      dueDate: `16 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5005,
      issuedDate: `30 Tháng 7 ${now.getFullYear()}`,
      address: '78 Nguyễn Văn Trỗi, Quận Phú Nhuận',
      company: 'Công ty TNHH Hòa Phát',
      companyEmail: 'hoaphat@nguyen.com',
      country: 'Việt Nam',
      contact: '(028) 901-2345',
      name: 'Nguyễn Văn Tùng',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 5293,
      avatar: '',
      avatarColor: 'error',
      invoiceStatus: 'Past Due',
      balance: 0,
      dueDate: `01 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5006,
      issuedDate: `10 Tháng 7 ${now.getFullYear()}`,
      address: '12 Lê Đại Hành, Quận 11',
      company: 'Công ty Cổ phần Minh Anh',
      companyEmail: 'minhanh@vu.com',
      country: 'Việt Nam',
      contact: '(028) 012-3456',
      name: 'Vũ Văn Hùng',
      service: 'Tùy chỉnh giao diện',
      total: 5612,
      avatar: '/images/avatars/7.png',
      invoiceStatus: 'Downloaded',
      balance: '20.500.000 VNĐ',
      dueDate: `12 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5007,
      issuedDate: `01 Tháng 7 ${now.getFullYear()}`,
      address: '45 Nguyễn Đình Chiểu, Quận Phú Nhuận',
      company: 'Công ty TNHH Thành An',
      companyEmail: 'thanhan@le.com',
      country: 'Việt Nam',
      contact: '(028) 123-4567',
      name: 'Lê Thị Ngọc',
      service: 'Phát triển phần mềm',
      total: 2230,
      avatar: '/images/avatars/8.png',
      invoiceStatus: 'Sent',
      balance: 0,
      dueDate: `19 Tháng 7 ${now.getFullYear()}`
    },
    {
      id: 5008,
      issuedDate: `22 Tháng 7 ${now.getFullYear()}`,
      address: '89 Trần Quốc Toản, Quận 3',
      company: 'Công ty Cổ phần Việt Nam',
      companyEmail: 'vietnam@tran.com',
      country: 'Việt Nam',
      contact: '(028) 234-5678',
      name: 'Trần Văn Nam',
      service: 'Giấy phép mở rộng không giới hạn',
      total: 2032,
      avatar: '/images/avatars/1.png',
      invoiceStatus: 'Partial Payment',
      balance: 0,
      dueDate: `30 Tháng 7 ${now.getFullYear()}`
    }
  ]
}

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  const { q = '', status = '', dates = [] } = config.params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = data.invoices.filter(invoice => {
    if (dates.length) {
      const [start, end] = dates
      const filtered: number[] = []
      const range = getDateRange(start, end)
      const invoiceDate = new Date(invoice.issuedDate)

      range.filter(date => {
        const rangeDate = new Date(date)
        if (
          invoiceDate.getFullYear() === rangeDate.getFullYear() &&
          invoiceDate.getDate() === rangeDate.getDate() &&
          invoiceDate.getMonth() === rangeDate.getMonth()
        ) {
          filtered.push(invoice.id)
        }
      })

      if (filtered.length && filtered.includes(invoice.id)) {
        return (
          (invoice.companyEmail.toLowerCase().includes(queryLowered) ||
            invoice.name.toLowerCase().includes(queryLowered) ||
            String(invoice.id).toLowerCase().includes(queryLowered) ||
            String(invoice.total).toLowerCase().includes(queryLowered) ||
            String(invoice.balance).toLowerCase().includes(queryLowered) ||
            invoice.dueDate.toLowerCase().includes(queryLowered)) &&
          invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
        )
      }
    } else {
      return (
        (invoice.companyEmail.toLowerCase().includes(queryLowered) ||
          invoice.name.toLowerCase().includes(queryLowered) ||
          String(invoice.id).toLowerCase().includes(queryLowered) ||
          String(invoice.total).toLowerCase().includes(queryLowered) ||
          String(invoice.balance).toLowerCase().includes(queryLowered) ||
          invoice.dueDate.toLowerCase().includes(queryLowered)) &&
        invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
      )
    }
  })

  return [
    200,
    {
      params: config.params,
      allData: data.invoices,
      invoices: filteredData,
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet('apps/invoice/single-invoice').reply(config => {
  const { id } = config.params

  const invoiceData = data.invoices.filter(invoice => invoice.id === parseInt(id, 10))
  if (invoiceData.length) {
    const responseData = {
      invoice: invoiceData[0],
      paymentDetails: {
        totalDue: '12,110.55$',
        bankName: 'VietComBank',
        country: 'VietNam',
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
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/apps/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => {
    const { address, company, companyEmail, country, contact, name } = invoice

    return {
      name,
      address,
      company,
      country,
      contact,
      companyEmail
    }
  })

  return [200, clients.slice(0, 5)]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  // Get invoice id from URL
  const invoiceId = Number(config.data)
  const invoiceIndex = data.invoices.findIndex(t => t.id === invoiceId)
  data.invoices.splice(invoiceIndex, 1)

  return [200]
})
