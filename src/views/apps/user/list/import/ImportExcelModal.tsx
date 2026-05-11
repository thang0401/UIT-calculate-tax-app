// ** React Imports
import { useRef, useState, ChangeEvent, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as XLSX from 'xlsx'

import ImportExcelPreview, { ImportPreviewRow } from './ImportExcelPreview'

type Props = {
  open: boolean
  onClose: () => void
}

const TEMPLATE_FILENAME = 'mau-nhap-nhan-su.xlsx'
const TEMPLATE_SHEET = 'NhanSu'

const HEADERS = ['fullName', 'username', 'email', 'taxCode', 'baseSalary', 'phone', 'role', 'status'] as const

const SAMPLE_ROWS: (string | number)[][] = [
  [
    'Nguyễn Văn A',
    'nguyenvana@uit.edu.vn',
    'person@uit.edu.vn',
    '0101234567',
    15000000,
    '0912345678',
    'admin',
    'active'
  ],
  [
    'Trần Thị B',
    'tranthib@uit.edu.vn',
    'mail@uit.edu.vn',
    '0101234568',
    18000000,
    '0909888777',
    'accountant',
    'active'
  ]
]

const ALLOWED_ROLES = ['admin', 'accountant', 'staff_teacher'] as const
const ALLOWED_STATUS = ['active', 'inactive'] as const

function buildTemplateWorkbook() {
  const wb = XLSX.utils.book_new()
  const aoa = [Array.from(HEADERS), ...SAMPLE_ROWS]
  const ws = XLSX.utils.aoa_to_sheet(aoa)
  XLSX.utils.book_append_sheet(wb, ws, TEMPLATE_SHEET)

  return wb
}

function normalizeExcelRow(row: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of HEADERS) {
    const v = row[key]
    out[key] = v !== undefined && v !== null ? String(v).trim() : ''
  }

  return out
}

function workbookToRecords(wb: XLSX.WorkBook): Record<string, string>[] {
  const sheetName = wb.SheetNames[0]
  if (!sheetName) {
    return []
  }
  const sheet = wb.Sheets[sheetName]
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '', raw: false })

  return json.map(r => normalizeExcelRow(r))
}

function validateRow(
  raw: Record<string, string>,
  index: number
): Omit<ImportPreviewRow, 'id'> & { id?: number } {
  const errors: string[] = []
  const fullName = raw.fullName?.trim() ?? ''
  const username = raw.username?.trim() ?? ''
  const email = raw.email?.trim() ?? ''
  const taxCode = raw.taxCode?.trim() ?? ''
  const phone = raw.phone?.trim().replace(/\D/g, '') ?? ''
  const role = raw.role?.trim() ?? ''
  const rowStatus = raw.status?.trim() ?? ''
  const baseSalaryDigits = String(raw.baseSalary ?? '').replace(/\D/g, '')
  const baseSalary = baseSalaryDigits ? Number(baseSalaryDigits) : NaN

  if (fullName.length < 3) {
    errors.push('Họ tên cần ít nhất 3 ký tự')
  }
  if (!username.toLowerCase().endsWith('@uit.edu.vn')) {
    errors.push('Email đăng nhập phải là @uit.edu.vn')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email không hợp lệ')
  }
  if (taxCode.length < 10) {
    errors.push('Mã số thuế cần ít nhất 10 ký tự')
  }
  if (Number.isNaN(baseSalary) || baseSalary <= 0) {
    errors.push('Lương cứng (VNĐ) phải là số > 0')
  }
  if (phone.length < 10) {
    errors.push('Số điện thoại cần ít nhất 10 số')
  }
  if (!ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
    errors.push('Vai trò: admin | accountant | staff_teacher')
  }
  if (!ALLOWED_STATUS.includes(rowStatus as (typeof ALLOWED_STATUS)[number])) {
    errors.push('Trạng thái: active | inactive')
  }

  return {
    id: index + 1,
    fullName,
    username,
    email,
    taxCode,
    baseSalary: Number.isFinite(baseSalary) ? baseSalary : 0,
    phone: raw.phone?.trim() ?? phone,
    role,
    rowStatus: rowStatus === 'inactive' ? 'inactive' : 'active',
    valid: errors.length === 0,
    errors
  }
}

const ImportExcelModal = (props: Props) => {
  const { open, onClose } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewRows, setPreviewRows] = useState<ImportPreviewRow[] | null>(null)
  const [hint, setHint] = useState<string | null>(null)

  const resetState = useCallback(() => {
    setFileName(null)
    setPreviewRows(null)
    setHint(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleClose = () => {
    resetState()
    onClose()
  }

  const downloadTemplate = () => {
    const wb = buildTemplateWorkbook()
    XLSX.writeFile(wb, TEMPLATE_FILENAME)
  }

  const buildPreviewFromParsed = (parsed: Record<string, string>[]): ImportPreviewRow[] =>
    parsed.map((row, i) => {
      const v = validateRow(row, i)

      return { ...v, id: i + 1 } as ImportPreviewRow
    })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) {
      return
    }
    setFileName(file.name)
    const lower = file.name.toLowerCase()

    if (!lower.endsWith('.xlsx') && !lower.endsWith('.xls')) {
      setHint('Chỉ hỗ trợ file Excel (.xlsx, .xls) theo template.')
      setPreviewRows(null)

      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const buf = reader.result
        if (!buf || !(buf instanceof ArrayBuffer)) {
          setHint('Không đọc được nội dung file.')
          setPreviewRows(null)

          return
        }
        const wb = XLSX.read(new Uint8Array(buf), { type: 'array' })
        const records = workbookToRecords(wb)
        if (!records.length) {
          setHint('Không có dòng dữ liệu sau dòng tiêu đề. Kiểm tra tên cột đúng template (.xlsx).')
          setPreviewRows(null)

          return
        }
        setHint(null)
        setPreviewRows(buildPreviewFromParsed(records))
      } catch {
        setHint('Không đọc được file Excel. Kiểm tra file không bị hỏng.')
        setPreviewRows(null)
      }
    }
    reader.onerror = () => {
      setHint('Không đọc được file.')
      setPreviewRows(null)
    }
    reader.readAsArrayBuffer(file)
  }

  const openFilePicker = () => fileInputRef.current?.click()

  const canConfirmImport =
    previewRows !== null &&
    previewRows.length > 0 &&
    previewRows.every(r => r.valid)

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='lg'
      scroll='paper'
      onClose={handleClose}
      aria-labelledby='import-excel-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle
        id='import-excel-dialog-title'
        sx={{
          py: 4,
          px: 6,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box>
          <Typography variant='h5' component='span' sx={{ fontWeight: 600 }}>
            Nhập nhân sự từ Excel
          </Typography>
          <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary', display: 'block', fontWeight: 400 }}>
            Tải template để xem cột bắt buộc, sau đó chọn file để kiểm tra trước khi import.
          </Typography>
        </Box>
        <IconButton size='small' aria-label='Đóng' onClick={handleClose} sx={{ color: 'text.secondary' }}>
          <Icon icon='bx:x' fontSize={24} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ px: 6, py: 6 }}>
        <DialogContentText sx={{ mb: 4, color: 'text.secondary' }}>
          File mẫu là <strong>.xlsx</strong> (sheet đầu tiên). Cột:{' '}
          <strong>
            fullName, username, email, taxCode, baseSalary, phone, role, status
          </strong>{' '}
          (<em>baseSalary</em>: lương cứng VNĐ). Vai trò: admin, accountant, staff_teacher. Trạng thái: active,
          inactive.
        </DialogContentText>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center', mb: 4 }}>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<Icon icon='bx:download' fontSize={20} />}
            onClick={downloadTemplate}
          >
            Tải template mẫu
          </Button>
          <input
            ref={fileInputRef}
            type='file'
            hidden
            accept='.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
            onChange={handleFileChange}
          />
          <Button variant='contained' startIcon={<Icon icon='bx:folder-open' fontSize={20} />} onClick={openFilePicker}>
            Chọn file trên máy
          </Button>
          {fileName && (
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Đã chọn: <strong>{fileName}</strong>
            </Typography>
          )}
        </Box>

        {hint && (
          <Alert severity='info' sx={{ mb: 4 }} onClose={() => setHint(null)}>
            {hint}
          </Alert>
        )}

        {previewRows && previewRows.length > 0 ? (
          <ImportExcelPreview rows={previewRows} />
        ) : (
          !hint && (
            <Alert severity='warning' variant='outlined'>
              Chưa có bản xem trước. Chọn file Excel (.xlsx) đúng template để kiểm tra từng dòng.
            </Alert>
          )
        )}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 6, py: 4, justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant='caption' sx={{ color: 'text.disabled', mr: 'auto' }}>
          Bước xác nhận import sẽ gọi API khi sẵn sàng.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='contained' disabled={!canConfirmImport}>
            Xác nhận import
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ImportExcelModal
