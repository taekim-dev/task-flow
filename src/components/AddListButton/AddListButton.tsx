import { List } from '../../types';

interface AddListButtonProps {
  addList: (list: List) => void;
}

function AddListButton({ addList }: AddListButtonProps) {
  const handleClick = () => {
    // Similar to AddTaskButton, you would gather the details for the new list.

    const newList: List = {
      id: 'newId', // You would generate a unique ID.
      name: 'newList', // The user would input this.
      tasks: [], // New lists would likely start empty.
    };

    addList(newList);
  };

  return <button onClick={handleClick}>Add List</button>;
}

export default AddListButton;
