import React,{useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Button , Input ,RTE } from '../index';
import { useForm } from 'react-hook-form';
import database from '../../appWirte/Storage';

function PostForm({post}) {
    const navigate = useNavigate();
    const {handleSubmit, register, watch, getValues , control, setValue} = useForm({
        defaultValues: {
            title : post?.title || "",
            slug : post?.slug || "",
            content : post?.content || "",
            status : post?.status || "active"
        }
    });
    const userData = useSelector(state = state.user.userData);

    const submit = async(data)=>{
        if(post){
        const file = await database.uploadFile(post.image[0]);
        if(file){
            database.deleteFile(post.featuredImage);   
        }
        const dbPost = await database.updatePost(post.$id,
            {
                ...data,
                featuredImage: file ? file.$id : undefined
            }
        )
        if (dbPost) {
            navigate(`post/${dbPost.$id}`);
        }
        }else{
            cons
        }
    }

  return (
    <div>PostForm</div>
  )
}

export default PostForm