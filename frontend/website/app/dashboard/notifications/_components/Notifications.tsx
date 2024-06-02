"use client"
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import Notification from "./Notification"
import { getNotifications } from '@/actions/notifications';
import NotificationPagination from './NotificationPagination'


type Props = {}

const Notifications = (props: Props) => {

  const searchParams = useSearchParams()

  const page = searchParams.get("page") || "1";

  const { isLoading, data, isError,error } = useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getNotifications(page)
  })

  console.log(error)

  if (isLoading) {
    return (
      <div className="flex space-y-2 flex-col">
        {Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="w-full h-10" />)}
      </div>
    )
  }

  if (isError) {
    return (
      <p>Something went wrong</p>
    )
  }

  if (data && data.results) {
    return (
      <div className='space-y-2 mb-5'>
        {data.results.map((notification, index) => <Notification key={index} notification={notification} index={index} />)}
        {data && (
          <NotificationPagination notificationPagination={data}/>
        )}
        <div className='h-10'></div>
      </div>
    )
  }

  return null;


}

export default Notifications