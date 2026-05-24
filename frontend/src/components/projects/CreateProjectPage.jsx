import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowLeftIcon, XIcon, ChevronDownIcon, Check, TargetIcon, GlobeIcon, LinkIcon, SparklesIcon, TagIcon, EyeOffIcon, HelpCircleIcon, AlertTriangleIcon } from 'lucide-react';
import { useProjectStore } from '@/stores/projectStore';

import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger } from
"@/components/ui/tooltip";












export function CreateProjectPage({ onCancel, onComplete }) {
  const { addProject } = useProjectStore();
  const [formData, setFormData] = useState({
    name: '',
    targetWebsite: '',
    categories: [],
    sensitiveTopics: [],
    projectObject: '',
    languages: [],
    countries: [],
    publishInstructions: ''
  });
  const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false);
  const [sensitiveTopicPopoverOpen, setSensitiveTopicPopoverOpen] = useState(false);
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [targetPages, setTargetPages] = useState([
  { id: '1', anchor: '', url: '' },
  { id: '2', anchor: '', url: '' }]
  );
  const [errors, setErrors] = useState({});

  const getTotalSelections = () => {
    return formData.categories.length + formData.sensitiveTopics.length;
  };

  const MAX_CATEGORY_SENSITIVE = 7;
  const MAX_LANGUAGES = 3;
  const MAX_COUNTRIES = 3;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Project name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Get objective label from value
    const objectiveLabels = {
      'increase-traffic': 'Increase SEO Traffic',
      'boost-visibility': 'Boost Brand Visibility',
      'build-authority': 'Build Domain Authority',
      'drive-conversions': 'Drive Conversions',
      'improve-rankings': 'Improve Search Rankings',
      'generate-leads': 'Generate Leads'
    };

    addProject({
      name: formData.name,
      description: `Categories: ${formData.categories.join(', ')}${formData.sensitiveTopics.length > 0 ? ` | Sensitive: ${formData.sensitiveTopics.join(', ')}` : ''}`,
      purpose: objectiveLabels[formData.projectObject] || formData.categories[0] || 'General',
      language: formData.languages.join(', '),
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      targetWebsite: formData.targetWebsite,
      categories: formData.categories,
      sensitiveTopics: formData.sensitiveTopics,
      languages: formData.languages,
      countries: formData.countries,
      publishInstructions: formData.publishInstructions,
      targetPages: targetPages.filter((tp) => tp.anchor || tp.url) // Only save non-empty target pages
    });

    onComplete();
  };

  const addTargetPage = () => {
    setTargetPages([...targetPages, { id: Date.now().toString(), anchor: '', url: '' }]);
  };

  const removeTargetPage = (id) => {
    if (targetPages.length > 1) {
      setTargetPages(targetPages.filter((tp) => tp.id !== id));
    }
  };

  const updateTargetPage = (id, field, value) => {
    setTargetPages(targetPages.map((tp) =>
    tp.id === id ? { ...tp, [field]: value } : tp
    ));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm">
        <div className="max-w-[1600px] mx-auto py-2.5">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="rounded-full hover:bg-muted h-9 w-9 shrink-0">
              
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-base font-semibold leading-tight">
                Create New Project
              </h1>
              <p className="text-xs text-muted-foreground mt-1.5">Create a new project to organize your guest post campaigns, manage orders, and track your content strategy in one place.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-[1120px] mx-auto py-3 pl-6 pr-8">
        <div className="space-y-4">
          {/* Step 1: Project Basics */}
          <Card className="border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Project Basics</h2>
                  <p className="text-xs text-muted-foreground">Define your project fundamentals</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Q1 2024 SEO Campaign"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn("h-9 text-sm", errors.name && "border-destructive")} />
                  
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2 flex-1">
                  <Label htmlFor="targetWebsite" className="text-sm font-semibold text-foreground">
                    Target Website
                  </Label>
                  <Input
                    id="targetWebsite"
                    placeholder="https://example.com"
                    value={formData.targetWebsite}
                    onChange={(e) => setFormData({ ...formData, targetWebsite: e.target.value })}
                    className={cn("h-9 text-sm", errors.targetWebsite && "border-destructive")} />
                  
                  {errors.targetWebsite && <p className="text-xs text-destructive">{errors.targetWebsite}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Project Objective
                </Label>
                <Select
                  value={formData.projectObject}
                  onValueChange={(value) => setFormData({ ...formData, projectObject: value })}>
                  
                  <SelectTrigger className={cn("h-9 text-sm", errors.projectObject && "border-destructive")}>
                    <SelectValue placeholder="What's your main goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase-traffic">🚀 Increase SEO Traffic</SelectItem>
                    <SelectItem value="boost-visibility">👁️ Boost Brand Visibility</SelectItem>
                    <SelectItem value="build-authority">⭐ Build Domain Authority</SelectItem>
                    <SelectItem value="drive-conversions">💰 Drive Conversions</SelectItem>
                    <SelectItem value="improve-rankings">📈 Improve Search Rankings</SelectItem>
                    <SelectItem value="generate-leads">🎯 Generate Leads</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectObject && <p className="text-xs text-destructive">{errors.projectObject}</p>}
              </div>

              <div className="space-y-2 group">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="publishInstructions" className="text-sm font-semibold text-foreground inline-flex items-center gap-2 cursor-help">
                        Instructions to Publisher
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                          <HelpCircleIcon className="w-3 h-3 text-primary" />
                        </span>
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[280px]">
                      <p>Provide default instructions for publishers about link placement, content guidelines, do-follow/no-follow preferences, and any other requirements for your guest posts.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <textarea
                  id="publishInstructions"
                  placeholder="Enter default instructions for publishers (e.g., link placement requirements, content guidelines, etc.)"
                  value={formData.publishInstructions}
                  onChange={(e) => setFormData({ ...formData, publishInstructions: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y" />
                
              </div>
            </div>
          </Card>

          {/* Step 2: Content Targeting */}
          <Card className="border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <TargetIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Content Targeting</h2>
                  <p className="text-xs text-muted-foreground">Choose your content categories</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Categories
                </Label>
                <Popover open={categoryPopoverOpen} onOpenChange={setCategoryPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div
                      role="combobox"
                      aria-expanded={categoryPopoverOpen}
                      onClick={() => setCategoryPopoverOpen(!categoryPopoverOpen)}
                      className={cn(
                        "w-full flex items-center justify-between min-h-[36px] h-auto px-3 py-2 text-sm font-normal rounded-md border border-input bg-background cursor-pointer hover:bg-accent/50 select-none",
                        errors.categories && "border-destructive",
                        formData.categories.length === 0 && "text-muted-foreground"
                      )}>
                      
                      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                        <TagIcon className="h-3.5 w-3.5 shrink-0" />
                        {formData.categories.length === 0 ?
                        <span className="truncate">Category</span> :

                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {formData.categories.map((category) =>
                          <span
                            key={category}
                            className="inline-flex items-center bg-blue-600 text-white border-2 border-blue-700 pl-4 pr-3 py-2 h-9 text-sm font-bold rounded-md shadow-md">
                            
                                {category}
                                <span
                              role="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({
                                  ...formData,
                                  categories: formData.categories.filter((c) => c !== category)
                                });
                              }}
                              className="ml-2.5 hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
                              
                                  <XIcon className="w-3.5 h-3.5" />
                                </span>
                              </span>
                          )}
                          </div>
                        }
                      </div>
                      <ChevronDownIcon className="h-3 w-3 opacity-50 shrink-0 ml-2" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <div className="flex flex-col">
                      <div className="p-2 border-b border-border">
                        <input
                          className="w-full h-8 px-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                          placeholder="Search category..."
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const el = e.currentTarget.closest('[data-radix-popper-content-wrapper]')?.querySelector('[data-category-list]');
                            if (el) {
                              const q = e.currentTarget.value.toLowerCase();
                              el.querySelectorAll('[data-category-item]').forEach((item) => {
                                item.style.display = item.dataset.value?.toLowerCase().includes(q) ? '' : 'none';
                              });
                            }
                          }} />
                        
                      </div>
                      <div className="max-h-[200px] overflow-y-auto" data-category-list>
                        {['Technology', 'Business', 'Health', 'Finance', 'Travel', 'Education', 'Lifestyle', 'Gaming', 'Marketing', 'Fashion', 'Sports', 'Automotive'].map((category) => {
                          const isSelected = formData.categories.includes(category);
                          const totalSelections = getTotalSelections();
                          const isDisabled = !isSelected && totalSelections >= MAX_CATEGORY_SENSITIVE;
                          return (
                            <div
                              key={category}
                              role="option"
                              aria-selected={isSelected}
                              data-category-item
                              data-value={category}
                              onClick={() => {
                                if (isDisabled) return;
                                let newCategories = [...formData.categories];
                                if (isSelected) {
                                  newCategories = newCategories.filter((c) => c !== category);
                                } else {
                                  newCategories = [...newCategories, category];
                                }
                                setFormData({ ...formData, categories: newCategories });
                              }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none",
                                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"
                              )}>
                              
                              <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary shrink-0",
                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                              )}>
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <span>{category}</span>
                            </div>);

                        })}
                      </div>
                      <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
                        {formData.categories.length > 0 &&
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, categories: [] })}
                          className="h-8">
                          
                            Clear Selection
                          </Button>
                        }
                        <span className="text-sm font-medium text-muted-foreground ml-auto px-2">
                          {getTotalSelections()}/{MAX_CATEGORY_SENSITIVE} maximum
                        </span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {errors.categories && <p className="text-xs text-destructive">{errors.categories}</p>}
              </div>

              <div className="space-y-2 group">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="text-sm font-semibold text-foreground inline-flex items-center gap-2 cursor-help">
                        Sensitive Topics
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-orange-500/10 hover:bg-orange-500/20 transition-colors">
                          <AlertTriangleIcon className="w-3 h-3 text-orange-500" />
                        </span>
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[280px]">
                      <p>Select this if you're working with sensitive or restricted content topics</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Popover open={sensitiveTopicPopoverOpen} onOpenChange={setSensitiveTopicPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div
                      role="combobox"
                      aria-expanded={sensitiveTopicPopoverOpen}
                      onClick={() => setSensitiveTopicPopoverOpen(!sensitiveTopicPopoverOpen)}
                      className={cn(
                        "w-full flex items-center justify-between min-h-[36px] h-auto px-3 py-2 text-sm font-normal rounded-md border border-dashed border-input bg-background cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-300 transition-all duration-200 select-none",
                        formData.sensitiveTopics.length === 0 && "text-muted-foreground"
                      )}>
                      
                      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                        <EyeOffIcon className="h-3.5 w-3.5 shrink-0" />
                        {formData.sensitiveTopics.length === 0 ?
                        <span className="truncate">Sensitive Topics</span> :

                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {formData.sensitiveTopics.map((topic) =>
                          <span
                            key={topic}
                            className="inline-flex items-center bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-700 pl-3 pr-2 py-1.5 h-8 text-xs font-medium rounded-md">
                            
                                <EyeOffIcon className="w-3 h-3 mr-1 opacity-60" />
                                {topic}
                                <span
                              role="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({
                                  ...formData,
                                  sensitiveTopics: formData.sensitiveTopics.filter((t) => t !== topic)
                                });
                              }}
                              className="ml-1 hover:bg-orange-300 dark:hover:bg-orange-800 rounded-full p-0.5 transition-colors cursor-pointer">
                              
                                  <XIcon className="w-3 h-3" />
                                </span>
                              </span>
                          )}
                          </div>
                        }
                      </div>
                      <ChevronDownIcon className="h-3 w-3 opacity-50 shrink-0 ml-2" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0" align="start">
                    <div className="flex flex-col">
                      <div className="p-2 border-b border-border">
                        <input
                          className="w-full h-8 px-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                          placeholder="Search topic..."
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const el = e.currentTarget.closest('[data-radix-popper-content-wrapper]')?.querySelector('[data-topic-list]');
                            if (el) {
                              const q = e.currentTarget.value.toLowerCase();
                              el.querySelectorAll('[data-topic-item]').forEach((item) => {
                                item.style.display = item.dataset.value?.toLowerCase().includes(q) ? '' : 'none';
                              });
                            }
                          }} />
                        
                      </div>
                      <div className="max-h-[200px] overflow-y-auto" data-topic-list>
                        {['Adult Content', 'Gambling', 'Pharmaceuticals', 'Politics', 'Religion', 'Cryptocurrency', 'CBD', 'Dating', 'Forex'].map((topic) => {
                          const isSelected = formData.sensitiveTopics.includes(topic);
                          const totalSelections = getTotalSelections();
                          const isDisabled = !isSelected && totalSelections >= MAX_CATEGORY_SENSITIVE;
                          return (
                            <div
                              key={topic}
                              role="option"
                              aria-selected={isSelected}
                              data-topic-item
                              data-value={topic}
                              onClick={() => {
                                if (isDisabled) return;
                                let newTopics = [...formData.sensitiveTopics];
                                if (isSelected) {
                                  newTopics = newTopics.filter((t) => t !== topic);
                                } else {
                                  newTopics = [...newTopics, topic];
                                }
                                setFormData({ ...formData, sensitiveTopics: newTopics });
                              }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none",
                                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"
                              )}>
                              
                              <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border border-destructive shrink-0",
                                isSelected ? "bg-destructive text-destructive-foreground" : "opacity-50"
                              )}>
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <span>{topic}</span>
                            </div>);

                        })}
                      </div>
                      <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
                        {formData.sensitiveTopics.length > 0 &&
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, sensitiveTopics: [] })}
                          className="h-8">
                          
                            Clear Selection
                          </Button>
                        }
                        <span className="text-sm font-medium text-muted-foreground ml-auto px-2">
                          {getTotalSelections()}/{MAX_CATEGORY_SENSITIVE} maximum
                        </span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

            </div>
          </Card>

          {/* Step 3: Localization */}
          <Card className="border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <GlobeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Localization</h2>
                  <p className="text-xs text-muted-foreground">Define your target markets</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Languages
                </Label>
                <Popover open={languagePopoverOpen} onOpenChange={setLanguagePopoverOpen}>
                  <PopoverTrigger asChild>
                    <div
                      role="combobox"
                      aria-expanded={languagePopoverOpen}
                      onClick={() => setLanguagePopoverOpen(!languagePopoverOpen)}
                      className={cn(
                        "w-full flex items-center justify-between bg-background h-auto min-h-[44px] px-3 py-2 rounded-md border border-input cursor-pointer hover:bg-accent/50 select-none",
                        errors.languages && "border-destructive",
                        formData.languages.length === 0 && "text-muted-foreground"
                      )}>
                      
                      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                        {formData.languages.length === 0 ?
                        <span className="text-sm">Select up to {MAX_LANGUAGES} languages...</span> :

                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {formData.languages.map((lang) =>
                          <span
                            key={lang}
                            className="inline-flex items-center bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 pl-2.5 pr-1.5 py-1 h-7 text-xs font-semibold rounded-md">
                            
                                {lang}
                                <span
                              role="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({
                                  ...formData,
                                  languages: formData.languages.filter((l) => l !== lang)
                                });
                              }}
                              className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5 transition-colors cursor-pointer">
                              
                                  <XIcon className="w-3 h-3" />
                                </span>
                              </span>
                          )}
                          </div>
                        }
                      </div>
                      <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <div className="flex flex-col">
                      <div className="p-2 border-b border-border">
                        <input
                          className="w-full h-8 px-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                          placeholder="Search language..."
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const el = e.currentTarget.closest('[data-radix-popper-content-wrapper]')?.querySelector('[data-language-list]');
                            if (el) {
                              const q = e.currentTarget.value.toLowerCase();
                              el.querySelectorAll('[data-language-item]').forEach((item) => {
                                item.style.display = item.dataset.value?.toLowerCase().includes(q) ? '' : 'none';
                              });
                            }
                          }} />
                        
                      </div>
                      <div className="max-h-[200px] overflow-y-auto" data-language-list>
                        {[
                        { name: 'English', flag: '🇺🇸' },
                        { name: 'Spanish', flag: '🇪🇸' },
                        { name: 'German', flag: '🇩🇪' },
                        { name: 'French', flag: '🇫🇷' },
                        { name: 'Italian', flag: '🇮🇹' },
                        { name: 'Portuguese', flag: '🇵🇹' }].
                        map((language) => {
                          const isSelected = formData.languages.includes(language.name);
                          const isDisabled = !isSelected && formData.languages.length >= MAX_LANGUAGES;
                          return (
                            <div
                              key={language.name}
                              role="option"
                              aria-selected={isSelected}
                              data-language-item
                              data-value={language.name}
                              onClick={() => {
                                if (isDisabled) return;
                                let newLanguages = [...formData.languages];
                                if (isSelected) {
                                  newLanguages = newLanguages.filter((l) => l !== language.name);
                                } else {
                                  newLanguages = [...newLanguages, language.name];
                                }
                                setFormData({ ...formData, languages: newLanguages });
                              }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none",
                                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"
                              )}>
                              
                              <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary shrink-0",
                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                              )}>
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                {language.flag}
                                {language.name}
                              </div>
                            </div>);

                        })}
                      </div>
                      <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
                        {formData.languages.length > 0 &&
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, languages: [] })}
                          className="h-8">
                          
                            Clear Selection
                          </Button>
                        }
                        <span className="text-sm font-medium text-muted-foreground ml-auto px-2">
                          {formData.languages.length}/{MAX_LANGUAGES} selected
                        </span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {errors.languages && <p className="text-xs text-destructive">{errors.languages}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  Target Countries
                </Label>
                <Popover open={countryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div
                      role="combobox"
                      aria-expanded={countryPopoverOpen}
                      onClick={() => setCountryPopoverOpen(!countryPopoverOpen)}
                      className={cn(
                        "w-full flex items-center justify-between bg-background h-auto min-h-[44px] px-3 py-2 rounded-md border border-input cursor-pointer hover:bg-accent/50 select-none",
                        formData.countries.length === 0 && "text-muted-foreground"
                      )}>
                      
                      <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                        {formData.countries.length === 0 ?
                        <span className="text-sm">Select up to {MAX_COUNTRIES} countries...</span> :

                        <div className="flex flex-wrap gap-1.5 flex-1">
                            {formData.countries.map((country) =>
                          <span
                            key={country}
                            className="inline-flex items-center bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 pl-2.5 pr-1.5 py-1 h-7 text-xs font-semibold rounded-md">
                            
                                {country}
                                <span
                              role="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData({
                                  ...formData,
                                  countries: formData.countries.filter((c) => c !== country)
                                });
                              }}
                              className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-0.5 transition-colors cursor-pointer">
                              
                                  <XIcon className="w-3 h-3" />
                                </span>
                              </span>
                          )}
                          </div>
                        }
                      </div>
                      <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50 shrink-0" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <div className="flex flex-col">
                      <div className="p-2 border-b border-border">
                        <input
                          className="w-full h-8 px-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                          placeholder="Search country..."
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            const el = e.currentTarget.closest('[data-radix-popper-content-wrapper]')?.querySelector('[data-country-list]');
                            if (el) {
                              const q = e.currentTarget.value.toLowerCase();
                              el.querySelectorAll('[data-country-item]').forEach((item) => {
                                item.style.display = item.dataset.value?.toLowerCase().includes(q) ? '' : 'none';
                              });
                            }
                          }} />
                        
                      </div>
                      <div className="max-h-[200px] overflow-y-auto" data-country-list>
                        {[
                        { name: 'United States', flag: '🇺🇸' },
                        { name: 'United Kingdom', flag: '🇬🇧' },
                        { name: 'Canada', flag: '🇨🇦' },
                        { name: 'Australia', flag: '🇦🇺' },
                        { name: 'France', flag: '🇫🇷' },
                        { name: 'Spain', flag: '🇪🇸' },
                        { name: 'Italy', flag: '🇮🇹' },
                        { name: 'Netherlands', flag: '🇳🇱' },
                        { name: 'Sweden', flag: '🇸🇪' }].
                        map((country) => {
                          const isSelected = formData.countries.includes(country.name);
                          const isDisabled = !isSelected && formData.countries.length >= MAX_COUNTRIES;
                          return (
                            <div
                              key={country.name}
                              role="option"
                              aria-selected={isSelected}
                              data-country-item
                              data-value={country.name}
                              onClick={() => {
                                if (isDisabled) return;
                                let newCountries = [...formData.countries];
                                if (isSelected) {
                                  newCountries = newCountries.filter((c) => c !== country.name);
                                } else {
                                  newCountries = [...newCountries, country.name];
                                }
                                setFormData({ ...formData, countries: newCountries });
                              }}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none",
                                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent hover:text-accent-foreground"
                              )}>
                              
                              <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary shrink-0",
                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                              )}>
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-foreground">
                                {country.flag}
                                {country.name}
                              </div>
                            </div>);

                        })}
                      </div>
                      <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between">
                        {formData.countries.length > 0 &&
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, countries: [] })}
                          className="h-8">
                          
                            Clear Selection
                          </Button>
                        }
                        <span className="text-sm font-medium text-muted-foreground ml-auto px-2">
                          {formData.countries.length}/{MAX_COUNTRIES} selected
                        </span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </Card>

          {/* Step 4: Links & Publishing */}
          <Card className="border border-border/50 overflow-hidden">
            <div className="bg-muted/30 p-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Links & Publishing</h2>
                  <p className="text-xs text-muted-foreground">Configure your target pages</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">Target Pages</Label>
                
                <div className="space-y-1.5">
                  {targetPages.map((tp, index) =>
                  <div key={tp.id} className="flex gap-2 items-start">
                      <div className="flex-1 flex gap-2">
                        <Input
                        placeholder="Anchor text (e.g., Contlinks)"
                        value={tp.anchor}
                        onChange={(e) => updateTargetPage(tp.id, 'anchor', e.target.value)}
                        className="h-9 text-sm flex-1" />
                      
                        <Input
                        placeholder="Target URL (e.g., https://contlinks.com/)"
                        value={tp.url}
                        onChange={(e) => updateTargetPage(tp.id, 'url', e.target.value)}
                        className="h-9 text-sm flex-1" />
                      
                      </div>
                      {targetPages.length > 1 &&
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0 h-9 w-9"
                      onClick={() => removeTargetPage(tp.id)}>
                      
                          <XIcon className="w-4 h-4" />
                        </Button>
                    }
                    </div>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={addTargetPage}
                  className="w-full border-dashed h-9 text-sm">
                  
                  <XIcon className="w-4 h-4 mr-2 rotate-45" />
                  Add Another Target Page
                </Button>
              </div>

            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 pb-6">
            <Button
              variant="outline"
              onClick={onCancel}
              className="h-9 px-6 text-sm">
              
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-8 text-sm font-medium">
              
              Create Project
            </Button>
          </div>
        </div>
      </div>
    </div>);

}