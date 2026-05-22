// ** React Imports
import { useState, useEffect, MouseEvent, SyntheticEvent, useCallback, useMemo } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tab from '@mui/material/Tab'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'
import toast from 'react-hot-toast'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import PitRecordsPanel from 'src/views/apps/tax/pit/PitRecordsPanel'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'bx:shield-quarter', color: 'error' },
  accountant: { icon: 'bx:wallet', color: 'warning' },
  staff_teacher: { icon: 'bx:briefcase-alt', color: 'primary' }
}

interface CellType {
  row: UsersType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  inactive: 'secondary'
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  minHeight: 40,
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTab-root': {
    minHeight: 40,
    textTransform: 'none',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  }
}))

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 32, height: 32, fontSize: '.875rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

interface RowOptionsProps {
  row: UsersType
  onEdit: (user: UsersType) => void
}

const RowOptions = ({ row, onEdit }: RowOptionsProps) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    handleRowOptionsClose()
    void dispatch(deleteUser(row.id))
      .unwrap()
      .then(() => toast.success('Đã xóa nhân sự'))
      .catch(() => toast.error('Không thể xóa nhân sự. Vui lòng thử lại.'))
  }

  const handleEdit = () => {
    onEdit(row)
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='bx:dots-vertical-rounded' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href='/apps/user/view/account'
          onClick={handleRowOptionsClose}
        >
          <Icon icon='bx:show' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:pencil' fontSize={20} />
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='bx:trash-alt' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('users')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<UsersType | null>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const tab = Array.isArray(router.query.tab) ? router.query.tab[0] : router.query.tab
    if (tab === 'pit' || tab === 'users') {
      setActiveTab(tab)
    } else {
      setActiveTab('users')
    }
  }, [router.query.tab])

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value
      })
    )
  }, [dispatch, role, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: string) => {
      setActiveTab(newValue)

      const nextQuery = { ...router.query }
      if (newValue === 'pit') {
        nextQuery.tab = 'pit'
      } else {
        delete nextQuery.tab
      }

      void router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true })
    },
    [router]
  )

  const handleOpenEdit = useCallback((user: UsersType) => {
    setEditingUser(user)
    setAddUserOpen(true)
  }, [])

  const openCreateDrawer = useCallback(() => {
    setEditingUser(null)
    setAddUserOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setAddUserOpen(false)
    setEditingUser(null)
  }, [])

  const handleExportUsers = useCallback(() => {
    const rows = store.data as UsersType[]
    if (!rows.length) {
      toast.error('Không có dữ liệu để xuất')

      return
    }
    const headers = [
      'ID',
      'Họ tên',
      'Email UIT',
      'Email',
      'Mã số thuế',
      'Lương cứng (VNĐ)',
      'SĐT',
      'Vai trò',
      'Trạng thái',
      'Đơn vị'
    ]
    const escapeCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = [
      headers.join(','),
      ...rows.map(r =>
        [r.id, r.fullName, r.username, r.email, r.taxCode, r.baseSalary, r.contact, r.role, r.status, r.company]
          .map(escapeCell)
          .join(',')
      )
    ]
    const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `danh-sach-nhan-su-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất file CSV')
  }, [store.data])

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        flex: 0.25,
        minWidth: 240,
        field: 'fullName',
        headerName: 'Nhân sự',
        renderCell: ({ row }: CellType) => {
          const { fullName, email } = row

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {renderClient(row)}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <LinkStyled href='/apps/user/view/account'>{fullName}</LinkStyled>
                <Typography noWrap variant='caption' sx={{ color: 'text.disabled' }}>
                  {email}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {
        flex: 0.2,
        field: 'role',
        minWidth: 160,
        headerName: 'Vai trò',
        renderCell: ({ row }: CellType) => {
          const roleLabel: Record<string, string> = {
            admin: 'Admin',
            accountant: 'Kế toán',
            staff_teacher: 'Nhân viên / Giảng viên'
          }

          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                skin='light'
                sx={{ mr: 3, width: 30, height: 30 }}
                color={userRoleObj[row.role]?.color as ThemeColor}
              >
                <Icon fontSize={18} icon={userRoleObj[row.role]?.icon} />
              </CustomAvatar>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {roleLabel[row.role] || row.role}
              </Typography>
            </Box>
          )
        }
      },
      {
        flex: 0.15,
        minWidth: 220,
        headerName: 'Đăng nhập UIT',
        field: 'username',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography noWrap sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {row.username}
            </Typography>
          )
        }
      },
      {
        flex: 0.15,
        minWidth: 160,
        field: 'taxCode',
        headerName: 'Mã số thuế',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.taxCode}
            </Typography>
          )
        }
      },
      {
        flex: 0.18,
        minWidth: 170,
        field: 'contact',
        headerName: 'Liên hệ',
        renderCell: ({ row }: CellType) => {
          return (
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.contact}
            </Typography>
          )
        }
      },
      {
        flex: 0.1,
        minWidth: 110,
        field: 'status',
        headerName: 'Trạng thái',
        renderCell: ({ row }: CellType) => {
          return <CustomChip rounded skin='light' size='small' label={row.status} color={userStatusObj[row.status]} />
        }
      },
      {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Thao tác',
        renderCell: ({ row }: CellType) => <RowOptions row={row} onEdit={handleOpenEdit} />
      }
    ],
    [handleOpenEdit]
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Card sx={{ mb: 6 }}>
            <TabList
              variant='scrollable'
              scrollButtons='auto'
              onChange={handleTabChange}
              aria-label='user management tabs'
              sx={{ px: 4, pt: 3, pb: 3 }}
            >
              <Tab
                value='users'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                    <Icon icon='bx:user' />
                    Nhân viên
                  </Box>
                }
              />
              <Tab
                value='pit'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                    <Icon icon='bx:calculator' />
                    Thành phần TNCN
                  </Box>
                }
              />
            </TabList>
          </Card>

          <TabPanel value='users' sx={{ p: 0, border: 0, boxShadow: 0, backgroundColor: 'transparent' }}>
            <Card>
              <CardHeader title='Bộ lọc tìm kiếm' />
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item sm={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='role-select'>Chọn vai trò</InputLabel>
                      <Select
                        fullWidth
                        value={role}
                        id='select-role'
                        label='Chọn vai trò'
                        labelId='role-select'
                        onChange={handleRoleChange}
                        inputProps={{ placeholder: 'Chọn vai trò' }}
                      >
                        <MenuItem value=''>Tất cả vai trò</MenuItem>
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='accountant'>Kế toán</MenuItem>
                        <MenuItem value='staff_teacher'>Nhân viên / Giảng viên</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='status-select'>Chọn trạng thái</InputLabel>
                      <Select
                        fullWidth
                        value={status}
                        id='select-status'
                        label='Chọn trạng thái'
                        labelId='status-select'
                        onChange={handleStatusChange}
                        inputProps={{ placeholder: 'Chọn trạng thái' }}
                      >
                        <MenuItem value=''>Tất cả trạng thái</MenuItem>
                        <MenuItem value='active'>Đang hoạt động</MenuItem>
                        <MenuItem value='inactive'>Ngưng hoạt động</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ m: '0 !important' }} />
              <TableHeader
                value={value}
                handleFilter={handleFilter}
                toggle={openCreateDrawer}
                onExport={handleExportUsers}
                disableExport={store.data.length === 0}
              />
              <DataGrid
                autoHeight
                rows={store.data}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Card>
          </TabPanel>

          <TabPanel value='pit' sx={{ p: 0, border: 0, boxShadow: 0, backgroundColor: 'transparent' }}>
            <PitRecordsPanel />
          </TabPanel>
        </TabContext>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={closeDrawer} userToEdit={editingUser} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/apps/users/stats')
  const apiData: CardStatsType['statsHorizontal'] = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList
