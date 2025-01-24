import Link from 'next/link'
import { FaHome, FaUser, FaPlusCircle} from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className='border border-2 h-screen p-8'>
        <div>
            <Link href="/">
                <h1 className='text-4xl mb-5 text-[#5A6ACF]'>Lifepage</h1>
            </Link>
        </div>

        <nav className='mt-8'>
            <ul className="space-y-4">
                <li>
                    <Link href="/">
                    <p className="text-xl flex items-center px-4 py-3 hover:bg-slate-300 rounded-lg cursor-pointer"><FaHome className="mr-3" /> Home</p>
                    </Link>
                </li>
                <li>
                    <Link href="/user/create-post">
                    <p className="text-xl flex items-center px-4 py-3 hover:bg-slate-300 rounded-lg cursor-pointer"><FaPlusCircle className="mr-3" /> Create</p>
                    </Link>
                </li>
                <li>
                    <Link href="/user/profile">
                    <p className="text-xl flex items-center px-4 py-3 hover:bg-slate-300 rounded-lg cursor-pointer"><FaUser className="mr-3" /> Profile</p>
                    </Link>
                </li>
                <li>
                    <Link href="/logout">
                    <p className="text-xl text-red-500  cursor-pointer ml-4">Logout</p>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

