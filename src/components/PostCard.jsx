import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import './main-card.css'


function PostCard({ $id, productName, images_5, category, price, discount, description }) {

  return (
    <Link to={`/item/${$id}`}>
      <div className='main-card'>

        <div className="card-img">
          <img src={appwriteService.getFilePreview(images_5)} alt={productName} />
        </div>
        <div className="text">
          <div className="title">
            <h2>{productName}</h2>
          </div>
          <div className="catgory">
            <h2>{category}</h2>
          </div>
          <div className="price-sec">
            <div className="discounted-price">
              <span>Rs:</span>
              <span>{price-discount}</span>
            </div>
            <div className="old-price-sec">
              <div className='old-price'>
                <span>Rs:</span>
                <span>{discount}</span>
              </div>
              <div className="disc">
                <span>Save</span>
                <span className='price'>
                  <span>Rs:</span>
                  <span>{discount}</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}


export default PostCard