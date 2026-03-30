# Rio Onboarding — Developer Notes

## What This App Does

Rio is a WhatsApp Business API platform. This app is the **onboarding guide** — a step-by-step wizard that helps new customers connect their WhatsApp Business Account (WABA) to Rio via Meta's Cloud API.

The app uses a triage quiz to determine which setup path a customer is on (A through E), then walks them through the exact steps for their situation. Steps include screenshots, error handling trees, and in-context help.

---

## The Help Widget

The "Get Help" button (bottom-right of every page) opens an AI-powered sidebar that lets customers:
1. Type a question about their WABA setup
2. Upload a screenshot of an error or screen they're stuck on
3. Get an AI answer drawn from the internal WABA knowledge base

**No raw KB content is ever exposed to the user.** The API route returns only the AI-synthesized answer and source headings (no file paths, no internal content).

### How it works under the hood

```
Customer types question / uploads screenshot
         ↓
POST /api/waba-help
         ↓
[If screenshot] → Gemini vision extracts errors + stage from image
         ↓
Keyword search over 307 pre-indexed KB chunks (waba-kb.json)
         ↓
Top 8 chunks fed into Gemini 1.5 Flash with a constrained prompt
         ↓
Returns: { answer, stage, sources: [{ heading, stageLabel }] }
         ↓
Sidebar renders AI answer + collapsible sources list
```

### The knowledge base

The KB lives in OpenClaw (internal, not in this repo): `~/.openclaw/workspace/projects/rio/waba-setup/`

It contains 8 stage guides, 13 error files, and supporting docs — ~350 chunks total. It was compiled from Meta's official docs and 6 competitor BSP (Business Solution Provider) knowledge bases.

The chunks are pre-exported to `app/data/waba-kb.json` at build time. To refresh after the KB is updated:
```bash
cd ~/.openclaw/workspace/projects/rio/waba-setup/rag
python3 -c "
import pickle, json
d = pickle.load(open('index.pkl', 'rb'))
records = [r for r in d['records'] if r.get('stage') != 'competitor-reference']
print(json.dumps(records))
" > /path/to/rio-onboarding/app/data/waba-kb.json
```

---

## Environment Variables

| Variable | Purpose | Where to get it |
|---|---|---|
| `OPENROUTER_API_KEY` | AI answers + screenshot vision (free tier) | openrouter.ai → Create Key |
| `RESEND_API_KEY` | Email alert when rate limit is hit | resend.com → free account |

Both are set in Vercel project settings. For local dev, copy to `.env.local`.

### Rate limit behaviour

Google AI free tier allows 15 requests/minute. If that limit is hit:
- The user sees: *"Our AI helper is temporarily busy. Please try again in a moment..."*
- An automatic email fires to joe@joinrio.app: *"Google AI Studio has reached a request per minute timeout; consider upgrading to another model."*

At current traffic volumes this should never trigger. If it does consistently, upgrade to paid Gemini or swap the model in `app/api/waba-help/route.ts`.

---

## Tech Stack

- **Framework:** Next.js 16.2 (App Router)
- **Styling:** Tailwind CSS v4 (config in `globals.css` via `@theme inline`)
- **Language:** TypeScript
- **AI:** OpenRouter free tier (Llama 3.3 70b + Nemotron vision) via native `fetch`
- **Email alerts:** Resend via `resend` package
- **Deployment:** Vercel (auto-deploys from GitHub main branch)

## Color tokens (Tailwind v4)

| Token | Hex | Use |
|---|---|---|
| `rio-teal` | #0A5F52 | Primary brand, buttons, header |
| `rio-black` | #011D19 | Body text |
| `rio-green` | #38604C | Secondary text |
| `rio-mint` | #C9F2D9 | Accent backgrounds |
| `rio-aqua` | #3ED4C1 | Highlights |
| `rio-sand` | #E8DCC2 | Muted backgrounds |
| `rio-beige` | #FFFEFC | Page background |
| `rio-white` | #FFFFFF | Cards |

## Key files

```
app/
  app/
    page.tsx                  ← Home: triage quiz
    path-[a-e]/page.tsx       ← Setup paths
    api/waba-help/route.ts    ← Help widget API (Gemini + search)
  components/
    SupportWidget.tsx         ← "Get Help" floating button
    HelpSidebar.tsx           ← AI help sidebar
    TriageQuiz.tsx            ← Onboarding path selector
    PathPage.tsx              ← Step-by-step path renderer
    StepCard.tsx              ← Individual step with errors/branches
  lib/
    waba-search.ts            ← Keyword search over KB chunks
    path-[a-e]-steps.ts       ← Step data for each path
    types.ts                  ← Shared TypeScript types
  data/
    waba-kb.json              ← Pre-indexed KB chunks (committed, refresh manually)
```
