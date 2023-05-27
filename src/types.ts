export interface Task {
    id: string;
    name: string;
    labels: LabelColor[];
    description: string;
    dueDate: string;
    listId: string;
  }
  
  export interface List {
    id: string;
    name: string;
    tasks: string[];  // An array of task IDs
  }
  
  export enum LabelColor {
    Red = '#FF6961',
    Blue = '#92A8D1',
    Green = '#77DD77',
    Yellow = '#FFE800',
    Purple = '#B39EB5',
    Orange = '#FFAE06'
}
