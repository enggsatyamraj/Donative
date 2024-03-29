"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  actionCodeSettings,
} from "firebase/auth";
import { app } from "@/firbase/config";
import { getFirestore, collection, getDoc, addDoc } from "firebase/firestore";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return toast.error("Please fill all the fields");
      }
      if (password !== confirmPassword) {
        return toast.error("Password and confirm password are not matching.");
      }

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);

      const user = userCredentials.user;

      const userDocRef = await addDoc(collection(firestore, "users"), {
        userId: user.uid,
        firstName,
        lastName,
        email,
        password,
      });

      await sendEmailVerification(auth.currentUser, actionCodeSettings);

      console.log("user created successfully", userDocRef);
      toast.success(
        `welcome, ${firstName} ${lastName}! you have successfully created your account.`
      );
    } catch (err) {
      console.log(err);
      toast.error(
        "error occured while creating user, try again later after some time."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[100vh] bg-white text-black pt-[150px] px-3">
        <div className="max-w-[700px] mx-auto flex flex-col border-[1px] rounded-lg p-4">
          <h1 className="text-3xl font-semibold text-center opacity-80 mb-7">
            Sign up
          </h1>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-[16px] mb-1">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="bg-white text-black border-[1px] px-3 py-2 rounded-lg mb-3"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-[16px] mb-1">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="bg-white text-black border-[1px] px-3 py-2 rounded-lg mb-3"
              />
            </div>
          </div>
          <label className="text-[16px] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-white text-black border-[1px] px-3 py-2 rounded-lg mb-3"
          />

          <label className="text-[16px] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-white text-black border-[1px] px-3 py-2 rounded-lg mb-3"
          />
          <label className="text-[16px] mb-1">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your confirm password"
            className="bg-white text-black border-[1px] px-3 py-2 rounded-lg mb-3"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-fit mx-auto bg-black text-white px-6 py-2 text-[1.15rem rounded-lg"
          >
            {loading ? "loading..." : "Sign up"}
          </button>
          <Link
            href={"/login"}
            className="hover:underline cursor-pointer text-center text-[13px] opacity-85 group w-fit mx-auto mt-3"
          >
            Already have an account?
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
