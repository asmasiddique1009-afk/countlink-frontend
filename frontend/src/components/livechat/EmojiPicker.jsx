import React, { useState } from 'react';
import { X } from 'lucide-react';

const EMOJI_CATEGORIES = [
{
  name: 'Smileys',
  icon: '😊',
  emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '💫', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖']
},
{
  name: 'Gestures',
  icon: '👋',
  emojis: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '🫶', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👣', '👀', '👁', '👅', '👄', '🫦', '🧠', '🦷', '🦴', '👃', '👂', '🦻']
},
{
  name: 'Hearts',
  icon: '❤️',
  emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '❤️‍🔥', '❤️‍🩹', '💔', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '✡️', '🔯', '🪯', '🛐', '☯️', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️']
},
{
  name: 'Objects',
  icon: '🎉',
  emojis: ['🎉', '🎊', '🎈', '🎁', '🎀', '🎗', '🎟', '🎫', '🎖', '🏆', '🥇', '🥈', '🥉', '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🥊', '🥋', '🥅', '⛳', '🎿', '🛷', '🥌', '🎯', '🎱', '🎮', '🕹', '🎲', '🧩', '🪄', '♟', '🎭', '🖼', '🎨', '🎰', '🚗', '✈️', '🚀', '🛸', '🏠', '💻', '📱', '⌚', '📷', '🎵', '🎸', '🎹', '🎺', '🥁', '🎻']
},
{
  name: 'Nature',
  icon: '🌿',
  emojis: ['🌱', '🌿', '☘️', '🍀', '🎋', '🎍', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌟', '⭐', '🌠', '🌌', '☁️', '⛅', '🌤', '🌥', '🌦', '🌧', '⛈', '🌩', '🌨', '❄️', '☃️', '⛄', '🌬', '💨', '🌀', '🌈', '🌂', '☂️', '⛱', '⚡', '🔥', '💧', '🌊', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯']
}];







export function EmojiPicker({ onSelect, onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-white border-t border-slate-100 h-52 flex flex-col">
      {/* Category tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 pb-1 border-b border-slate-100">
        {EMOJI_CATEGORIES.map((cat, i) =>
        <button
          key={cat.name}
          onClick={() => setActiveCategory(i)}
          title={cat.name}
          className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-colors ${
          activeCategory === i ? 'bg-blue-100' : 'hover:bg-slate-100'}`
          }>
          
            {cat.icon}
          </button>
        )}
        <button
          onClick={onClose}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Emoji grid */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5">
        <div className="grid grid-cols-8 gap-0.5">
          {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji) =>
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="w-8 h-8 text-xl flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors leading-none">
            
              {emoji}
            </button>
          )}
        </div>
      </div>
    </div>);

}