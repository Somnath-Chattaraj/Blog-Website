import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string; 
    publishedDate: string;
}

const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="w-screen max-w-screen-lg px-5">
        <div className="flex">
            <button className="rounded-full bg-red-500 w-7 h-7">{authorName[0]}</button>
            <p className="text-sm pt-1 pl-2">{authorName} • </p>
            <p className="text-gray-500 pt-1 pl-1 text-sm">{publishedDate}</p>

        </div>
        
        <div>
            <p className="text-2xl py-1 font-bold">{title}</p> 
            <p className="text-gray-900">{content.slice(0,200)+ "..."}</p> 
            <p className="font-thin text-sm py-2">{`${Math.ceil(content.length / 100)} minute(s) read`}</p>

            <hr className="w-full border-1 border-gray-300 my-2" />
        </div>
            
      
    </div>
    </Link>
  )
}

export default BlogCard
