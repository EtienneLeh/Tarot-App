<?php
// Récupérer les données de la requête AJAX
// La BDD est de la forme CREATE TABLE IF NOT EXISTS Tarot_historique(id integer PRIMARY KEY AUTOINCREMENT, attaquant TEXT, appelé TEXT, Resultat TEXT NOT NULL, Contrat TEXT NOT NULL, Part integer NOT NULL,  Joueur1 text NOT NULL, Joueur2 text TEXT,Joueur3 TEXT,date TEXT)'
$attaquant = $_POST['attaquant'];
$appele = $_POST['appele'];
$result = $_POST['Resultat'];
$contrat = $_POST['Contrat_Type'];
$part = $_POST['part'];
$joueur1 = $_POST['joueur1'];
$joueur2 = $_POST['joueur2'];
$joueur3 = $_POST['joueur3'];
$date_partie = $_POST['date_partie'];

$db = new SQLite3('history.db');
$db->exec("INSERT INTO games (attaquant, appele, result, contrat, part, joueur1, joueur2, joueur3, date_partie) VALUES ('$attaquant', '$appele', '$result', '$contrat', $part, '$joueur1', '$joueur2', '$joueur3', '$date_partie')");
echo 'Game result saved successfully';
?>
