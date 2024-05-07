import { BarChart2, Bell, ChevronRight, ChevronsLeft, Files, FolderClosed, LibraryBig, LogOut, MessageSquareMore, MoreHorizontalIcon, Plus, Upload, Users } from "lucide-react";

export const sidebarLinks = [
    {
        label: 'Dashboard',
        icon: BarChart2,
        path: '/dashboard'
    },
    {
        label: 'Users',
        icon: Users,
        path: '/users',
        sublinks: [
            {
                label: 'Users',
                path: '/users'
            },
            {
                label: 'Moderators',
                path: '/moderators'
            }
        ]
    },
]