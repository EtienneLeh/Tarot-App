function calculatePoints() {
    // Récupérer les données de l'interface utilisateur
    const playerName1 = document.getElementById('playerName1').value;
    const playerName2 = document.getElementById('playerName2').value;
    const playerName3 = document.getElementById('playerName3').value;
    const playerName4 = document.getElementById('playerName4').value;
    const playerName5 = document.getElementById('playerName5').value;


    // Récupérer le contrat sélectionné
    const contratType = document.getElementById('contratType').value;

    // Récupérer l'attaquant et l'appelé en utilisant une fonction
    const attaquant = getJoueurAttaquant();
    const appelé = getJoueurAppelé();

    // Récupérer le nombre de bouts sécurisés par l'attaque
    const nb_bouts_attaque = document.getElementById('nb_bouts_attaque').value;

    // Récupérer le nombre de points de l'attaque
    const nb_points_attaque = document.getElementById('nb_points_attaque').value;

    alert(`Attaquant: ${attaquant}, Appelé: ${appelé}, Contrat: ${contratType}, Bouts: ${nb_bouts_attaque}, Points: ${nb_points_attaque}`);

    // Vérifier si l'attaquant et l'appelé sont sélectionnés
    if (attaquant && appelé) {
        // Appliquer la logique de comptage des points en fonction du contrat
        let objectifPoints;


        if (nb_bouts_attaque === '0') {
            objectifPoints = 56;
        } else if (nb_bouts_attaque === '1') {
            objectifPoints = 51;
        } else if (nb_bouts_attaque === '2'){
            objectifPoints = 41;
        } else if (nb_bouts_attaque === '3'){
            objectifPoints = 36;
        }
         else {
            alert('Nombre de bouts invalide.')
         }

        // Multiplicateur de points lié au contrat
        let Multiplicateur_contrat;
         let resultat_part;

        if (contratType=='Petite' ) {
            Multiplicateur_contrat=1
        } else if (contratType=='Garde' ) {
            Multiplicateur_contrat=2
        } else if (contratType=='GardeSans' ) {
            Multiplicateur_contrat=4
        } else if (contratType=='GardeContre' ) {
            Multiplicateur_contrat=6
        } 

        // Récupérer les points gagnés ou perdus par l'attaque
        const differencePoints = (nb_points_attaque - objectifPoints);

        if (differencePoints<0) {
            resultat_part=Multiplicateur_contrat*((nb_points_attaque - objectifPoints)-25)
        } else {
            resultat_part=(Multiplicateur_contrat*(nb_points_attaque - objectifPoints)+25)
        }

        // Afficher les résultats
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>${attaquant} a joué comme attaquant et ${appelé} comme appelé.</p>`;
        resultDiv.innerHTML += `<p>Résultat de l'attaque : ${differencePoints < 0 ? `Perdu chutée de ${-differencePoints}` : `Gagnée, faite de ${differencePoints}`}</p>`;
        resultDiv.innerHTML += `<p>Part de points gagnés ou perdus : ${resultat_part}</p>`;

        let Resultat_Attaque;

        Resultat_Attaque=differencePoints < 0 ? `Perdu` : `Gagné`
        saveGameResult(attaquant,appelé,Resultat_Attaque,contratType,resultat_part,null,null,null,null)

    } else {
        // Afficher un message d'erreur si l'attaquant ou l'appelé n'est pas sélectionné
        alert('Veuillez sélectionner un attaquant et un appelé.');
    }
}



// Fonction appelée avec le bouton d'enregistrement, qui met la partie dans la base de données, puis qui renvoie un message en cas de succès
// Format de la bdd Tarot_historique(id integer PRIMARY KEY AUTOINCREMENT, attaquant TEXT, appelé TEXT, Resultat TEXT NOT NULL, Contrat TEXT NOT NULL, Part integer NOT NULL,  Joueur1 text NOT NULL, Joueur2 text TEXT,Joueur3 TEXT,date TEXT)')
function saveGameResult (attaquant, appele, Resultat,Contrat_Type,part,joueur1,joueur2,joueur3,date_partie) {
     // Créer un objet XMLHttpRequest pour effectuer une requête AJAX
    const xhr = new XMLHttpRequest();

    // Configurer la requête
    xhr.open('POST', 'save_game.php', true);

    // Définir l'en-tête de la requête pour spécifier le type de contenu
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Historique de la partie enregistré avec succès!');
            // Afficher une alerte pour préciser le succes de l'enregistrement
            alert('Partie enregistrée !');
        }
    };
    xhr.send(`attaquant=${attaquant}&appele=${appele}&result=${Resultat}&Contrat_Type=${Contrat_Type}&part=${part}&joueur1=${joueur1}&joueur2=${joueur2}&joueur3=${joueur3}$date_partie=${date_partie}`);
}

// Fonction pour récupérer le joueur sélectionné dans le groupe radio
function getSelectedPlayer(groupName) {
    const radioButtons = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    return radioButtons.length > 0 ? document.querySelector(`label[for="${radioButtons[0].id}"]`).textContent : null;
}

// Fonction qui récupère la sélection du joueur appelé
function getJoueurAppelé() {
    var joueursAppelé = document.getElementsByName("appelé");

    for (var i = 0; i < joueursAppelé.length; i++) {
        if (joueursAppelé[i].checked) {
            var joueurAppeléId = joueursAppelé[i].id.slice(-1); // Récupère le numéro de joueur
            var playerNameInput = document.getElementById("playerName" + joueurAppeléId);
            var playerName = playerNameInput.value;
            return playerName;
        }
    }

    // Si aucun joueur appelé n'est sélectionné
    alert("Veuillez sélectionner un joueur appelé.");
    return null;
}

// Fonction qui récupère la sélection du joueur attaquant
function getJoueurAttaquant() {
    var joueursAttaquants = document.getElementsByName("attaquant");

    for (var i = 0; i < joueursAttaquants.length; i++) {
        if (joueursAttaquants[i].checked) {
            var joueurAttaquantId = joueursAttaquants[i].id.slice(-1); // Récupère le numéro de joueur
            var playerNameInput = document.getElementById("playerName" + joueurAttaquantId);
            var playerName = playerNameInput.value;
            return playerName;
        }
    }

    // Si aucun joueur appelé n'est sélectionné
    alert("Veuillez sélectionner un joueur appelé.");
    return null;
}