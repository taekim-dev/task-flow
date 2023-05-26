import { Task, LabelColor } from '../../types';
import { useState } from 'react';

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

    onSubmit({
      id: initialData?.id || 'newId',
      name,
      labels,
      description,
      dueDate,
      status: initialData?.status || 'To Do',
    });
  };

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-10" 
      onClick={(e) => e.stopPropagation()} // Stop the click event from propagating to the parent
    >
      <form
        className="bg-white w-3/5 h-2/5 border-4 border-black shadow-xl p-4 flex flex-col justify-between"
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
        <div className="flex justify-center space-x-4 mb-4">
        <div className="w-1/2">
            <label>Label:</label>
            <select 
            multiple={true} 
            value={labels} 
            onChange={(e) => {
                const selectedLabels = Array.from(e.target.selectedOptions).map((option) => option.value as LabelColor);
                setLabels(selectedLabels);
            }}
            className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-base p-2"
            >
            {Object.entries(LabelColor).map(([colorName, colorValue]) => (
                <option key={colorValue} value={colorValue} style={{ color: colorValue }}>
                {colorName}
                </option>
            ))}
            </select>
        </div>
        <div className="w-1/2">
            <label>Due Date:</label>
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-base p-2"
            />
        </div>
        </div>

        <div className="mb-2">
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            maxLength={300}
            className="w-full h-1/3 mt-1 p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-base"
          />
        </div>
        <button className="self-end py-1 px-3 rounded bg-blue-500 text-white" type="submit">Save</button>
      </form>
    </div>
  );
}

export default TaskForm;