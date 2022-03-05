import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: 'secret',
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('<------------- signIn! ')
      console.log('user:',user)
      console.log('account:',account)
      console.log('profile:',profile)
      console.log('email:',email)
      console.log('credentials:',credentials)
      console.log('signIn! ------------->')
      return true
    },
    async session({ session, user, token }) {
      console.log('<------------- session! ')
      console.log('session:',session)
      console.log('user:',user)
      console.log('token:',token)
      console.log('session! ------------->')
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('<------------- jwt ')
      console.log('token',token)
      console.log('user',user)
      console.log('account',account)
      console.log('profile',profile)
      console.log('isNewUser',isNewUser)
      console.log('jwt! ------------->')
      return token
    }
  }
});