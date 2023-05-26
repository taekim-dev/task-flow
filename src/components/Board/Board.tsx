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
    <div className="bg-blue-200 min-h-screen">
      {lists.map((list) => (
        <TaskList 
          key={list.id} 
          list={list} 
          tasks={tasks.filter((task) => list.tasks.includes(task.id))}
          addTask={addTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          deleteList={deleteList}
          updateList={updateList}
        />
      ))}
    </div>
  );
}

export default Board;
