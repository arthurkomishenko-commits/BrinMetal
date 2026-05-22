# BrinMetal -- Deployment

## Platform: Vercel

Primary deployment on Vercel (native Next.js support).

## Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| Development | local | localhost:3000 | Local development |
| Preview | PR branches | auto-generated | Review deployments |
| Production | main | brinmetal.co.il | Live site |

## CI/CD Pipeline

1. Developer pushes to feature branch
2. Vercel creates preview deployment
3. Visual review on preview URL
4. Merge to main triggers production deployment
5. Automatic rollback if build fails

## Domain Setup

- Primary: brinmetal.co.il
- Redirect: www.brinmetal.co.il -> brinmetal.co.il
- SSL: automatic via Vercel

## Build Configuration

```bash
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x
```

## Environment Variables (Vercel)

- NEXT_PUBLIC_SITE_URL=https://brinmetal.co.il
- Contact form secrets (email service API keys)
- Analytics IDs

## Monitoring

- Vercel Analytics (Web Vitals)
- Vercel Speed Insights
- Error tracking: Sentry (future)
- Uptime monitoring (future)

## Rollback

- Vercel maintains deployment history
- Instant rollback to any previous deployment
- No downtime during deploys
