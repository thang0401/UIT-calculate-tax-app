// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'

export type ImportPreviewRow = {
  id: number
  fullName: string
  username: string
  email: string
  taxCode: string
  baseSalary: number
  phone: string
  role: string
  rowStatus: 'active' | 'inactive'
  valid: boolean
  errors: string[]
}

interface ImportExcelPreviewProps {
  rows: ImportPreviewRow[]
}

const roleLabel: Record<string, string> = {
  admin: 'Admin',
  accountant: 'Kế toán',
  staff_teacher: 'Nhân viên / GV'
}

const ImportExcelPreview = (props: ImportExcelPreviewProps) => {
  const { rows } = props

  const validCount = rows.filter(r => r.valid).length
  const invalidCount = rows.length - validCount

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Tổng dòng: <strong>{rows.length}</strong>
        </Typography>
        <Typography variant='body2' sx={{ color: 'success.main' }}>
          Hợp lệ: <strong>{validCount}</strong>
        </Typography>
        <Typography variant='body2' sx={{ color: 'error.main' }}>
          Không hợp lệ: <strong>{invalidCount}</strong>
        </Typography>
      </Box>
      <Card sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 360 }}>
          <Table size='small' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>STT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Họ và tên</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email UIT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Mã số thuế</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Lương cứng</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>SĐT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>TT (file)</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Kiểm tra</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ghi chú lỗi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    bgcolor: row.valid ? 'transparent' : 'action.hover'
                  }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.taxCode}</TableCell>
                  <TableCell>
                    {Number.isFinite(row.baseSalary)
                      ? row.baseSalary.toLocaleString('vi-VN')
                      : '—'}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{roleLabel[row.role] || row.role}</TableCell>
                  <TableCell>{row.rowStatus}</TableCell>
                  <TableCell>
                    {row.valid ? (
                      <Chip size='small' color='success' label='Hợp lệ' variant='outlined' />
                    ) : (
                      <Chip size='small' color='error' label='Lỗi' variant='outlined' />
                    )}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 220 }}>
                    {row.errors.length ? (
                      <Typography variant='caption' sx={{ color: 'error.main', display: 'block' }}>
                        {row.errors.join(' · ')}
                      </Typography>
                    ) : (
                      <Typography variant='caption' color='text.disabled'>
                        —
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default ImportExcelPreview
