interface NavbarProps {
    username: string;
    avatar: number;
    totalTasks: number;
  }
  
  const Navbar: React.FC<NavbarProps> = ({ username, avatar, totalTasks }) => {
    return (
      <nav>
        <div>Logo</div>
        <div>{username}</div>
        <div>Total tasks: {totalTasks}</div>
        <img src={`/path/to/avatars/avatar-${avatar}.jpg`} alt={`${username}'s avatar`} />
      </nav>
    );
  }
  
  export default Navbar;
  