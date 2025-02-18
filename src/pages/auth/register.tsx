import React, { useState } from "react";
import { useAuth } from "../../context/authContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhoneAlt, FaPhone} from "react-icons/fa";
import AuthLayout from "../../layouts/authlayout.tsx";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { Register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Register(email, password, name, address, phoneNumber);
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-6 shadow-md w-[80%]">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          <div className="user flex items-center gap-4 p-2 border border-t-0 border-x-0 border-b-[1.3px] border-b-black outline-none">
            <FaUserAlt />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border-none w-full"
              required
            />
          </div>
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
            <FaPhoneAlt />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

          <div className="user flex items-center gap-4 p-2 border border-t-0 border-x-0 border-b-[1.3px] border-b-black outline-none">
            <FaMapMarkerAlt />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none border-none w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-buya-bright text-buya-white p-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-buya-bright font-medium">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
