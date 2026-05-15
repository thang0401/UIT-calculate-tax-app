/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'client') return '/apps/user/view/account'
  else return '/apps/user/list'
}

export default getHomeRoute
