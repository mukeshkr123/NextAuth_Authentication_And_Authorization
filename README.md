# NextAuth_Authentication_And_Authorization

-🔐 Simplify user authentication and authorization in your Next.js applications with NextAuth. This repository provides a comprehensive implementation showcasing best practices for secure user authentication and fine-grained authorization controls. Integrate various authentication providers seamlessly and manage user permissions with ease. Level up your Next.js projects with robust and user-friendly authentication using NextAuth!.

## Installation

1. NextAuth installation - `npm install next-auth`

## Create NextAuth (Auth.js) API - Options / Routes

- create a api folder under the app `app/api/auth/[...nextauth]` having two file.

1.  `options.js`
2.  `route.js`

- For options file

```jsx
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile Github", profile);

        let userRole = "Github user";
        if (profile?.email == "mkmehta2041@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Github", profile);

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session) session.role = token.role;
      return session;
    },
  },
};
```

- For route file

```jsx
import NextAuth from "next-auth/next";
import { options } from "./options";

const handler = NextAuth(options);
export { handler as GET, handler as POST };
```

## Setup built-in OAuth Provider - (Google / GitHub)

-add this in `.env.local`

```.env
GOOGLE_ID=...
GOOGLE_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=....

```
