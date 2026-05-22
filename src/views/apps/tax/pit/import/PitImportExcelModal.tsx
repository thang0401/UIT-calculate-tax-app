// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

type Props = {
  open: boolean
  onClose: () => void
  onImported?: () => void
}

const PitImportExcelModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Nhập thành phần TNCN từ Excel</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Template gồm các cột: họ tên, MST, quý, năm, khoản miễn thuế (cơm trưa, phụ cấp…), thu nhập chịu thuế,
          giảm trừ (bản thân, người phụ thuộc, bảo hiểm).
        </DialogContentText>
        <Typography variant='body2' color='text.secondary'>
          Tính năng import đầy đủ sẽ được bổ sung sau — hiện dùng dữ liệu mẫu từ fake API.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PitImportExcelModal
