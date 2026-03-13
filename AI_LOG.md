# AI Usage Log

## Tool(s) used

Cursor on Auto mode for generation of the plan
Claude code with opus 4.6 for coding

## 1. Biggest time-save

Which part of the build did AI accelerate the most?
Name the file and function. Paste the prompt you used.
Why do you think that prompt worked well?

Ans.
Implementing the phase 3 was the biggest time saver because in a single pass, Claude generated all 6 controller handlers (including the MongoDB aggregation pipeline with $group, $sum, $sort, $project), three middleware files (asyncHandler, errorHandler, validateObjectId), express-validator chains for both create and update, and the route file with the critical /summary before /:id ordering — all wired together correctly. Manually, this interconnected backend layer (controllers + middleware + validators + routes) would have taken 2-3 hours to write and debug.

<!-- The prompt I used: -->

"Continue with the phase 3 and verify after the completion phase that endpoints are correctly configured and are in working after the implementation i'll test it on postman make sure that plan is being followed"

<!-- Why the prompt worked well: -->

It referenced a detailed plan I had already built with the AI (so it had full architectural context), asked for self-verification (so it tested its own work via curl), and set a clear boundary ("I'll test on Postman") — meaning it had the context to produce working code.

<!-- ---- PHASE 3 ---- -->

**Goal:** Implement all 6 endpoints with validation, async error handling, and the global error handler.

### Steps

1. Create `backend/src/middleware/asyncHandler.ts` — wraps async fns, catches errors to `next()`
2. Create `backend/src/middleware/validateObjectId.ts` — checks `ObjectId.isValid(req.params.id)`, returns 400 if invalid
3. Create `backend/src/middleware/errorHandler.ts` — 4-arg Express error handler, always returns `{ error: string }` JSON, handles Mongoose ValidationError/CastError specifically
4. Create `backend/src/validators/expenseValidator.ts`:
   - `createExpenseRules` — validate all required fields with express-validator chains
   - `updateExpenseRules` — same but all fields `optional()` for partial updates
   - `validate` middleware — checks `validationResult()`, returns 400 with `{ error, details }` on failure
5. Create `backend/src/controllers/expenseController.ts` (all wrapped with asyncHandler):
   - `getExpenses` — filter by optional `?category`, sort `date: -1`, `.limit(100)`
   - `createExpense` — `Expense.create(req.body)`, return 201
   - `getExpenseById` — findById, 404 if not found
   - `updateExpense` — findByIdAndUpdate with `{ new: true, runValidators: true }`, 404 if not found
   - `deleteExpense` — findByIdAndDelete, 204 on success, 404 if not found
   - `getExpenseSummary` — aggregation: `$group` by category → `$sum` amount + count → `$sort` by totalAmount desc → `$project` to rename `_id` to `category`
6. Create `backend/src/routes/expenseRoutes.ts`:
   - **CRITICAL:** Register `router.get('/summary', ...)` BEFORE `router.get('/:id', ...)`
   - Apply `validateObjectId` middleware on all `/:id` routes
   - Apply `createExpenseRules + validate` on POST, `updateExpenseRules + validate` on PUT
7. Update `backend/src/index.ts`:
   - Mount routes at `/api/expenses`
   - Add `errorHandler` as LAST middleware

### Verification (test all with curl/Postman)

- POST valid expense → 201
- POST with empty title → 400 with field error details
- POST with amount: -5 → 400
- GET /api/expenses → array sorted by date desc
- GET /api/expenses?category=Food → filtered
- GET /api/expenses/:validId → 200
- GET /api/expenses/invalidid → 400 "Invalid expense ID format"
- PUT partial update → 200 with updated doc
- DELETE → 204
- GET /api/expenses/summary → correct totals per category

### Git Commit #3

```
feat(backend): implement CRUD endpoints with validation and error handling
```

## 2. Worst AI output

Describe one case where the AI produced incorrect or misleading code.
What was wrong, and how did you catch it and fix it?

Ans.

<!-- 1st case: The Vite 8 / Tailwind CSS peer dependency conflict. -->

When scaffolding the frontend, the AI ran npm create vite@latest which installed Vite 8, then installed @tailwindcss/vite which only supports Vite 5-7. This caused a peer dependency error that broke npm install. The AI didn't anticipate the version incompatibility and had to backtrack by downgrading to vite@^7 and @vitejs/plugin-react@^4.

<!-- 2nd case: type="number" input allowing step="0.01". -->

The AI set step="0.01" on the amount input, which caused the browser's native validation tooltip to fire when users typed more than 2 decimal places (e.g., 3121321.121213). Instead of handling this through our own validation, the browser showed a cryptic "The two nearest valid values are..." tooltip. I caught it while testing the form and asked the AI to fix it — it changed to step="any" and added a custom decimal places check in the useExpenseForm hook's validate function.

<!-- How I caught it: -->

Manual testing on the actual UI. The AI's type-checking passed (tsc --noEmit), but runtime browser behavior exposed the issue.

## 3. Commit breakdown

How many [ai] commits? How many [ai-edit]? How many [manual]?
Which part of the code did you write manually, and why?
Ans.
2 [ai]
3 [ai-edit]
1 [manual]

<!-- Part that i wrote -->

I wrote the .env files manually because it contain sensitive credentials like the MongoDB connection string (which can include database passwords) and service URLs specific to my local environment. These should never be exposed to any platform or committed to the repository — the AI only generated the .env.example templates with placeholder values.

## 4. What you would do differently

If you had another 3-hour session tomorrow, how would you
change the way you use AI based on today?

Ans.

1. Build the plan first, then execute in phases. The plan-first approach worked extremely well — giving the AI a detailed architecture document meant every phase had full context. Next time I'd spend even more upfront time on the plan, especially around version compatibility (would have avoided the Vite 8 issue).
   And i could've added proper Role based access management for users with pagination and limit for the Expense cards making the UX better.

2. Ask for reusable components upfront. I ended up asking the AI to extract Button, FormField, and Modal components after the initial code was written — which meant refactoring existing code. Next time I'd include "create shared components first" as an explicit phase in the plan before building feature components.

3. Don't let the AI commit. I denied a git commit attempt early on and handled commits myself. This was the right call — commit boundaries should reflect my understanding of the work, not the AI's. I'd keep this approach.
