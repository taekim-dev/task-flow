import { render, fireEvent } from '@testing-library/react';
import App from './App';
import Navbar from './components/Navbar/Navbar';
import ListForm from './components/ListForm/ListForm';
import TaskForm from './components/TaskForm/TaskForm';

describe('App component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('TaskFlow')).toBeInTheDocument();
  });

});

describe('Navbar component', () => {
    const username = "John";
    const avatar = 1;
  
    test('Navbar renders correctly', () => {
      const { getByText } = render(<Navbar username={username} avatar={avatar} />);
      expect(getByText('TaskFlow')).toBeInTheDocument();
      expect(getByText(`Welcome, ${username}`)).toBeInTheDocument();
    });

    test('Displays username correctly', () => {
      const { getByText } = render(<Navbar username={username} avatar={avatar} />);
      expect(getByText(`Welcome, ${username}`)).toBeInTheDocument();
    });
  
    test('Avatar renders correctly', () => {
      const { getByAltText } = render(<Navbar username={username} avatar={avatar} />);
      const avatarImage = getByAltText("User avatar");
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', `/img/Avatar-${avatar}.jpg`);
    });
  
    test('Question mark image renders correctly', () => {
      const { getByAltText } = render(<Navbar username={username} avatar={avatar} />);
      const questionMarkImage = getByAltText("Question Mark");
      expect(questionMarkImage).toBeInTheDocument();
      expect(questionMarkImage).toHaveAttribute('src', '/img/Question-mark.jpg');
    });
  });


describe('ListForm component', () => {
  const onSubmit = jest.fn();

  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<ListForm onSubmit={onSubmit} />);
    expect(getByLabelText('List Name')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('form calls onSubmit correctly', () => {
    const { getByLabelText, getByText } = render(<ListForm onSubmit={onSubmit} />);
    const input = getByLabelText('List Name');

    fireEvent.change(input, { target: { value: 'New list' } });
    fireEvent.click(getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'New list'
    });
  });

});

describe('TaskForm component', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
  
    test('renders correctly', () => {
      const { getByPlaceholderText, getByText } = render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);
      expect(getByPlaceholderText('Add a title...')).toBeInTheDocument();
      expect(getByPlaceholderText('Add a description...')).toBeInTheDocument();
      expect(getByText('Save')).toBeInTheDocument();
    });
  
    test('form calls onSubmit correctly', () => {
        const { getByPlaceholderText, getByText } = render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);
        const titleInput = getByPlaceholderText('Add a title...');
        const descriptionInput = getByPlaceholderText('Add a description...');
      
        fireEvent.change(titleInput, { target: { value: 'New task' } });
        fireEvent.change(descriptionInput, { target: { value: 'New description' } });
        fireEvent.click(getByText('Save'));
      
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          id: expect.any(String),
          name: 'New task',
          labels: expect.any(Array),
          description: 'New description',
          dueDate: "", // expect empty string for dueDate
          comments: expect.any(Array),
          listId: undefined, // expect undefined for listId
          position: expect.any(Number),
        }));
      });
      
  
    test('form calls onCancel correctly', () => {
      const { getByText } = render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);
      fireEvent.click(getByText('X'));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  
  });