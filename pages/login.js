import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full space-y-4">
      <h1>Login Page</h1>
      <div className="text-center">
        <p>We need your permission to access your Spotify data in order to create the visualization.</p>
        <p>So please login with your account.</p>
      </div>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-green-500 text-white p-5 rounded-md"
            onClick={() => signIn(provider.id, { callbackUrl: "/app" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
