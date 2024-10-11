"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import NotificationItem from "./notification-item";
import { Separator } from "../ui/separator";
import { AdminNotifcation } from "@/app/types/notification/admin-notification";
import { UserNotification } from "@/app/types/notification/user-notification";
import { AuthUser } from "@/app/hooks/useAuth";

interface UserProps {
    user: AuthUser
}

const NotificationDropdown = ({user}: UserProps) => {
    // console.log(user);
    const [queueNotifications, setQueueNotifications] = useState<AdminNotifcation[]>([]);
    const [userNotifications, setUserNotifications] = useState<UserNotification[]>([]);

    useEffect(() => {
        const fetchRoleNotification = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/queue`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setQueueNotifications(data.reverse());
        }

        fetchRoleNotification();

        const fetchUserNotification = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            console.log(data.reverse());
            setUserNotifications(data);
        }

        fetchUserNotification();

    }, []);
    return (
        <div>
            {user.role == "admin" || user.role == "moderator" || user.role == "analyst" ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <BellIcon className="h-4 w-4 mr-2" />
                            Article Queue
                            {queueNotifications.length ? ` (${queueNotifications.length})` : ""}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-90 max-h-[400px] overflow-auto">
                        <div className="grid gap-4 p-4">
                            <h4 className="font-medium leading-none">Article Queue</h4>
                            {queueNotifications.length != 0 ? queueNotifications.map((notification, index) => (
                                <div key={index}>
                                    <NotificationItem notification={notification} />
                                <Separator />
                            </div>
                            )): (
                                <p className="text-sm">No Articles in Queue</p>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ): ""}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <BellIcon className="h-4 w-4 mr-2" />
                        Notifications
                        {userNotifications.length ? ` (${userNotifications.length})` : ""}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-90 max-h-[400px] overflow-auto">
                    <div className="grid gap-4 p-4">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        {userNotifications.length != 0 ? userNotifications.map((notification, index) => (
                            <div key={index}>
                                <NotificationItem notification={notification} />
                            <Separator />
                         </div>
                        )): (
                            <p className="text-sm">No notifications</p>
                        )}
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