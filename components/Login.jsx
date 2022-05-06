 const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=8e94bde7ddb84a1f7a0e51bf3bc95be8&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing%20user-top-read"

export default function Login() {
  return (
    <a className="flex justify-center items-center w-fit bg-green-500 px-4 py-2 rounded-md" href={AUTH_URL}>
      Login With Spotify
    </a>
  )
}