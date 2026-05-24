import { useState, useEffect, useRef } from 'react';
import {
  XIcon,

  Trash2Icon,
  PlusCircleIcon,

  SendIcon,
  PenToolIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';



import { gsap } from 'gsap';








export function OutsourceWritingModal({ isOpen, onClose, onSave, initialData }) {
  const [links, setLinks] = useState([{ anchor: '', url: '', type: 'Do-Follow' }]);
  const [instructions, setInstructions] = useState('');

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setLinks(initialData.links || [{ anchor: '', url: '', type: 'Do-Follow' }]);
      setInstructions(initialData.instructions || '');
    } else {
      // Reset form when opening fresh
      setLinks([{ anchor: '', url: '', type: 'Do-Follow' }]);
      setInstructions('');
    }
  }, [initialData, isOpen]);

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

  const handleAddLink = () => {
    if (links.length < 2) {
      setLinks([...links, { anchor: '', url: '', type: 'Do-Follow' }]);
    }
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleSave = () => {
    // Basic validation
    if (links.some((l) => !l.anchor || !l.url)) return;

    onSave({
      links,
      instructions
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4 overflow-y-auto">
      
          <div
        ref={modalRef}
        className="bg-background w-full max-w-3xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
        
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/50 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <PenToolIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground tracking-tight">Outsource Writing</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">We'll write the content for you</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <XIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar bg-muted/5">
              {/* Anchor Text & Links Section */}
              <section className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/20 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Anchor Text & Links <span className="text-destructive">*</span>
                  </h3>
                  <div className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-[10px] font-medium rounded border border-blue-100 dark:border-blue-800">
                    Max 2 do-follow links
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="hidden md:grid md:grid-cols-12 gap-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                    <div className="md:col-span-4">Anchor Text</div>
                    <div className="md:col-span-5">Target URL</div>
                    <div className="md:col-span-2">Type</div>
                    <div className="md:col-span-1 text-center"></div>
                  </div>

                  {links.map((link, index) =>
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-muted/30 rounded-md border border-border/50 items-start group hover:border-border transition-colors">
                      <div className="md:col-span-4">
                        <label className="block md:hidden text-xs font-medium text-muted-foreground mb-1">Anchor Text</label>
                        <input
                    className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-xs h-9 px-3"
                    required
                    type="text"
                    placeholder="e.g. Best CRM Software"
                    value={link.anchor}
                    onChange={(e) => handleLinkChange(index, 'anchor', e.target.value)} />
                  
                      </div>
                      <div className="md:col-span-5">
                        <label className="block md:hidden text-xs font-medium text-muted-foreground mb-1">Target URL</label>
                        <input
                    className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-xs h-9 px-3"
                    required
                    type="url"
                    placeholder="https://example.com/page"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)} />
                  
                      </div>
                      <div className="md:col-span-2">
                        <label className="block md:hidden text-xs font-medium text-muted-foreground mb-1">Type</label>
                        <select
                    className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-xs h-9 px-2"
                    value={link.type}
                    onChange={(e) => handleLinkChange(index, 'type', e.target.value)}>
                    
                          <option>Do-Follow</option>
                          <option>No-Follow</option>
                        </select>
                      </div>
                      <div className="md:col-span-1 flex justify-center items-center h-9">
                        <button
                    onClick={() => handleRemoveLink(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10"
                    disabled={links.length === 1 && index === 0}>
                    
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
              )}

                  {links.length < 2 &&
              <button
                onClick={handleAddLink}
                className="w-full py-2 border border-dashed border-primary/30 rounded-md text-primary text-xs font-medium hover:bg-primary/5 transition-colors flex justify-center items-center gap-1.5">
                
                      <PlusCircleIcon className="w-3.5 h-3.5" />
                      Add Another Link
                    </button>
              }
                </div>
              </section>

              {/* Order Instructions Section */}
              <section className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/20">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Order Instructions <span className="text-destructive">*</span>
                  </h3>
                </div>
                <div className="p-4">
                  <textarea
                className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[100px] resize-y"
                placeholder="Any specific instructions for the writer?"
                required
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}>
              </textarea>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-border bg-card rounded-b-xl flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="h-9 text-xs">Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-9 text-xs px-5 shadow-sm">
                Save Details
                <SendIcon className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>);

}