import { useState } from 'react';
import { XIcon, GlobeIcon, DollarSignIcon, TagIcon, LinkIcon, ClockIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";






export function RequestWebsiteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    websiteNames: [''],
    budgetRange: '',
    topic: '',
    targetUrl: '',
    deliveryTime: ''
  });

  const handleWebsiteChange = (index, value) => {
    const updated = [...formData.websiteNames];
    updated[index] = value;
    setFormData({ ...formData, websiteNames: updated });
  };

  const handleAddWebsite = () => {
    setFormData({ ...formData, websiteNames: [...formData.websiteNames, ''] });
  };

  const handleRemoveWebsite = (index) => {
    const updated = formData.websiteNames.filter((_, i) => i !== index);
    setFormData({ ...formData, websiteNames: updated.length ? updated : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request Website Form Data:', formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      websiteNames: [''],
      budgetRange: '',
      topic: '',
      targetUrl: '',
      deliveryTime: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} />
      
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Request Website</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Tell us what website you're looking for</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted">
            
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">
            {/* Website Names */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <GlobeIcon className="w-4 h-4 text-primary" />
                Website Name <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                {formData.websiteNames.map((name, index) =>
                <div key={index} className="flex items-center gap-2">
                    <Input
                    placeholder="e.g., TechCrunch, Forbes, Medium"
                    value={name}
                    onChange={(e) => handleWebsiteChange(index, e.target.value)}
                    className="h-10 flex-1"
                    required={index === 0} />
                  
                    {formData.websiteNames.length > 1 &&
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveWebsite(index)}
                    className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0">
                    
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                  }
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleAddWebsite}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium mt-1 transition-colors">
                
                <PlusIcon className="w-3.5 h-3.5" />
                Add another website
              </button>
              <p className="text-xs text-muted-foreground">Enter the website domains or names you're looking for</p>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="text-sm font-medium flex items-center gap-2">
                <DollarSignIcon className="w-4 h-4 text-primary" />
                Budget Range <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.budgetRange}
                onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                required>
                
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-250">$100 - $250</SelectItem>
                  <SelectItem value="250-500">$250 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500+">$2,500+</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">What's your budget for this placement?</p>
            </div>

            {/* Topic (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-sm font-medium flex items-center gap-2">
                <TagIcon className="w-4 h-4 text-muted-foreground" />
                Topic <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="topic"
                placeholder="e.g., Technology, AI, SaaS, Marketing, Finance..."
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="min-h-[80px] resize-none" />
              
              <p className="text-xs text-muted-foreground">What topic or niche should the website cover?</p>
            </div>

            {/* Target URL (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="targetUrl" className="text-sm font-medium flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                Target URL <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Input
                id="targetUrl"
                type="url"
                placeholder="https://example.com/your-page"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                className="h-10" />
              
              <p className="text-xs text-muted-foreground">The URL you want to link to (if known)</p>
            </div>

            {/* Delivery Time */}
            <div className="space-y-2">
              <Label htmlFor="deliveryTime" className="text-sm font-medium flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-primary" />
                Required Delivery Time <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.deliveryTime}
                onValueChange={(value) => setFormData({ ...formData, deliveryTime: value })}
                required>
                
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="How soon do you need it?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-3 days)</SelectItem>
                  <SelectItem value="fast">Fast (4-7 days)</SelectItem>
                  <SelectItem value="standard">Standard (1-2 weeks)</SelectItem>
                  <SelectItem value="flexible">Flexible (2-4 weeks)</SelectItem>
                  <SelectItem value="no-rush">No Rush (1+ month)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">When do you need this placement completed?</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="h-9 text-sm">
              
              Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 text-sm">
              
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
              
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>);

}