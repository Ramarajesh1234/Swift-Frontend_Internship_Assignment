import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {user && (
        <div className="card">
          <p>
            <strong>Name:</strong>
            {user.name}
          </p>
          <p>
            <strong>Email:</strong>
            {user.email}
          </p>
          <p>
            <strong>Phone:</strong>
            {user.phone}
          </p>
          <p>
            <strong>Website:</strong>
            {user.website}
          </p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
    </div>
  );
};

export default Profile;
