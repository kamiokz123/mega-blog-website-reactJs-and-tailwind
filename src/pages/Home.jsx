import React, { useEffect, useState } from 'react';
import dbAndStrgServices from '../appwrite/conf.js';
import Container from '../components/container/Container.jsx';
import PostCard from '../components/post/PostCard.jsx';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading , setLoading] = useState(true)
    const userData = useSelector((state)=> state.auth.userData);

    console.log("userdata",userData);
    


    useEffect(() => {
            dbAndStrgServices.getPostList().then((post) => {
                if (post) {
                    setPosts(post.documents);
                }
                setLoading(false);
            }) 
    }, [])

    if (loading) {
        return <div className="text-center font-bold w-full h-[300px]">
             Loading
         </div>
     }

    if (!loading && posts.length===0) {
        return (<div className="w-full h-[70vh] py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            please login to see blogs
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

   return userData ? (
        <div className="w-full py-8 px-2 h-[70vh] overflow-scroll">
            <Container>
                <div className="flex flex-wrap gap-4">
                    {posts?.map((post) => {
                        console.log("post in map", post);
                        
                        return (<div key={post.$id} className="p2 w-1/4">
                            <PostCard {...post} />
                        </div>)
                    })}
                </div>
            </Container>
        </div>
    ) : <>no</>

}

export default Home
