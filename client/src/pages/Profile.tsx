import { useEffect, useRef, useState } from 'react';
import { GetCurrentUser } from '../hooks/useAccount';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseApp } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserError, updateUserFetched, updateUserLoading  } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export type ProfileFormData = {
  name?: string;
  avatar?: string;
  email?: string;
};

export default function Profile() {
  const currentUser = GetCurrentUser();
  const dispatch = useDispatch();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatar] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({});
  const [isUpdated, setUpdate] = useState<boolean>(false);

  const { loading: isLoading, error } = useSelector((state: RootState) => state.user);

  const handleAvatarClick = () => {
    avatarRef?.current?.click();
  };

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    setFormData({ ...formData, [e.target.id] : e.target.value });
  }

  const uploadToFirebaseStorage = (avatarFile: File) => {
    const fileName = new Date().getTime() + avatarFile.name;
    const storageHandler = ref(getStorage(firebaseApp), fileName);
    const uploadHandler = uploadBytesResumable(storageHandler, avatarFile);

    setUploadError(false);
    uploadHandler.on(
      'state_changed',
      (snapshot) => {
        console.log('transfer ', snapshot.bytesTransferred);
        setUploadStatus(
         +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0),
        );
      },
      () => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadHandler.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      },
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      dispatch(updateUserLoading());

      const res = await fetch(`/api/user/update/${currentUser?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!data?.success) {
        dispatch(updateUserError(data.message));
        return;
      }

      dispatch(updateUserFetched(data.message));
      setUpdate(true);
      
    } catch (error) {
      dispatch(updateUserError(error.message))
    }

  }

  useEffect(() => {
    if (avatarFile) {
      uploadToFirebaseStorage(avatarFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarFile]);

  console.log('formData.avatar  ',formData.avatar || currentUser?.avatar );
  return (
    <div className="p-3 max-w-l mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => {
            if (e?.target?.files) setAvatar(e.target?.files[0] || null);
          }}
          type="file"
          ref={avatarRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={handleAvatarClick}
          className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
          src={formData.avatar || currentUser?.avatar}
          alt="avatar"
        />
        {avatarFile && (
          <p className="text-center">
            {uploadError ? (
              <span className="text-red-700">Failed to upload Avatar</span>
            ) : uploadStatus === 100 ? (
              <span className="text-green-700 ">
                Avatar successfully uploaded!
              </span>
            ) : (
              <span>{`Image uploading ${uploadStatus}%`}</span>
            )}
          </p>
        )}

        <input
          type="text"
          placeholder="name"
          className="border p-3 rounded-lg"
          id="name"
          defaultValue={currentUser?.name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-slate-700 cursor-pointer">Delete Account</span>
        <span className="text-slate-700 cursor-pointer">Logout</span>
      </div>
      {error && <p className="text-red-700 cursor-pointer text-center mt-2">{error}</p>}
      {isUpdated && <p className="text-green-700 cursor-pointer text-center mt-2">Profile data successfully updated</p>}
    </div>
  );
}
