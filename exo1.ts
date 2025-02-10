interface Artist1 {
    id: string;
    name: string;
  }
  

  //Premier essai mais moins performant que le script de base
  // function findArtistIndex(artists: Artist[], name: string) {
  //   const artist = artists.find(artist => artist.name.includes(name));
  //   return artist ? artist.id : -1;
  // }

  //Deuxième essai avec une recherche binaire cela réduit le temps d'exécution grace au fait
  // que l'on divise par 2 le nombre d'artiste à chercher a chaque itération en revanche c'est 
  // efficace que dans le cas d'une liste triée

  function findArtistIndex(artists: Artist1[], name: string) {
    let left = 0;
    let right = artists.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (artists[mid].name === name) {
        return artists[mid].id;
      }
      
      if (artists[mid].name < name) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return -1;
  }

function createLargeArtistList(): Artist1[] {
  const artists: Artist1[] = [];
  for (let i = 0; i < 10000000; i++) {
    artists.push({ id: i.toString(), name: "Alice Alice" });
  }
  artists.push({ id: "10000001", name: "Zack Wilson" });
  return artists;
}

const artists = createLargeArtistList();


function testFindArtistIndex() {
    const startTime = performance.now();
    const result = findArtistIndex(artists, "Zack Wilson");
    const endTime = performance.now();
    console.log(`Résultat: ${result}, Temps d'exécution: ${endTime - startTime}ms`);
  }

  testFindArtistIndex();