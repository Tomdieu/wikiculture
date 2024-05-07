import { BarChart2, Bell, ChevronRight, ChevronsLeft, Files, FolderClosed, LibraryBig, LogOut, MessageSquareMore, MoreHorizontalIcon, Plus, Upload, Users } from "lucide-react";

export const sidebarIcon: Record<string, JSX.Element> = {
    "Dashboard": <BarChart2 size={24} />,
    "Users": <Users />,
    "Moderators": <Plus size={24} />,
    "Articles": <LibraryBig size={24} />,
    "All Articles": <Files />,
    "New Articles": <Plus size={24} />,
    "Media": <FolderClosed />,
    "Upload File": <Upload />,
    "All Files": <Files />,
    "Comments": <MessageSquareMore />,
    "Notifications": <Bell />,
    "Logout": <LogOut />
};
