import { Task } from '../../types';

interface AddTaskButtonProps {
  listId: string;
  addTask: (task: Task) => void;
}

function AddTaskButton({ listId, addTask }: AddTaskButtonProps) {
  const handleClick = () => {
    // Here you would gather the details for the new task.
    // This could involve opening a form, for example.

    const newTask: Task = {
      id: 'newId', // You would generate a unique ID.
      name: 'newTask', // The user would input this.
      description: 'newTaskDescription', // The user would input this.
      dueDate: '2023-01-01', // The user would input this.
      status: 'To Do', // Initial status.
    };

    addTask(newTask);
  };

  return <button onClick={handleClick}>Add Task</button>;
}

export default AddTaskButton;
