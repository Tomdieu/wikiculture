import {
  BarChart2,
  Bell,
  Newspaper,
  Book,
  User,
  BookPlus,
  UserCog,
  Files,
  FolderClosed,
  LogOut,
  MessageSquareMore,
  Upload,
  Users,
  Tags,
  Pen,
} from "lucide-react";

const sidebarData = [
  {
    text: "Dashboard",
    icon: BarChart2,
    link: "/dashboard",
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
  {
    text: "Users",
    icon: Users,
    sublinks: [
      {
        text: "Users",
        icon: User,
        link: "/dashboard/users",
        viewOnlyBy: ["Admin", "Moderator"],
      },
      {
        text: "Moderators",
        icon: UserCog,
        link: "/dashboard/users/moderators",
        viewOnlyBy: ["Admin"],
      },
    ],
    viewOnlyBy: ["Admin", "Moderator"],
  },
  {
    text: "Articles",
    icon: Newspaper,
    sublinks: [
      {
        text: "All Articles",
        icon: Book,
        link: "/dashboard/articles",
        viewOnlyBy: ["Admin", "Moderator", "User"],
      },
      {
        text: "New Articles",
        icon: BookPlus,
        link: "/dashboard/articles/new",
        viewOnlyBy: ["Admin", "Moderator", "User"],
      },
      {
        text: "Categories",
        icon: Tags,
        link: "/dashboard/articles/categories",
        viewOnlyBy: ["Admin", "Moderator"],
      },
      {
        text: "Moderate Articles",
        icon: Pen,
        link: "/dashboard/articles/moderate",
        viewOnlyBy: ["Admin", "Moderator"],
      },
    ],
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
  {
    text: "Media",
    icon: FolderClosed,
    sublinks: [
      {
        text: "All Files",
        icon: Files,
        link: "/dashboard/media",
        viewOnlyBy: ["Admin", "Moderator", "User"],
      },
      {
        text: "Upload File",
        icon: Upload,
        link: "/dashboard/media/upload",
        viewOnlyBy: ["Admin", "Moderator", "User"],
      },
    ],
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
  {
    text: "Comments",
    icon: MessageSquareMore,
    link: "/dashboard/comments",
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
  {
    text: "Notifications",
    icon: Bell,
    link: "/dashboard/notifications",
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
  {
    text: "Logout",
    icon: LogOut,
    link: "/logout",
    viewOnlyBy: ["Admin", "Moderator", "User"],
  },
];

const filterSidebarDataByUserType = (userType: string) => {
  return sidebarData
    .filter((item) => item.viewOnlyBy.includes(userType))
    .map((item) => {
      if (item.sublinks) {
        const filteredSublinks = item.sublinks.filter((sublink) =>
          sublink.viewOnlyBy.includes(userType)
        );
        return { ...item, sublinks: filteredSublinks };
      }
      return item;
    });
};
export { filterSidebarDataByUserType };

export default sidebarData;
