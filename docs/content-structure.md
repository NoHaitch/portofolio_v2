# Structuring project and activity articles

This guide explains how the body of a project or activity page should be organized.
For file layout, front matter keys, and validation, see [adding-content.md](./adding-content.md).

## Principles

- Explain the work, not the course or the team.
- Be specific and honest. Describe what the project does and how it works, and mark approximate recollections as such.
- Prefer "supports" or "provides evidence" over "proves" unless it is a proof.
- Keep the tone direct and clean, as described in [context.md](./context.md).
- Never use the em dash.
- Put each full sentence on its own line, so diffs stay readable.
- Use `##` and `###` headings only. The page title is the `h1`.

## Privacy rules

- Do not include teammate names, student ID numbers, or team and group names.
- The site owner's own name is fine where context needs it.
- Do not link to private or removed repositories, or to documents that are no longer available.
- Links are optional. Include a link only when it is public and working.

## Project pages

Use this order, and drop any section that has nothing real to say.

1. **Overview.** What the project is, why it exists, and what it taught. Lead with the learning goal or purpose.
2. **How it works.** The approach, algorithms, or architecture. Name the real components and data flow.
3. **Key details.** Decisions, trade-offs, features, or results that are worth knowing. Group them under `###` headings when there are several.
4. **Code excerpt or diagram.** One or two focused excerpts, or a short text diagram, that explain the central idea.
5. **Limitations or status.** Mention unfinished parts, simplifications, or scope when relevant.

### Code excerpts

- Use a fenced block with a language tag.
- Copy the excerpt from the real source and keep it short.
- Introduce it with one sentence on what it shows, and follow with what to notice.

### Diagrams

Use a plain text diagram when it explains a flow better than prose:

```text
image -> grayscale -> black-hat -> edges -> contours -> filter -> OCR
```

### Learning-oriented projects

For coursework, state the concept the project trained, such as data structures, automata, or logic programming.
Describe how the implementation exercised that concept instead of listing assignment requirements.

## Activity pages

Activities are events, committees, sports, and milestones.

1. **Overview.** What the activity was, when, and the role.
2. **What I did.** Responsibilities and contributions in concrete terms.
3. **Outcome.** Results, impact, or what was learned.
4. **Media.** Images or a timestamped video placed near the text they support.

## Checklist before committing

- Front matter passes `bun run test`.
- Every excerpt matches the source.
- No names, IDs, or dead links remain.
- The summary is one sentence and matches the body.
- `bunx prettier --check` passes for the file.
