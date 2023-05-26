import { Task, List } from '../../types';
import TaskList from '../TaskList/TaskList';

interface BoardProps {
  lists: List[];
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
  addList: (list: List) => void;
  deleteList: (listId: string) => void;
  updateList: (updatedList: List) => void;
}

function Board({lists, tasks, addTask, deleteTask, updateTask, addList, deleteList, updateList}: BoardProps) {
  // Other code...

  return (
    <div className="bg-blue-200 flex flex-row min-h-screen overflow-auto items-start">
      {lists.map((list) => (
        <TaskList 
          key={list.id} 
          listTitle={list.name} 
          tasks={tasks.filter((task) => list.tasks.includes(task.id))}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}

export default Board;
