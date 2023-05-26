import TaskCard from '../TaskCard/TaskCard';
import { Task } from '../../types';

interface TaskListProps {
  listTitle: string;
  tasks: Task[];
  onAddTask?: () => void;
  isAddList?: boolean;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}

function TaskList({ listTitle, tasks, onAddTask, isAddList = false, deleteTask, updateTask }: TaskListProps) {
  return (
    <div className="bg-gray-100 w-64 m-4 rounded-md p-4">
      <h3 className="text-center font-bold">{listTitle}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
      {isAddList ? (
        <button className="w-full h-12 mt-4 bg-blue-500 text-white rounded-md">+ Add another list</button>
      ) : (
        <button onClick={onAddTask} className="w-full h-12 mt-4 border-2 border-dashed border-black rounded-md">
          <div className="flex justify-center items-center h-full">
            <span className="font-bold text-xl">+</span>
            <span className="ml-2">Add a task</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default TaskList;
