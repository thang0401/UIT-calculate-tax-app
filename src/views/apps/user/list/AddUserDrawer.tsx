// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser, updateUser } from 'src/store/apps/user'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  userToEdit?: UsersType | null
}

interface UserData {
  email: string
  phone: string
  taxCode: string
  fullName: string
  username: string
  status: 'active' | 'inactive'
  /** Lương cứng VNĐ — dùng cho tính thuế, không hiển thị trên bảng */
  baseSalary: number
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `Vui lòng nhập ${field.toLowerCase()}`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} phải có ít nhất ${min} ký tự`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup
    .string()
    .min(10, obj => showErrors('Số điện thoại', obj.value.length, obj.min))
    .required(),
  fullName: yup
    .string()
    .min(3, obj => showErrors('Họ và tên', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .matches(/@uit\.edu\.vn$/i, 'Email đăng nhập phải kết thúc bằng @uit.edu.vn')
    .required(),
  taxCode: yup
    .string()
    .min(10, obj => showErrors('Mã số thuế', obj.value.length, obj.min))
    .required(),
  baseSalary: yup
    .number()
    .transform((v, orig) => (orig === '' || orig === null || orig === undefined ? undefined : v))
    .typeError('Nhập lương cứng (VNĐ)')
    .min(1, 'Lương cứng phải lớn hơn 0 để phục vụ tính thuế')
    .required('Vui lòng nhập lương cứng'),
  status: yup.string().oneOf(['active', 'inactive']).required()
})

const defaultValues: UserData = {
  email: '',
  fullName: '',
  username: '',
  taxCode: '',
  phone: '',
  status: 'active',
  baseSalary: 0
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, userToEdit = null } = props
  const isEditMode = Boolean(userToEdit)

  // ** State
  const [role, setRole] = useState<string>('admin')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!open) {
      return
    }
    if (userToEdit) {
      reset({
        fullName: userToEdit.fullName,
        username: userToEdit.username,
        email: userToEdit.email,
        taxCode: userToEdit.taxCode ?? '',
        phone: String(userToEdit.contact ?? ''),
        status: userToEdit.status === 'inactive' ? 'inactive' : 'active',
        baseSalary: typeof userToEdit.baseSalary === 'number' ? userToEdit.baseSalary : 0
      })
      setRole(userToEdit.role || 'admin')
    } else {
      reset(defaultValues)
      setRole('admin')
    }
  }, [open, userToEdit?.id, reset, userToEdit])

  const onSubmit = (data: UserData) => {
    const excludeId = userToEdit?.id
    const emailTaken = store.allData.some((u: UsersType) => u.id !== excludeId && u.email === data.email)
    const usernameTaken = store.allData.some((u: UsersType) => u.id !== excludeId && u.username === data.username)

    if (emailTaken) {
      setError('email', { message: 'Email đã tồn tại!' })
    }
    if (usernameTaken) {
      setError('username', { message: 'Tài khoản đăng nhập đã tồn tại!' })
    }
    if (emailTaken || usernameTaken) {
      return
    }

    const savePromise = userToEdit
      ? dispatch(
          updateUser({
            id: userToEdit.id,
            data: {
              fullName: data.fullName,
              email: data.email,
              username: data.username,
              taxCode: data.taxCode,
              contact: data.phone,
              password: data.taxCode,
              role,
              status: data.status,
              baseSalary: data.baseSalary
            }
          })
        ).unwrap()
      : dispatch(
          addUser({
            ...data,
            contact: data.phone,
            password: data.taxCode,
            role,
            billing: '',
            company: '',
            country: '',
            currentPlan: 'basic',
            baseSalary: data.baseSalary
          })
        ).unwrap()

    void savePromise
      .then(() => {
        toast.success(userToEdit ? 'Đã cập nhật thông tin nhân sự' : 'Đã thêm nhân sự')
        toggle()
        reset(defaultValues)
        setRole('admin')
      })
      .catch(() => {
        toast.error(userToEdit ? 'Cập nhật thất bại. Vui lòng thử lại.' : 'Thêm nhân sự thất bại. Vui lòng thử lại.')
      })
  }

  const handleClose = () => {
    setRole('admin')
    reset(defaultValues)
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{isEditMode ? 'Cập nhật nhân viên' : 'Thêm nhân sự'}</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='fullName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Họ và tên'
                  onChange={onChange}
                  placeholder='Nguyễn Văn A'
                  error={Boolean(errors.fullName)}
                />
              )}
            />
            {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Đăng nhập (email UIT)'
                  onChange={onChange}
                  placeholder='nguyenvana@uit.edu.vn'
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='taxCode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Mã số thuế'
                  onChange={onChange}
                  placeholder='0312345678'
                  error={Boolean(errors.taxCode)}
                />
              )}
            />
            {errors.taxCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.taxCode.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='baseSalary'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur, ref } }) => (
                <TextField
                  inputRef={ref}
                  type='number'
                  value={value === 0 || value === undefined ? '' : value}
                  onChange={e => {
                    const v = e.target.value
                    onChange(v === '' ? 0 : Number(v))
                  }}
                  onBlur={onBlur}
                  label='Lương cứng (VNĐ)'
                  placeholder='15000000'
                  error={Boolean(errors.baseSalary)}
                  inputProps={{ min: 0, step: 1000 }}
                />
              )}
            />
            {errors.baseSalary && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.baseSalary.message}</FormHelperText>
            )}
            <FormHelperText sx={{ color: 'text.secondary' }}>
              Dùng cho tính thuế TNCN — chỉ nhập trên form, không hiển thị trên bảng danh sách.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='thangnc@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='phone'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Số điện thoại'
                  onChange={onChange}
                  placeholder='0912345678'
                  error={Boolean(errors.phone)}
                />
              )}
            />
            {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
          </FormControl>
          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel
              id='validation-billing-select'
              error={Boolean(errors.billing)}
              htmlFor='validation-billing-select'
            >
              Thanh toán
            </InputLabel>
            <Controller
              name='billing'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Thanh toán'
                  onChange={onChange}
                  error={Boolean(errors.billing)}
                  labelId='validation-billing-select'
                  aria-describedby='validation-billing-select'
                >
                  <MenuItem value=''>Thanh toán</MenuItem>
                  <MenuItem value='Auto Debit'>Tự động trừ tiền</MenuItem>
                  <MenuItem value='Manual - Cash'>Thủ công - Tiền mặt</MenuItem>
                  <MenuItem value='Manual - Paypal'>Thủ công - Paypal</MenuItem>
                  <MenuItem value='Manual - Credit Card'>Thủ công - Thẻ tín dụng</MenuItem>
                </Select>
              )}
            />
            {errors.billing && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-billing-select'>
                Trường này là bắt buộc
              </FormHelperText>
            )}
          </FormControl> */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Chọn vai trò</InputLabel>
            <Select
              fullWidth
              value={role}
              id='select-role'
              label='Chọn vai trò'
              labelId='role-select'
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Chọn vai trò' }}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='accountant'>Kế toán</MenuItem>
              <MenuItem value='staff_teacher'>Nhân viên / Giảng viên</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='status-select'>Trạng thái</InputLabel>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  id='select-status'
                  label='Trạng thái'
                  labelId='status-select'
                  onChange={onChange}
                  error={Boolean(errors.status)}
                >
                  <MenuItem value='active'>Đang hoạt động</MenuItem>
                  <MenuItem value='inactive'>Ngưng hoạt động</MenuItem>
                </Select>
              )}
            />
            {errors.status && <FormHelperText sx={{ color: 'error.main' }}>{errors.status.message}</FormHelperText>}
          </FormControl>
          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>Chọn gói</InputLabel>
            <Select
              fullWidth
              value={plan}
              id='select-plan'
              label='Chọn gói'
              labelId='plan-select'
              onChange={e => setPlan(e.target.value)}
              inputProps={{ placeholder: 'Chọn gói' }}
            >
              <MenuItem value='basic'>Cơ bản</MenuItem>
              <MenuItem value='company'>Doanh nghiệp</MenuItem>
              <MenuItem value='enterprise'>Tập đoàn</MenuItem>
              <MenuItem value='team'>Nhóm</MenuItem>
            </Select>
          </FormControl> */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {isEditMode ? 'Cập nhật' : 'Lưu'}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
