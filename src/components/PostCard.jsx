import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import './components.css'


function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='card'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} />
            <h2>{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard