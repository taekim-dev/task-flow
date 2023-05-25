export interface Task {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    status: string;
  }
  
  export interface List {
    id: string;
    name: string;
    tasks: string[];  // An array of task IDs
  }
  