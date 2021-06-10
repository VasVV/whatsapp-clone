import logo from './logo.svg';
import './App.css';
import Chat from './chat';
import Sidebar from './sidebar';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SidebarChat from './sidebarchat';


function App() {
  const [user, setUser] = useState(null);



  return (
    <div className="app">
      
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
    </div>
  );
}

export default App;
