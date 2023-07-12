import { useState } from "react";
import NavBar from "../../components/header";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { Toast, Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = Router;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/");
      // console.log(data)

      if (data == true) {
        toast.success("User Login Successfully!");
      } 

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <Toaster />
      <div className="formOuter">
        <h1 className="trendingFont font-bold text-4xl p-6 text-center">
          Loged-In
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email: </label>
          <input
            placeholder="enter your email...."
            autoFocus = "true"
            required
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password: </label>
          <input
            placeholder="enter your password...."
            required
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>

          <div className="notAcc">
            <span>if you don't have an account!</span>
            <Link className="link" href="/register">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
