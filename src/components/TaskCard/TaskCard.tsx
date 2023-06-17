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

function addOrdinalSuffix(date: Date): string {
    const day = date.getDate();
    let suffix = '';

    if (day > 3 && day < 21) suffix = 'th';
    else {
        switch (day % 10) {
            case 1:  
                suffix = "st";
                break;
            case 2:  
                suffix = "nd";
                break;
            case 3:  
                suffix = "rd";
                break;
            default: 
                suffix = "th";
                break;
        }
    }

    return suffix;
}

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set time to 00:00:00 to only compare the date

  const dueDateObject = new Date(task.dueDate);
  
  const formattedDate = task.dueDate
    ? `${dueDateObject.toLocaleString('en-US', { month: 'long' })} ${dueDateObject.getDate()}${addOrdinalSuffix(dueDateObject)}, ${dueDateObject.getFullYear()}${dueDateObject < currentDate ? "❗" : ""}`
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
          <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className="absolute right-2 top-2 font-bold text-gray-500 hover:text-gray-900 active:text-red-500 focus:outline-none">X</button>
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
                <div className="flex justify-between items-center">
                <p>{formattedDate}</p>
                {task.comments.length > 0 && (
                    <div className="flex items-center">
                    <p>💬 {task.comments.length}</p>
                    </div>
                )}
                </div>
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
