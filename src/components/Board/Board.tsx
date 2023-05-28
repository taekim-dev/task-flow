import { Task, List } from '../../types';
import TaskService from '../../utils/TaskService';
import ListService from '../../utils/ListService';
import TaskList from '../TaskList/TaskList';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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
                { id: uuidv4(), name: 'To Do' },
                { id: uuidv4(), name: 'Doing' },
                { id: uuidv4(), name: 'Done' }
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
        task.listId = listId;
        task.position = allTasks.filter(t => t.listId === listId).length;
        const updatedTasks = TaskService.addTask(task);
        setAllTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = TaskService.deleteTask(taskId);
        setAllTasks(updatedTasks);
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
                name: newListName
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
        // Clone allTasks to avoid direct state mutation
        const newAllTasks = JSON.parse(JSON.stringify(allTasks));
      
        // Find the task in allTasks and update its listId and position
        const task = newAllTasks.find((task: Task) => task.listId === sourceListId && task.position === sourceIndex);
        if (!task) return;
        task.listId = destinationListId;
        task.position = destinationIndex;
      
        // Re-calculate the position property of all tasks within the source and destination lists
        newAllTasks
            .filter((task: Task) => task.listId === sourceListId && (task.position || 0) > sourceIndex)
            .forEach((task: Task) => { task.position = (task.position || 0) - 1; });
        newAllTasks
            .filter((task: Task) => task.listId === destinationListId && (task.position || 0) >= destinationIndex)
            .forEach((task: Task) => { task.position = (task.position || 0) + 1; });

        // Update allTasks state
        setAllTasks(newAllTasks);
      
        // Persist the updated state to local storage
        newAllTasks.forEach((task: Task) => TaskService.updateTask(task));
    };
    


    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
    
        // Check if there's a valid destination
        if (!destination) {
            return;
        }
    
        // Check if the location of the draggable has changed
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
    
        // If the location has changed, call the moveTask function
        moveTask(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index
        );
    };
    
       
    
 return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-blue-200 flex flex-row min-h-screen overflow-auto items-start">
        {allLists.map((list) => (
        <TaskList
            key={list.id}
            listTitle={list.name}
            listId={list.id}
            tasks={allTasks.filter((task) => task.listId === list.id).sort((a, b) => (a.position || 0) - (b.position || 0))}
            deleteTask={handleDeleteTask}
            updateTask={handleUpdateTask}
            updateListName={(newName: string) => handleUpdateListName(list.id, newName)}
            addTask={handleAddTask}
        />
    ))}
        <button onClick={handleAddList} className="bg-gray-50 w-64 m-4 shadow-lg rounded-xl p-4 h-12 flex justify-center items-center">
            + Add another list
        </button>
      </div>
      <div className="m-4">
        <button className="bg-gray-50 w-64 m-4 shadow-lg"
        onClick={() => moveTask( "7922ad39-4d56-4c60-958c-c42a6c5c8953", "df67948d-70c6-412d-bc41-b5d48b5b9950"
        , 3, 0)} 
        >
        Test Move Task
        </button>
      </div>
    </DragDropContext>
  );      
}

export default Board;


