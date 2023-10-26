import React, { useState } from "react";
import "./profile.scss";
import ProfileSidebar from "../../components/user/profileSidebar/ProfileSidebar";
import ProfileContent from "../../components/user/profileContent/ProfileContent";

const Profile = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="profile__container">
      <div className="container">
        <div className="profile__row">
          <div className="col__2 profile__sidebar">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <div className="col__2 profile__content">
            <ProfileContent active={active} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
