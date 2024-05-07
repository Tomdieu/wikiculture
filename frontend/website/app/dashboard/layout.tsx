import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import AdminHeader from "@/components/admin-header";

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
            <ResizablePanel defaultSize={25} maxSize={28} minSize={18}>
                <div className="flex h-full flex-col">
                    <Sidebar />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full flex-col">
                    <AdminHeader/>
                    {children}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );

}