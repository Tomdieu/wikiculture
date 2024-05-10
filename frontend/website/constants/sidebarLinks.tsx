import { BarChart2, Bell,Newspaper,Book,User,BookPlus,UserCog, Files, FolderClosed, LogOut, MessageSquareMore, Upload, Users, Tags, Pen } from "lucide-react";

const sidebarData = [
    {
        text: "Dashboard",
        icon: BarChart2,
        link: "/dashboard"
    },
    {
        text: "Users",
        icon: Users,
        sublinks: [
            {
                text: "Users",
                icon: User,
                link: "/dashboard/users"
            },
            {
                text: "Moderators",
                icon: UserCog,
                link: "/dashboard/moderators"
            }
        ]
    },
    {
        text: "Articles",
        icon: Newspaper,
        sublinks: [
            {
                text: "All Articles",
                icon: Book,
                link: "/dashboard/articles"
            },
            {
                text: "New Articles",
                icon: BookPlus,
                link: "/dashboard/articles/new",
            },
            {
                text:"Categories",
                icon:Tags,
                link:"/dashboard/articles/categories/"
            },
            {
                text:"Moderate Articles",
                icon:Pen,
                link:"/dashboard/articles/moderate/"
            }
        ]
    },
    {
        text: "Media",
        icon: FolderClosed,
        sublinks: [
            {
                text: "All Files",
                icon: Files,
                link: "/dashboard/media"
            },
            {
                text: "Upload File",
                icon: Upload,
                link: "/dashboard/media/upload"
            }
        ]
    },
    {
        text: "Comments",
        icon: MessageSquareMore,
        link: "/dashboard/comments"
    },
    {
        text: "Notifications",
        icon: Bell,
        link: "/dashboard/notifications"
    },
    {
        text: "Logout",
        icon: LogOut,
        link: "/logout"
    }
];

export default sidebarData;
