import { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { Task } from '../../types';

interface TaskListProps {
  listTitle: string;
  tasks: Task[];
  onAddTask?: () => void;
  isAddList?: boolean;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  updateListName?: (newName: string) => void;
}

function TaskList({ listTitle, tasks, onAddTask, isAddList = false, deleteTask, updateTask, updateListName }: TaskListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateListName?.(newTitle);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    updateListName?.(newTitle);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 w-64 m-4 rounded-xl p-4">
      {isEditing ? (
        <input 
          type="text" 
          value={newTitle} 
          onChange={handleTitleChange} 
          onKeyPress={handleTitleKeyPress}
          onBlur={handleBlur}
        />
      ) : (
        <h3 className="text-center font-bold" onClick={() => setIsEditing(true)}>{listTitle}</h3>
      )}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
      {isAddList ? (
        <button className="w-full h-12 mt-4 bg-blue-500 text-white rounded-md">+ Add another list</button>
      ) : (
        <button onClick={onAddTask} className="w-full h-12 mt-4 border-2 border-dashed border-black rounded-md">
          <div className="flex justify-center items-center h-full">
            <span className="font-bold text-xl">+</span>
            <span className="ml-2">Add a task</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default TaskList;
