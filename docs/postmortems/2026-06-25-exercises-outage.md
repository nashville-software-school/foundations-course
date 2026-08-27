# Postmortem: Coding Exercises Disappeared Site-Wide

- **Date range:** 2026-06-25 → 2026-08-05 (outage), fix live 2026-08-05
- **Severity/impact:** All coding exercises on the Foundations Course site stopped rendering. This site serves prerequisite/prep material to newly admitted students; the outage overlapped part of the prep window for the cohort starting 2026-08-17.
- **Status:** Resolved (PR #342, 2026-08-05)
- **Attendees/reviewers:** Dave, Gabe, Greg, Rebecca — anyone who commits to the platform repo or a curriculum delivery (client) site

## What is a blameless postmortem, and why we do one

A blameless postmortem assumes everyone acted reasonably given what they knew at the time. The goal is to find the systemic/process gaps that let the incident happen and fix those — not to find who to blame. Commits and versions are named below as the factual record, not as fault.

## Summary + impact

A dependency bump on 2026-06-25 silently broke every coding exercise, because it pulled in an unrelated upstream breaking change with no compatibility shim. The site was broken for ~6 weeks, until a fix shipped 2026-08-05 — 12 days before the 2026-08-17 cohort's start. Students who did prework before the fix would have hit a site with no exercises, a plausible contributor to that cohort starting less prepared than intended (see caching caveat below on exactly who was affected and when).

## Timeline

- **2025-11-13** — Platform commit `986ca1c` renames `chapter.exercise` (singular) → `chapter.exercises` (plural), no fallback. Ships in platform tag `v0.2.15`, whose own `package.json` still read `0.2.8` — no version bump, no changelog.
- **2026-06-25** — This repo bumps `@nss-workshops/nss-core` `0.2.24` → `0.2.28` (commit `41f55d8`) for an unrelated reason (new multi-site auth proxy), auto-deployed via `deploy.yml`. At the time, the deploy pipeline had **no test step** (straight from `npm ci` to `npm run build`). This repo's content still used singular `exercise`, so `getChapterContent()` returned `exercises: undefined` and the platform's rendering logic (expects an array) silently rendered nothing.
- **2026-06-25 → 2026-08-05** — Outage window (~6 weeks), overlapping the start of the 2026-08-17 cohort's prep period.
- **2026-08-03** — Root cause diagnosed. Commit `80a9b8d` migrates content to `exercises: [...]` and adds the first regression test (`src/__tests__/editor-section.test.jsx`). `b3612b4` adds `npm test -- --run` to CI.
- **2026-08-05** — Fix merged (PR #342/#343), deployed, exercises restored server-side. (A student with an already-loaded broken build may not have seen the fix without a hard reload — see below.)

## Root cause & why it wasn't caught

The platform's chapter-reading code expects `chapter.exercises` as an array; this repo still supplied singular `exercise`, so the platform got `undefined`. Three independent gaps stacked — any one alone would likely have prevented or shortened the outage:

- **Upstream:** no backward-compatible fallback for the renamed field.
- **Upstream:** no changelog entry or version signal marking it as breaking (version wasn't even bumped).
- **Downstream:** no CI test gate at deploy time, so even an existing regression test wouldn't have blocked the bad deploy.

## Open question — caching

This is a static Vite build on GitHub Pages with no service worker, but ordinary HTTP/CDN caching could mean a student who loaded the broken site before 2026-08-05 kept seeing it afterward without a hard reload — so the fix may have reached some browsers later than the deploy date. **Needs verification**: check actual cache-control headers before drawing firm conclusions about post-fix impact.

## Suggested fixes / action items

- [x] Regression test for the `exercise`/`exercises` shape — `src/__tests__/editor-section.test.jsx` (2026-08-03)
- [x] Run tests in CI before deploy — `deploy.yml` (2026-08-03)
- [ ] Test suite for every client site consuming the platform (this course has a start; needs an owner per remaining site)
- [ ] Audit all other platform client sites to confirm each is on the new (multi-site auth / `exercises` array) API, not still relying on the old `exercise` shape
- [ ] Exact-version pinning (no `~`/`^`) for the platform dependency across all client sites (this repo already does it — verify the others)
- [ ] Circulate the semver guidance below to platform consumers and content authors
- [ ] Ask admissions/instructional staff whether the 2026-08-17 cohort needs make-good (extended prep, office hours) given the outage overlap
- [ ] Investigate cache-control/CDN behavior for the GitHub Pages deploy; if stale caching is confirmed, add mitigation (cache-busting, hard-reload guidance) and update this doc's impact section

## Appendix: semver quick guide

Given a version like `2.5.1`:

| Position | Bump when... | Consumer expectation |
|---|---|---|
| MAJOR (`2`.5.1) | You break the public API/contract — rename/remove a field, change a signature, change relied-upon behavior | "Read the changelog before upgrading" |
| MINOR (2.`5`.1) | You add functionality in a backward-compatible way | "Safe to upgrade" |
| PATCH (2.5.`1`) | Backward-compatible bug fix | "Always safe" |

**Rule of thumb:** if existing correct callers would break without changing their code, that's a MAJOR bump. Renaming `exercise` → `exercises` with no fallback is the textbook case.

**The 0.x.y caveat:** per semver spec, `0.x` means "anything may change at any time," so MINOR bumps are technically allowed to break things pre-1.0. The platform has stayed on `0.x` for over a year, so consumers get zero contractual protection from any bump — a reasonable choice for a library still finding its shape, but it obligates the maintainers to document breaking changes explicitly, since the version number alone won't warn anyone.

What should have happened: either (a) keep both `exercise` and `exercises` working for a deprecation window, or (b) if breaking on purpose, call it out loudly (changelog + release notes) so content authors know to update before upgrading.
