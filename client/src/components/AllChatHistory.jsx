import React from 'react'
import { useEffect, useContext, useState } from 'react';
import {io} from "socket.io-client";
import styles from '../styles/AllChatHistory.css';
import {FaSearch} from 'react-icons/fa';



// const port = process.env.PORT || 6000; //Can't access dot env file from this folder so port is hard coded
const socket = io(`http://localhost:3006`);



export const AllChatHistory = () => {
    let dbAllChats = [
        {
            // sender: "Jane",
            // receiver: "Smilga",
            id: 1,
            message: "Sample1 messsage"
        },
        {
            // sender: "Traversy",
            // receiver: "Smilga",
            id: 2,
            message: "Sample2 messsage"
        },
        {
            // sender: "Drake",
            // receiver: "Smilga",
            id: 3,
            message: "Sample2 messsage"
        }
    ]
    const [allChats, setAllChats] = useState([dbAllChats]);

   
    const fetchAllChats = (message) => {
        setAllChats(message);
    }

    const appendChat = (data) => {
        let chats = allChats.filter((item) => { return item.id !== data.id})
        setAllChats(...chats, data.message);
    }
   
    
    
    useEffect(() => {
        //fetch from allChats/db
       
        socket.on("connected", () => { //When user reconnects set state with chat history from DB
            console.log(5);
            fetchAllChats(allChats);
            // console.log(counter++)
            // console.log(allChats);
        })
        console.log('useEffect')

        socket.on("newMessage", (data) => {
            //make api call and add most recent message to state
            appendChat(data) //pass response here
            console.log("new message");
        })
    }, [allChats])



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
                
                [...allChats].reverse().map((item, index) => {
                    
                    return(
                        <div key={index}>
                            <div className={styles.row}>
                            <img src={null} alt="paschal" className={styles.circle} />
                            <div className={styles.pillow}>
                                
                                <h3><b>Al-ameen Sodiq</b></h3>
                                <h4>Full-Stack Developer</h4>
                            </div>
                            <h4 className={styles.bed}>11:30p.m</h4>
                            </div>                              
                            <div>

                            </div>
                        </div>
                    )
                })
                
            }
            <div>
                test
            </div>
        </div> 
    )
    
}
