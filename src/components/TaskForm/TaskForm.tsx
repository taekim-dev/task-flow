import { Task } from '../../types';
import { useState } from 'react';

interface TaskFormProps {
  initialData?: Task; // We make this optional as it won't be necessary when adding a new task
  onSubmit: (task: Task) => void;
}

function TaskForm({ initialData, onSubmit }: TaskFormProps) {
  // We can use React's useState hook to manage the form input state
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // We will call the onSubmit function with the task data
    onSubmit({
      id: initialData?.id || 'newId', // Generate a new ID for a new task
      name,
      description,
      dueDate,
      status: initialData?.status || 'To Do', // Default status for a new task
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Add your form fields here. They should update the respective state variables on change. */}
    </form>
  );
}

export default TaskForm;
