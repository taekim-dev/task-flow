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
    
        if (!tasksFromLocalStorage) {
            setAllTasks([]);
        } else {
            setAllTasks(tasksFromLocalStorage);
        }
    
        if (!listsFromLocalStorage || listsFromLocalStorage.length === 0) {
            const defaultLists = [
                { id: uuidv4(), name: 'To Do', tasks: [] },
                { id: uuidv4(), name: 'Doing', tasks: [] },
                { id: uuidv4(), name: 'Done', tasks: [] }
            ];  
            defaultLists.forEach(list => {
                ListService.addList(list);
            });
            const updatedListsFromLocalStorage = ListService.getLists();
            setAllLists(updatedListsFromLocalStorage);
        } else {
            setAllLists(listsFromLocalStorage);
        }
    }, []);

    const handleAddTask = (listId: string, task: Task) => {
        const updatedTasks = TaskService.addTask(task);
        setAllTasks(updatedTasks);

        const listToUpdate = allLists.find(list => list.id === listId);
        if (listToUpdate) {
            listToUpdate.tasks.push(task.id);
            const updatedLists = ListService.updateList(listToUpdate);
            setAllLists(updatedLists);
        }
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = TaskService.deleteTask(taskId);
        setAllTasks(updatedTasks);
    
        const listsToUpdate = allLists.filter(list => list.tasks.includes(taskId));
    
        listsToUpdate.forEach(list => {
            const taskIndex = list.tasks.indexOf(taskId);
            if (taskIndex > -1) {
                list.tasks.splice(taskIndex, 1);
            }
        });
    
        const updatedLists = listsToUpdate.map(list => {
            const listUpdateResult = ListService.updateList(list);
            // Since ListService.updateList returns List[], we take the first element
            return listUpdateResult[0];
        });
    
        // Replace the old versions of the lists with their new versions
        setAllLists(allLists.map(list => updatedLists.find(updatedList => updatedList.id === list.id) || list));
    };
    

    const handleUpdateTask = (updatedTask: Task) => {
        const updatedTasks = TaskService.updateTask(updatedTask);
        setAllTasks(updatedTasks);
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

    const moveTask = (sourceListId: string, destinationListId: string, sourceIndex: number, destinationIndex: number) => {
        // Clone allLists and allTasks to avoid direct state mutation
        const newAllLists = JSON.parse(JSON.stringify(allLists));
        const newAllTasks = JSON.parse(JSON.stringify(allTasks));
      
        // Find the source and destination list
        const sourceList = newAllLists.find((list: List) => list.id === sourceListId);
        const destinationList = newAllLists.find((list: List) => list.id === destinationListId);
        if (!sourceList || !destinationList) return;
      
        // Get the task ID and remove it from the source list
        const taskId = sourceList.tasks[sourceIndex];
        sourceList.tasks.splice(sourceIndex, 1);
      
        // Add it to the destination list at the right index
        destinationList.tasks.splice(destinationIndex, 0, taskId);
      
        // Find the task in allTasks and update its position and listId
        const task = newAllTasks.find((task: Task) => task.id === taskId);
        if (!task) return;
        task.position = destinationIndex;
        task.listId = destinationListId;
      
        // Re-calculate the position property of all tasks within the source and destination lists
        sourceList.tasks.forEach((taskId: string, index: number) => {
            const task = newAllTasks.find((task: Task) => task.id === taskId);
            if (task) task.position = index;
        });
        destinationList.tasks.forEach((taskId: string, index: number) => {
            const task = newAllTasks.find((task: Task) => task.id === taskId);
            if (task) task.position = index;
        });
      
        // Update allTasks and allLists state
        setAllTasks(newAllTasks);
        setAllLists(newAllLists);
      
        // Persist the updated state to local storage
        newAllTasks.forEach((task: Task) => TaskService.updateTask(task));
        newAllLists.forEach((list: List) => ListService.updateList(list));
    };
    
      
    return (
        <div>
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
                    addTask={handleAddTask}
                    moveTask={moveTask}
                />
            ))}
            <button onClick={handleAddList} className="bg-gray-50 w-64 m-4 shadow-lg rounded-xl p-4 h-12 flex justify-center items-center">
                + Add another list
            </button>
          </div>

        </div>
      );      
}

export default Board;
