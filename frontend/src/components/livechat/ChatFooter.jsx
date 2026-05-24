import React from 'react';
import { Lock } from 'lucide-react';

export function ChatFooter() {
  return (
    <div className="bg-white border-t border-slate-100 py-2 flex items-center justify-center gap-1.5 flex-shrink-0">
      <Lock className="w-3 h-3 text-slate-300" />
      <p className="text-[10px] text-slate-400 font-medium">
        Powered by{' '}
        <span className="font-bold text-blue-500">Contlinks</span>
        {' '}· End-to-end encrypted 🔒
      </p>
    </div>);

}