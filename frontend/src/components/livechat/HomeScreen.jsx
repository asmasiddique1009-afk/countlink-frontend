import React from 'react';
import { X } from 'lucide-react';
import { useLiveChatStore, AGENTS } from '@/stores/liveChatStore';

export function HomeScreen() {
  const { setScreen, startNewChat, closeWidget } = useLiveChatStore();

  return (
    <div className="flex flex-col h-full">
      {/* Blue Gradient Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-5 pt-6 pb-14 flex-shrink-0">
        {/* Close button */}
        <button
          onClick={closeWidget}
          className="absolute top-4 right-4 w-6 h-6 rounded-full hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10">
          
          <X className="w-4 h-4" />
        </button>

        {/* Stacked agent avatars */}
        <div className="flex -space-x-2.5 mb-4">
          {AGENTS.slice(0, 4).map((agent, i) =>
          <div
            key={agent.id}
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
            style={{ backgroundColor: agent.color, zIndex: 4 - i }}
            title={agent.name}>
            
              {agent.avatar}
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-white text-2xl font-bold leading-tight mb-2">
          We're here to<br />help you 👋
        </h2>
        <p className="text-white/90 text-xs leading-relaxed">
          Ask us anything or share your feedback. Our team typically replies in 5–10 minutes.
        </p>
      </div>

      {/* CTA Card - overlaps header */}
      <div className="relative px-4 -mt-8 flex-shrink-0 z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 p-4 border border-slate-100">
          <button
            onClick={startNewChat}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md transition-all duration-200 active:scale-[0.98]">
            
            Start a Conversation
          </button>
          <p className="text-center text-xs text-slate-400 mt-2">
            🔒 Secure · Encrypted · Private
          </p>
        </div>
      </div>


    </div>);

}