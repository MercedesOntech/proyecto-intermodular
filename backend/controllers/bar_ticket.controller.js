const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM bar_ticket',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO bar_ticket (dateTicket,user_id) VALUES (?,?)',
  [req.body.dateTicket,req.body.user_id],(e,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM bar_ticket WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};