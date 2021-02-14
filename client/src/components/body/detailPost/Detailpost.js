import React,{useContext,useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import {DataContext} from '../../../GlobalState'
import CommentItem from '../../utils/commentItem/CommentItem'
import DetailPostCard from '../../utils/detailPostCard/detailPostCard'
import { getData } from '../../utils/FetchData'
import FormInput from '../../utils/formInput/FormInput'
import Loading from '../../utils/images/loading.gif'


function Detailpost() {
    const {id}=useParams()
    const state=useContext(DataContext)
    const [post]=state.post

    const [detailPost,setDetailPost]=useState([])
    const [rating, setRating] = useState(0)
    const socket=state.socket

    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(false)

    const [page, setPage] = useState(1)
    const pageEnd = useRef()
    useEffect(() => {
        setDetailPost(post.filter(post => post._id === id))
    },[id, post])

 /*    useEffect(()=>{
        setLoading(true)
        getData(`/api/comments/${id}`)
            .then(res=> {
                setComments(res.data.comments)
                setLoading(false)
                })
            .catch(err=>console.log(err.response.data.msg))
    },[id]) */
    useEffect(() => {
        setLoading(true)
        getData(`/api/comments/${id}?limit=${page * 5}`)
            .then(res => {
                setComments(r => r = res.data.comments)
                setLoading(false)
            })
            .catch(err => console.log(err.response.data.msg))
    },[id, page])

    useEffect(()=>{
        if(socket){
            socket.emit('joinRoom',id)
        }
    },[socket,id])

    useEffect(()=>{
        if(socket){
            socket.on('sendCommentToClient',msg=>{
               setComments([msg,...comments])
            })
            return ()=> socket.off('sendCommentToClient')
        }
    },[socket,comments])


        // infiniti scroll
        useEffect(() => {
            const observer = new IntersectionObserver(entries => {
                if(entries[0].isIntersecting){
                    setPage(prev => prev + 1)
                }
            },{
                threshold: 0.1
            })
    
            observer.observe(pageEnd.current)
        },[])


          // Reply Comments
    useEffect(() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]
                
                newArr.forEach(cm => {
                    if(cm._id === msg._id){
                        cm.reply = msg.reply
                    }
                })

                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        } 
    },[socket, comments])


    return (
        <div className="detail_post_page">
            {
                detailPost.map(post=>(
                    <DetailPostCard key={post._id} post={post}/>
                ))
            }
            <div className="comments">
                <h2 className="app_title">Socket io</h2>
          
             <div className="reviews">
                    <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                    <label htmlFor="rd-5" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>
                <FormInput id={id} socket={socket} rating={rating} />
                <div className="comments_list">
                {
                    comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} socket={socket} />
                    ))
                    }
                </div>
            </div>
            {
                loading && <div className="loading"><img src={Loading} alt=""/></div>
            }  
            <button ref={pageEnd} style={{opacity: 0}}>Load more</button>  
        </div>
    )
}

export default Detailpost
