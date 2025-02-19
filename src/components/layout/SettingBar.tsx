import Link from "next/link";
import {
  User,
  PlusCircle,
  Box,
  Key,
} from "lucide-react";

export default function Settingbar() {
  return (
    <div className="bg-slate-100 md:h-screen p-8">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/settings/profile-setting">
               <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-blue-300 rounded-lg cursor-pointer">
               <User /> Edit Profile
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/product/create_category">
             
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-blue-300 rounded-lg cursor-pointer">
              <PlusCircle /> Acoount Privacy
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/product/create_product">
             
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-blue-300 rounded-lg cursor-pointer">
              <Box /> Blocked
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/reset_password">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-blue-300 rounded-lg cursor-pointer">
              <Key /> Reset Password
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/reset_password">
              
              <p className="text-center px-4 py-2 text-white bg-red-500  rounded-lg cursor-pointer">
              Logout !
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}