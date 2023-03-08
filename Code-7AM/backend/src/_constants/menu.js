import {
    Home,
    Box,
    Clipboard,
    DollarSign,
    UserPlus,
    BarChart,
    Settings,
    Archive,
    LogOut
} from 'react-feather';

export const MENUITEMS = [
    { path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', active: true },
    {
        title: 'Masters', icon: Clipboard, type: 'sub', active: false, children: [
            { path: '/masters/brandlogo', title: 'BrandLogo', type: 'link' },
            { path: '/masters/category', title: 'Category', type: 'link' },
            { path: '/masters/color', title: 'Color', type: 'link' },
            { path: '/masters/tag', title: 'Tag', type: 'link' },
            { path: '/masters/size', title: 'Size', type: 'link' },
            { path: '/masters/usertype', title: 'UserType', type: 'link' }
        ]
    },
    {
        title: 'Products', icon: Box, type: 'sub', active: false, children: [
            {
                title: 'Physical', type: 'sub', children: [
                    { path: '/products/physical/product-list', title: 'Product List', type: 'link' },
                    { path: '/products/physical/add-product', title: 'Add Product', type: 'link' }
                ]
            }
        ]
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            { path: '/sales/transactions', title: 'Transactions', type: 'link' }
        ]
    },
    {
        title: 'Users', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/users/list-user', title: 'User List', type: 'link' },
            { path: '/users/add-user', title: 'Add User', type: 'link' }
        ]
    },
    {
        title: 'Settings', icon: Settings, type: 'sub', active: false, children: [
            { path: '/settings/profile', title: 'Profile', type: 'link' }
        ]
    },
    { path: '/reports', title: 'Reports', icon: BarChart, type: 'link', active: false },
    { path: '/invoice', title: 'Invoice', icon: Archive, type: 'link', active: false },
    { path: '/auth/login', title: 'Logout', icon: LogOut, type: 'link', active: false }
];

