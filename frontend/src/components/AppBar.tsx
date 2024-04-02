import { useState } from "react"
import { Link } from "react-router-dom"

interface AppBarProps {
    accountName?: string,
    post?: boolean,
    publish?: boolean
}

export const AppBar = ({
    accountName,
    post,
    publish
}: AppBarProps ) => {

  const [dropdownOpen, setDropdownOpen] = useState (false);
  return (
    <div className="flex items-center justify-between py-4 mb-5 px-6 border-b border-black text-white">
  <Link to={"/blog"}><div className="flex items-center">
    <span className="text-2xl text-black cursor-default font-bold">Medium</span>
  </div></Link>
  {accountName ? (
    <div>
      {post? (
        <Link to="/publish">
        <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full">
          New Post
        </button>
        </Link>
      ):null}
      {publish? (
        <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full">
          Publish
        </button>
      ):null}
      <button className='rounded-full bg-black hover:bg-gray-600 h-10 w-10 my-5 ml-5 mr-4' onClick={() => setDropdownOpen(!dropdownOpen)}>
      {accountName[0]}
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 z-10 mr-2 hover:bg-gray-100 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <button  className="block w-full px-4 py-2 text-gray-800  hover:text-gray-900">
            Sign Out
          </button>
        </div>
      </div>
    )}
    </div>

  ) : null}
</div>



  )
}


