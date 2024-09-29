import React, { useEffect, useRef, useState } from 'react'
import Container from '../components/container/Container.jsx';
import PostCard from "../components/post/PostCard.jsx";
import dbAndStrgServices from '../appwrite/conf.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const searchRef = useRef();


  useEffect(() => {
    dbAndStrgServices.getPostList([])
      .then((post) =>{ 
        setPosts(post.documents);
        setAllPosts(post.documents);
      })
      .finally(() => setLoading(false))
  }, [])


  const handleSearch = () => {
    let param = searchRef.current.value.toLowerCase();
    if (param) {
      let searchData = [...allPosts].filter((post)=>{
        return post.title.toLowerCase().includes(param);
      })
      setPosts(searchData);
      searchRef.current.value="";    
    } else {
      console.log("clicked");
      setPosts(allPosts);
      searchRef.current.focus();
    }
  }


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

  return !isLoading ? (

    <div className='w-full py-8 h-[90vh] overflow-scroll'>
      <div className="flex justify-center">
        <Input
          type="search"
          className="w-[150px] border-2"
          ref={searchRef}
        />
        <Button
          className='w-[80px] rounded-lg'
          onClick={handleSearch}
        >search</Button>
      </div>
      <Container>
        <div className="flex flex-wrap justify-center">
          {
            posts?.map((post) => (
              <div className="p-2 w-1/4 min-w-[250px]" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  ) : null

}

export default AllPosts
