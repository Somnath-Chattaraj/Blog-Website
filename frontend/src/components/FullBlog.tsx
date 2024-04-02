interface FullBlogProps {
    authorName: string;
    title: string;
    content: string; 
    publishedDate: string;
}
export const FullBlog = ({
    authorName,
    title,
    content,
    publishedDate
}: FullBlogProps ) => {
  return (
    <div className="lg:flex w-full">
    <div className="lg:w-2/3 w-full">
      <p className="lg:text-5xl text-3xl font-bold">{title}</p>
      <p className="font-thin py-5">Posted on {publishedDate}</p>
      <p>{content}</p>
    </div>
    <div className="lg:w-1/3 w-full">
      <p className="lg:pl-40 pt-14 font-bold">Author</p>
      <div className="flex lg:pl-40 pt-5 items-center">
        <div className="w-10 h-10">

        <button className="rounded-full lg:w-10 mt-1.5 lg:mt-0 lg:h-10 w-8 h-8 bg-gray-300 text-lg">{authorName[0]}</button>
        </div>
        <p className="text-2xl lg:pt-1 pl-3 font-bold">{authorName}</p>
      </div>
    </div>
  </div>
  
  )
}


