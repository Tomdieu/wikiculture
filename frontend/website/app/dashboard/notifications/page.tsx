"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

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
    <div className="w-full h-full container mx-auto space-y-2">
      <h1 className="text-2xl font-bold">Notifications</h1>
    </div>
  );
};

export default NotificationsPage;
