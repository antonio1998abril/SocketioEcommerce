import React from 'react'
import Rating from '../rating/Rating'
import './detailPostCard.css'
function detailPostCard({post}) {
    return (
        <div className="detail_post_card">
            
            <img  src={post.images.url} alt=""/>
            <div className="detail_post_card_content">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <button>NOTHING</button>
            </div>
                <h3 style={{margin: '10px 0'}}>Rating: {post.numReviews}  reviews</h3>
                <Rating props={post}/>

                <div >

                </div>
        </div>
    )
}

export default detailPostCard
