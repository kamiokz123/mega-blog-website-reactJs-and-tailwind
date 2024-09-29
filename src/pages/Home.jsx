import React, { useEffect, useState } from 'react';
import dbAndStrgServices from '../appwrite/conf.js';
import Container from '../components/container/Container.jsx';
import PostCard from '../components/post/PostCard.jsx';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);






    useEffect(() => {
        if (userData) {
            dbAndStrgServices.getCurrentUserPostList(userData.$id).then((post) => {
                if (post) {
                    setPosts(post.documents);
                }
                setLoading(false);
            })
        }else{
            setLoading(false);
        }
    }, [])

    if (loading) {
        return <div className="text-center font-bold w-full h-[300px]">
            Loading
        </div>
    }

    if (!loading && !userData) {
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
    } else if (!loading && posts.length === 0) {
        return (<div className="w-full h-[70vh] py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            no added post by you
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    return (
        <div className="w-full py-8 px-2 h-[90vh] overflow-scroll">
            <div className="w-full text-center font-bold m-3"><h3>your posts :</h3></div>
            <Container>
                <div className="flex flex-wrap gap-4 justify-center">
                    {posts?.map((post) => {

                        return (<div key={post.$id} className="p2 min-w-[250px] w-1/4">
                            <PostCard {...post} />
                        </div>)
                    })}
                </div>
            </Container>
        </div>
    )

}

export default Home
