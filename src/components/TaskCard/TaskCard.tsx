import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {

  // Other code...
  // You could add forms or buttons here to delete or update the task

  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      {/* Add a button or form to update the task */}
    </div>
  );
}

export default TaskCard;