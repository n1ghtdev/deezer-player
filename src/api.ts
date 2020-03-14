const API_ROOT = 'https://deezerdevs-deezer.p.rapidapi.com';

const headers = {
  'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  'x-rapidapi-key': '4bHgyOZGbfmshQy4RRvk8yltlP36p1SuZuRjsnus3KfQYCfg1N',
};

export async function searchByArtist(artist: string): Promise<any> {
  const url = `${API_ROOT}/search?q=${artist}`;
  const response = await fetch(url, {
    method: 'get',
    headers,
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json);
}

export async function loadSong(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'get',
  });

  if (response.ok) {
    const buffer = await response.arrayBuffer();
    return buffer;
  }

  const json = await response.json();

  console.error(json);
  throw new Error(json);
}
