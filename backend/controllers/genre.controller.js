const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM genre',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO genre (type) VALUES (?)',[req.body.type],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM genre WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};