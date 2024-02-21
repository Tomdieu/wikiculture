
type DashboardLayoutProps = {
    children:React.ReactNode
}

export default function DashboardLayout({children}:DashboardLayoutProps){
    return (
      <div className={"w-full h-full"}>
          {children}
      </div>
    );

}