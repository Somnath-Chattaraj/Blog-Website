import BlogCard from "../components/BlogCard";
// import Box from '@mui/material/Box';
// import Skeleton from '@mui/material/Skeleton';
import { useBlogs, useUser } from "../hooks/index";
import {MyLoader} from "../components/MyLoader";
import { AppBar } from "../components/AppBar";
import { Navigate } from "react-router-dom";


export const Blogs = () => {
    const { loading} = useBlogs();
    const {blogs} = useBlogs();
    const user = useUser();
    if (user.loading) {
        return (
            <MyLoader />
        )
    }
    
    if (!user.userDetails) {
        return <Navigate to="/signin" />;
    }


    if (loading) {
        return (
    //    <Box sx={{ width: 300 }}>
    //   <Skeleton />
    //   <Skeleton animation="wave" />
    //   <Skeleton animation={false} />
    // </Box>
    <div>
        <MyLoader />
    </div>
            
        );
    }

    return (
        <>
        <AppBar 
            accountName  = {user.userDetails} 
            post = {true}
        />
        <div className="w-full">
            {blogs.map((blog: any, index: number) => (
                <div key={index} className="flex justify-center pt-5 w-screen max-w-screen-lg">
                    <div className="max-w-xl px-5">
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title || "No Title"}
                            content={blog.content|| "No Content"}
                            publishedDate={"Apr 1, 2024"}
                        />
                    </div>
                </div>
            ))}
            
        </div>
        </>
    );
};
