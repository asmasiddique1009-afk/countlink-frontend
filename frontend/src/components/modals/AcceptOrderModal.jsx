import { useState, useEffect, useRef } from 'react';
import { StarIcon, XIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { gsap } from 'gsap';







export function AcceptOrderModal({ isOpen, onClose, onConfirm }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment('');
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

  const handleSubmit = () => {
    if (rating > 0) {
      onConfirm({ rating, comment });
    } else {
      onConfirm(); // Treat as skip if no rating
    }
    onClose();
  };

  const handleSkip = () => {
    onConfirm();
    onClose();
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
        <div className="px-6 py-4 border-b border-border flex justify-between items-start bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Accept Order</h2>
              <p className="text-xs text-muted-foreground">Complete the order and release funds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent -mr-2 -mt-2">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-sm font-semibold text-foreground">How was your experience?</h3>
            <p className="text-xs text-muted-foreground">
              Please rate the publisher's work. Your feedback helps improve the marketplace.
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) =>
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110">
              
                <StarIcon
                className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
                strokeWidth={1.5} />
              
              </button>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="review-comment" className="text-sm font-medium">
              Write a review <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Share your experience working with this publisher..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] resize-none bg-background" />
            
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex flex-col-reverse sm:flex-row gap-3">
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="flex-1 text-muted-foreground hover:text-foreground">
            
            Skip & Accept
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            
            {rating > 0 ? 'Submit Review' : 'Accept Order'}
          </Button>
        </div>
      </div>
    </div>);

}