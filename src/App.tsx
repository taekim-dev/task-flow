import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LandingPage from './components/LandingPage/LandingPage';
import { Task, List } from './types';
import storageService from './utils/storageService';

function App() {
  const [username, setUsername] = useState<string>(storageService.getItem('username') || ''); 
  const [avatar, setAvatar] = useState<number>(Number(storageService.getItem('avatar')) || 1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  }

  const addList = (list: List) => {
    setLists(prevLists => [...prevLists, list]);
  }

  const deleteList = (listId: string) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
    setTasks(prevTasks => prevTasks.filter(task => !lists.find(list => list.id === listId)?.tasks.includes(task.id)));
  }

  const updateList = (updatedList: List) => {
    setLists(prevLists => prevLists.map(list => list.id === updatedList.id ? updatedList : list));
  }

  return (
    <div className="App">
      {username === '' ? (
        <LandingPage setUsername={setUsername} setAvatar={setAvatar} /> // render the LandingPage if there's no username
      ) : (
        <>
          <Navbar username={username} avatar={avatar} totalTasks={tasks.length} />
          <Board 
          lists={lists} 
          tasks={tasks} 
          addTask={addTask} 
          deleteTask={deleteTask} 
          updateTask={updateTask} 
          addList={addList} 
          deleteList={deleteList} 
          updateList={updateList} />
        </>
      )}
    </div>
  );
}

export default App;
