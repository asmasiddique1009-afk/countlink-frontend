import { useEffect, useRef } from 'react';
import {
  MessageSquareIcon,
  XIcon,

  ShieldCheckIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';








export function CancelOrderModal({ isOpen, onClose, onConfirm, onContactPublisher }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, display: 'flex' });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.98, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.98, y: 10, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, display: 'none', delay: 0.15 });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
      
      <div
        ref={modalRef}
        className="bg-card w-full max-w-[480px] rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-foreground">Cancel Order?</h2>
            <p className="text-sm text-muted-foreground mt-1">This action cannot be undone.</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent -mr-2 -mt-2">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Suggestion Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex gap-3 items-start">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full shrink-0">
              <MessageSquareIcon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Have an issue?</h4>
              <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed mb-3">
                Most concerns can be resolved by talking to the publisher directly.
              </p>
              <Button
                onClick={onContactPublisher}
                variant="outline"
                size="sm"
                className="h-8 bg-white dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900">
                
                Contact Publisher
              </Button>
            </div>
          </div>

          {/* Refund Info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
            <ShieldCheckIcon className="w-4 h-4 text-green-600" />
            <span>Funds will be returned to your wallet immediately.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex flex-col-reverse sm:flex-row gap-3">
          <Button
            onClick={onConfirm}
            variant="ghost"
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
            
            Yes, Cancel Order
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
            
            Keep Order
          </Button>
        </div>
      </div>
    </div>);

}