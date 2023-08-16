import Link from "next/link";
import NavBar from "../../components/header";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const router = Router

  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(name, email, password)

    try {
      const {data} = await axios.post('/api/register',{
        name,
        email, 
        password,
      })
      // console.log(data)
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <>
      <NavBar />
      <div className="formOuter">
        <h1 className="trendingFont font-bold text-4xl pb-12 text-center">
          Trending
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name: </label>
          <input
            placeholder="Enter your Name...."
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email: </label>
          <input
            placeholder="Enter your Email...."
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password"> Password: </label>
          <input
            placeholder="Enter your Password...."
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>
          <div className="notAcc">
            <span>if you have an account!</span>
            <Link className="link" href="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
