import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const header = () => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen)

  const toggleMenu = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const menuBtn = document.querySelector(".menu-btn");
    const header = document.querySelector(".navBox");

    menuBtn.addEventListener("click", function () {
      header.classList.toggle("navActive");
      header.remove();
    });
  }, []);

  return (
    <header className="header">
      <div id="Nav">
        <div className="sm:order-2">
          <Link href="/">
            <img className="logo" src="./images/criCode.png" alt="" />
          </Link>
          <i onClick={toggleMenu} class="menu-btn fa-solid fa-bars"></i>
        </div>
        {data?.user ? (
          <>
            <div className="order-3 flex justify-center">
              <div className="navBox flex gap-6">
                <Link className="link" href="/">
                  Home
                </Link>
                <Link className="link" href="/">
                  About
                </Link>
                <Link className="link" href="/create">
                  Write
                </Link>
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
            <div className="navBox profileBox order-3">
              <h4 className="profile"> {data?.user?.name.charAt(0)} </h4>
              <span className="userName"> {data?.user?.name} </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-6 order-3">
              <Link className=" link" href="/">
                Home
              </Link>
              <Link className="link" href="/">
                About
              </Link>
              <Link className="link" href="/login">
                Login
              </Link>
              <Link className="link" href="/register">
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default header;
