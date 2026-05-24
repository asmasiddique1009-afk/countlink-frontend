import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeftIcon,
  SaveIcon,
  XIcon,
  PlusIcon,
  CheckIcon,
  TagIcon,
  EyeOffIcon,
  LanguagesIcon,
  AlertCircleIcon,
  InfoIcon,
  HelpCircleIcon,
  SearchIcon } from
'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';








const CATEGORIES = [
"Computer and Programming", "Technology", "Business and Finance",
"Cooking, Recipes, and Gastronomy", "Education and Formation", "Fashion and Beauty",
"Home and Real estate", "Games and Pc Components", "Health", "Insurances",
"Legal", "Literature and Culture", "Marketing, SEO, and Social Networks",
"Mobile Phones and Apps", "Motor, Cars, and Motorbikes", "Nature and Ecology",
"Parenting and Children", "Photography and Design", "Animals",
"Psychology and Coaching", "Sports"];


const SENSITIVE_TOPICS = [
"Casino", "CBD", "Crypto", "Dating", "Drug", "Escorts",
"Gambling", "Growshop", "Medication", "Politics", "Promotional articles"];


const COUNTRIES = [
"United States", "United Kingdom", "Canada", "Australia", "Germany",
"France", "Spain", "Italy", "Brazil", "India", "Netherlands", "Global",
"Portugal", "Russia", "China", "Japan", "South Korea", "Mexico", "Argentina"];


const LANGUAGES = [
"English", "Spanish", "German", "French", "Italian", "Portuguese",
"Dutch", "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi"];


// ─── Custom searchable multi-select dropdown ──────────────────────────────────











function MultiSelectDropdown({
  options,
  selected,
  onToggle,
  placeholder,
  searchPlaceholder,
  maxSelected,
  error,
  renderBadge
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-sm min-h-[44px] hover:bg-accent/50 transition-colors text-left",
          error ? "border-destructive" : "border-input",
          open && "ring-2 ring-ring ring-offset-1"
        )}>
        
        {selected.length > 0 ?
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {selected.map((item) =>
          renderBadge ?
          renderBadge(item, (e) => {e.stopPropagation();onToggle(item);}) :

          <Badge key={item} variant="secondary" className="bg-primary/10 text-primary border-primary/20 pl-2 pr-1 py-0.5 h-6 text-[11px] font-medium border">
                    {item}
                    <span
              role="button"
              onMouseDown={(e) => {e.preventDefault();e.stopPropagation();onToggle(item);}}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer">
              
                      <XIcon className="w-3 h-3" />
                    </span>
                  </Badge>

          )}
          </div> :

        <span className="text-muted-foreground">{placeholder}</span>
        }
        <PlusIcon className="h-4 w-4 opacity-50 shrink-0" />
      </button>

      {/* Dropdown panel */}
      {open &&
      <div className="absolute z-50 mt-1 w-full min-w-[280px] rounded-md border bg-popover shadow-md">
          {/* Search input */}
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" />
          
          </div>
          {/* List */}
          <ul className="max-h-[200px] overflow-y-auto p-1">
            {filtered.length === 0 ?
          <li className="py-6 text-center text-sm text-muted-foreground">No results found.</li> :

          filtered.map((option) => {
            const isSelected = selected.includes(option);
            const isDisabled = !isSelected && maxSelected !== undefined && selected.length >= maxSelected;
            return (
              <li
                key={option}
                onClick={() => {if (!isDisabled) {onToggle(option);}}}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm transition-colors",
                  isSelected && "bg-accent/60",
                  isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"
                )}>
                
                    <div className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                  isSelected ? "bg-primary border-primary text-primary-foreground" : "border-primary opacity-50"
                )}>
                      {isSelected && <CheckIcon className="h-3 w-3" />}
                    </div>
                    {option}
                  </li>);

          })
          }
          </ul>
        </div>
      }
    </div>);

}

// ─── Main form ────────────────────────────────────────────────────────────────
export function Step3Details({ onNext, onBack, initialData, isEditing = false }) {
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    instructions: initialData?.instructions || '',
    countries: initialData?.countries || [],
    language: Array.isArray(initialData?.language) ? initialData.language : initialData?.language ? [initialData.language] : [],
    categories: initialData?.categories || [],
    sensitiveTopics: initialData?.sensitiveTopics || [],
    maxLinks: initialData?.maxLinks || '2',
    imagesPerPost: initialData?.imagesPerPost || '1',
    linkType: initialData?.linkType || 'Both',
    priceNormal: initialData?.priceNormal || '',
    priceSensitive: initialData?.priceSensitive || '',
    priceCopywriting: initialData?.priceCopywriting || '',
    enableCopywriting: initialData?.enableCopywriting ?? true,
    discount: initialData?.discount || '',
    sponsorshipNotification: initialData?.sponsorshipNotification || 'No',
    publishOnHome: initialData?.publishOnHome || 'No',
    publishInCategories: initialData?.publishInCategories || 'Yes'
  });

  const [errors, setErrors] = useState({});

  const countWords = (str) => str.trim().split(/\s+/).filter((w) => w.length > 0).length;

  const handleInputChange = (field, value) => {
    if (field === 'description' && countWords(value) > 200) return;
    if (field === 'instructions' && countWords(value) > 300) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => {const n = { ...prev };delete n[field];return n;});
  };

  const toggleCountry = (country) => {
    setFormData((prev) => {
      const exists = prev.countries.includes(country);
      const next = exists ? prev.countries.filter((c) => c !== country) : prev.countries.length >= 2 ? prev.countries : [...prev.countries, country];
      if (next.length > 0 && errors.countries) setErrors((p) => {const n = { ...p };delete n.countries;return n;});
      return { ...prev, countries: next };
    });
  };

  const toggleLanguage = (language) => {
    setFormData((prev) => {
      const exists = prev.language.includes(language);
      const next = exists ? prev.language.filter((l) => l !== language) : prev.language.length >= 2 ? prev.language : [...prev.language, language];
      if (next.length > 0 && errors.language) setErrors((p) => {const n = { ...p };delete n.language;return n;});
      return { ...prev, language: next };
    });
  };

  const toggleCategory = (category) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(category);
      const next = exists ? prev.categories.filter((c) => c !== category) : prev.categories.length >= 3 ? prev.categories : [...prev.categories, category];
      if (next.length > 0 && errors.categories) setErrors((p) => {const n = { ...p };delete n.categories;return n;});
      return { ...prev, categories: next };
    });
  };

  const toggleSensitive = (topic) => {
    setFormData((prev) => {
      const exists = prev.sensitiveTopics.includes(topic);
      return { ...prev, sensitiveTopics: exists ? prev.sensitiveTopics.filter((t) => t !== topic) : [...prev.sensitiveTopics, topic] };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = "Website description is required";else
    if (formData.description.trim().length < 50) newErrors.description = "Website description must be at least 50 characters";
    if (!formData.instructions.trim()) newErrors.instructions = "Instructions are required";else
    if (formData.instructions.trim().length < 30) newErrors.instructions = "Instructions must be at least 30 characters";
    if (formData.countries.length === 0) newErrors.countries = "Select at least one country";
    if (formData.language.length === 0) newErrors.language = "Select at least one language";
    if (formData.categories.length === 0) newErrors.categories = "Select at least one category";
    if (!formData.priceNormal) newErrors.priceNormal = "Normal price is required";
    if (!formData.priceSensitive) newErrors.priceSensitive = "Sensitive price is required";
    if (formData.enableCopywriting && !formData.priceCopywriting) newErrors.priceCopywriting = "Copywriting price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onNext(formData);else
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto pb-8 px-6">
      <div className="mb-8 flex items-start gap-3 bg-blue-50/50 p-4 sm:p-5 rounded-xl border border-blue-100/50 shadow-sm">
        <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold text-blue-900">
            {isEditing ? 'Re-verification Required' : 'Configuration Guidelines'}
          </h4>
          <p className="text-sm text-blue-800/90 leading-relaxed">
            {isEditing ?
            'Any changes made to critical details (pricing, categories, or rules) will trigger a re-verification process. Your website may be temporarily paused in the marketplace until our team reviews and approves the updates.' :
            'Configure your pricing structure and content guidelines carefully. These settings determine how advertisers interact with your site. Accurate information helps attract relevant buyers and ensures smooth order processing.'}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* GROUP 1 — Website Description */}
        <Card className="border-border shadow-sm overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
                  Website Description <span className="text-destructive">*</span>
                </Label>
                <span className={cn("text-[10px]", countWords(formData.description) >= 200 ? "text-amber-600 font-medium" : "text-muted-foreground")}>
                  {countWords(formData.description)}/200 words
                </span>
              </div>
              <Textarea
                id="description"
                placeholder="E.g. A leading tech blog covering the latest in AI, software development, and gadget reviews..."
                className={cn("min-h-[100px] resize-y bg-background focus-visible:ring-primary/20", errors.description && "border-destructive focus-visible:ring-destructive")}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)} />
              
              {errors.description ?
              <p className="text-[11px] text-destructive font-medium">{errors.description}</p> :
              <p className="text-[11px] text-muted-foreground">Briefly describe your website&#39;s niche, audience, and main topics.</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="instructions" className="text-sm font-medium">Instructions for Buyer <span className="text-destructive">*</span></Label>
                <span className={cn("text-[10px]", countWords(formData.instructions) >= 300 ? "text-amber-600 font-medium" : "text-muted-foreground")}>
                  {countWords(formData.instructions)}/300 words
                </span>
              </div>
              <Textarea
                id="instructions"
                placeholder="E.g. Articles must be 800+ words, unique content only. No gambling or adult links allowed..."
                className={cn("min-h-[120px] resize-y bg-background focus-visible:ring-primary/20", errors.instructions && "border-destructive focus-visible:ring-destructive")}
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)} />
              
              {errors.instructions ?
              <p className="text-[11px] text-destructive font-medium">{errors.instructions}</p> :
              <p className="text-[11px] text-muted-foreground">Specify your content rules, publishing requirements, and quality expectations.</p>}
            </div>
          </CardContent>
        </Card>

        {/* GROUP 2 — Audience & Website Targeting */}
        <Card className="border-border shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base font-semibold">Audience &amp; Targeting</CardTitle>
            <CardDescription className="text-xs mt-0.5">Define your target audience and website categories</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Audience Country */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex justify-between">
                  <span>Audience Country <span className="text-destructive">*</span></span>
                  <span className={cn("text-xs", formData.countries.length >= 2 ? "text-amber-600 font-medium" : "text-muted-foreground")}>
                    {formData.countries.length}/2 selected
                  </span>
                </Label>
                <MultiSelectDropdown
                  options={COUNTRIES}
                  selected={formData.countries}
                  onToggle={toggleCountry}
                  placeholder="Select countries..."
                  searchPlaceholder="Search country..."
                  maxSelected={2}
                  error={!!errors.countries} />
                
                {errors.countries && <p className="text-[11px] text-destructive font-medium">{errors.countries}</p>}
              </div>

              {/* Language */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex justify-between">
                  <span>Language <span className="text-destructive">*</span></span>
                  <span className={cn("text-xs", formData.language.length >= 2 ? "text-amber-600 font-medium" : "text-muted-foreground")}>
                    {formData.language.length}/2 selected
                  </span>
                </Label>
                <MultiSelectDropdown
                  options={LANGUAGES}
                  selected={formData.language}
                  onToggle={toggleLanguage}
                  placeholder="Select languages..."
                  searchPlaceholder="Search language..."
                  maxSelected={2}
                  error={!!errors.language}
                  renderBadge={(item, onRemove) =>
                  <Badge key={item} variant="secondary" className="bg-primary/10 text-primary border-primary/20 pl-2 pr-1 py-0.5 h-6 text-[11px] font-medium border">
                      <LanguagesIcon className="w-3 h-3 mr-1 opacity-60" />
                      {item}
                      <span
                      role="button"
                      onMouseDown={(e) => {e.preventDefault();e.stopPropagation();toggleLanguage(item);}}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer">
                      
                        <XIcon className="w-3 h-3" />
                      </span>
                    </Badge>
                  } />
                
                {errors.language && <p className="text-[11px] text-destructive font-medium">{errors.language}</p>}
              </div>
            </div>

            <Separator className="bg-border/60" />

            {/* Website Categories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex justify-between">
                <span>Website Categories <span className="text-destructive">*</span></span>
                <span className={cn("text-xs", formData.categories.length >= 3 ? "text-amber-600 font-medium" : "text-muted-foreground")}>
                  {formData.categories.length}/3 selected
                </span>
              </Label>
              <MultiSelectDropdown
                options={CATEGORIES}
                selected={formData.categories}
                onToggle={toggleCategory}
                placeholder="Select categories..."
                searchPlaceholder="Search category..."
                maxSelected={3}
                error={!!errors.categories}
                renderBadge={(item, onRemove) =>
                <Badge key={item} variant="secondary" className="bg-primary/10 text-primary border-primary/20 pl-2 pr-1 py-0.5 h-6 text-[11px] font-medium border">
                    <TagIcon className="w-3 h-3 mr-1 opacity-60" />
                    {item}
                    <span
                    role="button"
                    onMouseDown={(e) => {e.preventDefault();e.stopPropagation();toggleCategory(item);}}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer">
                    
                      <XIcon className="w-3 h-3" />
                    </span>
                  </Badge>
                } />
              
              {errors.categories && <p className="text-[11px] text-destructive font-medium">{errors.categories}</p>}
            </div>

            {/* Sensitive Topics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Sensitive Topics You Do NOT Accept</Label>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <MultiSelectDropdown
                options={SENSITIVE_TOPICS}
                selected={formData.sensitiveTopics}
                onToggle={toggleSensitive}
                placeholder="Select excluded topics..."
                searchPlaceholder="Search topic..."
                renderBadge={(item, onRemove) =>
                <Badge key={item} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 pl-2 pr-1 py-0.5 h-6 text-[11px] font-medium border">
                    <EyeOffIcon className="w-3 h-3 mr-1 opacity-60" />
                    {item}
                    <span
                    role="button"
                    onMouseDown={(e) => {e.preventDefault();e.stopPropagation();toggleSensitive(item);}}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors cursor-pointer">
                    
                      <XIcon className="w-3 h-3" />
                    </span>
                  </Badge>
                } />
              
            </div>
          </CardContent>
        </Card>

        {/* GROUP 3 — Content Publishing Rules */}
        <Card className="border-border shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base font-semibold">Publishing Rules</CardTitle>
            <CardDescription className="text-xs mt-0.5">Set limits and configuration for published content</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Max Links Per Post <span className="text-destructive">*</span></Label>
                <Select value={formData.maxLinks} onValueChange={(val) => handleInputChange('maxLinks', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={n.toString()}>{n} Link{n > 1 ? 's' : ''}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Images Per Post <span className="text-destructive">*</span></Label>
                <Select value={formData.imagesPerPost} onValueChange={(val) => handleInputChange('imagesPerPost', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => <SelectItem key={n} value={n.toString()}>{n} Image{n > 1 ? 's' : ''}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Links Type <span className="text-destructive">*</span></Label>
                <Select value={formData.linkType} onValueChange={(val) => handleInputChange('linkType', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Follow">Do-Follow</SelectItem>
                    <SelectItem value="NoFollow">No-Follow</SelectItem>
                    <SelectItem value="Both">Both Allowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Sponsorship Notification <span className="text-destructive">*</span></Label>
                <Select value={formData.sponsorshipNotification} onValueChange={(val) => handleInputChange('sponsorshipNotification', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Do you mark posts as sponsored?</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Publish on Homepage? <span className="text-destructive">*</span></Label>
                <Select value={formData.publishOnHome} onValueChange={(val) => handleInputChange('publishOnHome', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Will the post appear on the homepage?</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Publish in Related Categories? <span className="text-destructive">*</span></Label>
                <Select value={formData.publishInCategories} onValueChange={(val) => handleInputChange('publishInCategories', val)}>
                  <SelectTrigger className="bg-background h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Do you post in specific categories?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GROUP 5 — Pricing Settings */}
        <Card className="border-border shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base font-semibold">Pricing Settings</CardTitle>
            <CardDescription className="text-xs mt-0.5">Set your rates for different types of posts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="priceNormal" className="text-sm font-medium">Normal Post Price <span className="text-destructive">*</span></Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircleIcon className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[250px] text-xs">
                        <p>The base price you charge for publishing a standard guest post article on your website.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input
                    id="priceNormal"
                    type="number"
                    placeholder="0.00"
                    className={cn("pl-7 h-11 bg-background text-base", errors.priceNormal && "border-destructive focus-visible:ring-destructive")}
                    value={formData.priceNormal}
                    onChange={(e) => handleInputChange('priceNormal', e.target.value)} />
                  
                </div>
                {errors.priceNormal ?
                <p className="text-[11px] text-destructive font-medium">{errors.priceNormal}</p> :
                <p className="text-[11px] text-muted-foreground">Standard price for a guest post.</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Label htmlFor="priceSensitive" className="text-sm font-medium">Extra Fee for Sensitive Topics <span className="text-destructive">*</span></Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircleIcon className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[280px] text-xs">
                        <p>This extra amount is added to your Normal Post Price for sensitive content (e.g. Casino, CBD, Crypto).<br /><br /><strong>Example:</strong> If Normal Price is $100 and Extra Fee is $50, the total price for a sensitive post will be <strong>$150</strong>.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input
                    id="priceSensitive"
                    type="number"
                    placeholder="0.00"
                    className={cn("pl-7 h-11 bg-background text-base", errors.priceSensitive && "border-destructive focus-visible:ring-destructive")}
                    value={formData.priceSensitive}
                    onChange={(e) => handleInputChange('priceSensitive', e.target.value)} />
                  
                </div>
                {errors.priceSensitive ?
                <p className="text-[11px] text-destructive font-medium">{errors.priceSensitive}</p> :
                <p className="text-[11px] text-muted-foreground">This amount is added to your Normal Post Price for sensitive content.</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="priceCopywriting" className="text-sm font-medium">Copywriting Service</Label>
                  <Switch
                    checked={formData.enableCopywriting}
                    onCheckedChange={(checked) => handleInputChange('enableCopywriting', checked)} />
                  
                </div>
                {formData.enableCopywriting &&
                <div className="relative animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                    <Input
                    id="priceCopywriting"
                    type="number"
                    placeholder="0.00"
                    className={cn("pl-7 h-11 bg-background text-base", errors.priceCopywriting && "border-destructive focus-visible:ring-destructive")}
                    value={formData.priceCopywriting}
                    onChange={(e) => handleInputChange('priceCopywriting', e.target.value)} />
                  
                  </div>
                }
                {errors.priceCopywriting && formData.enableCopywriting &&
                <p className="text-[11px] text-destructive font-medium">{errors.priceCopywriting}</p>
                }
                <p className="text-[11px] text-muted-foreground">
                  {formData.enableCopywriting ? "Fee if you write the article for the client." : "You do not offer article writing services."}
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="discount" className="text-sm font-medium">Discount Offered (%)</Label>
                <div className="relative">
                  <Input
                    id="discount"
                    type="number"
                    placeholder="0"
                    className="pr-8 h-11 bg-background text-base"
                    max="100"
                    min="0"
                    value={formData.discount}
                    onChange={(e) => handleInputChange('discount', e.target.value)} />
                  
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Optional discount to attract more orders.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-8 mt-4 border-t border-border">
        <Button variant="outline" onClick={onBack} className="h-11 px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancel' : 'Back'}
        </Button>

        <div className="flex items-center gap-4">
          {Object.keys(errors).length > 0 &&
          <div className="flex items-center gap-2 text-destructive text-xs font-medium animate-in fade-in">
              <AlertCircleIcon className="w-4 h-4" />
              Please fill in all required fields
            </div>
          }
          {isEditing &&
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-200/60 max-w-md">
              <AlertCircleIcon className="w-4 h-4 shrink-0" />
              <span className="text-xs font-medium">Note: Saving changes will send the website for re-moderation.</span>
            </div>
          }
          <Button
            onClick={handleSubmit}
            className="h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md text-sm font-medium transition-all hover:shadow-lg">
            
            {isEditing ? 'Save Changes' : 'Save & Continue'}
            <SaveIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>);

}