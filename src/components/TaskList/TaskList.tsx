import { Task, List } from '../../types';
import TaskCard from '../TaskCard/TaskCard';

interface TaskListProps {
  list: List;
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  deleteList: (listId: string) => void;
  updateList: (updatedList: List) => void;
}

function TaskList({list, tasks, addTask, deleteTask, updateTask, deleteList, updateList}: TaskListProps) {
  // Other code...

  return (
    <div>
      <h2>{list.name}</h2>
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
      {/* Button or Form to add a new task */}
    </div>
  );
}

export default TaskList;
