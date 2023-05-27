import { Task, List } from '../../types';
import TaskList from '../TaskList/TaskList';
import { v4 as uuidv4 } from 'uuid';

interface BoardProps {
  lists: List[];
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  addList: (list: List) => void;
  deleteList: (listId: string) => void;
  updateList: (updatedList: List) => void;
}

function Board({lists, tasks, deleteTask, updateTask, addList, deleteList, updateList}: BoardProps) {
    
    const handleAddList = () => {
        // This could be a prompt, a modal, an input field, etc.
        const newListName = window.prompt('Enter new list name');
    
        if (newListName === null || newListName.trim() === '') {
          // Do nothing if the user cancels the prompt or enters an empty string
          return;
        }
    
        const newList: List = {
          id: uuidv4(), // Generate a new unique ID for the list
          name: newListName.trim(), // Use the user's input as the name
          tasks: [], // Initially empty
        };
    
        addList(newList); // Add the new list
    }
    
    const handleUpdateListName = (listId: string, newName: string) => {
        const updatedList = lists.find((list) => list.id === listId);
        if (updatedList) {
          updatedList.name = newName;
          updateList(updatedList);
        }
    }

  return (
    <div className="bg-blue-200 flex flex-row min-h-screen overflow-auto items-start">
      {lists.map((list) => (
        <TaskList 
          key={list.id} 
          listTitle={list.name}
          listId={list.id}
          tasks={tasks.filter((task) => list.tasks.includes(task.id))}
          deleteTask={deleteTask}
          updateTask={updateTask}
          updateListName={(newName: string) => handleUpdateListName(list.id, newName)} // Pass the function for updating list name
        />
      ))}
      <button onClick={handleAddList} className="bg-gray-50 w-64 m-4 rounded-xl p-4 h-12 flex justify-center items-center">
        + Add another list
      </button>
    </div>
  );
}

export default Board;
