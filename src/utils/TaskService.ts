import storageService from './storageService';
import { Task } from '../types';


class TaskService {
    private storageKey = 'tasks';

    getTasks(): Task[] {
        const tasksJSON = storageService.getItem(this.storageKey);
        if (tasksJSON) {
            return JSON.parse(tasksJSON);
        }
        return [];
    }

    addTask(task: Task) {
        const tasks = this.getTasks();
        tasks.push(task);
        storageService.setItem(this.storageKey, JSON.stringify(tasks));
    }

    deleteTask(taskId: string) {
        let tasks = this.getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        storageService.setItem(this.storageKey, JSON.stringify(tasks));
    }

    updateTask(updatedTask: Task) {
        let tasks = this.getTasks();
        tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        storageService.setItem(this.storageKey, JSON.stringify(tasks));
    }
}

export default new TaskService();
