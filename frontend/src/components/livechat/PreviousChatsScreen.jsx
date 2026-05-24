import React from 'react';
import { Clock, MessageSquarePlus, CheckCheck } from 'lucide-react';
import { useLiveChatStore, AGENTS } from '@/stores/liveChatStore';

function formatRelativeTime(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function SessionCard({ session }) {
  const { openSession } = useLiveChatStore();
  const agent = AGENTS.find((a) => a.id === session.agentId) || AGENTS[0];
  const hasUnread = session.unreadCount > 0;

  return (
    <button
      onClick={() => openSession(session.id)}
      className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors duration-100 text-left border-b border-slate-100 last:border-b-0 ${hasUnread ? 'bg-blue-50/40' : 'bg-white'}`}>
      
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0 mt-0.5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
          style={{ backgroundColor: agent.color }}>
          
          {agent.avatar}
        </div>
        {session.status === 'active' &&
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        }
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row: title + time */}
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <p className={`text-sm truncate ${hasUnread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
            {session.title}
          </p>
          <span className={`text-[11px] flex-shrink-0 ${hasUnread ? 'text-blue-500 font-semibold' : 'text-slate-400'}`}>
            {formatRelativeTime(session.lastMessageAt)}
          </span>
        </div>

        {/* Agent name */}
        <p className="text-[11px] text-blue-500 font-medium truncate mb-1">{agent.name}</p>

        {/* Last message row */}
        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs truncate leading-relaxed ${hasUnread ? 'text-slate-700' : 'text-slate-400'}`}>
            {session.lastMessage}
          </p>
          {hasUnread ?
          <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
              {session.unreadCount}
            </span> :

          <CheckCheck className="flex-shrink-0 w-3.5 h-3.5 text-blue-400" />
          }
        </div>
      </div>
    </button>);

}

export function PreviousChatsScreen() {
  const { sessions, setScreen, startNewChat } = useLiveChatStore();

  // Sort: unread first, then by recency
  const sorted = [...sessions].sort((a, b) => {
    if (b.unreadCount !== a.unreadCount) return b.unreadCount - a.unreadCount;
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-5 pt-8 pb-5 flex-shrink-0 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
        <h2 className="text-white text-xl font-bold relative z-10">Previous Conversations</h2>
        <p className="text-blue-200 text-sm mt-1 relative z-10">Pick up where you left off</p>
      </div>

      {/* Conversation count bar */}
      {sessions.length > 0 &&
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/80 flex-shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {sessions.length} conversation{sessions.length !== 1 ? 's' : ''}
          </span>
          <button
          onClick={startNewChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors">
          
            <MessageSquarePlus className="w-3 h-3" />
            New
          </button>
        </div>
      }

      {/* Session list */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm font-medium">No previous conversations</p>
            <p className="text-slate-400 text-xs">Start a new chat to get help</p>
            <button
            onClick={startNewChat}
            className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
            
              Start a Conversation
            </button>
          </div> :

        <div className="divide-y divide-slate-100">
            {sorted.map((session) =>
          <SessionCard key={session.id} session={session} />
          )}
          </div>
        }
      </div>
    </div>);

}