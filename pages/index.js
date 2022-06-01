import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import MusicDisc from "../components/MusicDisc";


export default function Home() {
  const { data: session } = useSession();
  const [playlistsList, setPlaylistsList] = useState([]);
  const [topArtistsList, setTopArtistsList] = useState([]);
  const [topTracksList, setTopTracksList] = useState([]);
  const [topPlaylistList, setTopPlaylistList] = useState([]);
  const [valence, setValence] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [data, setData] = useState(null);



  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setPlaylistsList(items);
    console.log(items);
  };

  const getMyTopArtists = async () => {
    const res = await fetch("/api/topartists");
    const { items } = await res.json();
    setTopArtistsList(items);
    console.log(items);
  };

  const getMyTopTracks = async () => {
    const res = await fetch("/api/toptracks");
    const { items } = await res.json();
    setTopTracksList(items);
    console.log(items);
  };

  const getMyTopPlaylists = async () => {
    const res = await fetch("/api/search");
    const { items } = await res.json();
    setTopPlaylistList(items);
  };

  useEffect(() => {
    console.log(topPlaylistList);
    if (topPlaylistList.length > 0) {
      setValence(topPlaylistList[0].features.valence);
      setEnergy(topPlaylistList[0].features.energy);
      setData(topPlaylistList[0])
      console.log("valence: " + valence, "energy: " + energy);
    }
  });

  if (session) {
    return (
      <div className="m-4 space-y-4">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="A Taste of Music" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex justify-between">
          <p>Signed in as {session?.token?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-fit cursor-pointer"
          >
            Sign out
          </button>
        </div>
        <hr />
        <div className="flex gap-4">
          <button className="text-gray-500" onClick={() => getMyPlaylists()}>
            Get all my playlists
          </button>
          <button className="text-gray-500" onClick={() => getMyTopArtists()}>
            Get all my topartists
          </button>
          <button className="text-gray-500" onClick={() => getMyTopTracks()}>
            Get all my toptracks
          </button>
          <button onClick={() => getMyTopPlaylists()}>
            Get all my top playlists
          </button>
        </div>
        <div className="flex justify-center">
                      { (valence && energy) && <MusicDisc data={data} valence={valence} energy={energy} size={600} maxDomain={100} innerRadiusSize={100} numBars={50} /> }
{/*           <BarChart size={600} maxDomain={100} innerRadiusSize={100} numBars={50} /> */}
{/*           <GenreOverlay data={data} valence={valence} energy={energy} />
 */}
{/*           <RadialChart />
 */}        </div>
        <div className="flex gap-4">
          <div className="space-y-4">
            {playlistsList.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={96}
                  height={96}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {topArtistsList.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={96}
                  height={96}
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {topTracksList.map((item) => (
              <div key={item.id}>
                <p className="font-bold">{item.name}</p>
                {item.artists.map((artist) => (
                  <span className="mr-2" key={artist.id}>
                    {artist.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="m-4 space-y-4">
      Not signed in <br />
      <p className="text-md font-bold">Discover your taste in music visualized</p>
      <p>Please note: In order to create the visualization we need your permission to access your Spotify data.</p>
      <button
        onClick={() => signIn("spotify")}
        className="bg-green-500 text-white px-4 py-2 rounded-md w-fit cursor-pointer"
      >
        Discover
      </button>
    </div>
  );
  console.log(SVGRef);
}
