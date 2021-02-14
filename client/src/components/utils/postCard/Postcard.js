import React from 'react'
import {Link} from 'react-router-dom'
import './Postcard.css'
function Postcard({post}) {
    const images=post.images.url

    return (
      
        <div className="post_card">
        
        {images ? (
            <img src={post.images.url} alt=""></img>
        ):(
            <img src={post.images} alt=""></img>
        )}
            <h3>{post.title}</h3>
            <span>${post.price}</span>
            <p>{post.description}</p>
            <div className="post_card_row">
                <Link to={`/post/${post._id}`}>View</Link>
                <button>BUY</button>
            </div>
        </div>
    )
}

export default Postcard
