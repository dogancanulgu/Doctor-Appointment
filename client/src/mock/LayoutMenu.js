export const userMenu = [
  {
    name: 'Home',
    path: '/',
    icon: 'ri-home-line',
  },
  {
    name: 'Appointments',
    path: '/appointments',
    icon: 'ri-file-list-line',
  },
  {
    name: 'Apply Doctor',
    path: '/apply-doctor',
    icon: 'ri-hospital-line',
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: 'ri-user-line',
  },
];

export const doctorMenu = (user) => {
  return [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'ri-user-line',
    },
  ];
};

export const adminMenu = [
  {
    name: 'Home',
    path: '/',
    icon: 'ri-home-line',
  },
  {
    name: 'Users',
    path: '/admin/userslist',
    icon: 'ri-user-line',
  },
  {
    name: 'Doctors',
    path: '/admin/doctorslist',
    icon: 'ri-user-star-line',
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: 'ri-user-line',
  },
];
