import React from 'react';
import dbAndStrgServices from '../../appwrite/conf.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button.jsx';

function PostCard(
    {
        $id,
        featuredImage,
        title,
        userId
    }
) {
    const userData = useSelector((state) => state.auth.userData);

    console.log("userdata in card", userData.$id);
    console.log("id in card ", userId);




    const deletePost = () => {
        dbAndStrgServices.deletePost($id).then((status) => {
            if (status) {
                dbAndStrgServices.deleteFile(featuredImage);
                navigate("/");
            }
        });
    };

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full  bg-gray-100 rounded-xl p-4 justify-center items-center flex flex-col ">
                <div className="w-full flex justify-center  mb-4">
                    <img src={dbAndStrgServices.filePreview(featuredImage)} alt={title} className=' rounded-xl h-[150px] w-[200px]' />
                </div>
                <h2>
                    {title}
                </h2>
                {userData.$id === userId && (
                    <div className=" py-2 m-2 right-6 top-6">
                        <Link to={`/edit-post/${$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )
                }
            </div>
        </Link>
    )
}

export default PostCard;
