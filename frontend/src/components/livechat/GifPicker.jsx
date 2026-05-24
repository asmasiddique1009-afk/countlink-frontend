import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const MOCK_GIFS = [
{ id: '1', title: 'Hello wave', url: 'https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif' },
{ id: '2', title: 'Thumbs up', url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif' },
{ id: '3', title: 'High five', url: 'https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif' },
{ id: '4', title: 'Happy dance', url: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif' },
{ id: '5', title: 'LOL laugh', url: 'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif' },
{ id: '6', title: 'Mind blown', url: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif' },
{ id: '7', title: 'Clapping', url: 'https://media.giphy.com/media/jdB79cQ8TlJXi/giphy.gif' },
{ id: '8', title: 'No no no', url: 'https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif' },
{ id: '9', title: 'Typing fast', url: 'https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif' },
{ id: '10', title: 'Facepalm', url: 'https://media.giphy.com/media/ISOckXUybVfQ4/giphy.gif' },
{ id: '11', title: 'Thank you', url: 'https://media.giphy.com/media/3otPoS81loriI9sO8o/giphy.gif' },
{ id: '12', title: 'Let\'s go!', url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif' }];







export function GifPicker({ onSelect, onClose }) {
  const [search, setSearch] = useState('');

  const filtered = search ?
  MOCK_GIFS.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())) :
  MOCK_GIFS;

  return (
    <div className="bg-white h-56 flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-2 border-b border-slate-100">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search GIFs..."
            className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            autoFocus />
          
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors flex-shrink-0">
          
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* GIF grid */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filtered.length === 0 ?
        <div className="flex flex-col items-center justify-center h-full gap-1">
            <p className="text-xs text-slate-400">No GIFs found</p>
          </div> :

        <div className="grid grid-cols-3 gap-1.5 pt-2">
            {filtered.map((gif) =>
          <button
            key={gif.id}
            onClick={() => onSelect(gif.url, gif.title)}
            className="relative rounded-xl overflow-hidden border border-slate-100 hover:border-blue-300 hover:scale-[1.03] transition-all duration-150 aspect-video bg-slate-100 group"
            title={gif.title}>
            
                <img
              src={gif.url}
              alt={gif.title}
              className="w-full h-full object-cover"
              loading="lazy" />
            
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                <p className="absolute bottom-0 left-0 right-0 text-[9px] text-white font-medium px-1.5 py-0.5 bg-gradient-to-t from-black/50 to-transparent truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {gif.title}
                </p>
              </button>
          )}
          </div>
        }
      </div>
    </div>);

}