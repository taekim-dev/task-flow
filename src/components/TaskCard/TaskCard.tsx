import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {
  // You can add more functionalities to update the task.
  // For example, you can make the task name editable on click, and have an "Update" button to update the task.
  // You can also add a form to allow the user to update the task's description and due date.
  // For now, let's keep it simple and just display the task's information.
  
  return (
    <div className="bg-white m-2 p-4 rounded-md">
      <h4 className="font-bold">{task.name}</h4>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => updateTask({ ...task, name: 'Updated name' })}>Update</button> 
      {/* The updateTask function is just an example. You should replace it with a function that actually updates the task. */}
    </div>
  );
}

export default TaskCard;
