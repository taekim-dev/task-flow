import { Task, LabelColor } from '../../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [labels, setLabels] = useState(initialData?.labels || []);
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = initialData?.id || uuidv4(); // When creating a new task, generate a new id
    const status = initialData?.status || 'To Do'; // Assign a default status to a new task
  
    onSubmit({
      id,
      name,
      labels,
      description,
      dueDate,
      status,
    });
  };

  const handleLabelChange = (color: LabelColor) => {
    if (labels.includes(color)) {
      setLabels(labels.filter(label => label !== color));
    } else {
      setLabels([...labels, color]);
    }
  };

  return (
    <div 
  className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-10" 
  onClick={(e) => e.stopPropagation()}
>
    <form
        className="bg-white w-1/2 h-2/5 border-4 border-black shadow-xl p-4 flex flex-col justify-between"
        onSubmit={handleSubmit}
    >
    <div className="flex justify-between">
      <input 
        className="text-2xl font-bold mb-2"
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="button" onClick={onCancel}>X</button>
    </div>
    <div className="flex justify-center space-x-4 mb-4 text-left">
      <div className="w-3/5">
        <label className="font-bold">Label:</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {Object.entries(LabelColor).map(([colorName, colorValue]) => (
            <div key={colorValue} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={labels.includes(colorValue)}
                onChange={() => handleLabelChange(colorValue as LabelColor)}
                className="form-checkbox h-4 w-4"
              />
              <span className="w-11 h-2 rounded" style={{ backgroundColor: colorValue }} title={colorName} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <label className="font-bold">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-base p-2"
        />
      </div>
    </div>
        <div className="mb-2 text-left">
        <label className="font-bold">Description:</label>
        <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            maxLength={300}
            className="w-full h-2/3 mt-1 p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-base"
        />
        </div>
        <button className="self-end py-1 px-3 rounded bg-blue-500 text-white" type="submit">Save</button>
    </form>
    </div>

  );
}

export default TaskForm;
