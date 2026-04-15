const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM film',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  const { name,description,releaseDate,room_id,film_type_id } = req.body;
  db.query(
    'INSERT INTO film (name,description,releaseDate,room_id,film_type_id) VALUES (?,?,?,?,?)',
    [name,description,releaseDate,room_id,film_type_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM film WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};