
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
   

    try {
      const res = await fetch('/api/auth/register', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (!data.success) {
      setLoading(false);
      setError(data.message);
      return;
    }
    
    setLoading(false);

    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log('error ', error);
    }

  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>

    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} /> 
      <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} /> 
      <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} /> 
      <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
      <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {isLoading ? 'Loading...' : 'Register'}
      </button>
    </form>

    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={'/login'}>
        <span className='text-blue-700'>Login</span>
      </Link>
    </div>
    {isError && <p className='text-red-700'>{isError}</p>}
    </div>
  );
}
