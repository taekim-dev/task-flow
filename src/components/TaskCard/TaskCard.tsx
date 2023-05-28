import { Task } from '../../types';
import { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  index: number;
}

function TaskCard({ task, deleteTask, updateTask, index }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (updatedTask: Task) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
    : "No Due Date";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
          className="relative bg-white m-2 p-4 rounded-md"
        >
          <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="absolute right-2 top-2 font-bold ">X</button>
          <div onClick={() => setIsEditing(true)}>
            <div className="flex mb-2">
              {task.labels.map((label, index) => (
                <div
                  key={index}
                  className="w-1/4 h-2 rounded mr-1"
                  style={{ backgroundColor: label }}
                />
              ))}
            </div>
            <h4 className="text-left text-lg font-bold mb-4">{task.name}</h4>
            <p>{formattedDate}</p>
          </div>
          {isEditing && (
            <TaskForm initialData={task} onSubmit={handleSubmit} onCancel={() => setIsEditing(false)} />
          )}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
