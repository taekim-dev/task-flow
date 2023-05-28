import { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import { Task } from '../../types';
import TaskForm from '../TaskForm/TaskForm';
import { Droppable } from 'react-beautiful-dnd';

interface TaskListProps {
    listTitle: string;
    tasks: Task[];
    listId: string;
    deleteTask: (taskId: string) => void;
    updateTask: (updatedTask: Task) => void;
    addTask: (listId: string, task: Task) => void;
    updateListName?: (newName: string) => void;
  }

  function TaskList({ listTitle, tasks, listId, deleteTask, updateTask, addTask, updateListName }: TaskListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && updateListName) {
      updateListName(newTitle);
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (updateListName) {
        updateListName(newTitle);
        setIsEditing(false);
    }
  };

  const handleAddTask = (newTask: Task) => {
    addTask(listId, newTask); // Using the addTask function from Board
    setShowAddTaskForm(false);
  };

  return (
    <div className="bg-gray-100 w-64 m-4 shadow-lg rounded-xl p-4">
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
  
      <Droppable droppableId={listId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[10px]">
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask} 
                updateTask={updateTask} 
                index={index} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  
      {showAddTaskForm && (
        <TaskForm 
          onSubmit={handleAddTask}
          onCancel={() => setShowAddTaskForm(false)}
        />
      )}
  
      <button onClick={() => setShowAddTaskForm(!showAddTaskForm)} className="w-full h-12 mt-4 border-2 border-dashed border-black rounded-md">
        <div className="flex justify-center items-center h-full">
          <span className="font-bold text-xl">+</span>
          <span className="ml-2">Add a task</span>
        </div>
      </button>
    </div>
  );
  
}

export default TaskList;
