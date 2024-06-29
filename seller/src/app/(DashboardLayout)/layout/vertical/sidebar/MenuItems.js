import { uniqueId } from 'lodash';

import {
  IconFiretruck,
  IconHistoryToggle,
  IconDesk,
  IconBuildingStore,
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconBuildingStore,
    href: '/',
  },

  {
    navlabel: true,
    subheader: 'Product Management',
  },
  {
    id: uniqueId(),
    title: 'Products',
    icon: IconDesk,
    href: '/products',
    chip: '9',
    chipColor: 'primary',
  },

  {
    id: uniqueId(),
    title: 'Acquire Products',
    icon: IconFiretruck,
    href: '/acquireProducts',
  },

  {
    id: uniqueId(),
    title: 'Payment History',
    icon: IconHistoryToggle,
    href: '',
  },
];

export default Menuitems;
