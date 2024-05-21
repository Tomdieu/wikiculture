import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AdminHeader from "@/components/admin-header";
import ArticleVersionModel from "@/components/models/article-versions";

export const metadata: Metadata = {
    title: "Dashboard",
    description:"Dashboard"
}

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen max-h-screen w-screen rounded-lg border"
        >
            <ResizablePanel defaultSize={25} maxSize={28} minSize={15} className="hidden md:block">
                <div className="flex h-full flex-col">
                    <Sidebar />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden md:flex"/>
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full flex-col overflow-y-auto w-full">
                    <AdminHeader className="sticky top-0 z-50 bg-white dark:bg-stone-950 w-full"/>
                    <ArticleVersionModel/>
                    {children}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );

}