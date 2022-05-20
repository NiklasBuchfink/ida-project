import Head from 'next/head'
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import MusicDisc from "../components/MusicDisc";


export default function Home() {
  const { data: session } = useSession();
  const [playlistsList, setPlaylistsList] = useState([]);
  const [topArtistsList, setTopArtistsList] = useState([]);
  const [topTracksList, setTopTracksList] = useState([]);
  const [topPlaylistList, setTopPlaylistList] = useState([]);
  const [valence, setValence] = useState(null);
  const [energy, setEnergy] = useState(null);

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    setPlaylistsList(items);
    console.log(items)
  };

  const getMyTopArtists = async () => {
    const res = await fetch('/api/topartists');
    const { items } = await res.json();
    setTopArtistsList(items);
    console.log(items)
  };

  const getMyTopTracks = async () => {
    const res = await fetch('/api/toptracks');
    const { items } = await res.json();
    setTopTracksList(items);
    console.log(items)
  };

  const getMyTopPlaylists = async () => {
    const res = await fetch('/api/search')
    const { items } = await res.json()
    setTopPlaylistList(items); 
  }

  useEffect(() => {
    console.log(topPlaylistList);
    if (topPlaylistList.length > 0) {
      setValence(topPlaylistList[0].features.valence)
      setEnergy(topPlaylistList[0].features.energy)
      console.log('valence: ' + valence, 'energy: ' + energy);
    }
  })

  if (session) {
    return (
      <div className="m-4 space-y-4">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="A Taste of Music" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        Signed in as {session?.token?.email} <br />
        <button  onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-md w-fit cursor-pointer">Sign out</button>
        <hr />
        <div className="flex gap-4">
          <button onClick={() => getMyPlaylists() }>Get all my playlists</button>
          <button onClick={() => getMyTopArtists() }>Get all my topartists</button>
          <button onClick={() => getMyTopTracks() }>Get all my toptracks</button>
          <button onClick={() => getMyTopPlaylists() }>Get all my top playlists</button>
        </div>
        <div className="flex justify-center">
          { (valence && energy) && <MusicDisc valence={valence} energy={energy} /> }
        </div>
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
                <p className='font-bold'>{item.name}</p>
                {item.artists.map((artist) => <span className='mr-2' key={artist.id}>{artist.name}</span>)}
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
      <button onClick={() => signIn()} className="bg-green-500 text-white px-4 py-2 rounded-md w-fit cursor-pointer">Sign in</button>
    </div>
  );
}