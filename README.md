This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
 Configured With [Drizzle-Next] [https://github.com/drizzle-next/drizzle-next/tree/main]
And [Tauri] [https://v2.tauri.app/]

Tech Stack 

 NextJs          : "15.1.5",
 React           : "^19.0.0",
 Tailwindcss     : "^3.4.17",
 Typescript      : "^5.7.3"
 Drizzle         : "0.38.1",
 Better-Sqlite3  :"7.6.12",
 Tauri           :"^2.2.5",


## Getting Started

```bash

cd my-app
pnpm i  
## This Should install the project. 
pnpm drizzle-kit generate
## After Installing run generate to populate the sqlite file. If You Continue Using Drizzle-next to scaffold this command will be used again
pnpm drizzle-kit migrate
## After Installing run generate to populate the sqlite file. If You Continue Using Drizzle-next to scaffold this command will be used again
pnpx tsx scripts/create-user email@address.com password123
## Now Create a new user replacing the above email and password with your own 
pnpx tsx scripts/grant-admin.ts email@address.com
## finally grant the email address admin usage for the app. you can omit this if you don't want the user to be admin 
pnpm dev
## run the dev server it should be http://localhost:3000 
## Open a new terminal shell, cd my-app and ensure the dev server is still running
pnpm run tauri dev
## Running this command will build the app into a tauri build and launch the dev server it will expect the http://localhost:3000 dev to be running
```bash






Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
