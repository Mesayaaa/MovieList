import React from 'react';
import { User, LogOut, Play } from 'lucide-react';
import { User as UserType } from '../App';

interface NavigationProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: 'home' | 'search' | 'profile' | 'subscription') => void;
}

export function Navigation({ user, onLogin, onLogout, currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onViewChange('home')}
            >
              <Play className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-white">StreamFlix</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onViewChange('home')}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home' 
                    ? 'text-white bg-red-600' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                Home
              </button>
              
              {user && (
                <button 
                  onClick={() => onViewChange('subscription')}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'subscription' 
                      ? 'text-white bg-red-600' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Plans
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-xs font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="capitalize">{user.subscription}</span>
                </div>
                
                <button 
                  onClick={() => onViewChange('profile')}
                  className={`p-3 rounded-full transition-colors ${
                    currentView === 'profile' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <User className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={onLogout}
                  className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}