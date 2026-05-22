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
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import axios from 'axios'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

import ImportExcelPreview, { ImportPreviewRow } from './ImportExcelPreview'

type Props = {
  open: boolean
  onClose: () => void
  onImported?: () => void
}

const TEMPLATE_FILENAME = 'mau-nhap-bang-thu-nhap.xlsx'
const TEMPLATE_SHEET = 'ThuNhap'

const HEADERS = [
  'stt',
  'fullName',
  'taxCode',
  'tenKhoanTien',
  'workingDays',
  'amount',
  'paymentDate',
  'note'
] as const

type HeaderKey = (typeof HEADERS)[number]

const COLUMN_MAP: Record<string, HeaderKey> = {
  stt: 'stt',
  'họ tên': 'fullName',
  'ho ten': 'fullName',
  fullname: 'fullName',
  'mã số thuế': 'taxCode',
  'ma so thue': 'taxCode',
  taxcode: 'taxCode',
  'tên khoản tiền': 'tenKhoanTien',
  'ten khoan tien': 'tenKhoanTien',
  tenkhoantien: 'tenKhoanTien',
  'nội dung': 'tenKhoanTien',
  'ngày công': 'workingDays',
  'ngay cong': 'workingDays',
  workingdays: 'workingDays',
  'số tiền': 'amount',
  'so tien': 'amount',
  amount: 'amount',
  ngày: 'paymentDate',
  ngay: 'paymentDate',
  paymentdate: 'paymentDate',
  'ghi chú': 'note',
  'ghi chu': 'note',
  note: 'note'
}

const SAMPLE_ROWS: (string | number)[][] = [
  [1, 'Lê Văn B', '1245000001', 'Chi lương tháng 1', 26, 4500000, '04/01/2026', ''],
  [2, 'Lương Văn C', '1245000002', 'Chi lương tháng 1', 26, 5000000, '', '']
]

const DATE_PATTERN = /^\d{1,2}\/\d{1,2}\/\d{4}$/

function buildTemplateWorkbook() {
  const wb = XLSX.utils.book_new()
  const aoa = [Array.from(HEADERS), ...SAMPLE_ROWS]
  const ws = XLSX.utils.aoa_to_sheet(aoa)
  XLSX.utils.book_append_sheet(wb, ws, TEMPLATE_SHEET)

  return wb
}

function resolveHeaderKey(rawKey: string): HeaderKey | null {
  const trimmed = rawKey.trim()
  if (HEADERS.includes(trimmed as HeaderKey)) {
    return trimmed as HeaderKey
  }

  return COLUMN_MAP[trimmed.toLowerCase()] ?? null
}

function normalizeExcelRow(row: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of HEADERS) {
    out[key] = ''
  }

  for (const [rawKey, value] of Object.entries(row)) {
    const mapped = resolveHeaderKey(rawKey)
    if (mapped) {
      out[mapped] = value !== undefined && value !== null ? String(value).trim() : ''
    }
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

function parseOptionalInt(value: string): number | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) {
    return null
  }
  const n = parseInt(digits, 10)

  return Number.isNaN(n) ? null : n
}

function validateRow(raw: Record<string, string>, index: number): ImportPreviewRow {
  const errors: string[] = []
  const fullName = raw.fullName?.trim() ?? ''
  const taxCode = raw.taxCode?.trim() ?? ''
  const tenKhoanTien = raw.tenKhoanTien?.trim() ?? ''
  const note = raw.note?.trim() ?? ''
  const paymentDateRaw = raw.paymentDate?.trim() ?? ''
  const paymentDate = paymentDateRaw || null

  const sttParsed = parseOptionalInt(raw.stt ?? '')
  const stt = raw.stt?.trim() === '' ? null : sttParsed

  const workingDaysParsed = parseOptionalInt(raw.workingDays ?? '')
  const workingDays = raw.workingDays?.trim() === '' ? null : workingDaysParsed

  const amountDigits = String(raw.amount ?? '').replace(/\D/g, '')
  const amount = amountDigits ? Number(amountDigits) : NaN

  if (raw.stt?.trim() && stt === null) {
    errors.push('STT phải là số nguyên dương hoặc để trống')
  }
  if (fullName.length < 2) {
    errors.push('Họ tên cần ít nhất 2 ký tự')
  }
  if (taxCode.length < 10) {
    errors.push('Mã số thuế cần ít nhất 10 ký tự')
  }
  if (!tenKhoanTien) {
    errors.push('Tên khoản tiền không được để trống')
  }
  if (raw.workingDays?.trim() && workingDays === null) {
    errors.push('Ngày công phải là số hoặc để trống')
  }
  if (Number.isNaN(amount) || amount <= 0) {
    errors.push('Số tiền phải là số > 0')
  }
  if (paymentDate && !DATE_PATTERN.test(paymentDate)) {
    errors.push('Ngày chi trả định dạng dd/MM/yyyy')
  }

  return {
    id: index + 1,
    stt,
    fullName,
    taxCode,
    tenKhoanTien,
    workingDays,
    amount: Number.isFinite(amount) ? amount : 0,
    paymentDate,
    note,
    valid: errors.length === 0,
    errors
  }
}

const ImportExcelModal = (props: Props) => {
  const { open, onClose, onImported } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [previewRows, setPreviewRows] = useState<ImportPreviewRow[] | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)

  const resetState = useCallback(() => {
    setFileName(null)
    setPreviewRows(null)
    setHint(null)
    setImporting(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleClose = () => {
    if (importing) {
      return
    }
    resetState()
    onClose()
  }

  const downloadTemplate = () => {
    const wb = buildTemplateWorkbook()
    XLSX.writeFile(wb, TEMPLATE_FILENAME)
  }

  const buildPreviewFromParsed = (parsed: Record<string, string>[]): ImportPreviewRow[] =>
    parsed.map((row, i) => validateRow(row, i))

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
    previewRows !== null && previewRows.length > 0 && previewRows.every(r => r.valid)

  const handleConfirmImport = async () => {
    if (!canConfirmImport || !previewRows) {
      return
    }

    setImporting(true)
    try {
      const rows = previewRows.map(r => ({
        stt: r.stt,
        fullName: r.fullName,
        taxCode: r.taxCode,
        tenKhoanTien: r.tenKhoanTien,
        workingDays: r.workingDays,
        amount: r.amount,
        paymentDate: r.paymentDate,
        note: r.note
      }))
      const res = await axios.post<{ imported: number }>('/apps/invoice/import', { rows })
      toast.success(`Đã import ${res.data.imported} dòng thu nhập`)
      onImported?.()
      resetState()
      onClose()
    } catch {
      toast.error('Import thất bại. Vui lòng thử lại.')
    } finally {
      setImporting(false)
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='lg'
      scroll='paper'
      onClose={handleClose}
      aria-labelledby='import-income-excel-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle
        id='import-income-excel-dialog-title'
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
            Nhập bảng thu nhập từ Excel
          </Typography>
          <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary', display: 'block', fontWeight: 400 }}>
            Tải template để xem cột bắt buộc, sau đó chọn file để kiểm tra trước khi import.
          </Typography>
        </Box>
        <IconButton size='small' aria-label='Đóng' onClick={handleClose} disabled={importing} sx={{ color: 'text.secondary' }}>
          <Icon icon='bx:x' fontSize={24} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ px: 6, py: 6 }}>
        <DialogContentText sx={{ mb: 4, color: 'text.secondary' }}>
          File mẫu là <strong>.xlsx</strong> (sheet đầu tiên). Cột (tiếng Anh hoặc tiếng Việt):{' '}
          <strong>
            stt, fullName, taxCode, tenKhoanTien, workingDays, amount, paymentDate, note
          </strong>
          . <em>stt</em> và <em>ngày công</em> có thể để trống (vd. dòng thưởng). <em>amount</em>: số tiền VNĐ.{' '}
          <em>paymentDate</em>: dd/MM/yyyy.
        </DialogContentText>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center', mb: 4 }}>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<Icon icon='bx:download' fontSize={20} />}
            onClick={downloadTemplate}
            disabled={importing}
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
          <Button
            variant='contained'
            disabled={importing}
            startIcon={<Icon icon='bx:folder-open' fontSize={20} />}
            onClick={openFilePicker}
          >
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
          Chỉ import khi tất cả dòng đều hợp lệ.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='outlined' color='secondary' onClick={handleClose} disabled={importing}>
            Đóng
          </Button>
          <Button
            variant='contained'
            disabled={!canConfirmImport || importing}
            onClick={handleConfirmImport}
            startIcon={importing ? <CircularProgress size={18} color='inherit' /> : undefined}
          >
            {importing ? 'Đang import...' : 'Xác nhận import'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ImportExcelModal
