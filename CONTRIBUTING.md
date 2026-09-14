# Contributing to Limitless Fitness

## Workflow

1. Update local `main`.
2. Create a focused branch.
3. Make one logical change at a time.
4. Validate the project.
5. Review the diff for secrets and unrelated changes.
6. Push the branch and open a pull request.

Example:

```bash
git switch main
git pull --rebase origin main
git switch -c feature/short-description
npm ci
npm test
npm run check:python
git add .
git commit -m "type: concise description"
git push -u origin feature/short-description
```

## Branch names

- `feature/...` for a feature
- `fix/...` for a bug fix
- `docs/...` for documentation
- `test/...` for tests
- `refactor/...` for internal restructuring

## Commit messages

Use a short present-tense summary:

```text
docs: add database setup guide
fix: make password reset complete successfully
test: add authentication API coverage
refactor: centralize database configuration
```

## Code rules

- Keep secrets and real data out of Git.
- Use parameterized queries for database input.
- Validate on the server even when the browser validates first.
- Insert untrusted text with `textContent` or escape it before HTML rendering.
- Keep payment pricing and verification on the server.
- Add comments for decisions, not obvious syntax.
- Preserve responsive design and keyboard access.
- Do not delete legacy files until the team confirms they are unused.

## Documentation rules

Update the relevant files when behaviour changes:

- `README.md` for setup or major feature changes
- `docs/API_REFERENCE.md` for route changes
- `docs/DATABASE.md` for schema changes
- `.env.example` for configuration changes
- `docs/TESTING.md` for new checks
- `CHANGELOG.md` for notable changes

Never place real keys or passwords in examples.

## Pull-request checklist

- [ ] Change has a clear scope.
- [ ] `npm test` passes.
- [ ] `npm run check:python` passes when Python files are affected.
- [ ] Relevant pages were manually checked.
- [ ] No `.env`, key, password, token, or real user data is included.
- [ ] API/database changes include documentation.
- [ ] Security and privacy effects were considered.
- [ ] Health-related wording is educational, age-appropriate, and not presented as professional advice.

