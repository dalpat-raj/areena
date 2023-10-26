import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./payMethods.scss";
import axios from "axios";
import { server } from "../../../Server";
import { toast } from "react-toastify";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (oldPassword !== "" || newPassword !== "" || confirmPassword !== "") {
      if (newPassword === confirmPassword) {
        await axios
          .put(
            `${server}/update-user-password`,
            {
              oldPassword,
              newPassword,
            },
            { withCredentials: true }
          )
          .then((res) => {
            toast.success(res.data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            toast.error(error.response.data.error.message);
          });
      } else {
        toast.error("password not match!");
      }
    } else {
      toast.error("please fill all the fields!");
    }
  };

  return (
    <div className="password__main">
      <div className="header">
        <div className="container__heading">
          <h2>Change Password</h2>
        </div>
      </div>

      <div className="input__row">
        <form onSubmit={handleSubmit}>
          <div className="box">
            <label htmlFor="oldpassword">Enter Your Old Password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span>
              {showOldPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowOldPassword(false)}
                />
              ) : (
                <AiOutlineEye onClick={() => setShowOldPassword(true)} />
              )}
            </span>
          </div>

          <div className="box">
            <label htmlFor="newPassword">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span>
              {showNewPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowNewPassword(false)}
                />
              ) : (
                <AiOutlineEye onClick={() => setShowNewPassword(true)} />
              )}
            </span>
          </div>

          <div className="box">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <AiOutlineEye onClick={() => setShowConfirmPassword(true)} />
              )}
            </span>
          </div>

          <div className="box">
            <button type="submit" className="btn-main">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
