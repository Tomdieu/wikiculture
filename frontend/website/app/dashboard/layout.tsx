import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export const metadata: Metadata = {
    title: "Dashboard"
}

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen w-screen rounded-lg border"
        >
            <ResizablePanel defaultSize={25} className="min-w-[300px] max-w-md">
                <div className="flex h-full flex-col">
                    {/* <span className="font-semibold">Sidebar</span> */}
                    <Sidebar />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <div className="flex h-full flex-col p-6">
                    {/* <span className="font-semibold">Content</span> */}
                    {children}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );

}