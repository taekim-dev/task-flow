export interface Task {
    id: string;
    name: string;
    labels: LabelColor[];
    description: string;
    dueDate: string;
    status: string;
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
    Yellow = '#FBC64E',
    Purple = '#B39EB5',
    Orange = '#FFB347'
}
