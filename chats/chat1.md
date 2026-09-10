# AI-Driven Scheme Matching Platform

_Started 2026-09-10 07:16 UTC_

---

## User

i want to make an ai driven scheme matching for marginilized entrepreneurs, organization - ministery of social justice and empowerment, lets first design the website

## Assistant



## Assistant

_[tool: ask_user]_

Waiting on your answers — the visual direction pick and the screen scope are the two that most change what I build.

## User

Answered — Asked for follow-up questions; primary_user: Individual entrepreneur applying for schemes; who_marginalized: SC / ST, OBC, Persons with disabilities, Safai Karamcharis, Transgender persons, Senior citizens, Women entrepreneurs, Denotified tribes; scope: Eligibility intake (AI questionnaire); ai_role: Conversational assistant is the main interface; trust: Modern civic-tech: government-credible but friendly; device: Both; lang: English; notes: i want the ui to be like chat gpt, where the person can ask for the schemes which will apply to him , asking him questions ,options, to make t…

## Assistant



## Assistant

_[tool: ask_user]_

Round two is up — chat mechanics and the visual direction.

## User

Answered — entry: Blank chat with a prompt box and a few starter chips; answer_ui: Free typing always available, Voice input button; result_shape: Ranked list in a right sidebar that updates live during the chat; match_signal: Fit percentage, Eligible / Likely / Not eligible badge, Which criteria you meet and miss, Loan or subsidy amount, Implementing agency, Deadline; aesthetic: Deep mode — near-black chat surface, warm off-white text, amber accent; type_scale: Comfortable; open_questions: 1. it should have good animations maybe using 3js

## Assistant

_[tool: dc_write]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Opened it up. Broadened as you asked: the scheme set now leads with universal routes (MUDRA, PMEGP, CGTMSE, PM Vishwakarma, Startup India Seed Fund) and treats SC/ST/OBC/PwD/Safai Karamchari/transgender/women routes as *additional* eligibility, not the gate — a "None of these" answer still returns a ranked list.

It's a working prototype: type or click a starter, the assistant asks follow-ups, and the right rail re-ranks live with fit %, badge, amount, agency, deadline, and per-criterion ✓/✕/? marks. Voice button is visual only.

Next, if useful: scheme detail page, application drafting, or the officer dashboard.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Both fixed: unanswered criteria now evaluate as unknown (`?`) instead of failed, so fit scores rise honestly as you answer; and the shell is a fixed-height column so the composer is always visible with only the message list scrolling.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Replaced the wrapping flex shell with a grid (`grid-auto-rows: minmax(0,1fr)`) and gave both scrollers `flex: 1 1 0; min-height: 0` — the columns can no longer be pushed past the viewport, so the composer stays anchored at the bottom. Narrow widths stack into two equal-height rows, each with its own scroll.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Rail track is now capped at `min(420px, 34%)`, and the badge has a fourth band — below 60% fit a scheme reads "Needs more info" rather than "Likely", so the label and the score agree.

## User

now lets build it

## Assistant



## Assistant

_[tool: ask_user]_

Waiting on the scope pick — whether "build" means wiring real AI into the chat, adding the remaining screens, or both.

## User

Answered — Asked for follow-up questions; build_meaning: Both: real AI in the chat, plus the remaining screens; screens: Scheme detail page, Application drafting by the assistant, Document checklist / locker, Landing page; data: Let the AI reason from its own knowledge of Indian schemes; notes: this is for the hackathon

## Assistant



## Assistant

_[tool: ask_user]_

Round two is up — navigation model, AI transparency, and what the landing page has to do for judges.

## User

Answered — Asked Claude to decide; nav: Landing → chat is the app; detail, drafting and documents open as panels over the chat

## Assistant

_[tool: read_skill_prompt]_

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

Built. It's now a real AI product, not a keyword demo:

**Chat** — every turn goes to a live model that reasons over Indian schemes from its own knowledge and calls a tool to record your profile plus a fully ranked match list. Fit score, badge, amount, agency, deadline, ✓/✕/? criteria, and a confidence chip where it's unsure. If the model is unreachable it says so in-chat and falls back to the built-in rule engine, so a demo never dies on stage.

**Panels over the chat** — scheme detail (rules checked against your profile, how to apply, caution), application drafting (editable form fields + a printable business-case letter, as tabs), and a document checklist you can tick off.

**Landing** — judge-facing: what it does, how it works in four beats, a "built to be checkable" guardrails block, coverage chips, and a *Watch a 30-second demo* button that auto-plays a three-turn conversation.

Decisions I made for you: all five transparency guardrails, drafting as form-plus-letter tabs, judge-facing landing. Tweaks panel has the model choice (Sonnet default) and a confidence-chip toggle. v1 is preserved as a separate file. Voice button is still visual only — say the word and I'll wire real speech input.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: ready_for_verification]_

All three fixed: markdown banned in the system prompt *and* stripped defensively before display; default model is now Haiku with tighter token caps and staged thinking labels ("Searching central and state schemes" → "Scoring eligibility" → "Almost there"); and the rail keeps its shimmer placeholders during the first wait instead of going blank. Sonnet is still one click away in the tweaks if judges want the deeper reasoning.

