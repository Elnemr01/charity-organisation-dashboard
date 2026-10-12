import { HandCoinsIcon, Home, Layers2, Settings, Store, User, Wallet, Wallet2 } from "lucide-react";

export const sidebarBtns = [
    {
      label: 'الرئيسيه',
      icon: Home,
      href: '/',
      isParent: false,
    },
    {
      label: 'التبرعات',
      icon: HandCoinsIcon,
      isParent: false,
      href: '/donations'
    },
    {
      label: 'المتبرعين',
      icon: User,
      isParent: false,
      href: '/doners'
    },
    {
      label: 'المخازن',
      icon: Store,
      isParent: true,
      children: [
        {
          label: 'العينيات',
          href: '/banks/products',
          icon: Wallet2
        },
        {
          label: 'الماليات',
          href: '/banks/money',
          icon: Wallet
        }
      ]
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
        },
        {
          label: 'مصاريف جدول الانفاق',
          href: '/family-expense',
          icon: HandCoinsIcon
        }
      ]
    }
  ]