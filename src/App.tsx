import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LandingPage from './components/LandingPage/LandingPage';
import storageService from './utils/storageService';

function App() {
  const [username, setUsername] = useState<string>(storageService.getItem('username') || ''); 
  const [avatar, setAvatar] = useState<number>(Number(storageService.getItem('avatar')) || 1);

  return (
    <div className="App">
      {username === '' ? (
        <LandingPage setUsername={setUsername} setAvatar={setAvatar} />
      ) : (
        <>
          <Navbar username={username} avatar={avatar} />
          <Board />
        </>
      )}
    </div>
  );
}

export default App;
