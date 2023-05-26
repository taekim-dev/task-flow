import React, { useState } from 'react';
import storageService from '../../utils/storageService';

interface Props {
  setUsername: (username: string) => void;
  setAvatar: (avatar: number) => void;
}

function LandingPage({ setUsername, setAvatar }: Props) {

  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);

  const handleAvatarClick = (avatarNumber: number) => {
    setSelectedAvatar(avatarNumber);
  }

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem('username') as HTMLInputElement;

    setUsername(usernameInput.value);
    setAvatar(selectedAvatar);

    // Store user information in localStorage
    storageService.setItem('username', usernameInput.value);
    storageService.setItem('avatar', String(selectedAvatar));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center">TaskFlow</h2>
        <div className="flex justify-center mt-6">
          {[1, 2, 3].map((avatarNumber) => (
            <img
            key={avatarNumber}
            className={`mx-2 w-24 h-24 cursor-pointer border-4 ${selectedAvatar === avatarNumber ? 'border-blue-500' : 'border-transparent'}`}
            src={`/img/Avatar-${avatarNumber}.jpg`}
            alt={`Avatar ${avatarNumber}`}
            onClick={() => handleAvatarClick(avatarNumber)}
          />  
          ))}
        </div>
        <form onSubmit={handleSetupSubmit} className="flex flex-col items-center mt-6">
          <label className="text-xl font-bold mb-2">Username:</label>
          <input className="px-3 py-2 rounded-lg border-2 focus:border-blue-500" type="text" name="username" required />
          <button className="px-6 py-2 mt-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700" type="submit">Start</button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
