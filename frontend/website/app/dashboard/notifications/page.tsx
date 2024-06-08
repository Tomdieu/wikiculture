"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import Notifications from "./_components/Notifications";

type Props = {};

const NotificationsPage = (props: Props) => {
//   const [ws, setWs] = useState<WebSocket>();
  const { data } = useSession();
  const webSocket = useRef<WebSocket>();
  useEffect(() => {
    if (data) {
      webSocket.current = new WebSocket(
        `ws://${process.env.NEXT_PUBLIC_WS_NOTIFICATION}/ws/notifications/${data.user.id}/?token=${data.user.token}`
      );
      // setWs(new WebSocket(`ws://${process.env.NEXT_PUBLIC_WS_NOTIFICATION}/ws/notifications/${data.user.id}/?token=${data.user.token}`))
    }
  }, [data]);
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Notifications</h1>
      </div>
        <Notifications/>
    </div>
  );
};

export default NotificationsPage;
