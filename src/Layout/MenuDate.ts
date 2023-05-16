export const MenuDate = [
  {
    key: "dashboard",
    title: "仪表盘",
    icon: 'panel',
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
  {
    key: "category",
    title: "分类",
    icon: 'site',
    path: "/category",
    permission: "category",
  },
    {
    key: "resource",
    title: "分类资源",
    icon: 'resource',
    path: "/resource",
    permission: "resource",
  },
  {
    key: "system",
    title: "系统",
    icon: 'system',
    path: "/system",
    permission: "system",
    children: [
      {
        key: "user",
        title: "用户",
        icon: 'meitiku',
        path: "/user",
        permission: "user-management",
      },
      {
        key: "role",
        title: "角色",
        icon: 'meitiku',
        path: "/role",
        permission: "role-management",
      }
    ],
  },
];
