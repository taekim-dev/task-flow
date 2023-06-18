import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LandingPage from './components/LandingPage/LandingPage';
import storageService from './utils/storageService';

function App() {
  const [username, setUsername] = useState<string>(storageService.getItem('username') || ''); 
  const [avatar, setAvatar] = useState<number>(Number(storageService.getItem('avatar')) || 1);

  useEffect(() => {
    storageService.setItem('username', username);
    storageService.setItem('avatar', avatar.toString());
  }, [username, avatar]);

  const handleLogout = () => {
    setUsername('');
    setAvatar(1);
    storageService.clear();
  }

  return (
    <Router>
      <div className="App">
        {username === '' ? (
          <LandingPage setUsername={setUsername} setAvatar={setAvatar} />
        ) : (
          <>
            <Navbar username={username} avatar={avatar} onLogout={handleLogout} />
            <Board />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
