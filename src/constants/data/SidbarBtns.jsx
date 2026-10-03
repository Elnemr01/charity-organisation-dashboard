import { Home, Layers2, Settings } from "lucide-react";

export const sidebarBtns = [
    {
      label: 'الرئيسيه',
      icon: Home,
      href: '/',
      isParent: false,
    },
    {
      label: 'الاعدادات',
      icon: Settings,
      isParent: true,
      children: [
        {
          label: 'التصنيفات',
          href: '/categories',
          icon: Layers2
        }
      ]
    }
  ]