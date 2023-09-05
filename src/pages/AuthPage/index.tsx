import React, { useState, useEffect } from "react";
import styles from "./AuthPage.module.scss";
import { AppDispatch, RootState } from "../../redux/Store";
import { IsAdmin, login, register } from "../../redux/features/AuthSlice";
import { TRegister, TLogin } from "../../redux/features/AuthSlice/type";
import { useSelector } from "react-redux";

const AuthPage = () => {
  const dispatch = AppDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState("");

  function handleSubmit(e: any): void {
    e.preventDefault();

    if (isLogin) {
      const user: TLogin = {
        email: userEmail,
        password: userPassword,
      };

      dispatch(login(user));
    } else {
      const user: TRegister = {
        email: userEmail,
        password: userPassword,
        displayName: userDisplayName,
        phoneNumber: +userPhoneNumber,
        photoURL: userPhotoURL,
      };

      dispatch(register(user));
    }
  }

  //todo +++++++++++++++++++++++++++++++++++++++++++++++ return ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles["login-box"]}>
        {isLogin ? <p>Login</p> : <p>Register</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles["user-box"]}>
            <input
              required
              name="email"
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              name="password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {!isLogin ? (
            <>
              <div className={styles["user-box"]}>
                <input
                  required
                  name="displayName"
                  type="text"
                  value={userDisplayName}
                  onChange={(e) => setUserDisplayName(e.target.value)}
                />
                <label>Name</label>
              </div>
              <div className={styles["user-box"]}>
                <input
                  required
                  name="photoURL"
                  type="number"
                  value={userPhoneNumber}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                />
                <label>Phone Number</label>
              </div>
              <div className={styles["user-box"]}>
                <input
                  required
                  name="photoURL"
                  type="text"
                  value={userPhotoURL}
                  onChange={(e) => setUserPhotoURL(e.target.value)}
                />
                <label>Photo URL</label>
              </div>
            </>
          ) : (
            ""
          )}

          <a onClick={handleSubmit} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        {!isLogin ? (
          <p>
            Already have an account?{"     "}
            <a onClick={() => setIsLogin(true)} className={styles["a2"]}>
              Sign in!
            </a>
          </p>
        ) : (
          <p>
            Don't have an account?{"     "}
            <a onClick={() => setIsLogin(false)} className={styles["a2"]}>
              Sign up!
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
