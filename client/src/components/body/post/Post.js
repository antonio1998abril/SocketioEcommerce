import React, { useContext } from 'react'
import {DataContext} from '../../../GlobalState'
import Postcard from '../../utils/postCard/Postcard'

function Post() {
    const state=useContext(DataContext)
    const [post]=state.post
    return (
        <>
             <h2 className="app_title">
                    Realtime website ( chat, comments ... ) with MERN Stack and Socket.io
            </h2>
            <div className="post_page">
            {
            post.map(post=>(
                <Postcard key={post._id} post={post}/>
               ))
            }
            </div>
        </>
    )
}

export default Post
