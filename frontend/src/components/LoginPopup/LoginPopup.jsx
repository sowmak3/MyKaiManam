// frontend/src/components/LoginPopup/LoginPopup.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { API_BASE_URL } from "../../config";
import { StoreContext } from "../../context/StoreContext";

/**
 * Use like:
 * {showLoginPopup && <LoginPopup setShowLogin={setShowLoginPopup} />}
 * If setShowLogin isn't passed, we'll fall back to StoreContext.setShowLoginPopup
 */
const LoginPopup = ({ setShowLogin }) => {
  const { setToken, setShowLoginPopup } = useContext(StoreContext);

  const close = () => {
    if (typeof setShowLogin === "function") setShowLogin(false);
    else setShowLoginPopup?.(false);
  };

  const [currState, setCurrState] = useState("Login"); // "Login" | "Sign Up"
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !form.agree) {
      alert("Please agree to the terms to continue.");
      return;
    }
    setLoading(true);
    try {
      const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
      const payload =
        currState === "Login"
          ? { email: form.email.trim(), password: form.password }
          : { name: form.name.trim(), email: form.email.trim(), password: form.password };

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (res.data?.success && res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        close(); // ✅ close on success
      } else {
        alert(res.data?.message || "Request failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={submit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>

          {/* X (close) */}
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={close}
            role="button"
            aria-label="Close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              value={form.name}
              onChange={onChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={onChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={onChange}
          />
        </div>

        {currState === "Sign Up" && (
          <div className="login-popup-condition">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={onChange}
              required
            />
            <p>
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait…" : currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Switch link */}
        {currState === "Login" ? (
          <p className="login-switch-line">
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="login-switch-line">
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
