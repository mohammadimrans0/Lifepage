import { usePostStore } from "@/stores/usePostStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";


export default function BookMark(){
    const { userId } = useUserStore();
    const { bookmarks, fetchBookmarks } = usePostStore();
  
  //   Fetch profile when the component mounts
    useEffect(() => {
      if (userId) {
        fetchBookmarks();
      }
    }, [userId, fetchBookmarks]);
    return (
        <div>
            
        </div>
    )
}


