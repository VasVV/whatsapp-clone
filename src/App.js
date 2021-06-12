import logo from './logo.svg';
import './App.css';
import Chat from './chat';
import Sidebar from './sidebar';
import React, {useState, useContext, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SidebarChat from './sidebarchat';
import Login from './login';
import userContext from './userContext';
import { useStateValue } from './stateProvider';




function App() {
  const [{user}, dispatch] = useStateValue()
  

  


  return (
    
    <div className="app">
      
      {
        !user? (
          <Login />
        ) : (
          <div className='app__body'>
      
        <Router>
        <Sidebar />
          <Switch>
            <Route path='/rooms/:roomId'>
              <Chat />
            </Route>
       </Switch>
       </Router>
      </div>
        )
      }
      
     
    </div>
    
  );
}

export default App;
