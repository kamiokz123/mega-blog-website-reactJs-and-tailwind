import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbAndStrgServices from "../appwrite/conf.js";
import Button from "../components/Button.jsx";
import Container from "../components/container/Container.jsx";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true)

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    console.log("slug", slug);


    useEffect(() => {
        if (slug) {
            dbAndStrgServices.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false)
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dbAndStrgServices.deletePost(post.$id).then((status) => {
            if (status) {
                dbAndStrgServices.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (loading) {
       return <div className="text-center font-bold w-full h-[300px]">
            Loading
        </div>
    }
    return post ? (
        <div className="py-8 px-3">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbAndStrgServices.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl h-[60vh] w-[50vw]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 ">
                    <h1 className="text-2xl text-center font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-center">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}