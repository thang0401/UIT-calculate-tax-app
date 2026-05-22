// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { PitRecordType, PitRecordInput } from 'src/types/apps/pitTypes'
import { CardStatsType } from 'src/@fake-db/types'
import { getMockEmployeeByTaxCode } from 'src/@fake-db/apps/employees'

const calcTongMienThue = (comTrua: number, phuCapDiLai: number, phuCapCongCu: number) =>
  comTrua + phuCapDiLai + phuCapCongCu

const withEmployeeProfile = (row: Omit<PitRecordType, 'avatar' | 'avatarColor' | 'email'>): PitRecordType => {
  const employee = getMockEmployeeByTaxCode(row.taxCode)

  return {
    ...row,
    fullName: employee?.fullName ?? row.fullName,
    email: employee?.email ?? '',
    avatar: employee?.avatar ?? '',
    avatarColor: employee?.avatarColor
  }
}

const buildRow = (
  id: number,
  fullName: string,
  taxCode: string,
  noiDung: string,
  quy: number,
  nam: number,
  exempt: { comTrua: number; phuCapDiLai: number; phuCapCongCu: number },
  deductions: { giamTruBanThan: number; soNguoiPhuThuoc: number; soGiamPhuThuoc: number; baoHiem?: number }
): PitRecordType =>
  withEmployeeProfile({
    id,
    fullName,
    taxCode,
    noiDung,
    quy,
    nam,
    comTrua: exempt.comTrua,
    phuCapDiLai: exempt.phuCapDiLai,
    phuCapCongCu: exempt.phuCapCongCu,
    tongMienThue: calcTongMienThue(exempt.comTrua, exempt.phuCapDiLai, exempt.phuCapCongCu),
    giamTruBanThan: deductions.giamTruBanThan,
    soNguoiPhuThuoc: deductions.soNguoiPhuThuoc,
    soGiamPhuThuoc: deductions.soGiamPhuThuoc,
    baoHiem: deductions.baoHiem ?? 0
  })

const pitRecords: PitRecordType[] = [
  buildRow(1, 'Nguyễn Thị A', '1245000003', 'Tổng hợp TNCN Q1/2026', 1, 2026, { comTrua: 3_600_000, phuCapDiLai: 1_500_000, phuCapCongCu: 3_000_000 }, { giamTruBanThan: 46_500_000, soNguoiPhuThuoc: 3, soGiamPhuThuoc: 55_800_000, baoHiem: 2_697_786 }),
  buildRow(2, 'Lê Văn B', '1245000001', 'Tổng hợp TNCN Q1/2026', 1, 2026, { comTrua: 780_000, phuCapDiLai: 500_000, phuCapCongCu: 300_000 }, { giamTruBanThan: 11_000_000, soNguoiPhuThuoc: 0, soGiamPhuThuoc: 0, baoHiem: 700_000 }),
  buildRow(3, 'Lương Văn C', '1245000002', 'Tổng hợp TNCN Q1/2026', 1, 2026, { comTrua: 780_000, phuCapDiLai: 600_000, phuCapCongCu: 350_000 }, { giamTruBanThan: 11_000_000, soNguoiPhuThuoc: 1, soGiamPhuThuoc: 4_400_000, baoHiem: 760_000 }),
  buildRow(4, 'Nguyễn Thị Thùy D', '1245000004', 'Tổng hợp TNCN Q1/2026', 1, 2026, { comTrua: 780_000, phuCapDiLai: 550_000, phuCapCongCu: 400_000 }, { giamTruBanThan: 11_000_000, soNguoiPhuThuoc: 1, soGiamPhuThuoc: 4_400_000, baoHiem: 820_000 }),
  buildRow(5, 'Võ Thị E', '1245000005', 'Tổng hợp TNCN Q1/2026', 1, 2026, { comTrua: 780_000, phuCapDiLai: 600_000, phuCapCongCu: 350_000 }, { giamTruBanThan: 11_000_000, soNguoiPhuThuoc: 0, soGiamPhuThuoc: 0, baoHiem: 730_000 })
]

const data = {
  records: pitRecords
}

const matchesQuery = (row: PitRecordType, queryLowered: string) => {
  if (!queryLowered) {
    return true
  }

  return (
    row.fullName.toLowerCase().includes(queryLowered) ||
    row.taxCode.toLowerCase().includes(queryLowered) ||
    row.email.toLowerCase().includes(queryLowered)
  )
}

const matchesQuy = (row: PitRecordType, quy: string) => !quy || row.quy === Number(quy)

const matchesNam = (row: PitRecordType, nam: string) => !nam || row.nam === Number(nam)

const buildPitCardStats = (): CardStatsType['statsHorizontal'] => {
  const totalMienThue = data.records.reduce((sum, r) => sum + r.tongMienThue, 0)
  const totalGiamTru = data.records.reduce((sum, r) => sum + r.giamTruBanThan + r.soGiamPhuThuoc + (r.baoHiem ?? 0), 0)

  return [
    {
      stats: String(data.records.length),
      title: 'Số dòng nhập',
      subtitle: 'Theo dữ liệu mẫu',
      trendNumber: 0,
      avatarColor: 'primary',
      avatarIcon: 'bx:spreadsheet',
      trend: 'positive'
    },
    {
      stats: `${(totalMienThue / 1_000_000).toFixed(1)}M`,
      title: 'Tổng miễn thuế',
      subtitle: 'Không tính thuế TNCN',
      trendNumber: 0,
      avatarColor: 'info',
      avatarIcon: 'bx:shield-quarter',
      trend: 'positive'
    },
    {
      stats: `${(totalGiamTru / 1_000_000).toFixed(1)}M`,
      title: 'Tổng giảm trừ',
      subtitle: 'Gia cảnh và bảo hiểm',
      trendNumber: 0,
      avatarColor: 'warning',
      avatarIcon: 'bx:minus-circle',
      trend: 'positive'
    },
    {
      stats: String(new Set(data.records.map(r => r.taxCode)).size),
      title: 'Nhân sự',
      subtitle: 'Có dữ liệu TNCN',
      trendNumber: 0,
      avatarColor: 'success',
      avatarIcon: 'bx:user',
      trend: 'positive'
    }
  ]
}

const normalizeInput = (input: PitRecordInput & { id?: number }): Omit<PitRecordType, 'avatar' | 'avatarColor' | 'email'> => {
  const comTrua = Number(input.comTrua) || 0
  const phuCapDiLai = Number(input.phuCapDiLai) || 0
  const phuCapCongCu = Number(input.phuCapCongCu) || 0

  return {
    id: input.id ?? 0,
    fullName: input.fullName.trim(),
    taxCode: input.taxCode.trim(),
    noiDung: `TNTT Q${input.quy}/${input.nam}`,
    quy: Number(input.quy),
    nam: Number(input.nam),
    comTrua,
    phuCapDiLai,
    phuCapCongCu,
    tongMienThue: calcTongMienThue(comTrua, phuCapDiLai, phuCapCongCu),
    giamTruBanThan: Number(input.giamTruBanThan) || 0,
    soNguoiPhuThuoc: Number(input.soNguoiPhuThuoc) || 0,
    soGiamPhuThuoc: Number(input.soGiamPhuThuoc) || 0,
    baoHiem: Number(input.baoHiem) || 0
  }
}

mock.onGet('/apps/tax/pit/stats').reply(() => [200, buildPitCardStats()])

mock.onGet('/apps/tax/pit/records').reply(config => {
  const { q = '', quy = '', nam = '' } = config.params ?? {}
  const queryLowered = String(q).toLowerCase()
  const filtered = data.records.filter(
    row =>
      matchesQuery(row, queryLowered) &&
      matchesQuy(row, String(quy)) &&
      matchesNam(row, String(nam))
  )

  return [
    200,
    {
      params: config.params,
      allData: data.records,
      records: filtered,
      total: filtered.length
    }
  ]
})

mock.onPost('/apps/tax/pit/save').reply(config => {
  const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
  const normalized = normalizeInput(body)

  if (body.id) {
    const index = data.records.findIndex(r => r.id === body.id)
    if (index >= 0) {
      data.records[index] = withEmployeeProfile({ ...normalized, id: body.id })
    }
  } else {
    const nextId = data.records.reduce((max, r) => Math.max(max, r.id), 0) + 1
    data.records.push(withEmployeeProfile({ ...normalized, id: nextId }))
  }

  const savedId = body.id ?? data.records[data.records.length - 1]?.id

  return [200, { record: data.records.find(r => r.id === savedId) }]
})

mock.onDelete('/apps/tax/pit/delete').reply(config => {
  const id = Number(config.data)
  const index = data.records.findIndex(r => r.id === id)
  if (index >= 0) {
    data.records.splice(index, 1)
  }

  return [200]
})
