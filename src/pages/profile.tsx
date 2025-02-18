import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../libs/firebaseConfig.ts";

interface User {
  email: string | null;
  name: string;
  address: string;
  phoneNumber: string;
}

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

//   fetching user detail
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          throw new Error("User ID not found");
        }

        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserProfile({
            // uid: userDoc.id,
            email: userDoc.data()?.email,
            name: userDoc.data()?.name,
            address: userDoc.data()?.address,
            phoneNumber: userDoc.data()?.phoneNumber,
          });
        } else {
          throw new Error("User not found in the database");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);


//   check if user is online

useEffect(() => {
    const handleOnline = () => {
        setIsOnline(true)
    }
    const handleOffline = () => {
        setIsOnline(false)
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline)

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    }
}, [])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userProfile && (
        <section className="profile mx-auto flex justify-center pt-32">
          <div className="card bg-buya-white shadow-xl border-solid border-[1.5px] border-gray-100 h-fit w-[90%] md:w-[40%] rounded-xl p-10">
            <div className="top flex items-center justify-between">
              <div className="profile-pic h-[80px] w-[80px] rounded-full bg-gray-100"></div>
              <button className="border border-buya-bright text-buya-bright hover:bg-buya-bright hover:text-buya-white font-medium rounded-lg flex items-center justify-end outline-none capitalize px-3 py-1 text-[10px]">
                view orders
              </button>
            </div>
            <div className="user-info pt-5 flex flex-col gap-1">
              <div className="name-active flex items-center gap-3">
                <h3 className="font-bold capitalize text-[18px]">
                  {userProfile.name}
                </h3>
                {isOnline ? (
                  <div className="flex items-center gap-1">
                    <p className="h-2 w-2 rounded-full bg-buya-green"></p>{" "}
                    <small>online</small>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <p className="h-2 w-2 rounded-full bg-buya-bright"></p>{" "}
                    <small>offline</small>
                  </div>
                )}
              </div>

              <div className="email">
                <p className="font-[300] text-base">📧 <a href={`mailto:${userProfile.email}`}>{userProfile.email}</a></p>
              </div>

              <div className="number">
                <p className="text-base font-[400] text-black">
                  ☎️ {userProfile.phoneNumber}
                </p>
              </div>

              <div className="address">
                <p>
                🏠 {userProfile.address}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
