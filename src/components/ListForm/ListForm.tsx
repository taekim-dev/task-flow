import { List } from '../../types';
import { useState } from 'react';

interface ListFormProps {
  initialData?: List;
  onSubmit: (list: List) => void;
}

function ListForm({ initialData, onSubmit }: ListFormProps) {
    const [name, setName] = useState(initialData?.name || '');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      onSubmit({
        id: initialData?.id || 'newId', // Generate a new ID for a new list
        name,
        tasks: initialData?.tasks || [], // New lists start with no tasks
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="listName">List Name</label>
        <input
          id="listName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
  

export default ListForm;
