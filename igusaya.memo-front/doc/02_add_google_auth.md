## 1. GCPで認証の設定 
下記を参考に設定  
https://reffect.co.jp/react/next-auth#Google_Cloud_PlatfomGCP  
`GOOGLE_CLIENT_ID`と`GOOGLE_CLIENT_SECRET`を取得する

---
## 2. Google連携用のkey設定
上記で取得した`GOOGLE_CLIENT_ID`と`GOOGLE_CLIENT_SECRET`を環境変数に設定
```
GOOGLE_CLIENT_ID=nnnnnnnn-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```
---
## 3. GoogleProviderの設定
`pages/api/auth/`に`[...nextauth].ts`を追加し以下を実装
```ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: 'secret'
});
```
---
## 4. session情報の取得
`pages/index.tsx`を実装
```tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const Home = () => {
  const { data, status } = useSession();

  return (
      {!data && (
        <> {/* サインイン中の表示 */}
          {status === 'loading' ? (
            <>Loading ...</>
          ) : (
            <> {/* サインイン前の表示 */}
              Not signed in <br />
              {/* サインインボタン */}
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {data && (
        <> {/* サインイン済の表示 */}
          Signed in as <img src={data.user?.image ?? ""} width="50px" />
            {data.user?.name} <br />
          AccessToken : {data.accessToken} <br />
          {/* サインアウトボタン */}
          <button onClick={() => signOut()}>Sign out</button>
          <div>
            {data.user?.email} <br />
            {data.expires}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
```
---
## 5. callbacks
認証関連の処理中に追加で処理をしたい場合に利用する。  
`[...nextauth].ts`に追加
```ts
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
}
```