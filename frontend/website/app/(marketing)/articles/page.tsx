import React from 'react'
import Sidebar from './_components/Sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

type Props = {}

const ArticlesPage = (props: Props) => {
  return (
    <ResizablePanelGroup direction="horizontal" className='flex h-full'>
      <ResizablePanel defaultSize={25}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={75}>

        <div>
          Articles
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ArticlesPage