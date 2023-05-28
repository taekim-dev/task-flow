export interface Task {
  id: string;
  name: string;
  labels: LabelColor[];
  description: string;
  dueDate: string;
  listId?: string;
  position: number;
}

export interface List {
  id: string;
  name: string;
}

export enum LabelColor {
  Red = '#FF6961',
  Blue = '#92A8D1',
  Green = '#77DD77',
  Yellow = '#FFE800',
  Purple = '#B39EB5',
  Orange = '#FFAE06'
}
