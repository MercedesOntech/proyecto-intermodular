const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM actor',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO actor (name) VALUES (?)',[req.body.name],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM actor WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};