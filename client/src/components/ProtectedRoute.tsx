import { GetCurrentUser } from '../hooks/useAccount';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const currentUser = GetCurrentUser();

    return  currentUser ? <Outlet /> : <Navigate to='/login' /> 
      
}

