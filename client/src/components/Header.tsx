import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GetCurrentUser } from "../hooks/useAccount";

export default function Header() {
    const currentUser = GetCurrentUser();

    const RenderProfileSection = (): JSX.Element  => {
        return (
            <Link to={!currentUser ? '/login' : '/profile'}>
                {!currentUser ? ( <li className="sm:inline text-slate-700 hover:underline">Login</li>) :
                    ( <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt='avatar'/>)
                }
            </Link>
        );
    }
  
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-500'>Estate</span>
                    </h1>
                </Link>
                {/* Search section */}
                <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type='text' placeholder='Search for listing' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                {/* Header menu section */}
                <ul className="flex gap-4">
                    <Link to={'/'}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
                    </Link>
                    <Link to={'/about'}>
                        <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
                    </Link>
                    <RenderProfileSection />
                </ul>
            </div>
            
        </header>
  )
}
