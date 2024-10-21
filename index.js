// Importeren van de express module in node_modules
const express = require('express');
const Database = require('./classes/database.js');

// Aanmaken van een express app
const app = express();

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// artists
app.get('/api/artists', (req, res) => {
    const db = new Database();
    db.getQuery('SELECT * FROM artists').then((artist) => {
        res.send(artist);
    });
});

// songs
app.get('/api/songs', (req, res) => {
    const db = new Database();
    db.getQuery(`
        SELECT
            song_id, s.name AS songname, a.name AS artistname
        FROM
            songs AS s
                INNER JOIN
                    artists AS a
                        ON
                            s.artist_id = a.artist_id;
    `).then((songs) => {
        res.send(songs);
    });
});

// voting
app.get('/api/ranking', (req, res) => {
    const db = new Database();
    db.getQuery(`
        SELECT v.song_id AS Song_Id, s.name AS Song_Name, a.name AS Artist_Name, SUM(points) AS Total_Points
        FROM 
            votes AS v
	            INNER JOIN songs AS s
		            ON v.song_id = s.song_id
	            INNER JOIN artists AS a
                    ON s.artist_id = a.artist_id
        GROUP BY v.song_id
        ORDER BY SUM(points) DESC;
    `).then((ranking) => {
        res.send(ranking);
    });
});

// Starten van de server en op welke port de server moet luistere
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});