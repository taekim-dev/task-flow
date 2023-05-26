import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {

  return (
    <div className="bg-white m-2 p-4 rounded-md">
      <div className="flex mb-2">
        {task.labels.map((label, index) => (
          <div
            key={index}
            className="w-1/4 h-2 rounded mr-1"
            style={{ backgroundColor: label }}
          />
        ))}
      </div>
      <h4 className="font-bold">{task.name}</h4>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => updateTask({ ...task, name: 'Updated name' })}>Update</button>
    </div>
  );
}

export default TaskCard;
