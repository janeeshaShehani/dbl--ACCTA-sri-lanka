<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ACCTA project instructions

Before working on this project, read `../ACCTA Web Documents/ACCTA Web Development Rules.txt` and the relevant supplied content brief, design PDF, and handwritten feedback image in that folder. These are the user's project rules and references.

- Comment key logic, conditions, hooks, and utilities in clear English, explaining what and why.
- Make targeted edits only. Preserve unrelated code, formatting, imports, and existing behaviour.
- Match the supplied design and existing components, typography, colours, and spacing. Do not introduce an unapproved framework or redesign.
- Develop and verify mobile, tablet, and desktop behaviour together, using the existing responsive patterns.
- Preserve working features and integrations. Keep changes compatible and additive.
- Keep components modular and shared data consistent; avoid duplicating logic.

The current seminar scope requires a matching login form UI only, without authentication or a backend. Unavailable features must have honest, helpful states rather than broken links or false success messages. Distinguish seminar readiness from the full applications, portal, payments, and student-service scope in the brief. Do not invent missing Association facts or treat sample members as verified records.

Current user-approved implementation scope: preserve all existing sections, buttons, and features; unfinished actions may be visibly disabled with a professional explanation. Exclude the supplied member dashboard/portal frame. Both M-01 and M-02 membership forms are mandatory. Implement real form submission notifications and matching HTML acknowledgements using Resend, separately from the UI-only login. Keep API keys server-only and local environment files out of Git. Follow the supplied documents for public-site work and keep missing content/policy decisions explicit; do not expand this release into payment processing, member accounts, or staff dashboards without a new request. The original broad audit checklist includes later work and is not the current release scope.

The baseline review and remaining-work checklist are in `../ACCTA Web Documents/ACCTA Remaining Work Checklist.md`. Recheck findings against the current code before implementing them; the checklist records the audit dated 8 November 2026.

The supplied `../ACCTA Web Documents/ACCTA Individual Membership Application Form.docx` now provides the exact M-01 questions, declarations, referee rules and document checklist. It is partly filled: never copy its personal answers or selected options into public defaults or fixtures. Payment timing remains unresolved: the opening instructions and Section H require payment proof with submission, while Section J says payment follows Council approval. Public-register consent is bundled in M-01 but optional in the brief; obtain approved wording before enabling real applications. The original M-02 is still missing. These are content dependencies, not permission requirements for unrelated development.

The user has overridden the brief's practising-licence placement: show the existing section on its own `/practising-licence` page, not within Membership or About. Preserve its design and content; do not redirect that page to Membership.
