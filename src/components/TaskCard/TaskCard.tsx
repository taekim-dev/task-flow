import { Task } from '../../types';
import { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm'; // import TaskForm component

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (updatedTask: Task) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white m-2 p-4 rounded-md" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <TaskForm initialData={task} onSubmit={handleSubmit} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <div className="flex mb-2">
            {task.labels.map((label, index) => (
              <div
                key={index}
                className="w-1/4 h-2 rounded mr-1"
                style={{ backgroundColor: label }}
              />
            ))}
          </div>
          <h4 className="text-left text-lg font-bold ">{task.name}</h4>
          <p>{task.dueDate}</p>
          <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
