import { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { Task } from '../../types';
import TaskService from '../../utils/TaskService';
import { v4 as uuidv4 } from 'uuid';

interface TaskListProps {
  listTitle: string;
  tasks: Task[];
  listId: string;
  onAddTask?: () => void;
  isAddList?: boolean;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  updateListName?: (newName: string) => void;
}

function TaskList({ listTitle, tasks, listId, onAddTask, isAddList = false, deleteTask, updateTask, updateListName }: TaskListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);
  const [newTaskName, setNewTaskName] = useState('');
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);

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

  const handleAddTask = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTaskName.trim() !== '') {
      const newTask: Task = {
        id: uuidv4(),
        name: newTaskName.trim(),
        labels: [],
        description: '',
        dueDate: '',
        status: listId,
      };

      TaskService.addTask(newTask);
      setNewTaskName('');
    }
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
      {showAddTaskInput && (
        <input
          type="text"
          placeholder="Add a task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleAddTask}
          className="w-full h-12 mt-4 border-2 border-dashed border-black rounded-md"
        />
      )}
      <button onClick={() => setShowAddTaskInput(!showAddTaskInput)} className="w-full h-12 mt-4 border-2 border-dashed border-black rounded-md">
        <div className="flex justify-center items-center h-full">
          <span className="font-bold text-xl">+</span>
          <span className="ml-2">Add a task</span>
        </div>
      </button>
    </div>
  );
}

export default TaskList;
