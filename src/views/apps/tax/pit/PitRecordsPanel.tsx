// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { PitRecordType } from 'src/types/apps/pitTypes'

// ** Store
import { fetchPitData, deletePitRecord } from 'src/store/apps/pit'

// ** Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import PitTableHeader from 'src/views/apps/tax/pit/PitTableHeader'
import PitEntryDrawer from 'src/views/apps/tax/pit/PitEntryDrawer'
import { getInitials } from 'src/@core/utils/get-initials'

interface CellType {
  row: PitRecordType
}

const formatVnd = (n: number) => `${n.toLocaleString('vi-VN')} đ`

const renderEmployee = (row: PitRecordType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
  }

  return (
    <CustomAvatar
      skin='light'
      color={(row.avatarColor as ThemeColor) || 'primary'}
      sx={{ mr: 2, width: 32, height: 32, fontSize: '.875rem' }}
    >
      {getInitials(row.fullName)}
    </CustomAvatar>
  )
}

const PitRecordsPanel = () => {
  const [value, setValue] = useState('')
  const [namValue, setNamValue] = useState('')
  const [quyValue, setQuyValue] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [recordToEdit, setRecordToEdit] = useState<PitRecordType | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.pit)

  const allRows = store.allData as PitRecordType[]
  const rows = store.data as PitRecordType[]

  const yearOptions = useMemo(() => {
    const years = new Set<number>()
    allRows.forEach(r => years.add(r.nam))

    return Array.from(years).sort((a, b) => b - a)
  }, [allRows])

  const refetchPit = useCallback(() => {
    dispatch(
      fetchPitData({
        q: value,
        quy: quyValue,
        nam: namValue
      })
    )
  }, [dispatch, value, quyValue, namValue])

  useEffect(() => {
    refetchPit()
  }, [refetchPit])

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev)
    if (drawerOpen) {
      setRecordToEdit(null)
    }
  }

  const openAdd = () => {
    setRecordToEdit(null)
    setDrawerOpen(true)
  }

  const openEdit = useCallback((row: PitRecordType) => {
    setRecordToEdit(row)
    setDrawerOpen(true)
  }, [])

  const handleExport = useCallback(() => {
    if (!rows.length) {
      toast.error('Không có dữ liệu để xuất')

      return
    }

    const headers = [
      'Họ và tên',
      'Mã số thuế',
      'Quý',
      'Năm',
      'Cơm trưa',
      'Phụ cấp đi lại',
      'Phụ cấp CCDC',
      'Cộng miễn thuế',
      'Giảm trừ bản thân',
      'Số người phụ thuộc',
      'Số giảm NPT',
      'Bảo hiểm'
    ]
    const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
      headers.join(','),
      ...rows.map(r =>
        [
          r.fullName,
          r.taxCode,
          r.quy,
          r.nam,
          r.comTrua,
          r.phuCapDiLai,
          r.phuCapCongCu,
          r.tongMienThue,
          r.giamTruBanThan,
          r.soNguoiPhuThuoc,
          r.soGiamPhuThuoc,
          r.baoHiem ?? 0
        ]
          .map(escape)
          .join(',')
      )
    ]
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `thanh-phan-tncn-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất file CSV')
  }, [rows])

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.22,
        minWidth: 200,
        field: 'fullName',
        headerName: 'Họ và tên',
        renderCell: ({ row }: CellType) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderEmployee(row)}
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{row.fullName}</Typography>
          </Box>
        )
      },
      {
        flex: 0.12,
        minWidth: 110,
        field: 'taxCode',
        headerName: 'Mã số thuế'
      },
      {
        flex: 0.1,
        minWidth: 100,
        field: 'comTrua',
        headerName: 'Cơm trưa',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.comTrua)}
          </Typography>
        )
      },
      {
        flex: 0.1,
        minWidth: 110,
        field: 'phuCapDiLai',
        headerName: 'PC đi lại',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.phuCapDiLai)}
          </Typography>
        )
      },
      {
        flex: 0.1,
        minWidth: 100,
        field: 'phuCapCongCu',
        headerName: 'PC CCDC',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.phuCapCongCu)}
          </Typography>
        )
      },
      {
        flex: 0.1,
        minWidth: 110,
        field: 'tongMienThue',
        headerName: 'Cộng',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'primary.main' }}>
            {formatVnd(row.tongMienThue)}
          </Typography>
        )
      },
      {
        flex: 0.11,
        minWidth: 110,
        field: 'giamTruBanThan',
        headerName: 'Bản thân',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.giamTruBanThan)}
          </Typography>
        )
      },
      {
        flex: 0.07,
        minWidth: 72,
        field: 'soNguoiPhuThuoc',
        headerName: 'Số người',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {row.soNguoiPhuThuoc}
          </Typography>
        )
      },
      {
        flex: 0.11,
        minWidth: 110,
        field: 'soGiamPhuThuoc',
        headerName: 'Số giảm',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.soGiamPhuThuoc)}
          </Typography>
        )
      },
      {
        flex: 0.11,
        minWidth: 110,
        field: 'baoHiem',
        headerName: 'Bảo hiểm',
        renderCell: ({ row }: CellType) => (
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {formatVnd(row.baoHiem ?? 0)}
          </Typography>
        )
      },
      {
        flex: 0.08,
        minWidth: 88,
        sortable: false,
        field: 'actions',
        headerName: '',
        renderCell: ({ row }: CellType) => (
          <Box sx={{ display: 'flex' }}>
            <Tooltip title='Sửa'>
              <IconButton size='small' onClick={() => openEdit(row)}>
                <Icon icon='bx:edit' fontSize={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Xóa'>
              <IconButton
                size='small'
                onClick={() => {
                  void dispatch(deletePitRecord(row.id))
                    .unwrap()
                    .then(() => toast.success('Đã xóa dòng'))
                    .catch(() => toast.error('Không thể xóa'))
                }}
              >
                <Icon icon='bx:trash-alt' fontSize={20} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ],
    [dispatch, openEdit]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Bộ lọc' />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id='pit-nam-select'>Năm</InputLabel>
                  <Select
                    fullWidth
                    label='Năm'
                    value={namValue}
                    labelId='pit-nam-select'
                    onChange={e => setNamValue(e.target.value)}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
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
                  <InputLabel id='pit-quy-select'>Quý</InputLabel>
                  <Select
                    fullWidth
                    label='Quý'
                    value={quyValue}
                    labelId='pit-quy-select'
                    onChange={e => setQuyValue(e.target.value)}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
                    <MenuItem value='1'>Quý 1</MenuItem>
                    <MenuItem value='2'>Quý 2</MenuItem>
                    <MenuItem value='3'>Quý 3</MenuItem>
                    <MenuItem value='4'>Quý 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Thành phần thuế TNCN'
            subheader='Nhập tay các khoản miễn thuế và giảm trừ theo từng nhân sự · kỳ'
          />
          <PitTableHeader
            value={value}
            handleFilter={setValue}
            onAdd={openAdd}
            onExport={handleExport}
            onImported={refetchPit}
            disableExport={rows.length === 0}
          />

          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            getRowId={row => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ px: 2, pb: 4 }}
          />
        </Card>
      </Grid>

      <PitEntryDrawer open={drawerOpen} toggle={toggleDrawer} recordToEdit={recordToEdit} />
    </Grid>
  )
}

export default PitRecordsPanel
