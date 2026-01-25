HRMS Platform

A modern Human Resource Management System (HRMS) built with Next.js 14, Bootstrap, Prisma, and PostgreSQL.
Includes modules for employee management, time reporting, contract management, and a dashboard with real-time insights.

🔗 Production URL

[https://hrms-platform-sepia.vercel.app](https://hrms-platform-sepia.vercel.app)

## Getting Started

First, install dependencies:

```bash
npm install

```

Then, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Environment variables (e.g., DATABASE_URL, NEXTAUTH_SECRET) should be configured in a .env file before running the app.

Prisma migrations:

```bash
npx prisma migrate dev

```


Deploy on Vercel

This project is deployed using Vercel, the recommended hosting platform for Next.js apps.

To deploy your own version:
```bash
vercel

```

Read more:
[Next.js](https://nextjs.org/docs/app/building-your-application/deploying)
