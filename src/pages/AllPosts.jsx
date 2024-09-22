import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container.jsx';
import PostCard from "../components/post/PostCard.jsx";
import dbAndStrgServices from '../appwrite/conf.js';

function AllPosts() {
  const [posts , setPosts] = useState([]);
  const [isLoading , setLoading] = useState(true);


  useEffect(()=>{
    dbAndStrgServices.getPostList([])
    .then((post)=>setPosts(post.documents))
    .finally(()=> setLoading(false))
  },[])


  if (isLoading) {
    return <div className="text-center font-bold w-full h-[300px]">
         Loading
     </div>
 }

  if (!isLoading && posts.length === 0) {
    return (<div className="w-full h-[80vh] py-8 mt-4 text-center ">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
    )
}

return !isLoading ?  (
    <div className='w-full py-8 h-[90vh] overflow-scroll'>
      <Container>
        <div className="flex flex-wrap">
          {
            posts?.map((post)=>(
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post}/>
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  ) : null

}

export default AllPosts
