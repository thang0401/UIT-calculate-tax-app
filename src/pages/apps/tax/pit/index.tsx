// ** Next Imports
import { GetServerSideProps } from 'next/types'

const PitPageRedirect = () => null

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/apps/user/list?tab=pit',
      permanent: false
    }
  }
}

PitPageRedirect.acl = {
  action: 'read',
  subject: 'pit-page'
}

export default PitPageRedirect
