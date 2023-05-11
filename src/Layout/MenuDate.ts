
export const MenuDate = [
  {
    key: "dashboard",
    title: "仪表盘",
    icon: 'panel',
    path: "/dashboard",
    permission: "dashboard",
  },
  {
    key: "home",
    title: "首页",
    icon: 'site',
    path: "/home",
    permission: "home",
  },
  {
    key: "category",
    title: "分类",
    icon: 'site',
    path: "/category",
    permission: "category",
  },
  {
    key: "about",
    title: "关于",
    icon: 'system',
    path: "/about",
    permission: "about",
    children: [
      {
        key: "user",
        title: "用户",
        path: "/user",
        permission: "user-management",
      },
      {
        key: "role",
        title: "角色",
        path: "/role",
        permission: "role-management",
      }
    ],
  },
];
