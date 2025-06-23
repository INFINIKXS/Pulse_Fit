# ...existing code...

---

## Copilot Rule: Auto-update API Documentation

Whenever you make changes to the backend API (add, remove, or modify endpoints, request/response formats, authentication, or error handling), you must automatically update the API documentation in `C:\Pulse_Fit\backend\Backend_API.md` to reflect those changes.

**How to apply this rule:**
- After any code change that affects the API, review the new/changed endpoints, parameters, or responses.
- Update the relevant sections in `Backend_API.md`:
  - Add new endpoints with method, path, request/response examples, and descriptions.
  - Update existing endpoint documentation to match new request/response formats or logic.
  - Remove documentation for deleted endpoints.
  - Update authentication, error, or general notes as needed.
- Ensure the documentation is always accurate and up-to-date with the current backend implementation.
- Use clear Markdown formatting and code blocks for examples.

**Goal:**
Keep `Backend_API.md` as the single source of truth for your backend API, so developers and testers always have the latest reference.

# ...existing code...
