import pkg from 'pg';
import dotenv from "dotenv";

const {Pool} = pkg;
dotenv.config();


export const pool = new Pool();


export const getChat = {
    allChat: async(req, res) => {
        //query all chats for user
        return "blank"
    },

    currentChat: async(req, res) => {
        return "blank"
    }
}

