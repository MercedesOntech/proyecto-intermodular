const db = require('../db/connection');

exports.getAll = (req,res)=> db.query('SELECT * FROM user_type',(e,r)=>res.json(r));
exports.getById = (req,res)=> db.query('SELECT * FROM user_type WHERE id=?',[req.params.id],(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO user_type (id,name) VALUES (?,?)',[req.body.id,req.body.name],(e,r)=>res.json(r));
};

exports.update = (req,res)=>{
  db.query('UPDATE user_type SET name=? WHERE id=?',[req.body.name,req.params.id],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM user_type WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};