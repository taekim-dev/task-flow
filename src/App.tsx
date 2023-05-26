import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import LandingPage from './components/LandingPage/LandingPage';
import { Task, List, LabelColor } from './types';
import storageService from './utils/storageService';

function App() {
  const [username, setUsername] = useState<string>(storageService.getItem('username') || ''); 
  const [avatar, setAvatar] = useState<number>(Number(storageService.getItem('avatar')) || 1);
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 'task1', 
      name: 'Task 1', 
      labels: [LabelColor.Red], 
      description: 'Description for Task 1', 
      dueDate: new Date().toLocaleDateString('en-CA'), 
      status: 'list1' 
    },
    { 
      id: 'task2', 
      name: 'Task 2', 
      labels: [LabelColor.Blue], 
      description: 'Description for Task 2', 
      dueDate: new Date('2023-06-01').toLocaleDateString('en-CA'), 
      status: 'list2' 
    },
    { 
      id: 'task3', 
      name: 'Task 3', 
      labels: [LabelColor.Green, LabelColor.Red],  // Multiple labels
      description: 'Description for Task 3', 
      dueDate: new Date().toLocaleDateString('en-CA'), 
      status: 'list3' 
    },
    { 
      id: 'task4', 
      name: 'Task 4', 
      labels: [LabelColor.Yellow], 
      description: 'Description for Task 4', 
      dueDate: new Date().toLocaleDateString('en-CA'), 
      status: 'list4' 
    },
  ]);
  
  const [lists, setLists] = useState<List[]>([
    { id: 'list1', name: 'To Do', tasks: ['task1'] },
    { id: 'list2', name: 'Doing', tasks: ['task2'] },
    { id: 'list3', name: 'Done', tasks: ['task3', 'task4'] },
  ]);

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
