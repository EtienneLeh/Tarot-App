const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('history.db');

// Créer la table si elle n'existe pas
db.run('CREATE TABLE IF NOT EXISTS Tarot_historique(id integer PRIMARY KEY AUTOINCREMENT, attaquant TEXT, appelé TEXT, Resultat TEXT NOT NULL, Contrat TEXT NOT NULL, Part integer NOT NULL,  Joueur1 text NOT NULL, Joueur2 text TEXT,Joueur3 TEXT,date TEXT)');
module.exports = db;