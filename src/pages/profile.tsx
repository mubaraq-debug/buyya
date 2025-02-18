import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import { firestore } from '../libs/firebaseConfig.ts';

interface User {
    // uid: string;
    email: string | null;
    name: string;
    address: string;
}

const Profile = () => {
    const {userId} = useParams<{userId: string}>()

    const [userProfile, setUserProfile] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
 useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found');
        }

        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserProfile({
            // uid: userDoc.id,
            email: userDoc.data()?.email,
            name: userDoc.data()?.name,
            address: userDoc.data()?.address,
          });
        } else {
          throw new Error('User not found in the database');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 
  return (
    <div>
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userProfile && (
        <div>
          {/* <p><strong>Username:</strong> {userProfile.uid}</p> */}
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>address:</strong> {userProfile.address}</p>
          <p><strong>name:</strong> {userProfile.name}</p>

        </div>
      )}
    </div>
  )
}

export default Profile