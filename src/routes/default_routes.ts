export enum ROUTES {
  HOME = '/',
  WORKSHOPS = '/workshops',
  ADD_WORKSHOP = '/workshops/add',
  EDIT_WORKSHOP = '/workshops/edit/:id',
  USERS = '/users',
  CERTIFICATES = '/certificates',
  PROFILE = '/profile',
  AUTHENTICATION = '/auth',
}

export const getRoute = {
  editWorkshop: (id: string) => ROUTES.EDIT_WORKSHOP.replace(':id', id),
};
