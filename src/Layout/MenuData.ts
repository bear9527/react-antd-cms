
export const MenuData = [
  {
    key: "dashboard",
    title: "仪表盘",
    icon: "panel",
    path: "/dashboard",
    permission: "dashboard",
  },
  // {
  //   key: "home",
  //   title: "首页",
  //   icon: 'site',
  //   path: "/home",
  //   permission: "home",
  // },
  // {
  //   key: "category",
  //   title: "分类",
  //   icon: 'site',
  //   path: "/category",
  //   permission: "category",
  // },

  {
    key: "category",
    title: "分类",
    icon: "site",
    path: "/category",
    permission: "category",
    children: [
      // {
      //   key: "user",
      //   title: "用户",
      //   icon: 'meitiku',
      //   path: "/user",
      //   permission: "user-management",
      // },
      // {
      //   key: "role",
      //   title: "角色",
      //   icon: 'meitiku',
      //   path: "/role",
      //   permission: "role-management",
      // }
    ],
  },
  {
    key: "resource",
    title: "资源管理",
    icon: "resource",
    path: "/resource",
    permission: "resource",
  },
  {
    key: "system",
    title: "系统",
    icon: "system",
    path: "/system",
    permission: "system",
    children: [
      {
        key: "user",
        title: "用户",
        icon: "meitiku",
        path: "/user",
        permission: "user-management",
      },
      {
        key: "role",
        title: "角色",
        icon: "meitiku",
        path: "/role",
        permission: "role-management",
      },
    ],
  },
];
