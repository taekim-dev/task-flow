import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LandingPage from './components/LandingPage/LandingPage';
import storageService from './utils/storageService';
import TaskService from './utils/TaskService'; // import the TaskService here

function App() {
  const [username, setUsername] = useState<string>(storageService.getItem('username') || ''); 
  const [avatar, setAvatar] = useState<number>(Number(storageService.getItem('avatar')) || 1);
  const [totalTasks, setTotalTasks] = useState<number>(TaskService.getTasks().length); // Use TaskService to get the initial number of tasks

  useEffect(() => {
    const tasksFromLocalStorage = TaskService.getTasks();
    if (tasksFromLocalStorage) {
      setTotalTasks(tasksFromLocalStorage.length);
    }
  }, []); // Using an effect to update the totalTasks if the local storage changes

  return (
    <div className="App">
      {username === '' ? (
        <LandingPage setUsername={setUsername} setAvatar={setAvatar} />
      ) : (
        <>
          <Navbar username={username} avatar={avatar} totalTasks={totalTasks} />
          <Board />
        </>
      )}
    </div>
  );
}

export default App;
