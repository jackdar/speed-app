import { AdminNotifcation } from "@/types/notification/admin-notification";
import { UserNotification } from "@/types/notification/user-notification";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
    notification: AdminNotifcation | UserNotification
}



const NotificationItem: React.FC<Props> = ({ notification }) => {

    const router = useRouter();

    const viewArticle = async () => {
        console.log("role" in notification ? "ADMIN NOTI" : "USER NOTI")
        if("role" in notification) {
            // Change to moderate view afterwards
            router.push(`/articles/${notification.article_id}`);
        } else {
            let temp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/read`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "notification_id": notification._id
                })
            })
            router.push(`/articles/${notification.article_id}`);
        }
    }

    return (
        <div className="flex items-center p-1 justify-between">
            <div className="p-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 pr-10">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                    <p className="text-sm font-semibold">{notification.title}</p>
                    <p className="text-sm font-light pb-4">{notification.article_title}</p>
                    <p className="text-sm font-light">{notification.message}</p>
                </div>
            </div>
            <Button onClick={viewArticle}>
                View
                {/* <Link href={`/articles/${notification.article_id}`}>View</Link> */}
            </Button>
        </div>
    )
}

export default NotificationItem;
