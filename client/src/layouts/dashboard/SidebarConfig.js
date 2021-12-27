import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const isAdmin = (name) => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.user_type === 'admin') {
    return name;
  }
  return '';
}

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: isAdmin('User List'),
    path:  isAdmin('/dashboard/user'),
    icon: isAdmin(getIcon(peopleFill))
  },
];

export default sidebarConfig;
