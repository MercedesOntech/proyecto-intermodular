const db = require('../db/connection');

exports.getAll = (req,res)=>{
  db.query('SELECT * FROM film_has_director',(e,r)=>res.json(r));
};

exports.create = (req,res)=>{
  const { film_id, director_id } = req.body;

  db.query(
    'INSERT INTO film_has_director (film_id, director_id) VALUES (?,?)',
    [film_id, director_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  const { film_id, director_id } = req.body;

  db.query(
    'DELETE FROM film_has_director WHERE film_id=? AND director_id=?',
    [film_id, director_id],
    (e,r)=>res.json(r)
  );
};