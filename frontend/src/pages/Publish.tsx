import { useState } from 'react'

import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';


 const Publish =  () => {
  const naviagte  = useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function publish(ev:any) {
    ev.preventDefault();

      try {
    
      await axios.post(`${BACKEND_URL}/api/v1/blog`,{
        title,
        content
      }, {
        headers: {
            authorization: localStorage.getItem("token")
        }
      })
      alert ("Blog published successfully");
      naviagte("/blog");
      
    } catch (err) {
      console.log(err);
      alert ("Something went wrong! Please try again later")
    }
  }

  
    
  
  return (
    <>
    <div className="flex items-center justify-between py-10 mb-5 px-6 border-b border-black text-white">
  <div className="flex items-center">
    <span className="text-2xl text-black cursor-default font-bold"><Link to={"/blog"}>Medium</Link></span>
  </div>
  
    <div>
      
        <button onClick={publish} className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full">
          Publish
        </button>
      
    </div>
  
</div>
    <div className='flex flex-col justify-center items-center w-full'>
  <div className="max-w-screen-lg w-full">
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full border-gray-600 border-l ml-7 text-gray-600 text-5xl md:text-5xl pt-4 pl-4  focus:outline-none ' placeholder='Title' />
  </div>

  <div className="max-w-screen-lg w-full h-svh mt-4">
    <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full h-full border-gray-300 ml-7 text-gray-600 text-lg md:text-2xl pl-4 rounded-lg  focus:outline-none  focus:border-transparent resize-none h-full' placeholder='Tell your story...'></textarea>
  </div>
</div>



    </>
  )
}
export default Publish



