interface NavbarProps {
  username: string;
  avatar: number;
  totalTasks: number;
}

function Navbar({ username, avatar, totalTasks }: NavbarProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
      <div className="text-2xl font-bold text-black-500">
        TaskFlow
      </div>
      <div className="flex items-center">
        <span className="text-xl font-semibold">Welcome, {username}</span>
        <img 
          className="h-12 w-12 rounded-full mr-2" 
          src={`/img/Avatar-${avatar}.jpg`} 
          alt="User avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
