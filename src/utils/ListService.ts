import { List } from '../types';
import storageService from './storageService';

class ListService {
  private storageKey = 'lists';

  getLists(): List[] {
    const lists = storageService.getItem(this.storageKey);
    return lists ? JSON.parse(lists) : [];
  }

  addList(list: List): List[] {
    const currentLists = this.getLists();
    const updatedLists = [...currentLists, list];
    storageService.setItem(this.storageKey, JSON.stringify(updatedLists));
    return updatedLists;
  }

  updateList(updatedList: List): List[] {
    const currentLists = this.getLists();
    const index = currentLists.findIndex(list => list.id === updatedList.id);
    
    if (index !== -1) {
      currentLists[index] = updatedList;
      storageService.setItem(this.storageKey, JSON.stringify(currentLists));
    }
    
    return currentLists;
  }

  deleteList(listId: string): List[] {
    const currentLists = this.getLists();
    const updatedLists = currentLists.filter(list => list.id !== listId);
    storageService.setItem(this.storageKey, JSON.stringify(updatedLists));
    return updatedLists;
  }
}

export default new ListService();
