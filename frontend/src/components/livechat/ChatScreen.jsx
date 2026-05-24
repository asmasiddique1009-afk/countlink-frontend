import React, { useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, Send, Paperclip, Smile, X } from
'lucide-react';
import { useLiveChatStore, AGENTS } from '@/stores/liveChatStore';
import { EmojiPicker } from './EmojiPicker';
import { GifPicker } from './GifPicker';

function formatTime(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDateGroup(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function MessageBubble({ message, prevMessage }) {
  const isUser = message.sender === 'user';
  const agent = !isUser ? AGENTS.find((a) => a.id === message.agentId) || AGENTS[0] : null;
  const showAvatar = !isUser && prevMessage?.agentId !== message.agentId;

  if (message.type === 'gif' && message.gifUrl) {
    return (
      <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser &&
        <div className="w-7 h-7 flex-shrink-0">
            {showAvatar &&
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ backgroundColor: agent?.color }}>
            
                {agent?.avatar}
              </div>
          }
          </div>
        }
        <div className={`max-w-[200px] rounded-2xl overflow-hidden shadow-sm ${isUser ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
          <img src={message.gifUrl} alt="GIF" className="w-full h-auto" />
          <p className={`text-[10px] px-2 py-1 ${isUser ? 'bg-blue-600 text-blue-200 text-right' : 'bg-white text-slate-400'}`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>);

  }

  if (message.type === 'file') {
    return (
      <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser &&
        <div className="w-7 h-7 flex-shrink-0">
            {showAvatar &&
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: agent?.color }}>
                {agent?.avatar}
              </div>
          }
          </div>
        }
        <div className={`max-w-[220px] rounded-2xl px-3 py-2.5 shadow-sm ${isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-white/20' : 'bg-blue-50'}`}>
              <Paperclip className={`w-4 h-4 ${isUser ? 'text-white' : 'text-blue-500'}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{message.fileName || 'attachment.pdf'}</p>
              <p className={`text-[10px] ${isUser ? 'text-blue-200' : 'text-slate-400'}`}>{message.fileSize || 'File'}</p>
            </div>
          </div>
          <p className={`text-[10px] mt-1.5 ${isUser ? 'text-blue-200 text-right' : 'text-slate-400'}`}>{formatTime(message.timestamp)}</p>
        </div>
      </div>);

  }

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser &&
      <div className="w-7 h-7 flex-shrink-0">
          {showAvatar &&
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-sm"
          style={{ backgroundColor: agent?.color }}>
          
              {agent?.avatar}
            </div>
        }
        </div>
      }
      <div className={`max-w-[260px] group relative ${isUser ? '' : ''}`}>
        <div
          className={`px-3.5 py-2.5 shadow-sm transition-all ${
          isUser ?
          'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl rounded-br-sm' :
          'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-sm'}`
          }>
          
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`text-[10px] mt-1 ${isUser ? 'text-right text-slate-400' : 'text-slate-400 ml-1'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>);

}

function TypingIndicator({ agentId }) {
  const agent = AGENTS.find((a) => a.id === agentId) || AGENTS[0];
  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-sm flex-shrink-0" style={{ backgroundColor: agent.color }}>
        {agent.avatar}
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          {[0, 1, 2].map((i) =>
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: '700ms' }} />

          )}
        </div>
      </div>
    </div>);

}

export function ChatScreen() {
  const {
    sessions, messages, activeSessionId, isTyping,
    inputValue, showEmojiPicker, showGifPicker,
    setScreen, sendMessage, setInputValue, setShowEmojiPicker, setShowGifPicker, closeWidget
  } = useLiveChatStore();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const session = sessions.find((s) => s.id === activeSessionId);
  const agent = AGENTS.find((a) => a.id === session?.agentId) || AGENTS[0];
  const sessionMessages = messages.filter((m) => m.sessionId === activeSessionId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionMessages, isTyping]);

  useEffect(() => {
    if (!showEmojiPicker && !showGifPicker) {
      inputRef.current?.focus();
    }
  }, [showEmojiPicker, showGifPicker]);

  const handleSend = useCallback(() => {
    const val = inputValue.trim();
    if (!val) return;
    sendMessage(val, 'text');
  }, [inputValue, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    sendMessage(emoji, 'emoji');
    setShowEmojiPicker(false);
  };

  const handleGifSelect = (gifUrl, gifTitle) => {
    sendMessage(gifTitle || 'GIF', 'gif', { gifUrl });
    setShowGifPicker(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = Math.round(file.size / 1024);
    const sizeLabel = sizeKB < 1024 ? `${sizeKB} KB` : `${(sizeKB / 1024).toFixed(1)} MB`;
    sendMessage(`Sent a file`, 'file', { fileName: file.name, fileSize: sizeLabel });
    e.target.value = '';
  };

  // Group messages by date

  const groups = [];
  sessionMessages.forEach((msg) => {
    const d = formatDateGroup(msg.timestamp);
    const last = groups[groups.length - 1];
    if (!last || last.date !== d) {
      groups.push({ date: d, messages: [msg] });
    } else {
      last.messages.push(msg);
    }
  });

  const isNewSession = sessionMessages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Agent Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3 flex-shrink-0 shadow-md">
        <button
          onClick={() => setScreen('home')}
          className="w-6 h-6 rounded-full hover:bg-white/25 flex items-center justify-center text-white transition-colors flex-shrink-0"
          aria-label="Back">
          
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0 border-2 border-white/30"
          style={{ backgroundColor: agent.color }}>
          
          {agent.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-none truncate">{agent.name}</p>
          <p className="text-blue-200 text-[11px] mt-0.5">
            {isTyping ?
            <span className="text-green-300 animate-pulse">typing...</span> :

            <span>● Online</span>
            }
          </p>
        </div>

        <button
          onClick={closeWidget}
          className="w-6 h-6 rounded-full hover:bg-white/25 flex items-center justify-center text-white transition-colors flex-shrink-0"
          aria-label="Close chat">
          
          <X className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth" id="chat-messages">
        {isNewSession &&
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-4 border-white" style={{ backgroundColor: agent.color }}>
              {agent.avatar}
            </div>
            <p className="text-slate-700 text-sm font-semibold mt-1">{agent.name}</p>
            <p className="text-slate-400 text-xs">{agent.role}</p>
            <p className="text-slate-500 text-xs mt-2 max-w-[220px] leading-relaxed">
              Hi! I'm {agent.name.split(' ')[0]} and I'll be helping you today. How can I assist you?
            </p>
          </div>
        }

        {groups.map((group) =>
        <div key={group.date} className="space-y-2.5">
            {/* Date separator */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap px-2">{group.date}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            {group.messages.map((msg, i) =>
          <MessageBubble key={msg.id} message={msg} prevMessage={group.messages[i - 1]} />
          )}
          </div>
        )}

        {isTyping && <TypingIndicator agentId={session?.agentId} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker &&
      <div className="flex-shrink-0 border-t border-slate-100">
          <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
        </div>
      }

      {/* GIF Picker */}
      {showGifPicker &&
      <div className="flex-shrink-0 border-t border-slate-100">
          <GifPicker onSelect={handleGifSelect} onClose={() => setShowGifPicker(false)} />
        </div>
      }

      {/* Input area */}
      <div className="flex-shrink-0 bg-white border-t border-slate-100 px-3 py-2.5">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3 pt-2 pb-1.5 flex flex-col gap-1 focus-within:border-blue-400 focus-within:bg-white transition-all">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 resize-none outline-none leading-relaxed max-h-24 scrollbar-none w-full"
            style={{ scrollbarWidth: 'none' }} />
          
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Attach file">
              
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${showEmojiPicker ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
              title="Emoji">
              
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGifPicker(!showGifPicker)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors text-xs font-bold ${showGifPicker ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
              title="GIF">
              
              GIF
            </button>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
            <div className="flex-1" />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-150 ${
              inputValue.trim() ?
              'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95' :
              'bg-slate-100 text-slate-300 cursor-not-allowed'}`
              }>
              
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>);

}