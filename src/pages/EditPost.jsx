import React, { useEffect, useState } from 'react';
import Container from '../components/container/Container.jsx';
import dbAndStrgServices from '../appwrite/conf.js';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm.jsx';



function EditPost() {
 const [post , setPost] = useState();
 const {slug} = useParams();
 const navigate = useNavigate();

 console.log("slug in edit post :",slug);
 

 useEffect(()=>{
    if (slug) {
        dbAndStrgServices.getPost(slug).then((post)=>setPost(post));
    }else{
        navigate("/");
    }
 },[slug,navigate]);

  return (
    post ? <div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div> : null
  )
}

export default EditPost
