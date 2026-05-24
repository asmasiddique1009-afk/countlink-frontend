import { useState, useEffect, useRef } from 'react';
import { XIcon, AlertTriangleIcon, ShieldCheckIcon, MessageSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { gsap } from 'gsap';








export function OpenResolutionModal({ isOpen, onClose, onConfirm, onContactPublisher }) {
  const [reason, setReason] = useState('');
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setReason('');
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

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
      
      <div
        ref={modalRef}
        className="bg-card w-full max-w-[480px] rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-start bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Open Resolution</h2>
              <p className="text-xs text-muted-foreground">Escalate this order to support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent -mr-2 -mt-2">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Contact Publisher Suggestion */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex gap-3 items-start">
            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full shrink-0">
              <MessageSquareIcon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Before you open a dispute...</h4>
              <p className="text-xs text-blue-800 dark:text-blue-400 leading-relaxed mb-3">
                Most issues can be resolved quickly by communicating directly with the publisher. We recommend sending a message first.
              </p>
              {onContactPublisher &&
              <Button
                onClick={onContactPublisher}
                variant="outline"
                size="sm"
                className="h-8 bg-white dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900">
                
                  Contact Publisher
                </Button>
              }
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resolution-reason" className="text-sm font-medium">
              Reason for dispute <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="resolution-reason"
              placeholder="Please explain the issue in detail..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none bg-background" />
            
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-2.5 items-start">
            <ShieldCheckIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Our support team will review this case and provide a decision as soon as possible. Funds will remain held in escrow until resolved.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-border">
            
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
            
            Submit Dispute
          </Button>
        </div>
      </div>
    </div>);

}