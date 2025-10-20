import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHORS_BY_GITHIB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: { user?: any; profile?: any }) {
      const { name, email, image } = user || {};
      const { id, login, bio } = profile || {};

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHORS_BY_GITHIB_ID_QUERY, { id });

      // allow sign-in if an author with this GitHub id exists
      if (existingUser) {
        return true;
      }

      // create author document if not found
      await writeClient.create({
        _type: "author",
        githubId: id, // ✅ better to store GitHub ID in a dedicated field
        name,
        username: login,
        email,
        image,
        bio: bio || "",
      });

      return true;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: any;
      account?: any;
      profile?: any;
    }) {
      if (account && profile) {
        const githubId = profile.id;
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHORS_BY_GITHIB_ID_QUERY, { id: githubId });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      Object.assign(session, {
        user: { ...session.user, id: token.id },
      });
      return session;
    },
  },
});
