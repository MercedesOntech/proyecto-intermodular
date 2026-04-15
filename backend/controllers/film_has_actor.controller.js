const db = require('../db/connection');

// GET ALL
exports.getAll = (req,res)=>{
  db.query('SELECT * FROM film_has_actor',(e,r)=>res.json(r));
};

// ADD
exports.create = (req,res)=>{
  const { film_id, actor_id } = req.body;

  db.query(
    'INSERT INTO film_has_actor (film_id, actor_id) VALUES (?,?)',
    [film_id, actor_id],
    (e,r)=>res.json(r)
  );
};

// DELETE
exports.delete = (req,res)=>{
  const { film_id, actor_id } = req.body;

  db.query(
    'DELETE FROM film_has_actor WHERE film_id=? AND actor_id=?',
    [film_id, actor_id],
    (e,r)=>res.json(r)
  );
};