import { AdminNotifcation } from "@/app/types/notification/admin-notification";
import { Button } from "../ui/button";

interface Props {
    notification: AdminNotifcation
}

const NotificationItem: React.FC<Props> = ({ notification }) => {
    return (
        <div className="flex items-center p-1">
            <div className="p-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 pr-10">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                    <p className="text-sm font-semibold">{notification.title}</p>
                    <p className="text-sm font-light pb-4">Title: {notification.article_title}</p>
                    <p className="text-sm font-light">{notification.message}</p>
                </div>
            </div>
            <Button>View</Button>
        </div>
    )
}

export default NotificationItem;