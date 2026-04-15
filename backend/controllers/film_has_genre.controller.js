const db = require('../db/connection');

exports.getAll = (req,res)=>{
  db.query('SELECT * FROM film_has_genre',(e,r)=>res.json(r));
};

exports.create = (req,res)=>{
  const { film_id, genre_id } = req.body;

  db.query(
    'INSERT INTO film_has_genre (film_id, genre_id) VALUES (?,?)',
    [film_id, genre_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  const { film_id, genre_id } = req.body;

  db.query(
    'DELETE FROM film_has_genre WHERE film_id=? AND genre_id=?',
    [film_id, genre_id],
    (e,r)=>res.json(r)
  );
};