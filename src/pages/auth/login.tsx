import React, { useState } from "react";
import { useAuth } from "../../context/authContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/authlayout.tsx";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-6 shadow-md w-[80%]">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">(: Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          <div className="user flex items-center gap-4 p-2 border border-t-0 border-x-0 border-b-[1.3px] border-b-black outline-none">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border-none w-full"
              required
            />
          </div>
          <div className="user flex items-center gap-4 p-2 border border-t-0 border-x-0 border-b-[1.3px] border-b-black outline-none">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-none w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-buya-bright text-buya-white p-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-buya-bright font-medium">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
