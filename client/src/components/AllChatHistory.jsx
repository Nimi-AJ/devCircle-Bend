import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {io} from "socket.io-client";
import styles from '../styles/AllChatHistory.css';
import {FaSearch} from 'react-icons/fa';



// const port = process.env.PORT || 6000; //Can't access dot env file from this folder so port is hard coded
const socket = io(`http://localhost:3006`);


export const AllChatHistory = () => {
    const [allChats, setAllChats] = useState([])
    const [count, setCount] = useState(0);

   
    
    
    useEffect(() => {


        //fetch from allChats/db
        let dbAllChats = [
            {
                sender: "Jane",
                receiver: "Smilga",
                message: "Sample1 messsage"
            },
            {
                sender: "Traversy",
                receiver: "Smilga",
                message: "Sample2 messsage"
            },
            {
                sender: "Drake",
                receiver: "Smilga",
                message: "Sample2 messsage"
            }
        ]
        
        socket.on("connected", (blankPayLoad) => { //When user reconnects set state with chat history from DB
            setAllChats(dbAllChats);
        })

        socket.on("newMessage", () => {
            //make api call and add most recent message to state
        })


        

    }, [])


    return (
        <div className={styles.Container}>
            <h1 className={styles.icons}>
                 <b>Chats</b>
             </h1>
             <form className={styles.example}>
                 <input type="username" />
                 <button type="submit"><FaSearch /></button>
             </form>
            {
                
                [...allChats].reverse().map((item) => {
                    setCount(count++);
                    return(
                        <div key={count}>
                            <div className={styles.row}>
                            <img src={null} alt="paschal" className={styles.circle} />
                            <div className={styles.pillow}>
                                <h3><b>Al-ameen Sodiq</b></h3>
                                <h4>Full-Stack Developer</h4>
                            </div>
                            <h4 className={styles.bed}>11:30p.m</h4>
                            </div>                              
                        </div>
                    )
                })
            }
        </div> 
    )
    
}
