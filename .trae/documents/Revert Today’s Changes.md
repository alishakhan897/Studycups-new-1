## Scope of Revert
- Remove all backend and admin dashboard additions made today.
- Restore the app to its original client-only state without new navigation or types.

## Files to Remove
- `server/db.js`
- `server/index.js`
- `services/api.ts`
- `pages/AdminDashboard.tsx`

## Files to Restore
- `types.ts`: remove `| { page: 'admin' }` from `View` union.
- `App.tsx`: remove `import AdminDashboard` and the `case 'admin'` route.
- `components/Header.tsx`: remove the `Admin` entry from `navLinks`.

## Validation
- Run `npm run dev` and ensure the site loads and navigates correctly.
- Confirm there are no references to removed files or missing dependencies in the console.

## Optional Cleanup
- No dependencies were installed, so `package.json` remains unchanged.
- Clear today’s task tracking entries after revert (internal workspace list).

If you confirm, I will perform the revert and verify the app builds and runs normally.