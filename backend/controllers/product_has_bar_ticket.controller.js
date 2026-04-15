const db = require('../db/connection');

exports.getAll = (req,res)=>{
  db.query('SELECT * FROM product_has_bar_ticket',(e,r)=>res.json(r));
};

exports.create = (req,res)=>{
  const { product_id, bar_ticket_id } = req.body;

  db.query(
    'INSERT INTO product_has_bar_ticket (product_id, bar_ticket_id) VALUES (?,?)',
    [product_id, bar_ticket_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  const { product_id, bar_ticket_id } = req.body;

  db.query(
    'DELETE FROM product_has_bar_ticket WHERE product_id=? AND bar_ticket_id=?',
    [product_id, bar_ticket_id],
    (e,r)=>res.json(r)
  );
};