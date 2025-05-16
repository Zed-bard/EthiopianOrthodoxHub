import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AuthButtons: React.FC = () => {
  const { user, signInWithGoogle, signInWithTelegram, signOut } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleTelegramSignIn = async () => {
    try {
      await signInWithTelegram();
    } catch (error) {
      console.error('Error signing in with Telegram:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={user.photoURL || ''}
          alt={user.displayName || 'Profile'}
          className="w-8 h-8 rounded-full"
        />
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleGoogleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleTelegramSignIn}
        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
      >
        Sign in with Telegram
      </button>
    </div>
  );
};

export default AuthButtons;
