import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext.tsx";

const UserDashboard = () => {
  const { user, LogOut } = useAuth();
  return (
    <div>
      <h1>Welcome</h1>

      {user ? (
        <div>
          <h2>user's view</h2>
          <Link to={`/profile/${user.uid}`}>profile</Link>
          <button onClick={LogOut}>logout</button>
        </div>
      ) : (
        <div>
          <h1>Guest view</h1>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
