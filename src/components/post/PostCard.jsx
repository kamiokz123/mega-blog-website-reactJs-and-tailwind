import React from 'react';
import dbAndStrgServices from '../../appwrite/conf.js';
import { Link } from 'react-router-dom';

function PostCard(
    {
        $id,
        featuredImage,
        title
    }
) {
    
    
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full  bg-gray-100 rounded-xl p-4 justify-center items-center flex flex-col ">
                <div className="w-full flex justify-center  mb-4">
                    <img src={dbAndStrgServices.filePreview(featuredImage)} alt={title} className=' rounded-xl h-[150px] w-[200px]' />
                </div>
                <h2>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard;
