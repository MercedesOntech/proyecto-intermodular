const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM product',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO product (name,price) VALUES (?,?)',
  [req.body.name,req.body.price],(e,r)=>res.json(r));
};

exports.update = (req,res)=>{
  db.query('UPDATE product SET name=?,price=? WHERE id=?',
  [req.body.name,req.body.price,req.params.id],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM product WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};