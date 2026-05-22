// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import PitImportExcelModal from './import/PitImportExcelModal'

interface PitTableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  onAdd?: () => void
  onExport?: () => void
  onImported?: () => void
  disableExport?: boolean
}

const PitTableHeader = ({
  value,
  handleFilter,
  onAdd,
  onExport,
  onImported,
  disableExport = false
}: PitTableHeaderProps) => {
  const [importOpen, setImportOpen] = useState(false)

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 4, rowGap: 2 }}>
          <Button variant='contained' startIcon={<Icon icon='bx:plus' fontSize={20} />} onClick={onAdd}>
            Nhập tay
          </Button>
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
          <Tooltip title={disableExport ? 'Chưa có dữ liệu để xuất' : 'Tải xuống bảng thành phần TNCN (CSV)'}>
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
        <TextField
          size='small'
          value={value}
          sx={{ minWidth: 240 }}
          placeholder='Tìm họ tên / MST'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
      <PitImportExcelModal open={importOpen} onClose={() => setImportOpen(false)} onImported={onImported} />
    </>
  )
}

export default PitTableHeader
