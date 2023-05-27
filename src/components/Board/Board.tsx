import { Task, List } from '../../types';
import TaskService from '../../utils/TaskService';
import ListService from '../../utils/ListService';
import TaskList from '../TaskList/TaskList';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Board() {
    const [allTasks, setAllTasks] = useState<Task[]>(TaskService.getTasks());
    const [allLists, setAllLists] = useState<List[]>(ListService.getLists());

    useEffect(() => {
        const tasksFromLocalStorage = TaskService.getTasks();
        const listsFromLocalStorage = ListService.getLists();

        if (tasksFromLocalStorage) {
            setAllTasks(tasksFromLocalStorage);
        }

        if (listsFromLocalStorage) {
            setAllLists(listsFromLocalStorage);
        }
    }, []);

    const handleAddTask = (listId: string, task: Task) => {
        const updatedTasks = TaskService.addTask(task);
        setAllTasks(updatedTasks);
        // You might also want to update the corresponding list's tasks here.
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = TaskService.deleteTask(taskId);
        setAllTasks(updatedTasks);
        // You might also want to update the corresponding list's tasks here.
    };

    const handleUpdateTask = (updatedTask: Task) => {
        const updatedTasks = TaskService.updateTask(updatedTask);
        setAllTasks(updatedTasks);
        // You might also want to update the corresponding list's tasks here.
    };

    const handleAddList = () => {
        const newListName = prompt('Enter new list name');
        if (newListName) {
            const newList: List = {
                id: uuidv4(),
                name: newListName,
                tasks: []
            };
            const updatedLists = ListService.addList(newList);
            setAllLists(updatedLists);
        }
    };

    const handleUpdateListName = (listId: string, newName: string) => {
        const listToUpdate = allLists.find(list => list.id === listId);
        if (listToUpdate) {
            listToUpdate.name = newName;
            const updatedLists = ListService.updateList(listToUpdate);
            setAllLists(updatedLists);
        }
    };

    return (
        <div className="bg-blue-200 flex flex-row min-h-screen overflow-auto items-start">
            {allLists.map((list) => (
                <TaskList
                    key={list.id}
                    listTitle={list.name}
                    listId={list.id}
                    tasks={allTasks.filter((task) => list.tasks.includes(task.id))}
                    deleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}
                    updateListName={(newName: string) => handleUpdateListName(list.id, newName)}
                />
            ))}
            <button onClick={handleAddList} className="bg-gray-50 w-64 m-4 rounded-xl p-4 h-12 flex justify-center items-center">
                + Add another list
            </button>
        </div>
    );
}

export default Board;
