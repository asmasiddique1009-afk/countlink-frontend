import React, { useEffect, useRef } from 'react';
import { MessageCircle, X, Home, Clock } from 'lucide-react';
import { useLiveChatStore } from '@/stores/liveChatStore';
import { HomeScreen } from './HomeScreen';
import { PreviousChatsScreen } from './PreviousChatsScreen';
import { ChatScreen } from './ChatScreen';

export function LiveChatWidget() {
  const { isOpen, screen, unreadTotal, openWidget, closeWidget, setScreen } = useLiveChatStore();
  const widgetRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        closeWidget();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeWidget]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3" ref={widgetRef}>
      {/* Widget Panel */}
      {isOpen &&
      <div
        className="
            flex flex-col overflow-hidden
            shadow-2xl rounded-2xl border border-white/10
            bg-[#f8f9fb]
            fixed inset-0 sm:static sm:inset-auto
            sm:w-[390px] sm:h-[620px]
            w-full h-full
            transition-all duration-300
            animate-chat-in
          "









        style={{ maxHeight: '100dvh' }}>
        
          <div className="flex-1 min-h-0 overflow-hidden">
            {screen === 'home' && <HomeScreen />}
            {screen === 'previous' && <PreviousChatsScreen />}
            {screen === 'chat' && <ChatScreen />}
          </div>

          {/* Shared nav tabs — shown on home and previous screens */}
          {(screen === 'home' || screen === 'previous') &&
        <div className="border-t border-slate-100 bg-white flex-shrink-0">
              <div className="flex">
                <button
              onClick={() => setScreen('home')}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 border-t-2 transition-colors ${
              screen === 'home' ?
              'text-blue-600 border-blue-600' :
              'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-300'}`
              }>
              
                  <Home className="w-4 h-4" />
                  <span className={`text-[10px] ${screen === 'home' ? 'font-semibold' : 'font-medium'}`}>Home</span>
                </button>
                <button
              onClick={() => setScreen('previous')}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 border-t-2 transition-colors ${
              screen === 'previous' ?
              'text-blue-600 border-blue-600' :
              'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-300'}`
              }>
              
                  <Clock className="w-4 h-4" />
                  <span className={`text-[10px] ${screen === 'previous' ? 'font-semibold' : 'font-medium'}`}>Previous</span>
                </button>
              </div>
            </div>
        }

        </div>
      }

      {/* FAB Button */}
      <button
        onClick={() => isOpen ? closeWidget() : openWidget()}
        className="
          relative w-10 h-10 rounded-full
          bg-gradient-to-br from-blue-500 to-blue-700
          shadow-lg shadow-blue-500/40
          flex items-center justify-center
          text-white transition-all duration-300
          hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50
          active:scale-95 focus:outline-none
        "








        aria-label="Toggle chat">
        
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}

        {/* Unread badge */}
        {!isOpen && unreadTotal > 0 &&
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
            {unreadTotal > 9 ? '9+' : unreadTotal}
          </span>
        }
      </button>
    </div>);

}