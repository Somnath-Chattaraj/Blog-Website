import { FullBlog } from "../components/FullBlog"
import { Navigate, useParams } from "react-router-dom"
import {InstagramStyle} from "../components/MyLoader"
import { useBlog } from "../hooks"
import { AppBar } from "../components/AppBar"
import { useUser } from "../hooks"
const Blog = () => {
  const user = useUser();
  const { id } = useParams();
  const { blog} = useBlog({id: id || ""})
  if (user.loading) {
    if (user.loading) {
      return( 
        <InstagramStyle />
      )
  }
}
  if (!user.userDetails) {
    return <Navigate to="/signin" />;
} 

  return (
    <>
    <AppBar
      accountName= {user.userDetails}
      post={true}
      publish={false}
    />
    <div className="flex justify-center lg:pl-20 px-5 lg:py-20 py-5">
      <FullBlog 
        authorName={ blog?.author.name || "Somnath"} 
        title={ blog?.title || "Lorem ipsum dolor sit amet consectetur adipisicing elit. At iure officiis, quaerat debitis suscipit quam vitae odit delectus animi sed!"} 
        content={ blog?.content || "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium minima repellat quos ullam aliquam sapiente quam, corrupti aperiam nesciunt sed eius vero voluptate neque in quisquam placeat consequatur. Atque vel praesentium ea, laudantium, labore maiores optio nobis necessitatibus illum ut nihil corrupti dolor natus nam culpa aspernatur esse ipsa! Magni neque exercitationem repudiandae vero. Et molestiae impedit omnis perspiciatis deleniti, assumenda consequuntur voluptatibus unde ipsa labore cupiditate magni excepturi soluta explicabo, nulla vitae quisquam aut debitis eveniet nesciunt reiciendis ab? Unde deserunt eveniet exercitationem, adipisci consequuntur voluptate amet, similique impedit, ducimus omnis sint quo? Voluptatem saepe, explicabo voluptatibus sint dolor ea aliquid!"}       
        publishedDate={"Apr 1, 2024"} 
      />
    </div>
    </>
  )
}
export default Blog
