import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


const Signin = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(ev: any) {
        ev.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                username,
                password
            })
            const token = response.data.token
            localStorage.setItem("token", token)
            alert("Login successful")
            navigate("/blog");
        }
        catch (err) {
            console.log(err);
            alert ("Login failed! Please try again later")
        }
    }
    
  return (
    
    <>
        <>
            <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className='lg:w-1/2 bg-white shadow-300 rounded-lg  flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-bold text-3xl pt-4 pb-2'>Login to your account</h1>
          <p className='text-gray-500 flex justify-center pb-4'>Didn't have an account?{" "}<Link className="underline text-bn pl-1" to={"/signup"}>Signup</Link></p>
        </div>
        <form action="" onSubmit={loginUser} className='flex flex-col'>
          <h4 className=' pb-2'>Email </h4>
          <input type="email" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder='jhondoe@gmail.com' className='border-2 border-gray-300 rounded-lg h-10 border-1  bg-transparent pl-4 mb-4' />
          <h4 className='pb-2'>Password (atleast 6 characters)</h4>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='password' className='border-2 border-gray-300 rounded-lg h-10 border-1 bg-transparent pl-4 mb-6' />
            <button className='bg-black text-white h-10 rounded-lg mb-4 hover:bg-gray-600 hover:text-gray-200 transition duration-300 ease-in-out'>
  Sign In
</button>

          
        </form>
      </div>

      <div className="lg:w-1/2 bg-slate-100 flex flex-col justify-center  h-screen">
        <p className="font-bold text-2xl px-16">
          "The Customer Service I received was exceptional. The support team went above and beyond to address my concerns."
        </p> <br />
        <p className="font-bold pl-16">
            Jules Winnfield
        </p>
        <p className="text-gray-600 pl-16">
            CEO,Acme Inc
        </p>
      </div>
    </div>
        </>
    </>
  )
}

export default Signin
