
import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog {
    "content": string,
    "title" : string,
    "id": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}

// interface post {
//     title: string,
//     content: string
// }
// export const Publish = () => {
//     const [loading, setLoading] = useState(true);
//     const [tite, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     useEffect (() => {
//       axios.post(`${BACKEND_URL}/api/v1/blog/publish`,{
//         headers: {
//             authorization: localStorage.getItem("token")
//         }
//     })
//       .then (response => {
//         if (response.status === 200) {
//           alert(response.data.message)
//         }
//         else {
//           alert ("Something went wrong! Please try again later")
//         }
//       })
//     },[])
// }

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    async function getDetails() {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers: {
                    authorization: localStorage.getItem("token"),
                }
            });
            setUserDetails(res.data);
            setLoading(false); // Move setLoading inside try block to ensure it's always set
        }
        catch (err) {
            console.log(err);
            setLoading(false); // Set loading to false in case of error
        }
    }

    useEffect(() => {
        getDetails();
    }, []); // Empty dependency array, so it runs only once on component mount

    // useEffect(() => {
    //     if (userDetails) {
            
    //         // console.log("User details:", userDetails);
    //     }
    // }, [userDetails]); // Log userDetails whenever it changes

    return { loading, userDetails };
};