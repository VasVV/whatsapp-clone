import logo from './logo.svg';
import './App.css';
import Chat from './chat';
import Sidebar from './sidebar';


function App() {
  return (
    <div className="app">
      
      <div className='app__body'>
          <Sidebar />
          <Chat />

      </div>
    </div>
  );
}

export default App;
