import UserList from '../../features/Users/components/UserList/UserList';
import PageHeader from '../../shared/components/PageHeader/PageHeader';

const UsersPage = () => {
  return (
    <>
      <PageHeader title="Users" />
      <UserList />
    </>
  );
};

export default UsersPage;
