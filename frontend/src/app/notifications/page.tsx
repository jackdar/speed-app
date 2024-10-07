"use client";

import React, { useEffect, useState } from "react";
import { AdminNotifcation } from "../types/notification/admin-notification";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<AdminNotifcation>(
    {} as AdminNotifcation
  );
  useEffect(() => {
    const fetchNoti = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/moderator`
      );
      const data = await response.json();
      setNotifications(data);
    };

    fetchNoti();
  }, []);

  return (
    <>
      <h1>Notification Page</h1>
      {notifications !== null &&
        Object.keys(notifications).map((notification, index) => (
          <p key={index}>{notification}</p>
        ))}
    </>
  );
};

export default NotificationPage;
