import { useState, useEffect, useRef } from 'react';
import { XIcon, LinkIcon, InfoIcon, CheckCircleIcon, GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { gsap } from 'gsap';







export function SubmitLinkModal({ isOpen, onClose, onConfirm }) {
  const [link, setLink] = useState('');
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLink('');
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, display: 'flex' });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.05 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, display: 'none', delay: 0.15 });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (link.trim()) {
      onConfirm(link);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md hidden items-center justify-center p-4">
      
          <div
        ref={modalRef}
        className="bg-background w-full max-w-[500px] rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col relative">
        
            {/* Header */}
            <div className="px-6 py-5 border-b border-border flex justify-between items-start bg-muted/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <GlobeIcon className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Submit Live Link</h2>
                  <p className="text-xs text-muted-foreground">Provide the URL where the article is published.</p>
                </div>
              </div>
              <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent -mr-2 -mt-2">
            
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Input Section */}
              <div className="space-y-2">
                <Label htmlFor="live-link" className="text-sm font-medium text-foreground">
                  Live Article URL
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <Input
                id="live-link"
                placeholder="https://website.com/article-slug"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="h-10 pl-9 bg-background border-border focus:ring-primary/20 transition-all text-sm"
                autoFocus />
              
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3.5 flex gap-3 items-start">
                <InfoIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-blue-900">Review Process</h4>
                  <p className="text-xs text-blue-700/90 leading-relaxed">
                    The customer will have <span className="font-semibold">4 days</span> to review this link. 
                    If no action is taken, the order will be automatically marked as completed.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-border bg-muted/5 flex justify-end gap-3">
              <Button
            onClick={onClose}
            variant="outline"
            className="h-9 px-4 text-xs">
            
                Cancel
              </Button>
              <Button
            onClick={handleSubmit}
            disabled={!link.trim()}
            className="h-9 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm text-xs font-medium">
            
                <CheckCircleIcon className="w-3.5 h-3.5 mr-1.5" />
                Submit Link
              </Button>
            </div>
          </div>
        </div>);

}