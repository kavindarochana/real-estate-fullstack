import { GetCurrentUser } from "../hooks/useAccount"

export default function Profile() {
  const currentUser = GetCurrentUser();

  const isLoading = false;

  return (
    <div className="p-3 max-w-l mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer" src={currentUser?.avatar} alt='avatar'/>

        <input type="text" placeholder='name' className='border p-3 rounded-lg' id='name' /> 
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' /> 
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' /> 
      
        <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Logout</span>
      </div>
    </div>
  )
}
