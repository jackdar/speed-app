"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import NotificationItem from "./notification-item";
import { Separator } from "../ui/separator";

const NotificationDropdown = ({ user }: any) => {
    // console.log(user);
    const [notifications, setNotifications] = useState<any>();
    const [userNotifications, setUserNotifications] = useState<any>();

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/moderator`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setNotifications(data);
        }

        fetchNotification();

        const fetchUserNotification = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setUserNotifications(data);
        }

        fetchUserNotification();
    }, []);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <BellIcon className="h-4 w-4 mr-2" />
                        Notifications
                        {notifications != null ? ` (${notifications.length})` : ""}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-90 max-h-[400px] overflow-auto">
                    <div className="grid gap-4 p-4">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        {notifications != null && Object.keys(notifications).reverse().map((index) => (
                            <div key={index}>
                                <NotificationItem notification={notifications[index]} />
                                <Separator />
                            </div>
                        ))}

                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <BellIcon className="h-4 w-4 mr-2" />
                        User Noti
                        {userNotifications != null ? ` (${userNotifications.length})` : ""}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-90 max-h-[400px] overflow-auto">
                    <div className="grid gap-4 p-4">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        {userNotifications != null && Object.keys(userNotifications).reverse().map((index) => (
                            <div key={index}>
                                <NotificationItem notification={userNotifications[index]} />
                                <Separator />
                            </div>
                        ))}

                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function BellIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}

export default NotificationDropdown;