Upgrade Expo to SDK 54 — update deps, TS and lint fixes

This PR upgrades the frontend Expo SDK to 54 and aligns related dependencies and tooling.

Summary of changes:
- Bumped `expo` to ~54.0.10 and updated compatible native modules.
- Upgraded TypeScript to ~5.9.2 and updated `@typescript-eslint` packages to support it.
- Fixed linting issues and removed a temporary helper script (`fixpkg.js`).
- Moved `name` into the `expo` object in `frontend/app.json` to resolve config warnings.
- Removed duplicate root-level `expo` dependency and de-duplicated node_modules.
- Added `expo.install.exclude` temporarily for TypeScript while resolving ESLint compatibility.
- Started Metro (tunnel) and validated project with `npx expo-doctor` (17/17 checks passed).

Notes and testing guidance:
- TypeScript / eslint note: The parser `@typescript-eslint/typescript-estree` previously warned about TS 5.9.x; we upgraded the `@typescript-eslint` packages and resolved lint runs locally. The project now lints cleanly.
- Local smoke test (recommended):
  1. cd frontend
  2. npm install
  3. npx expo start --tunnel
  4. Open Expo Go on device or use emulator and verify onboarding and home screens.

If CI or EAS builds fail after merging, likely follow-ups:
- Rebuild development clients or production builds with EAS.
- Run `pod install` on macOS for iOS native changes.

Files of interest (non-exhaustive):
- frontend/package.json
- frontend/app.json
- frontend/metro.config.cjs
- frontend/components/DropdownPicker.tsx

If you want, I can:
- Open a PR in GitHub for you (requires GH CLI or token), or
- Create this PR via the GitHub UI with the above title/description (you can copy/paste), or
- Run additional smoke tests on an emulator and report issues.

-- Automated note: this description was committed to `upgrade/expo-sdk-54` as `PR_DESCRIPTION.md` to simplify creating the PR.
