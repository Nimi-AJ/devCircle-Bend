import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {AllChatHistory} from "./components/AllChatHistory"
import {Chat} from "./components/Chat";
import {io} from "socket.io-client";
import { useEffect } from 'react';



// const port = process.env.PORT || 6000; //Can't access dot env file from this folder so port is hard coded
const socket = io(`http://localhost:3006`);

const openChat = () => {
  const userInfo = "blank";//api call to retrieve user details
  socket.emit("openChat", userInfo)
}

function App() {
  
  useEffect(() => {    //Adds socket/io listener once front end application is rendered
   openChat();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/chats" component={AllChatHistory}></Route>
          <Route exact path="/chats/:id/sendTo/:id" component={Chat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
