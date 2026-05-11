// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import ImportExcelModal from './import/ImportExcelModal'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  onExport?: () => void
  /** Khi không có bản ghi trên lưới, vô hiệu hóa xuất */
  disableExport?: boolean
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleFilter, toggle, value, onExport, disableExport = false } = props

  const [importOpen, setImportOpen] = useState(false)

  return (
    <>
      <Box
        sx={{ p: 6, gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 4, rowGap: 2 }}>
          <Tooltip title='Mở hộp thoại nhập file theo template'>
            <Button
              color='secondary'
              variant='outlined'
              startIcon={<Icon icon='bx:upload' fontSize={20} />}
              onClick={() => setImportOpen(true)}
            >
              Nhập Excel
            </Button>
          </Tooltip>
          <Tooltip title={disableExport ? 'Chưa có dữ liệu để xuất' : 'Tải xuống danh sách nhân sự hiện tại (CSV)'}>
            <span>
              <Button
                color='secondary'
                variant='outlined'
                startIcon={<Icon icon='bx:download' fontSize={20} />}
                onClick={onExport}
                disabled={disableExport}
              >
                Xuất Excel
              </Button>
            </span>
          </Tooltip>
        </Box>
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size='small'
            value={value}
            placeholder='Tìm nhân sự'
            onChange={e => handleFilter(e.target.value)}
          />

          <Button onClick={toggle} variant='contained'>
            Thêm nhân sự
          </Button>
        </Box>
      </Box>

      <ImportExcelModal open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  )
}

export default TableHeader
