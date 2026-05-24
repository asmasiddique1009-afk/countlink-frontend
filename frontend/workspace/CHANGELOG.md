<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
<!-- NEXT_ENTRY_HERE -->
### [2026-05-05] — Update SEO domain from preview URL to contlinks.com
- `index.html` — canonical, og:url, og:image, twitter:image, JSON-LD @id/url/sameAs all updated to https://contlinks.com; brand name PostBridge → ContLinks; twitter handle → @contlinks
- `public/robots.txt` — Sitemap directive updated to https://contlinks.com/sitemap.xml
- `public/sitemap.xml` — all 13 `<loc>` entries updated from preview URL to https://contlinks.com
- `public/llms.txt` — Live URL, Sitemap, and brand name updated to ContLinks / contlinks.com
### [2026-05-05] — Highlight On Hold / Awaiting Clearance labels & digits
- `src/components/Header.tsx` — labels changed to `text-foreground/75 font-medium`; amounts to `text-foreground font-semibold`; icons to `text-foreground/60`
### [2026-05-05] — Add colon after On Hold / Awaiting Clearance labels & mute digits
- `src/components/Header.tsx` — appended `:` to both label spans; amount spans changed to `text-muted-foreground tracking-tight`; icons shrunk to `w-3 h-3`
### [2026-05-05] — Remove bold from On Hold / Awaiting Clearance amount spans
- `src/components/Header.tsx` — changed both amount spans from `font-semibold` to `font-normal`
### [2026-05-05] — Shrink On Hold / Awaiting Clearance amount font size
- `src/components/Header.tsx` — changed amount spans from `text-xs` to `text-[11px]` in both advertiser and publisher wallet dropdown rows
### [2026-05-05] — Add On Hold / Awaiting Clearance to wallet dropdown
- `src/stores/walletStore.ts` — added `onHoldAmount` + `awaitingClearanceAmount` fields (default $1,960) + setters
- `src/components/Header.tsx` — wallet dropdown now shows amber "On Hold" pill (advertiser) or blue "Awaiting Clearance" pill (publisher) with formatted amount above action items; dropdown width bumped to w-56; added `LockIcon` + `HourglassIcon` imports; removed unused `MessageCircleIcon`/`StarIcon`; imported `useWalletStore`
### [2026-05-05] — SEO settings: live URL + favicon.png across all SEO files
- `index.html` — updated canonical, og:url, og:image, twitter:image, icon links, JSON-LD to live URL + /favicon.png
- `public/robots.txt` — updated Sitemap directive to live URL
- `public/sitemap.xml` — updated all `<loc>` entries + lastmod to 2026-05-05 with live URL
- `public/llms.txt` — updated Live URL and Sitemap fields to live URL
- `public/site.webmanifest` — icons already use /favicon.png (no change needed)
### [2026-05-05] — LiveTimer now shows days, hours, and minutes
- `src/components/OrdersTable.tsx` — updated `days > 0` branch from `${days}d ${hours}h` to `${days}d ${hours}h ${minutes}m`
### [2026-05-05] — Switch wallet balance font from mono to Outfit/Inter with tabular-nums
- `src/components/Header.tsx` — replaced `font-mono` with `fontFamily: Outfit/Inter sans-serif` + `fontVariantNumeric: tabular-nums` on balance span
### [2026-05-05] — Heart icon in header redirects to catalogue with Favorites filter active
- `src/components/Header.tsx` — added `onFavoritesClick` prop; wired `onClick` on the HeartIcon button
- `src/App.tsx` — added `catalogueShowFavorites` state + `handleFavoritesClick` handler; passes `initialShowFavorites` + unique `key` to `CataloguePage`
- `src/components/catalogue/CataloguePage.tsx` — added `initialShowFavorites` prop; `useState(initialShowFavorites)` seeds the favorites-only filter on mount
### [2026-05-05] — Fix useWindowSize import in Header.tsx
- `src/components/Header.tsx` — changed `@/hooks/use-mobile` import to relative `../hooks/use-mobile` to resolve Sandpack bundler alias failure at runtime
### [2026-05-05] — Further reduce Article Title section height
- `src/components/cart/ArticleSubmissionModal.tsx` — changed title input wrapper from `py-2.5` to `py-1.5` for a slimmer box

### [2026-05-05] — Compact Article Title box with label floating above section
- `src/components/cart/ArticleSubmissionModal.tsx` — wrapped title label+section in a `space-y-1.5` div so label sits above the box
- Reduced title input padding from `p-4` to `px-4 py-2.5`; font size from `text-base` to `text-sm`; bg changed to `bg-transparent`

### [2026-05-05] — Add separate Article Title input box in ArticleSubmissionModal
- `src/components/cart/ArticleSubmissionModal.tsx` — added `articleTitle` state + a distinct card section above Article Content
- Title box is a borderless full-width `<input>` with `font-semibold` inside a `bg-card rounded-lg border` card
- Title saved alongside content/links/instructions via `onSave({ title, content, links, instructions })`
### [2026-05-05] — Increase copywriting fee text size in CataloguePage
- `src/components/catalogue/CataloguePage.tsx` — bumped copywriting fee from `text-[11px]`/`w-2.5 h-2.5` to `text-sm`/`w-3.5 h-3.5`
### [2026-05-05] — Improve Pricing column in CataloguePage
- `src/components/catalogue/CataloguePage.tsx` — redesigned pricing cell: bold main price (green when discounted), inline strikethrough + pill badge for % OFF, copywriting fee with PenTool icon + tooltip
- Discounted price renders in `text-green-600 font-bold`; original price shown as `line-through text-muted-foreground` alongside red pill badge
### [2026-05-04] — Add full rich-text editor to OrderDetailsModal article edit mode
- `src/components/modals/OrderDetailsModal.tsx` — replaced plain `<Input>` title + `<Textarea>` (Markdown) with full rich-text editor (all modules)
- Extracted RteToolbarButton/RteToolbarDivider components + all constants (TEXT_COLORS, HIGHLIGHT_COLORS, HEADING_OPTIONS) into the file
- Editor syncs existing `articleContent` HTML into contentEditable on `isEditingArticle` toggle; `handleSaveDetails` captures innerHTML back

### [2026-05-04] — Cart cards individually selectable/unselectable via checkbox
- `src/components/cart/CartPage.tsx` — added `selectedItems` state (all true by default); checkbox toggles inclusion per card
- Deselected cards dim to 60% opacity; selected cards show primary border ring
- Order summary count + total reflect only selected items; Place Order disabled when none selected

### [2026-05-04] — Fix checkbox check: onCheckedChange(true) now opens ArticleSubmissionModal
- `src/components/cart/CartPage.tsx` — `onCheckedChange` was missing `if (val)` branch; checking box now opens submission modal

### [2026-05-04] — Fix cart item checkbox: bind checked to writingOption, allow uncheck to clear
- `src/components/cart/CartPage.tsx` — `<Checkbox checked />` was hardcoded `true`; now `checked={item.writingOption !== undefined}`
- `onCheckedChange` clears `writingOption` and resets per-item error when unchecked

### [2026-05-04] — Move Article Content label outside the editor section box
- `src/components/cart/ArticleSubmissionModal.tsx` — removed label `div` from inside `<section>`, placed it as a sibling `div` directly above the section

### [2026-05-04] — Remove Article Content section header bar, show label inline above toolbar
- `src/components/cart/ArticleSubmissionModal.tsx` — replaced full `border-b` header div with a compact inline label row (`px-4 pt-3 pb-1.5`)
- "Article Content *" now sits directly above the toolbar with no heavy section separator

### [2026-05-04] — Compact sticky toolbar in ArticleSubmissionModal
- `src/components/cart/ArticleSubmissionModal.tsx` — reduced toolbar padding (py-1, px-1.5), icon sizes w-3/h-3, button padding p-1
- Toolbar made `sticky top-0 z-10 backdrop-blur-sm` so it stays fixed when article content scrolls
- Editable area wrapped with `overflow-y-auto max-h-[340px]` to isolate scroll within the editor

### [2026-05-04] — Full rich-text editor in ArticleSubmissionModal
- `src/components/cart/ArticleSubmissionModal.tsx` — replaced textarea with `contentEditable` div + full toolbar
- Toolbar: undo/redo, heading dropdown (P/H1–H4), bold/italic/underline/strikethrough/code, text color (12 colors), highlight (6 colors), bullet/ordered lists, blockquote, align left/center/right, insert link dialog, insert image, horizontal rule, clear formatting
- Inline dropdowns for heading/color/highlight with outside-click close; link dialog with Enter-to-confirm
- Word count display in footer bar; placeholder shown when editor is empty
### [2026-05-04] — Wallet button: show only icon + amount, remove Balance label
- `src/components/Header.tsx` — removed "Balance" text label; button now shows WalletIcon + bold amount only

### [2026-05-04] — Polish wallet balance button in Header
- `src/components/Header.tsx` — wallet button now inline: WalletIcon + "Balance" label + thin `bg-border` divider + bold amount
- Mobile still shows icon-only; sm+ shows the full inline pill
### [2026-05-04] — Move balance display from dropdown label onto wallet button in header
- `src/components/Header.tsx` — removed `DropdownMenuLabel` balance block from inside dropdown
- Wallet button now shows "Balance / $12,450.00" inline (hidden on mobile, visible sm+)
### [2026-05-04] — Fix Radix dropdown removeChild crash by removing Portal wrapper
- `src/components/ui/dropdown-menu.tsx` — removed `DropdownMenuPrimitive.Portal` wrapper from `DropdownMenuContent`
- Dropdowns now render in-tree instead of teleporting to `document.body`, eliminating portal teardown mismatch
### [2026-05-04] — Redesign wallet trigger button and dropdown menu in Header
- `src/components/Header.tsx` — wallet button now has balance label + bold amount, rounded-xl, subtle shadow
- Dropdown redesigned: header block shows balance, each item has colored icon chip + two-line label (title + subtitle)
- Deposit = emerald, Withdrawal = orange, Payment Accounts = blue, Transaction History = muted; rounded-xl panel with shadow-xl
### [2026-05-04] — Fix Send Message button to redirect to inbox thread in all contexts
- `src/App.tsx` — profile `onMessage` handlers now call `openConversationForOrder` + `selectConversation` before navigating to messages view
- `src/components/SalesPurchasesPage.tsx` — added `onNavigateToMessages` prop; wired `onSendMessage` on `OrderDetailsModal` to create/select conversation and navigate
- `src/components/portals/WebsiteOrdersPage.tsx` — same pattern; `onNavigateToMessages` prop added and wired
- `src/App.tsx` — passes `onNavigateToMessages` to both `SalesPurchasesPage` and `WebsiteOrdersPage`
### [2026-05-04] — Reduce conversation name font weight in ConversationList
- `src/components/messages/ConversationList.tsx` — changed name span from `font-medium` to `font-normal`
### [2026-05-04] — Highlight email hint text with primary color in ProfileSection
- `src/components/ProfileSection.tsx` — changed email hint `<p>` from `text-muted-foreground` to `text-primary font-medium`
### [2026-05-04] — Polish email hint: styled inline badge with InfoIcon, SaaS-style copy
- `src/components/ProfileSection.tsx` — replaced plain muted `<p>` with primary-tinted pill badge + InfoIcon
- Copy improved to: "Email address is managed by your account. To update it, please contact support."
- No separate section; sits inline directly below the disabled email input
### [2026-05-04] — Remove email-locked amber callout from ProfileSection
- `src/components/ProfileSection.tsx` — deleted the amber "Email is locked" note below the email input; removed unused ShieldAlertIcon and HeadphonesIcon imports
### [2026-05-04] — Compact single-line email-locked note in ProfileSection
- `src/components/ProfileSection.tsx` — collapsed two-line amber callout to a single inline row
- Shorter copy: "Email is locked — to change it, contact support." with ShieldAlert + Headphones icons
### [2026-04-29] — Replace cmdk dropdowns with custom MultiSelectDropdown (definitive mouse-click fix)
- Root cause: `cmdk` CommandItem intercepts pointer events; onSelect never reliably fires on mouse click
- Replaced all 4 dropdowns (Country, Language, Categories, Sensitive Topics) with custom `MultiSelectDropdown` component
- Custom component: plain `<li onClick>` list items — no third-party event interception, works instantly with mouse
- Includes searchable filter input, checkmark indicator, max-selected cap, outside-click-to-close via `useRef`/`useEffect`
- `src/components/add-website/Step3Details.tsx` — full rewrite of dropdown section; cmdk imports removed

### [2026-04-29] — Fix mouse-click selection: move toggle call into onMouseDown on all four dropdowns
- Root cause: cmdk `onSelect` fires on `click` (mouseup), but focus-loss closed the Popover before click registered
- Fix: all four `CommandItem` groups (Country, Language, Categories, Sensitive Topics) now call their toggle inside `onMouseDown` + `e.preventDefault()`
- `e.preventDefault()` keeps focus on `CommandInput`; toggle fires before any blur; `onSelect` kept as keyboard fallback
- `src/components/add-website/Step3Details.tsx`
### [2026-04-29] — Widen Country & Language dropdowns; fix Language mouse-click selection
- `src/components/add-website/Step3Details.tsx` — both PopoverContent widths increased from `w-[300px]` to `w-[360px]`
- Language `CommandItem` gains `onMouseDown` with `e.preventDefault()` to fix click-selection being blocked by Command's blur handler
### [2026-04-29] — Equal top/bottom spacing on Add Website header bar
- `src/components/add-website/AddWebsiteWizard.tsx` — added `pt-4` to the top nav bar div (was `pb-4` only) so space above title equals gap below it
### [2026-04-29] — Fix remaining header overlap on AddWebsiteWizard and MessagesPage
- `src/components/add-website/AddWebsiteWizard.tsx` — removed `-mt-6` that was sliding the wizard under the fixed header
- `src/components/messages/MessagesPage.tsx` — corrected height to `h-[calc(100vh-6rem)]` (accounts for `pt-16` + `pb-8` on `<main>`)
- All other pages (Catalogue, Sales/Purchases, WebsiteDetails, WebsiteOrders, Support, Notifications) confirmed clean — they use `space-y` / `w-full` wrappers with no negative margins
### [2026-04-29] — Fix content shifted under fixed header (initial pass)
- `src/App.tsx` — unified `pt-16` (64px) top padding on `<main>` to match header height consistently across breakpoints
- `src/components/MyPortalsPage.tsx` — removed `-mt-6` that was pulling content upward; replaced with `pt-2`
- `src/components/wallet/WalletContainer.tsx` — replaced `min-h-screen` with `min-h-0` to stop layout overflow
### [2026-04-28] — Compact composer in ChatWindow
- `src/components/messages/ChatWindow.tsx` — reduced textarea rows 3→2, tightened px/py on textarea and bottom bar, outer wrapper padding reduced
### [2026-04-28] — Removed formatting toolbar from ChatWindow composer
- `src/components/messages/ChatWindow.tsx` — deleted the Bold/Italic/Underline/List/Code/Mention toolbar row
- Removed unused imports: BoldIcon, ItalicIcon, UnderlineIcon, ListIcon, CodeIcon, AtSignIcon

### [2026-04-28] — Full professional message composer in ChatWindow
- `src/components/messages/ChatWindow.tsx` — replaced pill input with a 3-row composer: formatting toolbar (Bold/Italic/Underline/List/Code/Mention), multi-line textarea (3 rows, Shift+Enter = new line), and bottom action bar
- Bottom bar: emoji picker, attach-file, attach-image, voice-note buttons on left; "Shift+Enter" hint + labeled Send button on right
- Outer wrapper has `focus-within` ring highlight, rounded-xl border, subtle shadow for professional feel
- Attachment preview chips and emoji grid retained inside the new layout
### [2026-04-28] — Functional attachment + emoji picker in ChatWindow
- `src/components/messages/ChatWindow.tsx` — hidden `<input type="file">` wired to PaperclipIcon; multi-file support with preview chips (image thumbnails + file names) and per-file remove button
- Added SmileIcon button that toggles a 30-emoji grid picker (outside-click to close); selected emoji inserted at end of input
- Send button enabled when attachments are present even without text; attachment names appended to message text on send
- Added `XIcon`, `FileIcon`, `ImageIcon`, `SmileIcon` imports; added `EMOJI_LIST` constant; new state: `showEmoji`, `attachments`, `fileInputRef`, `emojiRef`
### [2026-04-28] — Remove auto-inserted message when opening conversation from an order
- `src/stores/messageStore.ts` — `openConversationForOrder` no longer pre-populates `messages[]` with a fake first message
- New conversation starts with empty `messages: []` and a blank `lastMessage.text`
- User must type their own first message manually
### [2026-04-28] — Fix Home button not navigating to Dashboard
- `Sidebar.tsx` + `MobileMenu.tsx`: changed Home item `onClick` from `null` to `'home'`, added `onHomeClick` prop
- `App.tsx`: passed `onHomeClick={() => setCurrentView('dashboard')}` to both Sidebar and MobileMenu
- Fixed `isHome` highlight logic in MobileMenu to check `=== 'home'` instead of `=== null`
### [2026-04-28] — Fix Send Message button in Order Details modal (dashboard only)
- Added `onSendMessage` prop to `OrderDetailsModal` interface and destructuring
- Wired sidebar "Send Message" button `onClick` → close modal + call `onSendMessage`
- `OrdersTable` passes `onSendMessage` to modal, reusing existing `handleSendMessage` with the selected order
- No new buttons added; existing button was wired up
### [2026-04-28] — Full SEO setup: meta tags, favicon, manifest, sitemap, robots, llms
- Rewrote `index.html` — title <60 chars, viewport, canonical, description, author, keywords; OG (Facebook/LinkedIn), Twitter Card, JSON-LD schema (WebSite, WebApplication ×2, Organization)
- Created `public/site.webmanifest` — app name, short_name, icons pointing to generated favicon PNG
- Created `public/sitemap.xml` — 13 URL entries covering all app routes/views
- Created `public/robots.txt` — allows all crawlers (Google, Bing, Perplexity, GPTBot, Claude-Web, social bots); references sitemap
- Created `public/llms.txt` — plain-text project description for AI crawlers; generated favicon via image_generation tool
### [2026-03-17] — Full mobile & desktop responsive optimization for both dashboards
- Rewrote `src/components/MobileMenu.tsx` — role-aware nav items, connects to all navigation handlers, brand header + user badge
- Rewrote `src/components/OrdersTable.tsx` — added mobile card layout (hidden md:block table + md:hidden card stack)
- Modified `src/App.tsx`, `src/components/Footer.tsx` — use `useWindowSize` hook for `isMobile` margin/width calculation
- Modified `src/components/Header.tsx` — responsive `h-14 sm:h-16`, icon sizes, wallet badge, mobile brand name
- Modified `src/components/OrderStatusCards.tsx` — `grid-cols-2` on mobile, compact padding/text at `sm` breakpoint
- Created `src/hooks/use-mobile.ts` — `useWindowSize` + `useIsMobile` hooks for live responsive layout
### [2026-03-17] — Live link note shows highlighted amber callout with hours-remaining countdown
- Modified `src/components/modals/OrderDetailsModal.tsx` — replaced plain muted text with amber-tinted card
- Added `hoursLeft` state derived from `order.submittedDate` or `order.createdDate` + 4-day window
- Countdown badge (`71h`, `48h`, etc.) shown inline with ClockIcon inside the callout
- Falls back to 71h demo value if order has no real timestamp
### [2026-03-17] — Changed Live Link pill color scheme from emerald to blue
- Modified `src/components/modals/OrderDetailsModal.tsx` — updated Live Link anchor bg/border/text from emerald-* to blue-*
### [2026-03-17] — Display live link in Order Details modal and Purchases page
- Modified `src/components/modals/OrderDetailsModal.tsx` — added "Live Link" section in sidebar when `submittedUrl` or `publishedUrl` exists
- Link renders as a green pill with external link icon; shows "awaiting review" note for in-progress orders
- `SalesPurchasesPage.tsx` already renders `submittedUrl` in the Status column for in-progress orders (no change needed)
### [2026-03-17] — Kept email & currency input values fully highlighted (no opacity reduction)
- Modified `src/components/ProfileSection.tsx` — removed `opacity-70 text-muted-foreground` from email and currency inputs
- Both disabled inputs now use `text-foreground font-medium` so values remain clearly readable
- Background and cursor-not-allowed styling unchanged; only text color/opacity fixed
### [2026-03-17] — Kept Email Address & Account Currency labels highlighted
- Modified `src/components/ProfileSection.tsx` — added `text-foreground font-medium` to both label elements
- Labels now render in full foreground color instead of inheriting muted/disabled appearance
- Input fields remain disabled/read-only; only the label text styling changed
### [2026-03-17] — Made Account Currency field non-changeable in Profile Settings
- Modified `src/components/ProfileSection.tsx` — replaced Account Currency Select dropdown with disabled Input
- Added "Contact support to change" lock badge matching the Email Address field styling
- Field shows "USD ($)" as read-only value; user cannot change currency without support
### [2026-03-17] — Made First Name, Last Name, Phone Number required in Profile Settings
- Modified `src/components/ProfileSection.tsx` — added red asterisk (*) and `required` attribute to First Name, Last Name, and Phone Number fields
- Fields are now visually marked as mandatory; user cannot submit without filling them
### [2026-03-17] — Made email field read-only in Profile Settings
- Modified `src/components/ProfileSection.tsx` — email input is now `disabled` with `cursor-not-allowed` styling
- Added a "Contact support to change" badge with lock icon next to the Email Address label
- User cannot edit email; only support team can change it
### [2026-03-17] — Reduced Profile Settings page header size
- Modified `src/components/ProfileSection.tsx` — reduced title from `text-2xl font-bold` to `text-xl font-semibold`
- Reduced subtitle from `text-sm` to `text-xs`, bottom margin from `mb-6` to `mb-2`, overall spacing from `space-y-6` to `space-y-4`
### [2026-03-17] — Scoped Reviews tab cards by role in ProfileSection
- Modified `src/components/ProfileSection.tsx` — Publisher Reviews card only renders when `isPublisher === true`
- Advertiser Reviews card only renders when `isPublisher === false`
- Uses existing `isPublisher` derived from `useUserStore` role
### [2026-03-17] — Added Reviews tab and reduced tab bar height in ProfileSection
- Modified `src/components/ProfileSection.tsx` — changed `grid-cols-4` to `grid-cols-5`, reduced tab py from py-2/py-3 to py-1.5, icons from w-4 to w-3.5, labels from text-sm to text-xs
- Added 5th "Reviews" tab with `MessageSquareIcon` trigger
- Publisher Reviews card: 4 sample reviews from advertisers with star ratings, Recommended badges, avatar initials
- Advertiser Reviews card: 3 sample reviews from publishers with star ratings and campaign names
- Added `MessageSquareIcon`, `ThumbsUpIcon`, `ThumbsDownIcon`, `BuildingIcon`, `ShoppingBagIcon` imports
### [2026-03-17] — Redesigned advertiser Review page with new fields
- Rewrote `src/components/sales/LeaveFeedbackPage.tsx` — advertiser gets: Star Rating (req), Communication, Quality of Work/Content, Review Comment, Recommendation toggle
- Publisher view retains overall + communication + instruction clarity (no quality/recommendation fields)
- Success message now reads "Your review has been submitted successfully."
- Modified `src/App.tsx` — wired `onLeaveFeedback` to purchases view; `role` prop passed to `LeaveFeedbackPage`; back nav returns to correct page per role

### [2026-03-17] — Added 5 completed orders with Leave Feedback for advertiser Purchases page
- Modified `src/components/SalesPurchasesPage.tsx` — added 5 completed base orders (searchenginejournal, ahrefs, semrush, moz, backlinko)
- Each new order has `pendingFeedback: true`, published URL, and verification data
- Fixed Leave Feedback button condition: publishers see it on `hasFeedback=true`, advertisers on `pendingFeedback=true`
- Change scoped to advertiser role only; publisher logic unchanged

### [2026-03-17] — Redesigned LeaveFeedbackPage with left-aligned two-column layout
- Rewrote `src/components/sales/LeaveFeedbackPage.tsx` with professional two-column layout
- Form (left): order summary strip, rating card with 3 sections, comment box, action buttons
- Sidebar (right, sticky 288px): "How to Review" card with per-section tips, "Writing Tips" card, policy note
- Improved StarRating with color-coded labels per score (Poor→red, Excellent→green)
- Page no longer center-constrained; uses `max-w-[1100px]` left-aligned with `px-6` container

### [2026-03-16] — Added Leave Feedback page for publishers in Sales view
### [2026-03-16] — Added Leave Feedback page for publishers in Sales view
- Created `src/components/sales/LeaveFeedbackPage.tsx` — full feedback form with star ratings and comment
- Sections: Overall Experience (required), Communication, Instruction Clarity, and Review Comment (optional)
- Added `onLeaveFeedback` prop to `SalesPurchasesPage` — button only fires for `role === 'publisher'`
- Added `leave-feedback` view and `feedbackOrder` state to `src/App.tsx`
- Shows success screen after submit; "Leave Feedback" button now routes to dedicated page
### [2026-03-16] — Redesigned Support Manager section in Sidebar with professional look
- Modified `src/components/Sidebar.tsx` — replaced old layout with polished card-style section
- Avatar now shows green online dot indicator, added manager name "Sarah Miller" above role label
- "Book a Meeting" button uses full-width gradient with icon, hover brightness effect, and shadow
- Collapsed state shows avatar + small calendar icon button with tooltip
### [2026-03-16] — Reduced wallet dropdown width from w-52 to w-40
- Modified `src/components/Header.tsx` — changed `DropdownMenuContent` width class from `w-52` to `w-40`
### [2026-03-16] — Removed Wallet header section from wallet dropdown
- Modified `src/components/Header.tsx` — removed the "Wallet / $12,450.00" info block and its separator from the top of the wallet dropdown
- Dropdown now opens directly showing Deposit/Withdrawal/Transaction History options without the redundant balance header
### [2026-03-16] — Fixed ticket reply messages not appearing after send
- Modified `src/components/support/TicketDetails.tsx` — derived live `ticket` from store instead of using stale prop
- Root cause: `SupportCenter` passed a snapshot object; `addMessage` updated the store but the prop never refreshed
- Fix: `tickets.find(t => t.id === ticketProp.id) ?? ticketProp` ensures latest messages always render

### [2026-03-16] — Removed blue "Download Invoice" button from TransactionDetails header
- Modified `src/components/wallet/TransactionDetails.tsx` — removed the blue `bg-blue-600` Download Invoice button from the top-right of the header
- The outline "Download Invoice" button in the footer Actions section remains intact

### [2026-03-16] — Fixed removeChild crash in CreateProjectPage Popover trigger buttons
- Modified `src/components/projects/CreateProjectPage.tsx` — replaced all four `<Button>` PopoverTrigger wrappers with plain `<div>` triggers
- Root cause: Radix Popover + React Button component with dynamic Badge children causes DOM node ownership conflict on unmount
- Affected dropdowns: Categories, Sensitive Topics, Languages, Target Countries
- Replaced `<Badge>` components inside triggers with plain `<span>` elements to avoid nested component unmount conflicts
- All selection, deselection, and clear logic unchanged

### [2026-03-16] — Fixed removeChild crash in CreateProjectPage dropdowns
- Modified `src/components/projects/CreateProjectPage.tsx` — replaced all `Command/CommandItem` cmdk primitives with plain `<div role="option">` lists
- Root cause: same as CataloguePage — cmdk `CommandPrimitive.Item` conflicts with Popover unmount lifecycle causing removeChild crash
- Affected dropdowns: Categories, Sensitive Topics, Languages, Target Countries
- Removed `Command`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList` imports entirely
- Native `<input>` search filters via `querySelectorAll` on `data-*` attributes; all selection logic unchanged

### [2026-03-16] — Fixed FilterSelect mouse click by replacing cmdk with plain div list
- Modified `src/components/catalogue/CataloguePage.tsx` — removed all `Command/CommandItem` cmdk primitives from FilterSelect
- Root cause: `cmdk` `CommandPrimitive.Item` intercepts pointer events internally, blocking mouse `onClick`
- Replaced with plain `<div role="option">` list + native `<input>` for search inside `PopoverContent`
- Mouse click on any filter option (Category, Country, Language, etc.) now works reliably

### [2026-03-16] — Fixed catalogue filter dropdown mouse selection
- Modified `src/components/catalogue/CataloguePage.tsx` — removed `onMouseDown` handlers from `CommandItem` and Clear Selection button
- Root cause: `onMouseDown` with `preventDefault()/stopPropagation()` was blocking mouse click events from reaching `onSelect`
- Changed Clear Selection button from `onMouseDown` to `onClick` for standard click behavior
- Filter dropdown options now selectable with mouse, matching My Portals filter behavior

### [2026-03-16] — Fixed removeChild crash in catalogue FilterSelect dropdowns
- Modified `src/components/catalogue/CataloguePage.tsx` — root cause: `onMouseDown`/`onContextMenu` handlers on `CommandItem` conflicted with Popover unmount lifecycle
- Extracted `handleSelect` function and removed all secondary event handlers from CommandItem
- Changed Clear Selection button from `onClick` to `onMouseDown` + `e.preventDefault()` to avoid DOM conflicts
- Result: Category, Country, Language, and all other FilterSelect dropdowns no longer crash

### [2026-03-16] — Wired up catalogue filter dropdowns to actually filter data
- Modified `src/components/catalogue/CataloguePage.tsx` to apply all FilterSelect states to filteredData
- Category filter matches selected categories against item.categories array
- Country/Language filters use code-to-name maps (us→united states, en→english, etc.)
- Sensitive Topics filter excludes items that have blocked topics matching selected values
- Copywriting filter checks item.copywriting > 0 (yes) or === 0 (no)

### [2026-03-16] — Fixed Sidebar removeChild by removing shared itemsRef entirely
- Modified `src/components/Sidebar.tsx` — root cause was shared `itemsRef` across conditional branches
- Removed `itemsRef` and per-item GSAP label animations that required refs
- Added distinct key prefixes (`collapsed-` vs `expanded-`) to force full unmount/remount on toggle
- Collapsed view now shows only icon (no hidden label span), expanded shows icon + label
- GSAP animation retained only for sidebar width, which doesn't cause DOM conflicts

### [2026-03-16] — Re-fixed Sidebar removeChild with early return pattern
- Modified `src/components/Sidebar.tsx` — previous JSX variable approach still shared element reference
- Changed to early return pattern: `if (sidebarCollapsed) return <Tooltip>...</Tooltip>` else return plain div
- Each branch now creates completely independent React element trees
- Removed wrapper `<div key>` from collapsed branch since Tooltip now has the key directly

### [2026-03-16] — Fixed Sidebar removeChild by inlining nav div in each branch
- Modified `src/components/Sidebar.tsx` — root cause: single `navDiv` JSX instance shared between Tooltip and plain branch caused React DOM node ownership conflict
- Fix: inlined the nav `<div>` independently inside each branch (Tooltip vs plain) so React owns a distinct node per render path
- Extracted shared `handleClick` and `itemClass` variables to avoid code duplication
- GSAP ref and all onClick handlers remain unchanged

### [2026-03-13] — Redesigned LiveChat HomeScreen to match reference design
- Modified `src/components/livechat/HomeScreen.tsx` to match reference screenshot exactly
- Header now shows stacked avatars, large bold "We're here to help you 👋" heading, and descriptive subtitle
- CTA card replaced with single full-width blue "Start a Conversation" button + "🔒 Secure · Encrypted · Private" text
- Added X close button (top-right corner) inside header
- Removed brand/logo row, agent count row, and multi-button card layout

### [2026-03-09] — Enhanced chat context bar with order details
- Modified `src/components/messages/ChatWindow.tsx` to add Order ID and Article Title to context bar
- Context bar now displays Website, Order ID (# ORD-2024-001), and Article Title with icon
- Added "View Order Details" button on the right side of context bar
- Improved spacing with gap-4 between context sections for better readability

### [2026-03-08] — Removed Account Manager section from publisher sidebar
- Modified `src/components/Sidebar.tsx` to hide Account Manager section for publishers
- Section now only displays for advertisers with Support Manager and Book a Meeting button
- Publishers no longer see Sarah Miller contact info or email link in sidebar
- Conditional rendering based on role === 'advertiser' check

### [2026-03-08] — Prioritized wallet menu items by user role
- Modified `src/components/Header.tsx` to reorder Deposit and Withdrawal menu items based on role
- Advertisers now see Deposit first, then Withdrawal
- Publishers now see Withdrawal first, then Deposit
- Transaction History remains at bottom for both roles

### [2026-03-08] — Added rejected website samples to My Portals
- Modified `src/components/MyPortalsPage.tsx` to add two rejected website templates
- Added lowqualityblog.com and spamsite.net with rejected status
- Both have 0 orders, 0 earnings, and 0 rating as expected for rejected sites
- Rejected websites now appear in filter results and display rejection message in dropdown

### [2026-03-07] — Moved "Rating" label after the number in My Portals
- Modified `src/components/MyPortalsPage.tsx` to change rating display format
- Changed from "Rating (4.1)" to "(4.1) Rating" for number-first display
- Applied to all portal cards in the website performance section
### [2026-03-07] — Added "Rating" label to reviews display in My Portals
- Modified `src/components/MyPortalsPage.tsx` to add "Rating" text before rating number
- Changed from "({portal.rating})" to "Rating ({portal.rating})" for better clarity
- Applied to all portal cards in the website performance section
### [2026-03-07] — Optimized Pricing section spacing and typography in My Portals
- Modified `src/components/MyPortalsPage.tsx` to reduce left padding from lg:pl-6 to lg:pl-3
- Changed price digit size from text-xs to text-[11px] for more compact display
- Changed price font weight from font-bold to font-normal for lighter appearance
- Applied to all three pricing rows: Regular, Dedicated, and Writing

### [2026-03-07] — Reduced profile tabs section height
- Modified `src/components/ProfileSection.tsx` to reduce tab section spacing
- Changed bottom margin from mb-6 to mb-4 for tighter spacing below tabs
- Reduced tab trigger padding from py-3 to py-2 for more compact tab buttons
- All four tabs (Personal, Security, Business, Payment) now have reduced height

### [2026-03-07] — Removed location from public profile section
- Modified `src/components/profile/PublicProfilePage.tsx` to remove location display with MapPinIcon
- Removed location div showing country (e.g., "Australia") from profile header
- Profile now shows only "Joined" date and "Active" status without location information

### [2026-03-07] — Removed star icon from price elements in orders table
- Modified `src/components/OrdersTable.tsx` to remove star icon from earnings column
- Changed from flex container with icon to simple div wrapper for price display
- Price now displays without decorative icon for cleaner appearance

### [2026-03-07] — Optimized order status cards with equal size and attractive icons
- Modified `src/components/OrderStatusCards.tsx` to reduce card height (p-8 to p-5)
- Changed icons to more attractive variants (FileText, Loader, CheckCircle2, XCircle)
- Reduced icon container size (w-12 h-12 to w-11 h-11) and icon size (w-6 h-6 to w-5 h-5)
- Reduced number font size from text-3xl to text-2xl for balanced proportions
- All cards now have consistent equal height with improved visual balance

### [2026-03-07] — Unified profile dropdown menu into single section
- Modified `src/components/Header.tsx` to display all menu items in one section
- Removed p-1 wrapper div and padding, using default DropdownMenuContent styling
- Added DropdownMenuSeparator only above Logout button for clear visual separation
- All items (Personal Profile, Language, Switch to Publisher, Logout) now in unified section

### [2026-03-07] — Reorganized profile dropdown menu structure
- Modified `src/components/Header.tsx` to group Personal Profile, Language, and Switch to Publisher together
- Removed separator lines between these three options for unified section
- Moved Logout to bottom with separator line above it for clear visual separation
- Changed Switch to Publisher from separate bordered section to inline menu item with ghost button styling

### [2026-03-07] — Changed Profile menu item to Personal Profile
- Modified `src/components/Header.tsx` to update dropdown menu label
- Changed "Profile" to "Personal Profile" in user account dropdown menu
- Provides more descriptive label for profile settings navigation

### [2026-03-07] — Increased wallet balance element height in header
- Modified `src/components/Header.tsx` to increase wallet balance padding
- Changed padding from px-2.5 py-1.5 to px-3 py-2 for taller appearance
- Wallet balance element now has more vertical space for better visibility

### [2026-03-06] — Added No Purchases button to navigate to empty state
- Modified `src/components/SalesPurchasesPage.tsx` to add onShowEmptyState prop and No Purchases button next to title
- Modified `src/App.tsx` to add 'empty-purchases' view state and handleShowEmptyPurchases function
- Empty state displays centered card with icon, message, and Browse Catalogue button
- Button appears only when onShowEmptyState prop is provided (advertiser purchases page)

### [2026-03-06] — Moved rating section below profile name in publisher profile
- Modified `src/components/profile/PublisherProfilePage.tsx` to reposition rating section
- Rating now appears directly below bio text, before stats grid
- Removed separator between stats grid and rating section
- Rating section remains clickable with same hover effects and styling
- Applied only to PublisherProfilePage (publisher view only)

### [2026-03-06] — Added clickable rating section with dedicated ratings page
- Created new `src/components/profile/RatingsPage.tsx` with review display and rating breakdown
- Modified `src/components/profile/PublisherProfilePage.tsx` to move rating below stats grid and make it clickable
- Changed stats grid from 4 columns to 3 columns (removed Rating, kept Total Orders, Success Rate, Websites)
- Added `onRatingsClick` prop to PublisherProfilePage for navigation handling
- Modified `src/App.tsx` to add 'ratings' view and handleRatingsClick navigation function
- Ratings page displays advertiser name, website name, and customer review text with star ratings

### [2026-03-06] — Restricted profile click to name only in chat header
- Modified `src/components/messages/ChatWindow.tsx` to make only the publisher name clickable
- Removed button wrapper from entire header section (avatar, name, badge, status)
- Added inline button element wrapping only the name text with hover effect
- Avatar, "Publisher" badge, and "Online" status are no longer clickable
- Only clicking "Sarah Johnson" (or other publisher names) opens the profile

### [2026-03-06] — Made publisher profile clickable in chat windows
- Modified `src/components/messages/ChatWindow.tsx` to add `onPublisherClick` prop and wrap avatar/name in clickable button
- Modified `src/components/modals/QuickChatModal.tsx` to pass `onPublisherClick` prop through to ChatWindow
- Modified `src/components/messages/MessagesPage.tsx` to accept and pass `onPublisherClick` prop
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to handle publisher click from chat modal
- Modified `src/App.tsx` to pass `handlePublisherProfileClick` to WebsiteDetailsPage and MessagesPage
- Removed all `__ANIMA_DBG__` debug logs from WebsiteDetailsPage

### [2026-03-05] — Moved Instructions for Buyer section below website description
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reposition Instructions section
- Moved from bottom of card (after Placement) to directly below Description paragraph
- Changed from blue box styling to simple text matching description format
- Both Description and Instructions now use same text-xs text-muted-foreground styling
- Removed bg-blue-50/50 border and padding, now displays as plain text section

### [2026-03-05] — Made category badges more prominent with bold blue styling
- Modified `src/components/projects/CreateProjectPage.tsx` to enhance selected category badges
- Changed from light blue background (bg-blue-50) to solid blue (bg-blue-600) with white text
- Increased border width from border to border-2, changed font from font-semibold to font-bold
- Enhanced shadow from shadow-sm to shadow-md (shadow-lg on hover) for better depth
- Badges now clearly stand out as priority selections with high contrast and visual weight
### [2026-03-03] — Simplified chat context bar
- Modified `src/components/messages/ChatWindow.tsx` to remove order details from context bar
- Context bar now only displays the website name and link
- Removed unused icons (`FileTextIcon`, `LinkIcon`, `HashIcon`, `ScaleIcon`)
- Removed `isOrderContext` and `showContextBar` variables

### [2026-03-02] — Reduced left padding on Top Countries card
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to increase left padding from pl-1 to pl-3
- Provides better visual balance and spacing for Top Countries and Traffic Sources section

### [2026-03-02] — Fixed discount badge text wrapping in catalogue
- Modified `src/components/catalogue/CataloguePage.tsx` to add `whitespace-nowrap` to discount badge
- "21% OFF" text now stays on a single line instead of wrapping to two lines

### [2026-03-02] — Increased right padding on pricing column in catalogue
- Modified `src/components/catalogue/CataloguePage.tsx` to increase pricing cell padding
- Changed td padding from px-3 to px-4, inner div right padding from pr-2 to pr-4
- Applies to discount badge, actual price, and writing price rows
### [2026-02-24] — Reduced badge height for better website name visibility
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce badge dimensions
- Changed padding from px-2 py-1 to px-1.5 py-0.5, gap from gap-1 to gap-0.5
- Reduced icon size from w-3 h-3 to w-2.5 h-2.5, font size from text-[10px] to text-[9px]
- Changed border radius from rounded-md to rounded for more compact appearance
- Reduced vertical margins from mt-1.5 mb-1.5 to mt-1 mb-1 for tighter spacing
### [2026-02-24] — Reduced badge background opacity to 5% for subtle appearance
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce background opacity from /10 to /5
- Changed all three badges: Pro Publisher, Fast Delivery, and Lifetime Guarantee
- Background colors now 80% lower opacity (amber-700/5, yellow-700/5, emerald-700/5)
- Creates more subtle, refined badge appearance with less visual weight
### [2026-02-23] — Increased traffic chart height to fill full section
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to increase chart height from h-28 to h-64
- Chart now fills the full available section space for better data visualization
- Provides more detailed view of traffic trends over 6-month period
### [2026-02-23] — Removed traffic statistics summary from chart section
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to remove traffic stats grid
- Removed Avg. Monthly, Peak Traffic, and Growth Rate summary section below chart
- Chart section now ends directly after the line chart visualization
- Cleaner, more focused traffic chart presentation
### [2026-02-23] — Aligned price directly above writing price in catalogue
- Modified `src/components/catalogue/CataloguePage.tsx` to adjust pricing column alignment
- Changed from text-right to items-end with pr-2 for right-side positioning
- Price now positioned directly above the writing price line for better visual alignment
- Removed text-right class, using flex items-end for proper alignment
### [2026-02-23] — Increased discount badge size in catalogue pricing
- Modified `src/components/catalogue/CataloguePage.tsx` to increase discount badge dimensions
- Changed badge height from h-4 to h-5, padding from px-1 to px-1.5
- Changed font size from text-[9px] to text-[10px] for better readability
- Badge now more prominent and easier to read in pricing column
### [2026-02-23] — Unified badge colors with matching text and low-opacity backgrounds
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to unify background and text colors
- Changed all three badges to use text color with /10 opacity for background (amber-700/10, yellow-700/10, emerald-700/10)
- Changed border colors to match text color with /20 opacity for subtle appearance
- Applied to Pro Publisher, Fast Delivery, and Lifetime Guarantee badges
### [2026-02-23] — Reduced badge background opacity for subtle appearance
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce background color intensity
- Changed all three badge backgrounds from -50 to -50/40 opacity (amber, yellow, emerald)
- Applied to Pro Publisher, Fast Delivery, and Lifetime Guarantee badges
### [2026-02-23] — Increased spacing between badge elements
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to increase gap between badges
- Changed gap from gap-1 to gap-1.5 for better visual separation
- Applied to Pro Publisher, Fast Delivery, and Lifetime Guarantee badges
### [2026-02-23] — Added traffic chart visualization to website details
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to add Recharts LineChart component
- Replaced placeholder with interactive line chart showing 6 months of traffic history
- Added trafficHistory data array with monthly traffic values (Jan-Jun)
- Chart includes grid, tooltips, formatted Y-axis (K format), and blue line with dots
- Responsive design with proper styling matching the overall theme
### [2026-02-23] — Highlighted metric digits in black color
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to make all metric numbers black
- Changed all metric value colors from text-foreground to text-black font-medium
- Applied to all three sections: Ahrefs Metrics, Majestic Metrics, and Availability & Orders
- Numbers now stand out with stronger visual emphasis
### [2026-02-23] — Reduced Detailed Metrics header height
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce header padding
- Changed vertical padding from py-2.5 sm:py-3 to py-1.5 sm:py-2 for more compact header
- Provides tighter spacing while maintaining readability
### [2026-02-23] — Reduced Detailed Metrics text to regular size
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce all metric text sizes
- Changed all metric rows from text-sm to text-xs for both labels and values
- Removed font-bold from all metric numbers, now using regular font weight
- Applied to all three sections: Ahrefs Metrics, Majestic Metrics, and Availability & Orders
### [2026-02-23] — Further reduced metric digit sizes to text-sm
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce all metric numbers
- Changed traffic, DA, and DR numbers from text-base to text-sm
- All metric digits now use smallest readable size for ultra-compact design
### [2026-02-23] — Reduced number sizes to regular in website metrics
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce number font sizes
- Changed traffic number from text-2xl font-bold to text-base font-medium
- Changed DA and DR numbers from text-xl font-bold to text-base font-medium
- All metric numbers now use regular sizing for cleaner, more balanced appearance
### [2026-02-23] — Reduced metrics section height in website details
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to reduce metrics card heights
- Reduced padding from p-5 to p-3, gap from gap-4 to gap-3
- Reduced icon sizes (w-6 h-6 to w-5 h-5 for traffic, w-5 h-5 to w-4 h-4 for DA/DR)
- Changed number font sizes from text-3xl/text-2xl to text-2xl/text-xl for more compact display
### [2026-02-23] — Removed descriptive labels from DA and DR metric cards
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to remove "High Authority" and "Solid Profile" labels
- Removed span elements with text-xs text-muted-foreground classes below metric numbers
- Metric cards now show only icon, label, and number without additional descriptive text
### [2026-02-23] — Removed icon from website logo container
- Modified `src/components/catalogue/WebsiteDetailsPage.tsx` to remove text/initial from logo div
- Removed text-4xl font-bold classes and {website.initial} content
- Logo container now displays as empty colored box with VERIFIED badge
### [2026-02-23] — Made cart quantity number badge clickable
- Modified `src/components/catalogue/CataloguePage.tsx` to make number badge clickable
- Changed from static div to button element with onClick handler
- Number badge now increments cart quantity when clicked, same as "In Cart" button
- Added hover effect (bg-primary/30) and cursor-pointer for better UX
### [2026-02-23] — Optimized In Cart button and number badge spacing
- Modified `src/components/catalogue/CataloguePage.tsx` to reduce gap between button and number badge
- Changed gap from gap-2 to gap-1 for tighter alignment
- Reduced button padding from px-3 to px-2.5, icon margin from mr-1.5 to mr-1
- Creates more cohesive visual grouping between "In Cart" text and quantity number
### [2026-02-23] — Confirmed standard padding for pricing cells
- Reviewed `src/components/catalogue/CataloguePage.tsx` pricing column padding
- Reviewed `src/components/projects/ProjectDetailsPage.tsx` amount column padding
- Both files maintain standard padding values (px-4 py-3 for catalogue, px-6 py-4 for project details)
- No changes needed - padding already set to normal/standard values
### [2026-02-22] — Fixed flag positioning in catalogue Region column
- Modified `src/components/catalogue/CataloguePage.tsx` to ensure flags appear before text
- Language flags now appear before language names (e.g., 🇺🇸 English instead of English🇺🇸)
- Country flags now appear before country names (e.g., 🇺🇸 United States instead of United States🇺🇸)
- Applied consistent flag-first ordering for both language and country display
### [2026-02-22] — Aligned badges and rating with website name in catalogue
- Modified `src/components/catalogue/CataloguePage.tsx` to restructure website column layout
- Changed from vertical flex-col to horizontal flex layout with icon on left
- Website name, badges, and rating now align horizontally starting from website name position
- Added shrink-0 to icon and proper flex-wrap for responsive badge display
### [2026-02-21] — Fixed duplicate DropdownMenu JSX syntax error
- Modified `src/components/projects/ProjectsPage.tsx` to remove duplicate DropdownMenu opening tags
- Removed first duplicate DropdownMenu and DropdownMenuTrigger that was causing JSX closing tag error
- Kept only the second, properly styled version with bg-white and updated border colors
### [2026-02-21] — Enhanced filter button with prominent clickable styling
- Modified `src/components/projects/ProjectsPage.tsx` to make filter button more visually prominent
- Added stronger shadow (shadow-md to shadow-lg on hover) for depth and clickability
- Changed border color to primary scheme (border-primary/30 hover to border-primary/50)
- Made icon and text primary colored for better visibility
- Added font-semibold weight and bg-white background for stronger presence
- Improved hover effects with bg-primary/5 and enhanced shadow transition
### [2026-02-21] — Changed hover icons for Instructions and Sensitive Topics fields
- Modified `src/components/projects/CreateProjectPage.tsx` to replace InfoIcon with new icons
- Instructions to Publisher now uses HelpCircleIcon (question mark in circle)
- Sensitive Topics now uses AlertTriangleIcon (warning triangle)
- Both icons maintain hover color transitions (primary for Instructions, orange for Sensitive Topics)
### [2026-02-21] — Added info icon with tooltip to Instructions to Publisher field
- Modified `src/components/projects/CreateProjectPage.tsx` to add InfoIcon next to label
- Added Tooltip component with helpful description about publisher instructions
- Icon changes color on hover (muted-foreground to primary) for better interactivity
- Tooltip explains link placement, content guidelines, and do-follow/no-follow preferences
### [2026-02-20] — Changed spending chart color from purple to blue
- Modified `src/components/projects/ProjectDetailsPage.tsx` to change chart color scheme
- Changed gradient from purple (#a855f7) to blue (#3b82f6) for area fill and stroke
- Updated cursor color and dot colors to match new blue theme
- Applied to Spending Trend chart in Finance tab
### [2026-02-20] — Reduced spending statistics section height
- Modified `src/components/projects/ProjectDetailsPage.tsx` to reduce summary stats height
- Changed padding from pt-3 mt-3 to pt-2 mt-2 for tighter spacing
- Reduced number font size from text-base to text-sm for more compact display
- Removed bottom margin (mb-0.5 to mb-0) between labels and values
### [2026-02-20] — Reduced digit size and made labels bold in finance cards
- Modified `src/components/projects/ProjectDetailsPage.tsx` to reduce number font size from text-xl to text-lg
- Changed label font weight from font-normal to font-semibold for all four stat cards
- Applied to Total Investment, Completed, Pending, and Avg. Value labels
- Numbers remain font-normal for balanced visual hierarchy
### [2026-02-20] — Removed writing price breakdown from Finance tab
- Modified `src/components/projects/ProjectDetailsPage.tsx` to remove writing price details
- Removed conditional display of "+ $XXX writing" text from Amount column in Transaction History table
- Finance tab now shows only total amount per order without price breakdown
### [2026-02-20] — Reduced Spending Overview section height
- Modified `src/components/projects/ProjectDetailsPage.tsx` to reduce chart section height
- Changed from 6 months to 3 months of data (Apr, May, Jun only)
- Reduced bar height from h-8 to h-7, spacing from space-y-6 to space-y-3
- Reduced padding from p-6 to p-4, header padding from py-4 to py-3
- Changed summary stats from 3 columns to 2 columns (Total and Monthly Average only)
### [2026-02-20] — Redesigned finance section with unified SAAS-style professional look
- Modified `src/components/projects/ProjectDetailsPage.tsx` to create single unified card with gradient header
- Changed from 2x2 grid of separate cards to 4-column horizontal layout within one card
- Added gradient header (blue-purple-pink) with icon, title, subtitle, and order count badge
- Implemented hover effects with gradient backgrounds, completion rate progress bar at bottom
- Professional SAAS design with uppercase labels, larger numbers (text-3xl), and color-coded icons
### [2026-02-20] — Arranged finance stat cards in horizontal 2-column grid
- Modified `src/components/projects/ProjectDetailsPage.tsx` to change layout from vertical (space-y-3) to horizontal grid (grid-cols-2 gap-3)
- All four finance cards (Total Investment, Completed Spend, Pending Amount, Average Order Value) now display in 2x2 grid
- Added debug log for horizontal layout tracking
- Maintains same card styling and hover effects with improved space efficiency
### [2026-02-20] — Optimized finance stat cards with compact design
- Modified `src/components/projects/ProjectDetailsPage.tsx` to reduce card padding from p-5 to p-4
- Reduced icon size from w-10 h-10 to w-9 h-9, badge height to h-5 with text-[10px]
- Changed number font from text-2xl font-bold to text-xl font-medium for balanced typography
- Added gradient background circles and improved visual hierarchy with smaller text sizes
- Matches OrderStatusCards pattern with gradient icons and decorative backgrounds
### [2026-02-20] — Removed Finished Date column from order tables
- Modified `src/components/projects/ProjectDetailsPage.tsx` to remove Finished Date column from both Order History and Finance tabs
- Modified `src/components/projects/ProjectOrdersTab.tsx` to remove Finished Date column
- Removed table header and data cells for Finished Date in all three tables
- Tables now show: Order ID, Website Name, Price, Order Status, Created Date, Action
### [2026-02-20] — Removed Article Status column from order tables
- Modified `src/components/projects/ProjectDetailsPage.tsx` to remove Article Status column from Order History tab
- Modified `src/components/projects/ProjectOrdersTab.tsx` to remove Article Status column
- Removed table header and data cells for Article Status in both files
- Tables now show: Order ID, Website Name, Price, Order Status, Created Date, Action
### [2026-02-20] — Improved label and content visual distinction
- Modified `src/components/projects/ProjectDetailsPage.tsx` to make labels bolder (font-semibold) with darker color (text-foreground)
- Modified `src/components/projects/CreateProjectPage.tsx` to apply same label styling across all form fields
- Changed content text from font-medium to text-muted-foreground for better contrast
- Increased spacing from space-y-1.5 to space-y-2 between labels and content
- Applied to all fields: Project Name, Target Website, Project Objective, Instructions, Categories, Sensitive Topics, Languages, Countries, Target Pages
### [2026-02-20] — Increased spacing between labels and content for Project Objective and Instructions fields
- Modified `src/components/projects/CreateProjectPage.tsx` to increase spacing from space-y-1.5 to space-y-3
- Modified `src/components/projects/ProjectDetailsPage.tsx` to add space-y-3 wrapper to both fields
- Applied to Project Objective (Select dropdown) and Instructions to Publisher (textarea)
- Matches spacing used in other sections like Categories, Languages, and Countries
### [2026-02-20] — Increased spacing between labels and dropdowns in multi-select fields
- Modified `src/components/projects/CreateProjectPage.tsx` to increase vertical spacing from space-y-2.5 to space-y-3
- Modified `src/components/projects/ProjectDetailsPage.tsx` to add space-y-3 wrapper to all multi-select fields
- Applied to all four fields: Categories, Sensitive Topics, Languages, Target Countries
- Provides clearer visual separation between field labels and dropdown buttons
### [2026-02-20] — Increased spacing between labels and selected items in multi-select fields
- Modified `src/components/projects/CreateProjectPage.tsx` to increase vertical spacing
- Changed space-y-1.5 to space-y-2.5 for all four multi-select fields (Categories, Sensitive Topics, Languages, Countries)
- Provides clearer visual separation between field labels and dropdown buttons with selected badges
### [2026-02-20] — Matched Project Details styling to Create Project page
- Modified `src/components/projects/ProjectDetailsPage.tsx` to match Create Project card styling
- Changed all section cards to use border-border/50, bg-muted/30 headers with icon containers
- Updated all labels to text-sm font-medium for consistency
- Changed all badge colors to primary scheme (bg-primary/10 text-primary border-primary/20)
- Reduced CardContent padding from p-6 to p-4, spacing from space-y-4 to space-y-3
- Both pages now share identical visual design language
### [2026-02-20] — Unified badge colors across all multi-select fields
- Modified `src/components/projects/CreateProjectPage.tsx` to apply primary color scheme to all selected badges
- Changed Sensitive Topics badges from destructive/red to primary/blue color scheme
- All four multi-select fields (Categories, Sensitive Topics, Languages, Countries) now use consistent bg-primary/10 text-primary border-primary/20 styling
- Provides unified visual language across all selection fields
### [2026-02-20] — Fixed project data persistence from Create to Details page
- Modified `src/stores/projectStore.ts` to add new fields to Project interface (targetWebsite, categories, sensitiveTopics, languages, countries, publishInstructions, targetPages)
- Updated sample projects with complete data structure including all new fields
- Modified `src/components/projects/CreateProjectPage.tsx` to save all form data when creating project
- Modified `src/components/projects/ProjectDetailsPage.tsx` to properly initialize and display saved project data
- All form fields now persist correctly from Create Project to Project Details page
### [2026-02-20] — Reduced Edit Project button height and spacing
- Modified `src/components/projects/ProjectDetailsPage.tsx` to reduce button height from h-9 to h-8
- Reduced bottom margin from mb-4 to mb-2 for tighter spacing between button and content sections
- Improves visual balance between tabs and project details sections
### [2026-02-20] — Changed Project Objective to dropdown select in Project Details
- Modified `src/components/projects/ProjectDetailsPage.tsx` to replace text input with Select dropdown
- Added 6 predefined objective options with emoji icons (Increase Traffic, Boost Visibility, Build Authority, etc.)
- Select dropdown appears in edit mode with placeholder "What's your main goal?"
- Matches Create Project page pattern for consistent UX
### [2026-02-20] — Arranged Project Name and Target Website side-by-side in Project Details
- Modified `src/components/projects/ProjectDetailsPage.tsx` to display fields horizontally
- Wrapped Project Name and Target Website in flex container with gap-2
- Both fields have flex-1 class for equal width distribution
- Project Objective remains below as full-width field
### [2026-02-20] — Removed Project ID field from Project Basics section
- Modified `src/components/projects/ProjectDetailsPage.tsx` to remove Project ID field
- Changed from grid layout (2 columns) to single column for Project Name field
- Matches Create Project page format which doesn't display Project ID in form
- Project ID still visible in page header for reference
### [2026-02-20] — Fixed CheckIcon import error in project pages
- Modified `src/components/projects/ProjectDetailsPage.tsx` to use Check instead of CheckIcon
- Modified `src/components/projects/CreateProjectPage.tsx` to use Check instead of CheckIcon
- Changed all CheckIcon references to Check from lucide-react for proper import resolution
### [2026-02-20] — Made all sections fully editable in Project Details page
- Modified `src/components/projects/ProjectDetailsPage.tsx` to enable full editing functionality
- Removed edit restrictions based on project status - all projects now editable
- Added multi-select dropdowns for Categories, Sensitive Topics, Languages, and Countries in edit mode
- Added dynamic target pages management with add/remove functionality
- All fields now work exactly like Create Project page with same UI components
- Integrated Command, Popover components for consistent multi-select experience
- Added state management for all form fields with editFormData object
### [2026-02-20] — Implemented 3-tab Project Details Page with Overview, Order Analytics, and Project Details
- Completely redesigned `src/components/projects/ProjectDetailsPage.tsx` with new 3-tab structure
- Tab 1 (Overview): Shows order counts, finance stats, and finance record table with real-time calculations
- Tab 2 (Order Analytics): Groups orders by status (Active, Completed, Cancelled) with analytics and spend tracking
- Tab 3 (Project Details): Displays all project fields from Create Project form with edit functionality
- Added `getProject` method to `src/stores/projectStore.ts` for fetching individual projects
- Edit mode only enabled for active projects, disabled for paused/completed projects
- Finance table includes clickable order IDs and delete option (disabled for active orders)
### [2026-02-20] — Changed Projects navigation label to My Projects
- Modified `src/components/Sidebar.tsx` to update navigation label from "Projects" to "My Projects"
- Changed label in advertiserNavItems array for better clarity and personalization
### [2026-02-20] — Removed Niche Description field from Create Project form
- Modified `src/components/projects/CreateProjectPage.tsx` to remove nicheDescription field
- Removed textarea input and label for Niche Description from Project Basics section
- Removed nicheDescription from formData state object
### [2026-02-20] — Reduced New Project button height
- Modified `src/components/projects/ProjectsPage.tsx` to reduce button height from h-10 to h-9
- Changed height class on New Project button for more compact design
### [2026-02-20] — Reduced project icon size on project cards
- Modified `src/components/projects/ProjectsPage.tsx` to reduce icon container size
- Changed from w-9 h-9 to w-7 h-7 for more compact design
- Reduced icon size from w-4.5 h-4.5 to w-3.5 h-3.5
- Changed border radius from rounded-lg to rounded-md for better proportion
### [2026-02-20] — Increased spacing between title and description in header
- Modified `src/components/projects/CreateProjectPage.tsx` to increase top margin on description
- Changed mt-0.5 to mt-1.5 for better visual separation between heading and subtitle text
### [2026-02-20] — Updated Create Project page subtitle text
- Modified `src/components/projects/CreateProjectPage.tsx` to replace subtitle text
- Changed from "Build your SEO campaign in minutes" to more descriptive text
- New text: "Create a new project to organize your guest post campaigns, manage orders, and track your content strategy in one place."
### [2026-02-20] — Made only Project Name mandatory in Create Project form
- Modified `src/components/projects/CreateProjectPage.tsx` to remove validation for all fields except Project Name
- Changed Target Website, Project Objective, Categories, and Languages from required to optional
- Removed red asterisk (*) indicators and replaced with "(Optional)" labels
- Updated validateForm function to only check for Project Name field
### [2026-02-20] — Matched Create Project padding to other pages
- Modified `src/components/projects/CreateProjectPage.tsx` to use px-6 for equal left and right padding
- Changed from pr-8 to px-6 to match padding style used in SalesPurchasesPage and other pages
### [2026-02-20] — Increased right padding on Create Project page
- Modified `src/components/projects/CreateProjectPage.tsx` to add pr-8 to form content container
- Increased right side spacing for better visual balance
### [2026-02-20] — Matched Create Project padding to Purchases page
- Modified `src/components/projects/CreateProjectPage.tsx` to use px-6 on both sides
- Changed from pl-2 pr-6 to px-6 for equal left and right padding
- Matches the padding style used in SalesPurchasesPage for consistency
### [2026-02-20] — Reduced left padding to match purchases page
- Modified `src/components/projects/CreateProjectPage.tsx` to reduce left padding from px-6 to pl-2
- Right padding remains pr-6, section width unchanged
- Matches padding style used in SalesPurchasesPage for consistency
### [2026-02-20] — Reduced form content width by 20%
- Modified `src/components/projects/CreateProjectPage.tsx` to reduce max-width from 1400px to 1120px
- Form content section now 20% narrower for more compact layout
### [2026-02-20] — Reduced form content width from right side
- Modified `src/components/projects/CreateProjectPage.tsx` to reduce max-width from 1600px to 1400px
- Form content section now has narrower width for better visual balance
### [2026-02-20] — Improved Create Project header and reduced padding
- Modified `src/components/projects/CreateProjectPage.tsx` to remove cancel button from header
- Reduced header padding from py-3 to py-2.5 for more compact design
- Reduced form content top padding from py-4 to py-3
- Added shadow-sm to header for subtle depth
- Improved header layout with better spacing and alignment
### [2026-02-20] — Moved Publishing Instructions to Project Basics section
- Modified `src/components/projects/CreateProjectPage.tsx` to move Publishing Instructions field
- Moved from Links & Publishing section to Project Basics section, after Project Objective
- Removed green info box about instructions being included with orders
- Field remains optional with same textarea styling and placeholder text
### [2026-02-20] — Cleaned up Target Pages section styling
- Modified `src/components/projects/CreateProjectPage.tsx` to remove borders and reduce spacing
- Removed bg-muted/30, rounded-md, and border classes from target page containers
- Reduced spacing from space-y-2 to space-y-1.5 for tighter layout
- Updated placeholder text from "Collaborator" to "Contlinks" and URL to "contlinks.com"
- Cleaner, more minimal appearance without background boxes
### [2026-02-20] — Applied indigo/purple color scheme to selected badges
- Modified `src/components/projects/CreateProjectPage.tsx` to use indigo color scheme for all selected item badges
- Changed from variant="secondary" to custom classes: bg-indigo-100, text-indigo-700, border-indigo-200
- Added dark mode variants: bg-indigo-950, text-indigo-300, border-indigo-800
- Applied to all four multi-select fields: Categories, Sensitive Topics, Languages, Target Countries
- Matches reference design with light purple/lavender background and blue text
### [2026-02-20] — Restored regular badge colors for selected items
- Modified `src/components/projects/CreateProjectPage.tsx` to use default secondary variant styling
- Removed custom muted colors (bg-muted/50, text-foreground/80, border-border/50)
- All selected item badges now use standard secondary badge appearance
- Applied to categories, sensitive topics, languages, and countries badges
### [2026-02-20] — Optimized badge colors for selected items
- Modified `src/components/projects/CreateProjectPage.tsx` to use more subtle badge colors
- Changed all selected item badges to use bg-muted/50, text-foreground/80, border-border/50
- Applied to categories, sensitive topics, languages, and countries badges
- Removed default secondary variant styling for cleaner, less overwhelming appearance
### [2026-02-20] — Moved selected items inside dropdown buttons
- Modified `src/components/projects/CreateProjectPage.tsx` to display selected items as badges inside dropdown triggers
- Removed separate badge display sections below each dropdown field
- Changed button height from fixed h-9 to min-h-[36px] h-auto for dynamic expansion
- Selected items now appear as compact badges (h-5, text-[10px]) inside the button itself
- Applied to all four multi-select fields: Categories, Sensitive Topics, Languages, Target Countries
- X icon on badges uses stopPropagation to prevent dropdown from opening when removing items
### [2026-02-20] — Increased dropdown width for categories and sensitive topics
- Modified `src/components/projects/CreateProjectPage.tsx` to increase dropdown width from 220px to 280px
- Changed PopoverContent width for both Category and Sensitive Topics dropdowns
- Height remains unchanged at h-8 for inputs and compact design
- Provides more space for longer category and topic names
### [2026-02-20] — Moved selection counter to dropdown footer
- Modified `src/components/projects/CreateProjectPage.tsx` to move counter from header to footer
- Removed "You can select up to 7 items" message from top of both dropdowns
- Added "X/7 maximum" counter at bottom right of both Category and Sensitive Topics dropdowns
- Counter now appears alongside Clear Selection button in footer section
- Shows real-time selection count (e.g., "3/7 maximum") for better visibility
### [2026-02-20] — Moved selection limit message into dropdowns
- Modified `src/components/projects/CreateProjectPage.tsx` to move "up to 7 items" message into dropdown headers
- Added message as header inside both Category and Sensitive Topics dropdowns
- Removed separate orange info box that displayed the same message below the fields
- Message now appears at top of dropdown list for better visibility during selection
### [2026-02-20] — Arranged Project Name and Target Website side-by-side
- Modified `src/components/projects/CreateProjectPage.tsx` to display Project Name and Target Website on same line
- Wrapped both fields in flex container with gap-2 for horizontal layout
- Both input fields have flex-1 class for equal width distribution
- Labels and error messages remain properly aligned within each field
### [2026-02-20] — Arranged Target Pages inputs side-by-side
- Modified `src/components/projects/CreateProjectPage.tsx` to display Anchor Text and Target URL on same line
- Changed target page container from space-y-2 (vertical stack) to flex gap-2 (horizontal layout)
- Both input fields now have flex-1 class for equal width distribution
- Inputs remain responsive with proper spacing and alignment
### [2026-02-20] — Removed step progress indicator from Create Project page
- Modified `src/components/projects/CreateProjectPage.tsx` to remove progress indicator section
- Removed grid with 4 step cards (Basics, Targeting, Localization, Links)
- Removed `isStepComplete` function that tracked step completion
- Removed all debug logs from handleSubmit function
- Form content cards remain unchanged, only progress tracker removed
### [2026-02-20] — Optimized dashboard layout with balanced spacing and refined typography
- Modified `src/App.tsx` to reduce main heading from text-3xl font-bold to text-2xl font-medium
- Reduced overall section spacing from space-y-8 to space-y-6, grid gaps from gap-8 to gap-6
- Modified `src/components/OrderStatusCards.tsx` to reduce card gaps, icon sizes, and font weights
- Changed status card numbers from text-4xl font-bold to text-3xl font-medium
- Modified `src/components/OrdersTable.tsx` to reduce table row heights and font sizes
- Changed table headings to text-xs, reduced padding throughout for compact design
- Modified `src/components/OrdersByDateChart.tsx` to reduce chart height from 400px to 320px
- Modified `src/components/QAStatisticsChart.tsx` to use regular font-medium instead of font-bold
- Modified `src/components/VideoSection.tsx` to reduce play button size and use consistent font weights
- All sections now use font-medium or regular weights, no bold or heavy typography
### [2026-02-20] — Converted Create Project to single-page form with all sections visible
- Modified `src/components/projects/CreateProjectPage.tsx` to remove multi-step wizard
- Changed from 4-step wizard to single-page form with all sections visible at once
- Organized content into 4 card sections: Project Details, Content Targeting, Localization, Links & Publishing
- Reduced font sizes and weights for cleaner, more balanced design (text-lg for titles, h-10 for inputs)
- Removed progress tracker, step navigation, and gradient backgrounds
- Added debug logs to handleSubmit for runtime debugging
- Simplified header with back button and cancel option
- All form fields now visible simultaneously for easier completion
### [2026-02-20] — Redesigned Create Project page with step-by-step wizard
- Completely redesigned `src/components/projects/CreateProjectPage.tsx` with new concept
- Changed from single-page form to 4-step wizard: Project Details, Targeting, Localization, Links & Publish
- Added visual progress tracker with icons (Settings, Target, Globe, Link) and completion states
- Implemented step validation with back/forward navigation
- Added gradient background and backdrop blur effects for modern look
- Centered content with max-width containers for better focus
- Larger input fields (h-12) and improved spacing throughout
- Added smooth fade-in animations between steps
- Sticky header with step counter and cancel button
- Enhanced info boxes with better visual hierarchy
### [2026-02-19] — Increased all selection limits from 5 to 7 items
- Modified `src/components/projects/CreateProjectPage.tsx` to increase selection limits
- Added constants MAX_CATEGORY_SENSITIVE, MAX_LANGUAGES, MAX_COUNTRIES all set to 7
- Updated categories + sensitive topics combined limit from 5 to 7
- Updated languages limit from 2 to 7
- Updated countries limit from 5 to 7
- Updated all UI labels and counters to reflect new 7-item limits
- Updated instructions sidebar to show "up to 7" for all fields
### [2026-02-19] — Converted target countries to multi-select with 5-item limit
- Modified `src/components/projects/CreateProjectPage.tsx` to change countries from 2 separate selects to multi-select
- Changed countries state from array of 2 optional strings to array of strings
- Added countryPopoverOpen state for dropdown control
- Converted Primary/Secondary country selects to single multi-select Popover with checkboxes
- Added 5-item selection limit with counter (X/5 selected) and Clear Selection button
- Updated instructions sidebar to reflect "5 target countries" instead of "2 target countries"
### [2026-02-19] — Enabled multi-select for categories and sensitive topics with 5-item limit
- Modified `src/components/projects/CreateProjectPage.tsx` to convert single-select to multi-select
- Changed category from single Select to multi-select Popover with checkboxes
- Changed sensitive topic from Switch to multi-select Popover with checkboxes (Adult Content, Gambling, Pharmaceuticals, Politics, Religion, Cryptocurrency)
- Added combined 5-item selection limit across both categories and sensitive topics
- Added selection counter (X/5 selected) in both dropdowns
### [2026-02-19] — Changed button text from "View Report" to "View Project"
- Modified `src/components/projects/ProjectsPage.tsx` to update button label
- Changed footer action button text to better reflect its purpose

### [2026-02-19] — Increased spacing between badges and stats sections
- Modified `src/components/projects/ProjectsPage.tsx` to increase bottom margin on badges wrapper
- Changed mb-2 to mb-6 for more breathing room between badges and finance section

### [2026-02-19] — Removed project description from cards
- Modified `src/components/projects/ProjectsPage.tsx` to remove description paragraph
- Removed mb-3 margin from badges wrapper and description text element
- Cards now show only project name, ID, date, badges without description text

### [2026-02-19] — Optimized search filter and redesigned dropdown
- Modified `src/components/projects/ProjectsPage.tsx` to remove extra border from search bar
- Converted filter panel to clean dropdown menu using DropdownMenu component
- Improved search bar styling with shadow and better spacing (h-10)
- Filters now appear in organized dropdown with header, sections, and Clear All button

### [2026-02-19] — Added comprehensive project filters
- Modified `src/components/projects/ProjectsPage.tsx` to add search and filter functionality
- Added search bar for project name, ID, and description with clear button
- Added toggleable filter panel with Status, Purpose, and Language filters
- Filters show active count badge and "Clear All" button when active
- All filters work together to refine project list dynamically

### [2026-02-19] — Removed filter toolbar and panel
- Modified `src/components/projects/ProjectsPage.tsx` to remove all filter UI elements
- Removed filter state (statusFilter, purposeFilter, languageFilter, showFilters)
- Removed filter panel with Status, Purpose, and Language options
- Removed Filter button from toolbar, keeping only search bar
- Simplified filteredProjects logic to only use search query

### [2026-02-19] — Optimized search box and added comprehensive filters
- Modified `src/components/projects/ProjectsPage.tsx` to reduce search box height (h-8) and width (max-w-xs)
- Added filter panel with Status (Active/Paused/Completed), Purpose, and Language filters
- Filters are toggleable with visual feedback and active count badge
- Filter panel shows/hides on button click with clear options for each category
- All filters work together to refine project list dynamically

### [2026-02-19] — Reduced spacing between search and project cards
- Modified `src/components/projects/ProjectsPage.tsx` to reduce vertical spacing
- Changed main container space-y from 4 to 3
- Reduced grid gap from gap-6 to gap-4 for tighter card layout
- Adjusted view toggle negative margin from -mb-2 to -mb-1
### [2026-02-19] — Moved view mode toggle above project cards
- Modified `src/components/projects/ProjectsPage.tsx` to separate view toggle from toolbar
- Moved grid/list view toggle to its own section above project cards on the right side
- Removed toggle from toolbar, keeping only search bar and filter button in toolbar

### [2026-02-19] — Reduced filter toolbar height
- Modified `src/components/projects/ProjectsPage.tsx` to reduce toolbar height
- Changed padding from p-1 to p-1, gap from gap-4 to gap-2, rounded-xl to rounded-lg
- Reduced input height from h-10 to h-9, button height to h-8
- Made icons smaller (w-3.5 h-3.5) and reduced padding throughout for compact design

### [2026-02-19] — Added purpose field to project cards
- Modified `src/stores/projectStore.ts` to add purpose field to Project interface
- Updated all sample projects with targeted purposes (Increase SEO Traffic, Boost Visibility, Build Authority, Drive Conversions)
- Modified `src/components/projects/ProjectsPage.tsx` to display purpose below badges with primary color styling
- Purpose shown with bullet point indicator for visual emphasis

### [2026-02-19] — Added language field to project cards
- Modified `src/stores/projectStore.ts` to add language field to Project interface
- Updated all sample projects with different languages (English, Spanish, French, German)
- Modified `src/components/projects/ProjectsPage.tsx` to display language badge instead of "SEO Campaign"
- Language badge styled with blue color scheme for better visibility

### [2026-02-19] — Removed project description from project cards
- Modified `src/components/projects/ProjectsPage.tsx` to remove description text
- Cleaned up card layout by removing the description paragraph section
- Added debug log for description removal tracking
</changelog>
