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
    const [creatingNewList, setCreatingNewList] = useState<boolean>(false);
    const [newListName, setNewListName] = useState<string>('');

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

    const migrateTasks = () => {
        const newAllTasks: Task[] = allTasks.map(task => {
            const tasksInList = allTasks.filter(t => t.listId === task.listId);
            tasksInList.sort((a, b) => (a.position || 0) - (b.position || 0) || a.id.localeCompare(b.id));
            const newTaskPosition = tasksInList.findIndex(t => t.id === task.id);
            return {...task, position: newTaskPosition};
        });
    
        // Check if the newAllTasks array is different from the current allTasks array
        if (JSON.stringify(newAllTasks) !== JSON.stringify(allTasks)) {
            setAllTasks(newAllTasks);
            TaskService.saveTasks(newAllTasks);
        }
    };    

    useEffect(() => {
        migrateTasks();
    }, [allTasks, allLists]); 

    const handleAddTask = (listId: string, task: Task) => {
        const tasksInList = allTasks.filter(t => t.listId === listId);
        task.listId = listId;
        task.position = tasksInList.length;
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

    const handleUpdateListName = (listId: string, newName: string) => {
        const listToUpdate = allLists.find(list => list.id === listId);
        if (listToUpdate) {
            listToUpdate.name = newName;
            const updatedLists = ListService.updateList(listToUpdate);
            setAllLists(updatedLists);
        }
    };


    const moveTask = (sourceListId: string, destinationListId: string, sourceIndex: number, destinationIndex: number) => {
        const newAllTasks = JSON.parse(JSON.stringify(allTasks));
    
        const task = newAllTasks.find((task: Task) => task.listId === sourceListId && task.position === sourceIndex);
        if (!task) return;
    
        const sourceTasks = newAllTasks.filter((t: Task) => t.listId === sourceListId);
        const destinationTasks = newAllTasks.filter((t: Task) => t.listId === destinationListId);
    
        if (sourceListId === destinationListId) {
            sourceTasks
                .filter((t: Task) => t.position >= Math.min(sourceIndex, destinationIndex) && t.position <= Math.max(sourceIndex, destinationIndex))
                .forEach((t: Task) => {
                    t.position = t.position === sourceIndex ? destinationIndex : (sourceIndex > destinationIndex ? t.position + 1 : t.position - 1);
                });
        } else {
            sourceTasks
                .filter((t: Task) => t.position > sourceIndex)
                .forEach((t: Task) => {
                    t.position -= 1;
                });
    
            destinationTasks
                .filter((t: Task) => t.position >= destinationIndex)
                .forEach((t: Task) => {
                    t.position += 1;
                });
    
            task.listId = destinationListId;
            task.position = destinationIndex;
        }
    
        setAllTasks(newAllTasks);
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

    const handleDeleteList = (listId: string) => {
        // Delete the list from allLists and update the ListService
        const updatedLists = ListService.deleteList(listId);
        setAllLists(updatedLists);
    
        // Delete all tasks associated with this list from allTasks and update the TaskService
        const tasksToDelete = allTasks.filter(task => task.listId === listId);
        tasksToDelete.forEach(task => {
            const updatedTasks = TaskService.deleteTask(task.id);
            setAllTasks(updatedTasks);
        });
    };

    const handleAddList = () => {
        if (newListName) {
            const newList: List = {
                id: uuidv4(),
                name: newListName
            };
            const updatedLists = ListService.addList(newList);
            setAllLists(updatedLists);
            // reset the list creation state
            setNewListName('');
            setCreatingNewList(false);
        }
    };

    const startNewListCreation = () => {
        setCreatingNewList(true);
    };

    const cancelNewListCreation = () => {
        setNewListName('');
        setCreatingNewList(false);
    };

    const handleNewListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewListName(event.target.value);
    };

    const handleNewListNameKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddList();
        }
    };
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="bg-blue-200 flex flex-row min-h-screen overflow-auto items-start">
            {allLists.map((list) => (
                <TaskList
                    key={list.id}
                    listTitle={list.name}
                    listId={list.id}
                    tasks={allTasks.filter((task) => task.listId === list.id)
                    .sort((a, b) => (a.position || 0) - (b.position || 0) || a.id.localeCompare(b.id))} // Add fallback sort by id
                    deleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}
                    updateListName={(newName: string) => handleUpdateListName(list.id, newName)}
                    addTask={handleAddTask}
                    deleteList={handleDeleteList}
                />
            ))}
            {creatingNewList ? (
                <div className="bg-gray-50 w-64 m-4 shadow-lg rounded-xl p-4 h-12 flex justify-center items-center">
                    <input 
                        value={newListName}
                        onChange={handleNewListNameChange}
                        onKeyDown={handleNewListNameKeyPress}
                        onBlur={cancelNewListCreation}
                        autoFocus
                        className="flex-grow text-center font-bold"
                    />
                </div>
            ) : (
                <button onClick={startNewListCreation} className="bg-gray-50 w-64 m-4 shadow-lg rounded-xl p-4 h-12 flex justify-center items-center">
                    + Add another list
                </button>
            )}
            </div>
        </DragDropContext>
    );    
}

export default Board;


