import pool from "../../../db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    let client = await pool.connect();
                    const query = "SELECT * FROM Users WHERE email = $1 and password = $2";
                   
                    const values = [email,password];
                    const result = await client.query(query, values);
                    // console.log('result',result);
                    if (!result || result.rows.length === 0) {
                        return null;
                    }

                    const user = result.rows[0];
                    // const passwordsMatch = await bcrypt.compare(password, user.password);
                    
                    // console.log(password,'passwordMatch');
                    // console.log(user.password,'user.password');
                    if (!password == user.password) {
                        return null;
                    }
                    // console.log("User object with role:", { ...user, role: user.role }); // Debugging log
                    // console.log(user.role,'usersrrrrrrrrrrrrrr role')
                    return { ...user, role: user.role }; // Include the 'role' property in the returned user object
                } catch (error) {
                    // console.log("Error: ", error);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
        async signOut({ event, account, metadata }) {
          // Perform any necessary clean-up on sign-out
          // console.log('User signed out:', metadata);
          clearUserSession('userToken');
          return {};
          localStorage.removeItem('userToken');
      },
    },
    session: {
        strategy: "jwt",
        session: async (session, user) => {
            if (user && user.role) {
                // console.log(user.role, 'usre roooooooooooooooooooo')
                session.userRole = user.role;
            }
            return Promise.resolve(session);
        },
    },
    secret: 'jhihiguiygiuygiyg',
    // pages: {
    //     signIn: "/",
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
