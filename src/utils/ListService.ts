import { List } from '../types';

export default class ListService {
    static localStorageKey = 'lists';
  
    static getLists(): List[] {
      const lists = localStorage.getItem(this.localStorageKey);
      return lists ? JSON.parse(lists) : [];
    }
  
    static addList(list: List): List[] {
      const currentLists = this.getLists();
      const updatedLists = [...currentLists, list];
      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedLists));
      return updatedLists;
    }
  
    static updateList(updatedList: List): List[] {
      const currentLists = this.getLists();
      const index = currentLists.findIndex(list => list.id === updatedList.id);
      
      if (index !== -1) {
        currentLists[index] = updatedList;
        localStorage.setItem(this.localStorageKey, JSON.stringify(currentLists));
      }
      
      return currentLists;
    }
  
    static deleteList(listId: string): List[] {
      const currentLists = this.getLists();
      const updatedLists = currentLists.filter(list => list.id !== listId);
      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedLists));
      return updatedLists;
    }
}
