# BDI Higgsfield reels

Uses the official Higgsfield CLI authenticated to the existing Ultra account. Website plan credits pay for generation; this workflow never purchases credits or uses the separately billed developer API.

## Schedule and content

`automation.json` controls activation and two daily slots at 10:00 and 16:00 America/New_York. A Mac LaunchAgent checks every 15 minutes. The Mac must be awake and online. Missed slots older than 90 minutes are skipped; accepted generation jobs resume later. The prior image and Veo schedules should be unloaded when this replacement is enabled.

Alex, the user's brown-suit character, appears in business-owner scenes and presenter tips. Seven industries rotate through the week. Website walkthroughs remain pending real screen capture/compositing; generated website UI is prohibited. Content is MCA-focused, with no invented customer results. Captions disclose AI generation and fictional scenes.

## Limits and state

- Each generation is quoted before submission, capped at 105 plan credits.
- Daily reservations cap normal automation at 210 credits, including failed and uncertain attempts, measured in Europe/Bucharest. This is a credit cap, not an invented dollar conversion. The user's separate $20/day ceiling is retained in `content-plan.json`.
- The three setup takes used 315 credits on October 10 and are all recorded. No additional generation is allowed that day.
- A bounded Gemini video review uses the existing Gemini connection and must pass before publication. Rejected videos remain held; there is no automatic paid regeneration.
- Generation IDs, credit reservations, downloaded MP4s, reviews and publication journals live in gitignored `logs/ugc/automation/`.
- Mutation intent is persisted before remote calls. A lost response stops for reconciliation, rather than risking duplicate posts. Inspect account history before repairing a journal.
- Instagram and Facebook are published independently through their Reels APIs. The resulting IDs and Instagram permalink are logged to the existing BDI social calendar only after both are confirmed.

## Operation

Run `node scripts/ugc/preflight.mjs` to verify connected social accounts. Run `node scripts/ugc/run.mjs` to process due/resumable jobs. With `enabled:false`, this command performs no generation or publishing. Stop by disabling the configuration and unloading `com.bdi.ugc-reels`.

Authentication is private: Higgsfield CLI login, plus `.env` for existing Meta and Gemini credentials. Never commit credentials, CLI session files or `.env.higgsfield`. The older REST API preview code is retained for reference but is not used by automation.

Checks: `node --test validation/ugc/*.test.mjs`.
