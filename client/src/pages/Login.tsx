
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ErrorResponse  {
  success : boolean;
  message: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    });
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
   
    try {
      const res = await fetch('/api/auth/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    console.log('success-', data);
    if (!data.success) {
      setLoading(false);
      setError(data.message);
      return;
    }
    
    setError('');
    setLoading(false);
    navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>

    <form className='flex flex-col gap-4' onSubmit={handleLogin}>
      <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} /> 
      <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
      <button disabled={isLoading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>

    <div className='flex gap-2 mt-5'>
      <p>Don't have an account?</p>
      <Link to={'/register'}>
        <span className='text-blue-700'>Register</span>
      </Link>
    </div>
    {isError && <p className='text-red-700'>{isError}</p>}
    </div>
  );
}
