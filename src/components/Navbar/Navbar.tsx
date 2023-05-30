interface NavbarProps {
    username: string;
    avatar: number;
  }
  
  function Navbar({ username, avatar }: NavbarProps) {
    return (
      <div className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
        <div className="text-3xl font-bold text-blue-500 ml-3">
          TaskFlow
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-semibold">Welcome, {username}</span>
          <img 
            className="h-12 w-12 rounded-full ml-3" 
            src={`/img/Avatar-${avatar}.jpg`} 
            alt="User avatar"
          />
          <a href="https://github.com/taekim-dev/task-flow" className="w-9 h-8">
            <img src="/img/Question-mark.jpg" alt="Question Mark" className="rounded-full" />
          </a>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  