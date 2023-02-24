// Import modules
require("dotenv").config({ path: "./vars/.env" });
const mysql = require("mysql")
const fs = require("fs")
const bcrypt = require('bcrypt')

// Déstructuration des variables d'environement (process.env)
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

// Fichier .json
const dataFilm = fs.readFileSync('liste_films.json');
const jsonDataFilm = JSON.parse(dataFilm);
const dataSerie = fs.readFileSync('liste_series.json');
const jsonDataSerie = JSON.parse(dataSerie);
const dataGenreAnime = fs.readFileSync('genres_animes.json');
const jsonDataGenreAnime = JSON.parse(dataGenreAnime);
const dataAnime = fs.readFileSync('liste_animes.json');
const jsonDataAnime = JSON.parse(dataAnime);

/*
* Config mysql
***************/
let configDB = {
    host: DB_HOST, // localhost
    user: DB_USER, // user
    password: DB_PASSWORD, // password
    database: DB_NAME // nameDatabase
};

// Création de la connection avec les paramètres dans config.js
db = mysql.createConnection(configDB)

// Connexion a la db mysql
db.connect((err) => {
    if (err) console.error("error connecting: " + err.stack)
    console.log("connected as id " + db.threadId)
})

const salt = 10
bcrypt.hash('@test', salt, function (err, hash) {
    // Store hash in your password DB.
    db.query(`INSERT INTO users(firstname,lastname,email,password,username,is_admin,is_verified) VALUES
    ('Maxime','Ledus','ledusmaxime@gmail.com','${hash}','RhoFormeur',1,1);`, function (err, data) {
        if (err) throw err
        console.log('script INSERT INTO', data)
    })
    // Requete INSERT des donnee du fichier json
    for (const item of jsonDataFilm.results) {
        const sql = 'INSERT INTO articles (`id_article`,`title`,`release_date`,`overview`,`poster_path`,`type`)VALUES (?,?,DATE ?,?,?,?)'
        const values = [item.id, item.title, item.release_date, item.overview, item.poster_path, "movie"]
        db.query(sql, values, (err, data) => {
            if (err) console.log(err)
            console.log('script INSERT INTO', data)
        })
        for (const i of item.genre_ids) {
            const sql = 'INSERT INTO articles_genres (`id_article`,`id_genre`)VALUES (?,?)'
            const values = [item.id, i,]
            db.query(sql, values, (err, data) => {
                if (err) console.log(err)
                console.log('script INSERT INTO', data)
            })
        }
    }

    // Requete INSERT des donnee du fichier json
    for (const item of jsonDataSerie.results) {
        const sql = 'INSERT INTO articles (`id_article`,`title`,`release_date`,`overview`,`poster_path`,`type`)VALUES (?,?,DATE ?,?,?,?)'
        const values = [item.id, item.name, item.first_air_date, item.overview, item.poster_path, "serie"]
        db.query(sql, values, (err, data) => {
            if (err) console.log(err)
            console.log('script INSERT INTO', data)
        })
        for (const i of item.genre_ids) {
            const sql = 'INSERT INTO articles_genres (`id_article`,`id_genre`)VALUES (?,?)'
            const values = [item.id, i,]
            db.query(sql, values, (err, data) => {
                if (err) console.log(err)
                console.log('script INSERT INTO', data)
            })
        }
    }
})



// // Requete INSERT des donnee du fichier json
// for (const item of jsonDataGenreAnime.data) {
//     const sql = 'INSERT INTO genres_animes (`id_genre_anime`,`name`)VALUES (?,?)'
//     const values = [item.mal_id, item.name]
//     db.query(sql, values, (err, data) => {
//         if (err) console.log(err)
//         console.log('script INSERT INTO', data)
//     })
// }

// // Requete INSERT des donnee du fichier json
// for (const item of jsonDataAnime.data) {
//     const sql = 'INSERT INTO animes (`id_anime`,`title`,`release_date`,`overview`,`poster_path`,`id_user`)VALUES (?,?,DATE ?,?,?,?,?)'
//     const values = [item.mal_id, item.title, item.year, item.synopsis, item.images.jpg.image_url,1]
//     db.query(sql, values, (err, data) => {
//         if (err) console.log(err)
//         console.log('script INSERT INTO', data)
//     })
//     for (const i of item.genres) {
//         const sql = 'INSERT INTO animes_genres_animes (`id_anime`,`id_genre_anime`)VALUES (?,?)'
//         const values = [item.mal_id, i.mal_id]
//         db.query(sql, values, (err, data) => {
//             if (err) console.log(err)
//             console.log('script INSERT INTO', data)
//         })
//     }
// }