interface Artist {
  id: string;
  name: string;
  genre: string;
  stage: string;
}

interface Stage {
  id: string;
  name: string;
  genres: Array<string>;
}

function assignStages(artists: Artist[], stages: Stage[]) {
    for (let stage of stages) {
      for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
          artist.stage = stage.id;
          break;
        }
      }
    }
  }

function assignStagesMemo(artists: Artist[], stages: Stage[]) {
    // Créer un Map qui associe chaque genre à l'ID de sa scène
    const genreToStage = new Map<string, string>();
    
    // Remplir le Map avec les associations genre -> scène
    for (const stage of stages) {
        for (const genre of stage.genres) {
            genreToStage.set(genre, stage.id);
        }
    }

    // Assigner la scène à chaque artiste en utilisant le Map
    for (const artist of artists) {
        const stageId = genreToStage.get(artist.genre);
        if (stageId) {
            artist.stage = stageId;
        }
    }
}

function testAssignStages() {
  // Création des données de test avec un très grand nombre de scènes
  const testStages: Stage[] = Array.from({ length: 10000 }, (_, i) => ({
    id: `stage${i}`, 
    name: `Stage ${i}`,
    // Un seul genre par scène pour maximiser la recherche
    genres: [`Genre${i}`]
  }));

  // Création d'artistes avec le dernier genre possible
  // Pour forcer l'algorithme à parcourir toutes les scènes avant de trouver la bonne
  const testArtists: Artist[] = Array.from({ length: 20000 }, (_, i) => ({
    id: i.toString(),
    name: `Artist${i}`,
    // Utiliser le dernier genre possible pour le pire cas
    genre: `Genre${99999}`,
    stage: ''
  }));

  // Mesure du temps d'exécution
  console.log('=== Début des tests ===');
  console.log(`Nombre d'artistes: ${testArtists.length}`);
  console.log(`Nombre de scènes: ${testStages.length}`);

  const startTime = performance.now();
  assignStagesMemo(testArtists, testStages);
  const endTime = performance.now();
  console.log(`Temps d'exécution: ${(endTime - startTime).toFixed(2)}ms`);

  console.log('=== Fin des tests ===');
}

// Exécution du test
testAssignStages();
  
