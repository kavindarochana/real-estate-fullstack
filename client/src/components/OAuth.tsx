import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginError, loginFailure, loginLoading, loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export type OAuthProps = {
  loading: boolean;
};

const OAuth = ({ loading }: OAuthProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      dispatch(loginLoading());
      const googleProvider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const result = await signInWithPopup(auth, googleProvider);

      const { email, displayName, photoURL: avatar } = result.user;

      const res = await fetch('/api/auth/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, displayName, avatar }),
      });

      const data = await res.json();

      if (!data.success) {
        dispatch(loginFailure(data.message));
        return;
      }

      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('google login errror ', error);
      dispatch(loginError(error.message));
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      type="button"
      className="bg-green-700 text-white  disabled:bg-green-800  p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
