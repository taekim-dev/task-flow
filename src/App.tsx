import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';

interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: string;
}

interface List {
  id: string;
  name: string;
  tasks: string[];  // An array of task IDs
}

function App() {
  const [username, setUsername] = useState<string>(''); 
  const [avatar, setAvatar] = useState<number>(1); 
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
      <Navbar username={username} avatar={avatar} totalTasks={tasks.length} />
    </div>
  );
}

export default App;
