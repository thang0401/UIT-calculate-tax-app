// ** React Imports
import { useEffect, useMemo } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store
import { savePitRecord } from 'src/store/apps/pit'
import { AppDispatch } from 'src/store'
import { PitRecordInput, PitRecordType } from 'src/types/apps/pitTypes'

interface PitEntryDrawerProps {
  open: boolean
  toggle: () => void
  recordToEdit?: PitRecordType | null
}

type PitFormValues = PitRecordInput

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  fullName: yup.string().trim().min(2, 'Nhập họ và tên').required('Nhập họ và tên'),
  taxCode: yup.string().trim().min(10, 'MST tối thiểu 10 ký tự').required('Nhập mã số thuế'),
  quy: yup.number().min(1).max(4).required(),
  nam: yup.number().min(2000).max(2100).required(),
  comTrua: yup.number().min(0).required(),
  phuCapDiLai: yup.number().min(0).required(),
  phuCapCongCu: yup.number().min(0).required(),
  giamTruBanThan: yup.number().min(0).required(),
  soNguoiPhuThuoc: yup.number().min(0).required(),
  soGiamPhuThuoc: yup.number().min(0).required(),
  baoHiem: yup.number().min(0).required()
})

const defaultValues: PitFormValues = {
  fullName: '',
  taxCode: '',
  quy: 1,
  nam: new Date().getFullYear(),
  comTrua: 0,
  phuCapDiLai: 0,
  phuCapCongCu: 0,
  giamTruBanThan: 11_000_000,
  soNguoiPhuThuoc: 0,
  soGiamPhuThuoc: 0,
  baoHiem: 0
}

const parseNumber = (v: string) => {
  const n = Number(String(v).replace(/[^\d]/g, ''))

  return Number.isFinite(n) ? n : 0
}

const formatVnd = (n: number) => `${n.toLocaleString('vi-VN')} đ`

const PitEntryDrawer = ({ open, toggle, recordToEdit = null }: PitEntryDrawerProps) => {
  const isEditMode = Boolean(recordToEdit)
  const dispatch = useDispatch<AppDispatch>()

  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PitFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const comTrua = watch('comTrua')
  const phuCapDiLai = watch('phuCapDiLai')
  const phuCapCongCu = watch('phuCapCongCu')

  const tongMienThue = useMemo(
    () => (Number(comTrua) || 0) + (Number(phuCapDiLai) || 0) + (Number(phuCapCongCu) || 0),
    [comTrua, phuCapDiLai, phuCapCongCu]
  )

  useEffect(() => {
    if (!open) {
      return
    }
    if (recordToEdit) {
      reset({
        fullName: recordToEdit.fullName,
        taxCode: recordToEdit.taxCode,
        quy: recordToEdit.quy,
        nam: recordToEdit.nam,
        comTrua: recordToEdit.comTrua,
        phuCapDiLai: recordToEdit.phuCapDiLai,
        phuCapCongCu: recordToEdit.phuCapCongCu,
        giamTruBanThan: recordToEdit.giamTruBanThan,
        soNguoiPhuThuoc: recordToEdit.soNguoiPhuThuoc,
        soGiamPhuThuoc: recordToEdit.soGiamPhuThuoc,
        baoHiem: recordToEdit.baoHiem ?? 0
      })
    } else {
      reset(defaultValues)
    }
  }, [open, recordToEdit, reset])

  const onSubmit = (values: PitFormValues) => {
    const payload = { ...values, id: recordToEdit?.id }

    void dispatch(savePitRecord(payload))
      .unwrap()
      .then(() => {
        toast.success(isEditMode ? 'Đã cập nhật dòng' : 'Đã thêm dòng')
        toggle()
        reset(defaultValues)
      })
      .catch(() => toast.error('Không lưu được dữ liệu'))
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
    >
      <Header>
        <Typography variant='h6'>{isEditMode ? 'Sửa dòng TNCN' : 'Nhập tay thành phần TNCN'}</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='bx:x' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 4, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='subtitle2' sx={{ mb: 3, fontWeight: 600 }}>
            Thông tin chung
          </Typography>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Họ và tên'
                sx={{ mb: 4 }}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
              />
            )}
          />
          <Controller
            name='taxCode'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Mã số thuế'
                sx={{ mb: 4 }}
                error={Boolean(errors.taxCode)}
                helperText={errors.taxCode?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <FormControl fullWidth>
              <InputLabel id='pit-form-quy'>Quý</InputLabel>
              <Controller
                name='quy'
                control={control}
                render={({ field }) => (
                  <Select {...field} label='Quý' labelId='pit-form-quy'>
                    {[1, 2, 3, 4].map(q => (
                      <MenuItem key={q} value={q}>
                        Quý {q}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name='nam'
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth type='number' label='Năm' onChange={e => field.onChange(parseNumber(e.target.value))} />
              )}
            />
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
            Thu nhập miễn thuế, không tính thuế TNCN
          </Typography>
          <Typography variant='caption' color='text.secondary' sx={{ display: 'block', mb: 3 }}>
            Cơm trưa · Phụ cấp đi lại · Phụ cấp công cụ làm việc
          </Typography>
          {(['comTrua', 'phuCapDiLai', 'phuCapCongCu'] as const).map((name, idx) => {
            const labels = ['Cơm trưa', 'Phụ cấp đi lại', 'Phụ cấp CCDC']

            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='text'
                    inputMode='numeric'
                    label={labels[idx]}
                    sx={{ mb: 4 }}
                    value={field.value ? field.value.toLocaleString('vi-VN') : ''}
                    onChange={e => field.onChange(parseNumber(e.target.value))}
                    error={Boolean(errors[name])}
                  />
                )}
              />
            )
          })}
          <TextField
            fullWidth
            disabled
            label='Cộng'
            value={formatVnd(tongMienThue)}
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 2 }} />
          <Typography variant='subtitle2' sx={{ mb: 3, fontWeight: 600 }}>
            Các khoản giảm trừ được
          </Typography>
          <Controller
            name='giamTruBanThan'
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label='Bản thân'
                sx={{ mb: 4 }}
                value={field.value ? field.value.toLocaleString('vi-VN') : ''}
                onChange={e => field.onChange(parseNumber(e.target.value))}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Controller
              name='soNguoiPhuThuoc'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Số người phụ thuộc'
                  onChange={e => field.onChange(parseNumber(e.target.value))}
                />
              )}
            />
            <Controller
              name='soGiamPhuThuoc'
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Số giảm NPT'
                  value={field.value ? field.value.toLocaleString('vi-VN') : ''}
                  onChange={e => field.onChange(parseNumber(e.target.value))}
                />
              )}
            />
          </Box>
          <Controller
            name='baoHiem'
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label='Bảo hiểm'
                sx={{ mb: 4 }}
                value={field.value ? field.value.toLocaleString('vi-VN') : ''}
                onChange={e => field.onChange(parseNumber(e.target.value))}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {isEditMode ? 'Cập nhật' : 'Thêm dòng'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={toggle}>
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default PitEntryDrawer
