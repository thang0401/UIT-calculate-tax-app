// ** MUI Imports
import Box from '@mui/material/Box'

//import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
//import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'

//import { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import { IconButton } from '@mui/material'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Received Payment',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Received Payment from Paypal'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: 'Received Order from Hotel A',
    avatarText: 'Robert Austin',
    title: 'Received Order'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'Received Order ',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'Received Order from Hotel B'
  },
  {
    meta: '25 May',
    title: 'Received Payment',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order ',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'Received Order from Hotel A'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: 'Received Order from Hotel A',
    avatarImg: '/images/misc/chart.png',
    title: 'Received Order '
  }
]

// const shortcuts: ShortcutsType[] = [
//   {
//     title: 'Calendar',
//     icon: 'bx:calendar',
//     url: '/apps/calendar',
//     subtitle: 'Appointments'
//   },
//   {
//     icon: 'bx:book',
//     title: 'Invoice App',
//     url: '/apps/invoice/list',
//     subtitle: 'Manage Accounts'
//   },
//   {
//     title: 'Users',
//     icon: 'bx:user',
//     url: '/apps/user/list',
//     subtitle: 'Manage Users'
//   },
//   {
//     url: '/apps/roles',
//     icon: 'bx:check-shield',
//     title: 'Role Management',
//     subtitle: 'Permissions'
//   },
//   {
//     url: '/',
//     title: 'Dashboard',
//     subtitle: 'User Dashboard',
//     icon: 'bx:pie-chart-alt-2'
//   },
//   {
//     icon: 'bx:cog',
//     title: 'Settings',
//     subtitle: 'Account Settings',
//     url: '/pages/account-settings/account'
//   },
//   {
//     title: 'Help Center',
//     icon: 'bx:help-circle',
//     url: '/pages/help-center',
//     subtitle: 'FAQs & Articles'
//   },
//   {
//     title: 'Dialogs',
//     icon: 'bx:window-open',
//     subtitle: 'Useful Dialogs',
//     url: '/pages/dialog-examples'
//   }
// ]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const auth = useAuth()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='bx:menu' />
          </IconButton>
        ) : null}
        {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <>
            {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
            <NotificationDropdown settings={settings} notifications={notifications} />
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
