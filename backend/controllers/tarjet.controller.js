const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM tarjet',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  const { number, money, expiry } = req.body;
  db.query('INSERT INTO tarjet (number,money,expiry) VALUES (?,?,?)',
  [number,money,expiry],(e,r)=>res.json(r));
};

exports.update = (req,res)=>{
  const { money } = req.body;
  db.query('UPDATE tarjet SET money=? WHERE id=?',[money,req.params.id],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM tarjet WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};