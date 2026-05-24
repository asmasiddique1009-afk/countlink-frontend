import { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
import { ChatWindow } from '@/components/messages/ChatWindow';
import { gsap } from 'gsap';







export function QuickChatModal({ isOpen, onClose, onPublisherClick }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, display: 'flex' });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, display: 'none', delay: 0.15 });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4"
      onClick={onClose}
      style={{ opacity: 0 }}>
      
      <div
        ref={modalRef}
        className="bg-background w-full max-w-2xl h-[600px] rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0 }}>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent transition-colors border border-border shadow-sm">
          
          <XIcon className="w-4 h-4 text-foreground" />
        </button>
        <ChatWindow className="h-full" onPublisherClick={onPublisherClick} />
      </div>
    </div>);

}