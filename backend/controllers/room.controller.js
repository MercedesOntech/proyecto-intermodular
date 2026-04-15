const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM room',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO room (name) VALUES (?)',[req.body.name],(e,r)=>res.json(r));
};