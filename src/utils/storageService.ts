const storageService = {
    setItem: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting item ${key} to localStorage`, error);
      }
    },
    getItem: (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error(`Error getting item ${key} from localStorage`, error);
        return null;
      }
    },
    removeItem: (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item ${key} from localStorage`, error);
      }
    },
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage', error);
      }
    }
  };
  
  export default storageService;
  