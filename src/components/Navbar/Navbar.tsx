interface NavbarProps {
  username: string;
  avatar: number;
}

function Navbar({ username, avatar }: NavbarProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200">
      <div className="text-2xl ml-2 font-bold text-blue-600">
        TaskFlow
      </div>
      <div className="flex items-center">
        <span className="text-xl font-semibold">Welcome, {username}</span>
        <img 
          className="h-12 w-12 rounded-full mr-3" 
          src={`/img/Avatar-${avatar}.jpg`} 
          alt="User avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
