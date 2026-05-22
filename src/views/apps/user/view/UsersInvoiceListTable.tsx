// ** React Imports
import { MouseEvent, useState, useMemo } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
// import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'

// import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'

//import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { InvoiceType } from 'src/types/apps/invoiceTypes'

interface Props {
  invoiceData: InvoiceType[]
  taxCode?: string // Lọc theo MST nhân viên đang xem (tùy chọn)
}

interface CellType {
  row: InvoiceType
}

const formatVnd = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`

const columns: GridColDef[] = [
  {
    flex: 0.08,
    field: 'stt',
    minWidth: 70,
    headerName: 'STT',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {row.stt ?? '—'}
      </Typography>
    )
  },
  {
    flex: 0.22,
    field: 'tenKhoanTien',
    minWidth: 160,
    headerName: 'Tên khoản tiền',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {row.tenKhoanTien}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'workingDays',
    minWidth: 95,
    headerName: 'Ngày công',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {row.workingDays ?? '—'}
      </Typography>
    )
  },
  {
    flex: 0.14,
    field: 'amount',
    minWidth: 120,
    headerName: 'Số tiền',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.secondary' }}>
        {formatVnd(row.amount)}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'paymentDate',
    minWidth: 100,
    headerName: 'Ngày',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {row.paymentDate ?? '—'}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'quy',
    minWidth: 90,
    headerName: 'Quý / Năm',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        Q{row.quy}/{row.nam}
      </Typography>
    )
  },
  {
    flex: 0.12,
    field: 'note',
    minWidth: 90,
    headerName: 'Ghi chú',
    renderCell: ({ row }: CellType) => (
      <Typography noWrap variant='body2' sx={{ color: 'text.secondary' }}>
        {row.note || '—'}
      </Typography>
    )
  }

  // {
  //   flex: 0.1,
  //   minWidth: 90,
  //   sortable: false,
  //   field: 'actions',
  //   headerName: 'Thao tác',
  //   renderCell: ({ row }: CellType) => (
  //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //       <Tooltip title='Xem chi tiết'>
  //         <IconButton size='small' component={Link} href={`/apps/invoice/preview/${row.id}`}>
  //           <Icon icon='bx:show' fontSize={20} />
  //         </IconButton>
  //       </Tooltip>
  //     </Box>
  //   )
  // }
]

const UsersInvoiceListTable = ({ invoiceData, taxCode }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const rows = useMemo(() => {
    if (!taxCode) {
      return invoiceData
    }

    return invoiceData.filter(row => row.taxCode === taxCode)
  }, [invoiceData, taxCode])

  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExportCsv = () => {
    handleClose()
    if (!rows.length) {
      toast.error('Không có dữ liệu để xuất')

      return
    }
    const headers = ['STT', 'Tên khoản tiền', 'Ngày công', 'Số tiền (VNĐ)', 'Ngày', 'Quý', 'Năm', 'Ghi chú']
    const escapeCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
      headers.join(','),
      ...rows.map(r =>
        [r.stt ?? '', r.tenKhoanTien, r.workingDays ?? '', r.amount, r.paymentDate ?? '', r.quy, r.nam, r.note]
          .map(escapeCell)
          .join(',')
      )
    ]
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `thu-nhap-nhan-vien-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất file CSV')
  }

  return (
    <Card>
      <CardHeader
        title='Khoản thu nhập'
        subheader={
          rows.length > 0 ? (
            <Typography variant='body2' component='span' sx={{ color: 'text.secondary' }}>
              {rows.length} dòng · Tổng:{' '}
              <Typography component='span' sx={{ fontWeight: 600 }}>
                {formatVnd(rows.reduce((sum, r) => sum + r.amount, 0))}
              </Typography>
            </Typography>
          ) : undefined
        }
        sx={{ '& .MuiCardHeader-action': { m: 0 } }}
        action={
          <>
            <Button
              color='secondary'
              variant='outlined'
              aria-haspopup='true'
              onClick={handleClick}
              disabled={rows.length === 0}
              aria-expanded={open ? 'true' : undefined}
              endIcon={<Icon icon='bx:chevron-down' />}
              aria-controls={open ? 'user-view-income-export' : undefined}
            >
              Xuất file
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose} id='user-view-income-export'>
              <MenuItem onClick={handleExportCsv}>CSV</MenuItem>
              <MenuItem onClick={handleClose}>XLSX (sắp có)</MenuItem>
              <MenuItem onClick={handleClose}>PDF (sắp có)</MenuItem>
            </Menu>
            <Button
              sx={{ ml: 2 }}
              component={Link}
              variant='outlined'
              href='/apps/invoice/list'
              startIcon={<Icon icon='bx:list-ul' fontSize={18} />}
            >
              Xem tất cả
            </Button>
          </>
        }
      />
      <DataGrid
        autoHeight
        columns={columns}
        rows={rows}
        getRowId={row => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  )
}

export default UsersInvoiceListTable
