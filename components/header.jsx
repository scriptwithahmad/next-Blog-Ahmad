"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const header = () => {
  const { data } = useSession();

  return (
    <header className="header">
      <div className="Nav">
        <div className="sm:order-2">
          <Link className="font-bold text-3xl" href="/">
            CriCode
          </Link>
        </div>
        {data?.user ? (
          <>
            <div className="order-3 flex justify-center">
              <div className="flex gap-6">
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
                <Link href="/create">Write</Link>
                <span
                  children
                  style={{ cursor: "pointer" }}
                  onClick={() => signOut()}
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
              <Link href="/">Home</Link>
              <Link href="/">About</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default header;
