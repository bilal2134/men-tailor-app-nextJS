// src/app/login/page.js
"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import logo from "../../../public/logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Left Column: Logo */}
      <div className="flex flex-col items-center justify-center w-1/2 bg-white shadow-lg">
        <Image
          src={logo}
          alt="Logo"
          width={600}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] bg-gray-400"></div>

      {/* Right Column: Login Form */}
      <div className="flex flex-col items-center justify-center w-1/2 px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg"
        >
          <h1 className="mb-6 text-4xl font-semibold text-center text-gray-800">
            {t("login")}
          </h1>

          <div className="mb-4">
            <label className="block mb-2 text-2xl text-gray-700" htmlFor="username">
              {t("username")}
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-5 py-3 text-lg border rounded focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-2xl text-gray-700" htmlFor="password">
              {t("password")}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-5 py-3 text-lg border rounded focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3 text-lg font-semibold text-white bg-[#270087] rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            {t("login")}
          </button>
        </form>
      </div>
    </div>
  );
}
