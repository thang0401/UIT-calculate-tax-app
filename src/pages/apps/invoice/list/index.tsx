// ** React Imports
import { useState, useEffect, useMemo, useCallback, SyntheticEvent } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Accordion from '@mui/material/Accordion'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

//import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'

interface CellType {
  row: InvoiceType
}

type EmployeeOption = {
  fullName: string
  taxCode: string
}

type PaymentItemGroup = {
  tenKhoanTien: string
  rows: InvoiceType[]
  totalAmount: number
}

const formatVnd = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`

const renderEmployeeAvatar = (row: InvoiceType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  }

  return (
    <CustomAvatar
      skin='light'
      color={(row.avatarColor as ThemeColor) || 'primary'}
      sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem', lineHeight: 1.5 }}
    >
      {getInitials(row.fullName)}
    </CustomAvatar>
  )
}

const gridColumns: GridColDef[] = [
  {
    flex: 0.08,
    field: 'stt',
    minWidth: 70,
    headerName: 'STT',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.stt ?? '—'}</Typography>
  },
  {
    flex: 0.26,
    field: 'fullName',
    minWidth: 220,
    headerName: 'Họ tên',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderEmployeeAvatar(row)}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{row.fullName}</Typography>
          <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
            {row.taxCode}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.18,
    field: 'tenKhoanTien',
    minWidth: 160,
    headerName: 'Tên khoản tiền',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.tenKhoanTien}</Typography>
  },
  {
    flex: 0.1,
    field: 'workingDays',
    minWidth: 100,
    headerName: 'Ngày công',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.workingDays ?? '—'}</Typography>
    )
  },
  {
    flex: 0.14,
    field: 'amount',
    minWidth: 130,
    headerName: 'Số tiền',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>{formatVnd(row.amount)}</Typography>
    )
  },
  {
    flex: 0.1,
    field: 'paymentDate',
    minWidth: 110,
    headerName: 'Ngày',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.paymentDate ?? '—'}</Typography>
    )
  },
  {
    flex: 0.12,
    field: 'note',
    minWidth: 100,
    headerName: 'Ghi chú',
    renderCell: ({ row }: CellType) => (
      <Typography noWrap sx={{ color: 'text.secondary' }}>
        {row.note || '—'}
      </Typography>
    )
  }
]

const groupByTenKhoanTien = (rows: InvoiceType[]): PaymentItemGroup[] => {
  const order: string[] = []
  const map = new Map<string, InvoiceType[]>()

  rows.forEach(row => {
    if (!map.has(row.tenKhoanTien)) {
      order.push(row.tenKhoanTien)
      map.set(row.tenKhoanTien, [])
    }
    map.get(row.tenKhoanTien)!.push(row)
  })

  return order.map(tenKhoanTien => {
    const groupRows = map.get(tenKhoanTien)!

    return {
      tenKhoanTien,
      rows: groupRows,
      totalAmount: groupRows.reduce((sum, row) => sum + row.amount, 0)
    }
  })
}

const buildYearOptions = (rows: InvoiceType[]): number[] => {
  const years = new Set<number>()
  rows.forEach(row => years.add(row.nam))

  return Array.from(years).sort((a, b) => b - a)
}

const buildEmployeeOptions = (rows: InvoiceType[]): EmployeeOption[] => {
  const map = new Map<string, EmployeeOption>()
  rows.forEach(row => {
    if (!map.has(row.taxCode)) {
      map.set(row.taxCode, { fullName: row.fullName, taxCode: row.taxCode })
    }
  })

  return Array.from(map.values()).sort((a, b) => a.fullName.localeCompare(b.fullName, 'vi'))
}

const InvoiceList = () => {
  const [namValue, setNamValue] = useState<string>('')
  const [quyValue, setQuyValue] = useState<string>('')
  const [employeeInput, setEmployeeInput] = useState<string>('')
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeOption | null>(null)
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.invoice)

  const allRows = store.allData as InvoiceType[]
  const rows = store.data as InvoiceType[]
  const yearOptions = useMemo(() => buildYearOptions(allRows), [allRows])
  const employeeOptions = useMemo(() => buildEmployeeOptions(allRows), [allRows])
  const groupedRows = useMemo(() => groupByTenKhoanTien(rows), [rows])
  const isEmployeeSelected = selectedEmployee !== null

  const employeeQuery = selectedEmployee ? selectedEmployee.taxCode : employeeInput.trim()

  const columns = useMemo<GridColDef[]>(
    () => [
      ...gridColumns,
      {
        flex: 0.1,
        minWidth: 130,
        sortable: false,
        field: 'actions',
        headerName: 'Thao tác',
        renderCell: ({ row }: CellType) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Xóa'>
              <IconButton size='small' onClick={() => dispatch(deleteInvoice(row.id))}>
                <Icon icon='bx:trash-alt' fontSize={20} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title='Xem chi tiết'>
              <IconButton size='small' component={Link} href={`/apps/invoice/preview/${row.id}`}>
                <Icon icon='bx:show' fontSize={20} />
              </IconButton>
            </Tooltip>
            <OptionsMenu
              iconProps={{ fontSize: 20 }}
              iconButtonProps={{ size: 'small' }}
              options={[
                { text: 'Tải xuống' },
                { text: 'Sửa', href: `/apps/invoice/edit/${row.id}` },
                { text: 'Nhân bản' }
              ]}
            /> */}
          </Box>
        )
      }
    ],
    [dispatch]
  )

  const refetchIncome = useCallback(() => {
    dispatch(
      fetchData({
        q: employeeQuery,
        quy: quyValue,
        nam: namValue,
        status: ''
      })
    )
  }, [dispatch, employeeQuery, quyValue, namValue])

  useEffect(() => {
    refetchIncome()
  }, [refetchIncome])

  const handleExportIncome = useCallback(() => {
    if (!rows.length) {
      toast.error('Không có dữ liệu để xuất')

      return
    }
    const headers = [
      'STT',
      'Họ tên',
      'Mã số thuế',
      'Tên khoản tiền',
      'Ngày công',
      'Số tiền (VNĐ)',
      'Ngày',
      'Ghi chú',
      'Quý',
      'Năm'
    ]
    const escapeCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
      headers.join(','),
      ...rows.map(r =>
        [
          r.stt ?? '',
          r.fullName,
          r.taxCode,
          r.tenKhoanTien,
          r.workingDays ?? '',
          r.amount,
          r.paymentDate ?? '',
          r.note,
          r.quy,
          r.nam
        ]
          .map(escapeCell)
          .join(',')
      )
    ]
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bang-thu-nhap-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất file CSV')
  }, [rows])

  const handleNamChange = (e: SelectChangeEvent<string>) => {
    setNamValue(e.target.value)
  }

  const handleQuyChange = (e: SelectChangeEvent<string>) => {
    setQuyValue(e.target.value)
  }

  const handleEmployeeSelect = (_: SyntheticEvent, value: EmployeeOption | null) => {
    setSelectedEmployee(value)
    if (value) {
      setEmployeeInput(`${value.fullName} (${value.taxCode})`)
    } else {
      setEmployeeInput('')
      setExpandedPanel(false)
    }
  }

  const handleEmployeeInputChange = (_: SyntheticEvent, value: string) => {
    setEmployeeInput(value)
    if (selectedEmployee && value !== `${selectedEmployee.fullName} (${selectedEmployee.taxCode})`) {
      setSelectedEmployee(null)
    }
  }

  const handleAccordionChange = (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
    if (isEmployeeSelected) {
      return
    }
    setExpandedPanel(isExpanded ? panel : false)
  }

  const isAccordionExpanded = (panelId: string) => isEmployeeSelected || expandedPanel === panelId

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Bộ lọc' />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id='invoice-nam-select'>Năm</InputLabel>
                  <Select
                    fullWidth
                    value={namValue}
                    label='Năm'
                    onChange={handleNamChange}
                    labelId='invoice-nam-select'
                  >
                    <MenuItem value=''>Tất cả các năm</MenuItem>
                    {yearOptions.map(year => (
                      <MenuItem key={year} value={String(year)}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id='invoice-quy-select'>Quý</InputLabel>
                  <Select
                    fullWidth
                    value={quyValue}
                    label='Quý'
                    onChange={handleQuyChange}
                    labelId='invoice-quy-select'
                  >
                    <MenuItem value=''>Tất cả các quý</MenuItem>
                    <MenuItem value='1'>Quý 1</MenuItem>
                    <MenuItem value='2'>Quý 2</MenuItem>
                    <MenuItem value='3'>Quý 3</MenuItem>
                    <MenuItem value='4'>Quý 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  options={employeeOptions}
                  value={selectedEmployee}
                  inputValue={employeeInput}
                  onChange={handleEmployeeSelect}
                  onInputChange={handleEmployeeInputChange}
                  isOptionEqualToValue={(option, value) => option.taxCode === value.taxCode}
                  getOptionLabel={option => `${option.fullName} (${option.taxCode})`}
                  noOptionsText='Không tìm thấy nhân viên'
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Tên nhân viên / Mã số thuế'
                      placeholder='Nhập họ tên hoặc MST để tìm, chọn để xem tất cả khoản'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader onExport={handleExportIncome} onImported={refetchIncome} disableExport={rows.length === 0} />
          <CardContent sx={{ pt: 0 }}>
            {groupedRows.length === 0 ? (
              <Typography sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                Không có dữ liệu phù hợp.
              </Typography>
            ) : (
              groupedRows.map(group => (
                <Accordion
                  key={group.tenKhoanTien}
                  expanded={isAccordionExpanded(group.tenKhoanTien)}
                  onChange={handleAccordionChange(group.tenKhoanTien)}
                  disableGutters
                  sx={{ mb: 2, '&:before': { display: 'none' } }}
                >
                  <AccordionSummary
                    expandIcon={<Icon icon='bx:chevron-down' />}
                    aria-controls={`panel-${group.tenKhoanTien}`}
                    id={`panel-header-${group.tenKhoanTien}`}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        pr: 2
                      }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>{group.tenKhoanTien}</Typography>
                      <Typography variant='body2' sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                        {group.rows.length} dòng · {formatVnd(group.totalAmount)}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pb: 0 }}>
                    <DataGrid
                      autoHeight
                      hideFooter
                      rows={group.rows}
                      columns={columns}
                      getRowId={row => row.id}
                      disableRowSelectionOnClick
                    />
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvoiceList
