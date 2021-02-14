import React, { createContext,useState,useEffect } from 'react'
import {getData} from './components/utils/FetchData'
import io from 'socket.io-client'

export const DataContext=createContext()

export const DataProvider=({children})=>{
    const [post,setPost]=useState([])
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        getData('/api/post')
        .then(res => setPost(res.data.post))
            .catch(err=>console.log(err.response.data.msg))
            //inicio de sockt io
        const socket = io()
        setSocket(socket)
        return () =>  socket.close()

        },[])

    const state={
        post:[post,setPost],
        socket
    }
    return(
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
    
}