// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import MenuItem from '@mui/material/MenuItem'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import TableContainer from '@mui/material/TableContainer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { PitRecordType } from 'src/types/apps/pitTypes'

type TaxBracket = {
  label: string
  from: number
  to: number | null
  rate: number
}

type TaxCalculationRow = {
  id: string
  fullName: string
  taxCode: string
  email: string
  quy: number
  nam: number
  totalIncome: number
  totalExempt: number
  taxableIncomeBeforeDeduction: number
  totalDeduction: number
  taxableIncome: number
  taxDue: number
  incomeLines: InvoiceType[]
  pitLines: PitRecordType[]
}

const TAX_BRACKETS: TaxBracket[] = [
  { label: 'Bậc 1', from: 0, to: 10_000_000, rate: 0.05 },
  { label: 'Bậc 2', from: 10_000_000, to: 30_000_000, rate: 0.1 },
  { label: 'Bậc 3', from: 30_000_000, to: 60_000_000, rate: 0.2 },
  { label: 'Bậc 4', from: 60_000_000, to: 100_000_000, rate: 0.3 },
  { label: 'Bậc 5', from: 100_000_000, to: null, rate: 0.35 }
]

const formatVnd = (amount: number) => `${Math.round(amount).toLocaleString('vi-VN')} đ`

const calculateProgressiveTax = (taxableIncome: number) => {
  const amount = Math.max(0, taxableIncome)

  return TAX_BRACKETS.reduce((sum, bracket) => {
    const upper = bracket.to ?? amount
    const taxablePart = Math.max(0, Math.min(amount, upper) - bracket.from)

    return sum + taxablePart * bracket.rate
  }, 0)
}

const getBracketBreakdown = (taxableIncome: number) =>
  TAX_BRACKETS.map(bracket => {
    const amount = Math.max(0, taxableIncome)
    const upper = bracket.to ?? amount
    const taxablePart = Math.max(0, Math.min(amount, upper) - bracket.from)

    return {
      ...bracket,
      taxablePart,
      tax: taxablePart * bracket.rate
    }
  }).filter(item => item.taxablePart > 0)

const matchesPeriod = (row: { quy: number; nam: number }, quy: string, nam: string) =>
  (!quy || row.quy === Number(quy)) && (!nam || row.nam === Number(nam))

const getDeduction = (row: PitRecordType) => row.giamTruBanThan + row.soGiamPhuThuoc + (row.baoHiem ?? 0)

const buildCalculationRows = (
  incomeRows: InvoiceType[],
  pitRows: PitRecordType[],
  quy: string,
  nam: string,
  isAllowedEmployee: (taxCode: string, email: string) => boolean
): TaxCalculationRow[] => {
  const groups = new Map<string, TaxCalculationRow>()

  const ensureGroup = (seed: { fullName: string; taxCode: string; email: string; quy: number; nam: number }) => {
    const id = `${seed.taxCode}-${seed.nam}-Q${seed.quy}`
    const existing = groups.get(id)
    if (existing) {
      return existing
    }

    const group: TaxCalculationRow = {
      id,
      fullName: seed.fullName,
      taxCode: seed.taxCode,
      email: seed.email,
      quy: seed.quy,
      nam: seed.nam,
      totalIncome: 0,
      totalExempt: 0,
      taxableIncomeBeforeDeduction: 0,
      totalDeduction: 0,
      taxableIncome: 0,
      taxDue: 0,
      incomeLines: [],
      pitLines: []
    }
    groups.set(id, group)

    return group
  }

  incomeRows
    .filter(row => matchesPeriod(row, quy, nam) && isAllowedEmployee(row.taxCode, row.email))
    .forEach(row => {
      const group = ensureGroup(row)
      group.incomeLines.push(row)
      group.totalIncome += row.amount
    })

  pitRows
    .filter(row => matchesPeriod(row, quy, nam) && isAllowedEmployee(row.taxCode, row.email))
    .forEach(row => {
      const group = ensureGroup(row)
      group.pitLines.push(row)
      group.totalExempt += row.tongMienThue
      group.totalDeduction += getDeduction(row)
    })

  return Array.from(groups.values())
    .map(group => {
      const taxableIncomeBeforeDeduction = Math.max(0, group.totalIncome - group.totalExempt)
      const taxableIncome = Math.max(0, taxableIncomeBeforeDeduction - group.totalDeduction)

      return {
        ...group,
        taxableIncomeBeforeDeduction,
        taxableIncome,
        taxDue: calculateProgressiveTax(taxableIncome)
      }
    })
    .sort((a, b) => b.taxDue - a.taxDue || a.fullName.localeCompare(b.fullName, 'vi'))
}

const TaxCalculationPage = () => {
  const auth = useAuth()
  const [incomeRows, setIncomeRows] = useState<InvoiceType[]>([])
  const [pitRows, setPitRows] = useState<PitRecordType[]>([])
  const [quyValue, setQuyValue] = useState('1')
  const [namValue, setNamValue] = useState('2026')
  const [loading, setLoading] = useState(true)
  const [selectedRow, setSelectedRow] = useState<TaxCalculationRow | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    Promise.all([axios.get('/apps/invoice/invoices'), axios.get('/apps/tax/pit/records')])
      .then(([incomeRes, pitRes]) => {
        if (!mounted) {
          return
        }
        setIncomeRows(incomeRes.data.allData ?? [])
        setPitRows(pitRes.data.allData ?? [])
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const isClientRole = auth.user?.role === 'client'
  const userEmail = auth.user?.email?.toLowerCase() ?? ''
  const userTaxCode = auth.user?.taxCode ?? ''

  const isAllowedEmployee = (taxCode: string, email: string) => {
    if (!isClientRole) {
      return true
    }

    return taxCode === userTaxCode || email.toLowerCase() === userEmail
  }

  const rows = useMemo(
    () => buildCalculationRows(incomeRows, pitRows, quyValue, namValue, isAllowedEmployee),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [incomeRows, pitRows, quyValue, namValue, isClientRole, userEmail, userTaxCode]
  )

  // const visibleIncomeRows = useMemo(
  //   () =>
  //     incomeRows
  //       .filter(row => matchesPeriod(row, quyValue, namValue) && isAllowedEmployee(row.taxCode, row.email))
  //       .sort((a, b) => a.fullName.localeCompare(b.fullName, 'vi') || a.id - b.id),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [incomeRows, quyValue, namValue, isClientRole, userEmail, userTaxCode]
  // )

  const yearOptions = useMemo(() => {
    const years = new Set<number>()
    incomeRows.forEach(row => years.add(row.nam))
    pitRows.forEach(row => years.add(row.nam))

    return Array.from(years).sort((a, b) => b - a)
  }, [incomeRows, pitRows])

  const totals = useMemo(
    () =>
      rows.reduce(
        (sum, row) => ({
          income: sum.income + row.totalIncome,
          taxable: sum.taxable + row.taxableIncome,
          tax: sum.tax + row.taxDue
        }),
        { income: 0, taxable: 0, tax: 0 }
      ),
    [rows]
  )

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.22,
        minWidth: 190,
        field: 'fullName',
        headerName: 'Nhân viên',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{row.fullName}</Typography>
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {row.taxCode}
            </Typography>
          </Box>
        )
      },
      {
        flex: 0.1,
        minWidth: 90,
        field: 'period',
        headerName: 'Kỳ',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Chip size='small' label={`Q${row.quy}/${row.nam}`} color='primary' variant='outlined' />
        )
      },
      {
        flex: 0.14,
        minWidth: 140,
        field: 'totalIncome',
        headerName: 'Thu nhập',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.totalIncome)}
          </Typography>
        )
      },
      {
        flex: 0.14,
        minWidth: 140,
        field: 'totalExempt',
        headerName: 'Miễn thuế',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.totalExempt)}
          </Typography>
        )
      },
      {
        flex: 0.16,
        minWidth: 150,
        field: 'totalDeduction',
        headerName: 'Giảm trừ',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.totalDeduction)}
          </Typography>
        )
      },
      {
        flex: 0.16,
        minWidth: 160,
        field: 'taxableIncome',
        headerName: 'Thu nhập tính thuế',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {formatVnd(row.taxableIncome)}
          </Typography>
        )
      },
      {
        flex: 0.16,
        minWidth: 160,
        field: 'taxDue',
        headerName: 'Thuế phải nộp',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatVnd(row.taxDue)}
          </Typography>
        )
      },
      {
        flex: 0.08,
        minWidth: 84,
        sortable: false,
        field: 'actions',
        headerName: '',
        renderCell: ({ row }: { row: TaxCalculationRow }) => (
          <IconButton size='small' onClick={() => setSelectedRow(row)}>
            <Icon icon='bx:show' fontSize={20} />
          </IconButton>
        )
      }
    ],
    []
  )

  // const incomeDetailColumns = useMemo<GridColDef[]>(
  //   () => [
  //     {
  //       flex: 0.2,
  //       minWidth: 180,
  //       field: 'fullName',
  //       headerName: 'Nhân viên',
  //       renderCell: ({ row }: { row: InvoiceType }) => (
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{row.fullName}</Typography>
  //           <Typography variant='caption' sx={{ color: 'text.disabled' }}>
  //             {row.taxCode}
  //           </Typography>
  //         </Box>
  //       )
  //     },
  //     {
  //       flex: 0.1,
  //       minWidth: 90,
  //       field: 'period',
  //       headerName: 'Kỳ',
  //       renderCell: ({ row }: { row: InvoiceType }) => (
  //         <Chip size='small' label={`Q${row.quy}/${row.nam}`} color='primary' variant='outlined' />
  //       )
  //     },
  //     {
  //       flex: 0.36,
  //       minWidth: 280,
  //       field: 'tenKhoanTien',
  //       headerName: 'Tên khoản tiền',
  //       renderCell: ({ row }: { row: InvoiceType }) => (
  //         <Typography sx={{ color: 'text.secondary' }}>{row.tenKhoanTien}</Typography>
  //       )
  //     },
  //     {
  //       flex: 0.14,
  //       minWidth: 130,
  //       field: 'amount',
  //       headerName: 'Amount',
  //       renderCell: ({ row }: { row: InvoiceType }) => (
  //         <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{formatVnd(row.amount)}</Typography>
  //       )
  //     },
  //     {
  //       flex: 0.14,
  //       minWidth: 130,
  //       field: 'paymentDate',
  //       headerName: 'Ngày chi trả',
  //       renderCell: ({ row }: { row: InvoiceType }) => (
  //         <Typography variant='body2' sx={{ color: 'text.secondary' }}>
  //           {row.paymentDate ?? ''}
  //         </Typography>
  //       )
  //     }
  //   ],
  //   []
  // )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>Tổng thu nhập</Typography>
                <Typography variant='h5'>{formatVnd(totals.income)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>Thu nhập tính thuế</Typography>
                <Typography variant='h5'>{formatVnd(totals.taxable)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>Thuế TNCN</Typography>
                <Typography variant='h5' sx={{ color: 'primary.main' }}>
                  {formatVnd(totals.tax)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Tính thuế TNCN'
            action={
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <FormControl size='small' sx={{ minWidth: 140 }}>
                  <InputLabel id='tax-calc-year'>Năm</InputLabel>
                  <Select
                    label='Năm'
                    value={namValue}
                    labelId='tax-calc-year'
                    onChange={e => setNamValue(e.target.value)}
                  >
                    {yearOptions.map(year => (
                      <MenuItem key={year} value={String(year)}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size='small' sx={{ minWidth: 140 }}>
                  <InputLabel id='tax-calc-quarter'>Quý</InputLabel>
                  <Select
                    label='Quý'
                    value={quyValue}
                    labelId='tax-calc-quarter'
                    onChange={e => setQuyValue(e.target.value)}
                  >
                    {[1, 2, 3, 4].map(q => (
                      <MenuItem key={q} value={String(q)}>
                        Quý {q}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
          />
          <DataGrid
            autoHeight
            loading={loading}
            rows={rows}
            columns={columns}
            getRowId={row => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            sx={{ px: 2, pb: 4 }}
          />
        </Card>
      </Grid>

      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Chi tiết khoản tiền'
            subheader='Dữ liệu lấy từ bảng thu nhập: tên khoản tiền và amount theo kỳ đang chọn'
          />
          <DataGrid
            autoHeight
            loading={loading}
            rows={visibleIncomeRows}
            columns={incomeDetailColumns}
            getRowId={row => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            sx={{ px: 2, pb: 4 }}
          />
        </Card>
      </Grid> */}

      <Drawer
        open={Boolean(selectedRow)}
        anchor='right'
        variant='temporary'
        onClose={() => setSelectedRow(null)}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 340, sm: 640 } } }}
      >
        {selectedRow && (
          <Box>
            <Box sx={{ p: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3 }}>
              <Box>
                <Typography variant='h6'>{selectedRow.fullName}</Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {selectedRow.taxCode} · Q{selectedRow.quy}/{selectedRow.nam}
                </Typography>
              </Box>
              <IconButton size='small' onClick={() => setSelectedRow(null)}>
                <Icon icon='bx:x' fontSize={22} />
              </IconButton>
            </Box>
            <Divider />
            <Box sx={{ p: 5 }}>
              <Grid container spacing={4} sx={{ mb: 5 }}>
                <Grid item xs={6}>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    Thu nhập chịu thuế
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {formatVnd(selectedRow.taxableIncomeBeforeDeduction)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    Thuế phải nộp
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatVnd(selectedRow.taxDue)}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant='subtitle2' sx={{ mb: 3, fontWeight: 600 }}>
                Thu nhập
              </Typography>
              <TableContainer sx={{ mb: 5, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nội dung</TableCell>
                      <TableCell align='right'>Số tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRow.incomeLines.map(line => (
                      <TableRow key={line.id}>
                        <TableCell>{line.tenKhoanTien}</TableCell>
                        <TableCell align='right'>{formatVnd(line.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant='subtitle2' sx={{ mb: 3, fontWeight: 600 }}>
                Miễn thuế và giảm trừ
              </Typography>
              <TableContainer sx={{ mb: 5, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nội dung</TableCell>
                      <TableCell align='right'>Miễn thuế</TableCell>
                      <TableCell align='right'>Giảm trừ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRow.pitLines.map(line => (
                      <TableRow key={line.id}>
                        <TableCell>{line.noiDung}</TableCell>
                        <TableCell align='right'>{formatVnd(line.tongMienThue)}</TableCell>
                        <TableCell align='right'>{formatVnd(getDeduction(line))}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant='subtitle2' sx={{ mb: 3, fontWeight: 600 }}>
                Lũy tiến từng phần
              </Typography>
              <TableContainer sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Bậc</TableCell>
                      <TableCell align='right'>Phần tính thuế</TableCell>
                      <TableCell align='right'>Thuế suất</TableCell>
                      <TableCell align='right'>Thuế</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getBracketBreakdown(selectedRow.taxableIncome).map(item => (
                      <TableRow key={item.label}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell align='right'>{formatVnd(item.taxablePart)}</TableCell>
                        <TableCell align='right'>{item.rate * 100}%</TableCell>
                        <TableCell align='right'>{formatVnd(item.tax)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' color='secondary' onClick={() => setSelectedRow(null)}>
                  Đóng
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </Grid>
  )
}

TaxCalculationPage.acl = {
  action: 'read',
  subject: 'tax-calculate-page'
}

export default TaxCalculationPage
