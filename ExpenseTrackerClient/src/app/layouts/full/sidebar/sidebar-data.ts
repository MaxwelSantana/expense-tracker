import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Transactions',
  },
  {
    displayName: 'Transactions',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Add Transaction',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
  {
    navCap: 'Budget',
  },
  {
    displayName: 'Budget',
    iconName: 'list',
    route: '/ui-components/budget',
  },
  {
    navCap: 'Settings',
  },
  {
    displayName: 'Settings',
    iconName: 'user-plus',
    route: '/myAccount/settings',
  },
  // {
  //   navCap: 'Ui Components',
  // },
  // {
  //   displayName: 'Badge',
  //   iconName: 'rosette',
  //   route: '/ui-components/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'poker-chip',
  //   route: '/ui-components/chips',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'layout-navbar-expand',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'tooltip',
  //   route: '/ui-components/tooltips',
  // },
  //   {
  //     navCap: 'Auth',
  //   },
  //   {
  //     displayName: 'Login',
  //     iconName: 'lock',
  //     route: '/authentication/login',
  //   },
  //   {
  //     displayName: 'Register',
  //     iconName: 'user-plus',
  //     route: '/authentication/register',
  //   },
  //   {
  //     navCap: 'Extra',
  //   },
  //   {
  //     displayName: 'Icons',
  //     iconName: 'mood-smile',
  //     route: '/extra/icons',
  //   },

];
