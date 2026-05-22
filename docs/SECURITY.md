# BrinMetal -- Security

## Headers

Configure in next.config.ts:

```typescript
headers: [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  },
]
```

## Content Security Policy

Strict CSP configured for production:
- default-src 'self'
- script-src 'self' 'unsafe-inline' (for Next.js)
- style-src 'self' 'unsafe-inline' (for Tailwind)
- img-src 'self' data: https:
- font-src 'self'
- connect-src 'self'

## Input Validation

- Server-side validation on all API routes
- Sanitize all user input (contact form)
- No eval() or dynamic code execution
- Parameterized queries for future database

## Rate Limiting

- Contact form: max 5 submissions per IP per hour
- API routes: implement rate limiting middleware

## Environment Variables

- All secrets in .env.local (gitignored)
- Never expose server secrets to client
- NEXT_PUBLIC_ prefix only for public values
- Validate env vars at build time

## Dependencies

- Regular npm audit
- Automated dependency updates (Dependabot)
- Lock file committed (package-lock.json)
- Review new dependencies before adding
