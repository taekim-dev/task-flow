import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Board from './components/Board/Board';
import { Task, List } from './types';

function App() {
  const [username, setUsername] = useState<string>(''); 
  const [avatar, setAvatar] = useState<number>(1); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
    const avatarInput = form.elements.namedItem('avatar') as HTMLInputElement;

    setUsername(usernameInput.value);
    setAvatar(Number(avatarInput.value));
  }

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
    <div className="App bg-gray-200 min-h-screen">
      {username === '' ? (
        <form onSubmit={handleSetupSubmit} className="mx-auto mt-20 w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input type="text" name="username" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avatar Number:
            </label>
            <input type="number" min="1" max="5" name="avatar" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Start</button>
        </form>
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
