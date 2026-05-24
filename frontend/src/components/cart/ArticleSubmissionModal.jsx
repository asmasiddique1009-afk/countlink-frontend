import { useState, useEffect, useRef, useCallback } from 'react';
import {
  XIcon,
  FileTextIcon,
  LinkIcon,
  Trash2Icon,
  PlusCircleIcon,
  SaveIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,



  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  ImageIcon,
  Undo2Icon,
  Redo2Icon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Link2Icon,
  MinusIcon,
  CodeIcon,
  PaletteIcon,
  ChevronDownIcon,
  TypeIcon,
  HighlighterIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';








const TEXT_COLORS = [
{ label: 'Default', value: 'inherit' },
{ label: 'Red', value: '#ef4444' },
{ label: 'Orange', value: '#f97316' },
{ label: 'Yellow', value: '#eab308' },
{ label: 'Green', value: '#22c55e' },
{ label: 'Teal', value: '#14b8a6' },
{ label: 'Blue', value: '#3b82f6' },
{ label: 'Indigo', value: '#6366f1' },
{ label: 'Purple', value: '#a855f7' },
{ label: 'Pink', value: '#ec4899' },
{ label: 'Gray', value: '#6b7280' },
{ label: 'Black', value: '#000000' }];


const HIGHLIGHT_COLORS = [
{ label: 'None', value: 'transparent' },
{ label: 'Yellow', value: '#fef08a' },
{ label: 'Green', value: '#bbf7d0' },
{ label: 'Blue', value: '#bfdbfe' },
{ label: 'Pink', value: '#fbcfe8' },
{ label: 'Orange', value: '#fed7aa' }];


const HEADING_OPTIONS = [
{ label: 'Paragraph', tag: 'p', className: 'text-sm' },
{ label: 'Heading 1', tag: 'h1', className: 'text-2xl font-bold' },
{ label: 'Heading 2', tag: 'h2', className: 'text-xl font-bold' },
{ label: 'Heading 3', tag: 'h3', className: 'text-lg font-semibold' },
{ label: 'Heading 4', tag: 'h4', className: 'text-base font-semibold' }];


function ToolbarButton({
  onClick,
  title,
  active = false,
  children,
  disabled = false






}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {e.preventDefault();onClick();}}
      title={title}
      disabled={disabled}
      className={`p-1 rounded transition-colors ${
      active ?
      'bg-primary/15 text-primary' :
      'text-muted-foreground hover:bg-accent hover:text-foreground'} disabled:opacity-30 disabled:cursor-not-allowed`
      }>
      
      {children}
    </button>);

}

function ToolbarDivider() {
  return <div className="w-px h-4 bg-border mx-0.5 shrink-0" />;
}

export function ArticleSubmissionModal({ isOpen, onClose, onSave, initialData }) {
  const [articleTitle, setArticleTitle] = useState('');
  const [links, setLinks] = useState([{ anchor: '', url: '', type: 'Do-Follow' }]);
  const [instructions, setInstructions] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [activeFormats, setActiveFormats] = useState({});
  const [editorEmpty, setEditorEmpty] = useState(true);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const colorPickerRef = useRef(null);
  const highlightPickerRef = useRef(null);
  const headingDropdownRef = useRef(null);
  const savedSelectionRef = useRef(null);

  // Close pickers on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) setShowColorPicker(false);
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(e.target)) setShowHighlightPicker(false);
      if (headingDropdownRef.current && !headingDropdownRef.current.contains(e.target)) setShowHeadingDropdown(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    if (initialData) {
      setArticleTitle(initialData.title || '');
      setLinks(initialData.links || [{ anchor: '', url: '', type: 'Do-Follow' }]);
      setInstructions(initialData.instructions || '');
      if (editorRef.current && initialData.content) {
        editorRef.current.innerHTML = initialData.content;
        setEditorEmpty(false);
      }
    } else {
      setArticleTitle('');
      setLinks([{ anchor: '', url: '', type: 'Do-Follow' }]);
      setInstructions('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
        setEditorEmpty(true);
      }
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

  const exec = useCallback((command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  }, []);

  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight')
    });
  }, []);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  const applyHeading = (tag) => {
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, tag);
    setShowHeadingDropdown(false);
    updateActiveFormats();
  };

  const applyColor = (color) => {
    restoreSelection();
    document.execCommand('foreColor', false, color);
    editorRef.current?.focus();
    setShowColorPicker(false);
  };

  const applyHighlight = (color) => {
    restoreSelection();
    if (color === 'transparent') {
      document.execCommand('removeFormat', false, undefined);
    } else {
      document.execCommand('hiliteColor', false, color);
    }
    editorRef.current?.focus();
    setShowHighlightPicker(false);
  };

  const insertLink = () => {
    if (!linkUrl.trim()) return;
    restoreSelection();
    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    document.execCommand('createLink', false, url);
    // Make it open in new tab
    const sel = window.getSelection();
    if (sel && sel.anchorNode) {
      const anchor = sel.anchorNode.closest ?
      sel.anchorNode.closest('a') :
      null;
      if (anchor) {anchor.setAttribute('target', '_blank');anchor.setAttribute('rel', 'noopener noreferrer');}
    }
    editorRef.current?.focus();
    setShowLinkDialog(false);
    setLinkUrl('');
  };

  const insertImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      editorRef.current?.focus();
      document.execCommand('insertImage', false, ev.target?.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const insertHR = () => {
    editorRef.current?.focus();
    document.execCommand('insertHorizontalRule', false, undefined);
  };

  const handleAddLink = () => {
    if (links.length < 2) setLinks([...links, { anchor: '', url: '', type: 'Do-Follow' }]);
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
    const content = editorRef.current?.innerHTML || '';
    if (!content.trim() || content === '<br>') return;
    onSave({ title: articleTitle, content, links, instructions });
    onClose();
  };

  const getCurrentHeadingLabel = () => {
    const block = document.queryCommandValue('formatBlock');
    const match = HEADING_OPTIONS.find((h) => h.tag === block.toLowerCase());
    return match?.label || 'Paragraph';
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4 overflow-y-auto">
      
      <div
        ref={modalRef}
        className="bg-background w-full max-w-4xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/50 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <FileTextIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground tracking-tight">Article Submission</h2>
              <span className="text-[11px] text-muted-foreground leading-none">Provide content for your guest post</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <XIcon className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar bg-muted/5">

          {/* ── Article Title ── */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1 px-0.5">
              <span className="text-sm font-semibold text-foreground">Article Title</span>
              <span className="text-destructive text-sm">*</span>
            </div>
            <section className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-1.5">
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Enter your article title…"
                  className="w-full bg-transparent text-foreground text-sm font-semibold placeholder:text-muted-foreground/50 placeholder:font-normal focus:outline-none focus:ring-0 border-none" />
                
              </div>
            </section>
          </div>

          {/* ── Article Content ── */}
          <div className="flex items-center gap-1 px-0.5 -mb-2">
            <span className="text-sm font-semibold text-foreground">Article Content</span>
            <span className="text-destructive text-sm">*</span>
          </div>
          <section className="bg-card rounded-lg border border-border shadow-sm overflow-visible">

            {/* ── Toolbar ── */}
            <div className="px-1.5 py-1 border-b border-border bg-muted/10 flex flex-wrap items-center gap-0.5 sticky top-0 z-10 backdrop-blur-sm">

              {/* Undo / Redo */}
              <ToolbarButton onClick={() => exec('undo')} title="Undo"><Undo2Icon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('redo')} title="Redo"><Redo2Icon className="w-3 h-3" /></ToolbarButton>
              <ToolbarDivider />

              {/* Heading dropdown */}
              <div className="relative" ref={headingDropdownRef}>
                <button
                  type="button"
                  onMouseDown={(e) => {e.preventDefault();saveSelection();setShowHeadingDropdown((v) => !v);}}
                  className="flex items-center gap-1 px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground rounded transition-colors min-w-[88px]">
                  
                  <TypeIcon className="w-3 h-3 shrink-0" />
                  <span className="flex-1 text-left">{getCurrentHeadingLabel()}</span>
                  <ChevronDownIcon className="w-2.5 h-2.5 shrink-0" />
                </button>
                {showHeadingDropdown &&
                <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                    {HEADING_OPTIONS.map((h) =>
                  <button
                    key={h.tag}
                    type="button"
                    onMouseDown={(e) => {e.preventDefault();applyHeading(h.tag);}}
                    className={`w-full text-left px-3 py-2 hover:bg-accent transition-colors ${h.className}`}>
                    
                        {h.label}
                      </button>
                  )}
                  </div>
                }
              </div>
              <ToolbarDivider />

              {/* Text style */}
              <ToolbarButton onClick={() => exec('bold')} title="Bold" active={activeFormats.bold}><BoldIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('italic')} title="Italic" active={activeFormats.italic}><ItalicIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('underline')} title="Underline" active={activeFormats.underline}><UnderlineIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('strikeThrough')} title="Strikethrough" active={activeFormats.strikeThrough}><StrikethroughIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('formatBlock', 'pre')} title="Code Block"><CodeIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarDivider />

              {/* Text color */}
              <div className="relative" ref={colorPickerRef}>
                <button
                  type="button"
                  onMouseDown={(e) => {e.preventDefault();saveSelection();setShowColorPicker((v) => !v);setShowHighlightPicker(false);}}
                  title="Text Color"
                  className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  
                  <PaletteIcon className="w-3 h-3" />
                </button>
                {showColorPicker &&
                <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-2 grid grid-cols-6 gap-1 w-[148px]">
                    {TEXT_COLORS.map((c) =>
                  <button
                    key={c.value}
                    type="button"
                    onMouseDown={(e) => {e.preventDefault();applyColor(c.value);}}
                    title={c.label}
                    className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.value === 'inherit' ? 'transparent' : c.value, border: c.value === 'inherit' ? '1px solid var(--border)' : undefined }}>
                    
                        {c.value === 'inherit' && <span className="text-[8px] text-foreground font-bold flex items-center justify-center h-full">A</span>}
                      </button>
                  )}
                  </div>
                }
              </div>

              {/* Highlight */}
              <div className="relative" ref={highlightPickerRef}>
                <button
                  type="button"
                  onMouseDown={(e) => {e.preventDefault();saveSelection();setShowHighlightPicker((v) => !v);setShowColorPicker(false);}}
                  title="Highlight"
                  className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  
                  <HighlighterIcon className="w-3 h-3" />
                </button>
                {showHighlightPicker &&
                <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-2 flex gap-1 w-auto">
                    {HIGHLIGHT_COLORS.map((c) =>
                  <button
                    key={c.value}
                    type="button"
                    onMouseDown={(e) => {e.preventDefault();applyHighlight(c.value);}}
                    title={c.label}
                    className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.value }} />

                  )}
                  </div>
                }
              </div>
              <ToolbarDivider />

              {/* Lists */}
              <ToolbarButton onClick={() => exec('insertUnorderedList')} title="Bullet List" active={activeFormats.insertUnorderedList}><ListIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('insertOrderedList')} title="Ordered List" active={activeFormats.insertOrderedList}><ListOrderedIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('formatBlock', 'blockquote')} title="Blockquote"><QuoteIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarDivider />

              {/* Alignment */}
              <ToolbarButton onClick={() => exec('justifyLeft')} title="Align Left" active={activeFormats.justifyLeft}><AlignLeftIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('justifyCenter')} title="Align Center" active={activeFormats.justifyCenter}><AlignCenterIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarButton onClick={() => exec('justifyRight')} title="Align Right" active={activeFormats.justifyRight}><AlignRightIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarDivider />

              {/* Insert Link */}
              <div className="relative">
                <ToolbarButton
                  onClick={() => {saveSelection();setShowLinkDialog((v) => !v);}}
                  title="Insert Link">
                  
                  <Link2Icon className="w-3 h-3" />
                </ToolbarButton>
                {showLinkDialog &&
                <div className="absolute left-0 top-full mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-3 flex items-center gap-2 w-72">
                    <LinkIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <input
                    autoFocus
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') insertLink();if (e.key === 'Escape') setShowLinkDialog(false);}}
                    placeholder="https://example.com"
                    className="flex-1 text-xs bg-background border border-input rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary" />
                  
                    <button type="button" onClick={insertLink} className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-colors">Add</button>
                  </div>
                }
              </div>

              {/* Insert Image */}
              <ToolbarButton onClick={() => imageInputRef.current?.click()} title="Insert Image">
                <ImageIcon className="w-3 h-3" />
              </ToolbarButton>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={insertImage} />

              {/* Horizontal Rule */}
              <ToolbarButton onClick={insertHR} title="Horizontal Rule"><MinusIcon className="w-3 h-3" /></ToolbarButton>
              <ToolbarDivider />

              {/* Clear formatting */}
              <ToolbarButton onClick={() => exec('removeFormat')} title="Clear Formatting">
                <span className="text-[10px] font-bold px-0.5">Tx</span>
              </ToolbarButton>
            </div>

            {/* ── Editable area ── */}
            <div className="relative overflow-y-auto" style={{ maxHeight: '340px' }}>
              {editorEmpty &&
              <div className="absolute top-4 left-4 text-muted-foreground/50 text-sm pointer-events-none select-none">
                  Start writing your article here…
                </div>
              }
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const html = e.currentTarget.innerHTML;
                  setEditorEmpty(!html || html === '<br>');
                  updateActiveFormats();
                }}
                onKeyUp={updateActiveFormats}
                onMouseUp={updateActiveFormats}
                onFocus={updateActiveFormats}
                className="min-h-[300px] p-4 focus:outline-none text-sm leading-relaxed prose prose-sm max-w-none
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-4
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3
                  [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-1 [&_h4]:mt-2
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3
                  [&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-3 [&_pre]:text-xs [&_pre]:font-mono [&_pre]:my-2 [&_pre]:overflow-x-auto
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_ol]:space-y-1
                  [&_a]:text-primary [&_a]:underline
                  [&_img]:max-w-full [&_img]:rounded-md [&_img]:my-3
                  [&_hr]:border-border [&_hr]:my-4
                  [&_p]:mb-2"












                style={{ wordBreak: 'break-word' }} />
              
            </div>

            {/* Word count */}
            <div className="px-4 py-2 border-t border-border bg-muted/10 flex justify-end">
              <span className="text-[10px] text-muted-foreground">
                {editorRef.current?.innerText?.trim().split(/\s+/).filter(Boolean).length || 0} words
              </span>
            </div>
          </section>

          {/* ── Anchor Text & Links ── */}
          <section className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/20 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                Anchor Text &amp; Links <span className="text-destructive">*</span>
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
                <div className="md:col-span-1 text-center" />
              </div>

              {links.map((link, index) =>
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-muted/30 rounded-md border border-border/50 items-start group hover:border-border transition-colors">
                  <div className="md:col-span-4">
                    <label className="block md:hidden text-xs font-medium text-muted-foreground mb-1">Anchor Text</label>
                    <input
                    className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-xs h-9 px-3"
                    type="text"
                    placeholder="e.g. Best CRM Software"
                    value={link.anchor}
                    onChange={(e) => handleLinkChange(index, 'anchor', e.target.value)} />
                  
                  </div>
                  <div className="md:col-span-5">
                    <label className="block md:hidden text-xs font-medium text-muted-foreground mb-1">Target URL</label>
                    <input
                    className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-xs h-9 px-3"
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
                    disabled={links.length === 1 && index === 0}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-destructive/10 disabled:opacity-30 disabled:cursor-not-allowed">
                    
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

          {/* ── Order Instructions ── */}
          <section className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                Order Instructions <span className="text-destructive">*</span>
              </h3>
            </div>
            <div className="p-4">
              <textarea
                className="block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary text-sm p-3 min-h-[80px] resize-y"
                placeholder="Any specific instructions for the editor?"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)} />
              
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border bg-card rounded-b-xl flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="h-9 text-xs">Cancel</Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-9 text-xs px-5 shadow-sm">
            Save Article
            <SaveIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>);

}