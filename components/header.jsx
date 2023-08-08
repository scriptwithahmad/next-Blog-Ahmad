"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";

const header = () => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false)
  // console.log(isOpen)

  const toggleMenu = () => {
    setIsOpen(true)
  }


  return (
    <header className="header">
      <div id="Nav">
        <div className="sm:order-2">
          <Link className="font-bold text-3xl" href="/">
            CriCode
          </Link>
          <i onClick={toggleMenu} class="menu-btn fa-solid fa-bars"></i>
        </div>
        {data?.user ? (
          <>
            <div className="order-3 flex justify-center">
              <div className="flex gap-6">
                <Link className="link" href="/">Home</Link>
                <Link className="link" href="/">About</Link>
                <Link className="link" href="/create">Write</Link>
                <span
                  children
                  style={{ cursor: "pointer" }}
                  onClick={() => signOut()}
                  className="link"
                >
                  Logout
                </span>
              </div>
            </div>
            <div className="profileBox order-3">
                <h4 className="profile"> {data?.user?.name.charAt(0)} </h4>
                <span className="userName"> {data?.user?.name} </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-6 order-3">
              <Link className="link" href="/">Home</Link>
              <Link className="link" href="/">About</Link>
              <Link className="link" href="/login">Login</Link>
              <Link className="link" href="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default header;
