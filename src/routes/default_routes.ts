export enum ROUTES {
  HOME = '/',
  WORKSHOPS = '/workshops',
  MY_WORKSHOPS = '/myworkshops',
  MY_CERTIFICATES = '/mycertificates',
  ADD_WORKSHOP = '/workshops/add',
  EDIT_WORKSHOP = '/workshops/edit/:id',
  USERS = '/users',
  EDIT_USER = '/users/edit/:id',
  CERTIFICATES = '/certificates',
  PROFILE = '/profile',
  AUTHENTICATION = '/auth',
}

export const getRoute = {
  editWorkshop: (id: string) => ROUTES.EDIT_WORKSHOP.replace(':id', id),
  editUser: (id: string) => ROUTES.EDIT_USER.replace(':id', id),
};
