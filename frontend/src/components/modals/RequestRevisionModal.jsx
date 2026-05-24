import { useState, useEffect, useRef } from 'react';
import { XIcon, AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { gsap } from 'gsap';







export function RequestRevisionModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setReason(''); // Reset reason when opening
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
        <div className="px-6 py-4 border-b border-border flex justify-between items-start bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <RefreshCwIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Request Revision</h2>
              <p className="text-xs text-muted-foreground">Provide feedback for the publisher</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent -mr-2 -mt-2">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revision-reason" className="text-sm font-medium">
              Reason for revision <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="revision-reason"
              placeholder="E.g. The article is not of high quality, links are missing..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none bg-background" />
            
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-2.5 items-start">
            <AlertCircleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Be specific about what needs to be changed. Clear instructions help the publisher deliver exactly what you need.
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
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            
            Send Request
          </Button>
        </div>
      </div>
    </div>);

}