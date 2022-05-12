import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Main from "../components/Main";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <div className="m-4 space-y-6">
      <div className="flex justify-between">
        <h1>App Page</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-fit"
        >
          Logout
        </button>
      </div>
      <Main />
    </div>
  );
}