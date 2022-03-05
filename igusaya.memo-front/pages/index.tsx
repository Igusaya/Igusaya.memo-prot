import { signIn, signOut, useSession } from 'next-auth/react';

const Home = () => {
  const { data, status } = useSession();

  return (
    <>
      {!data && (
        <>
          {status === 'loading' ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </>
      )}
      {data && (
        <>
          Signed in as <img src={data.user?.image ?? ""} width="50px" />
            {data.user?.name} <br />
          AccessToken : {data.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <div>
            {data.user?.email}
            {data.expires}
          </div>
        </>
      )}
    </>
  );
};

export default Home;