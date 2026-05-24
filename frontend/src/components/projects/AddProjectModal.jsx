import { useState, useEffect, useRef } from 'react';
import { XIcon, BriefcaseIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { gsap } from 'gsap';







export function AddProjectModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Reset form
      setName('');
      setDescription('');
      setBudget('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, display: 'flex' });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 }
      );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, display: 'none', delay: 0.15 });
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !budget) return;

    onSave({
      name,
      description,
      budget: parseFloat(budget),
      startDate,
      endDate: endDate || undefined,
      status: 'active',
      tags: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
      
      <div
        ref={modalRef}
        className="bg-background w-full max-w-lg rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col">
        
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <BriefcaseIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Create New Project</h2>
              <p className="text-xs text-muted-foreground">Set up a new campaign or project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent">
            
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name <span className="text-destructive">*</span></Label>
            <Input
              id="project-name"
              placeholder="e.g. Q2 Link Building"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
            
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-desc">Description</Label>
            <Textarea
              id="project-desc"
              placeholder="Brief description of the project goals..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none min-h-[80px]" />
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-budget">Budget (USD) <span className="text-destructive">*</span></Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="project-budget"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  min="0" />
                
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  className="pl-9"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)} />
                
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Create Project</Button>
          </div>
        </form>
      </div>
    </div>);

}