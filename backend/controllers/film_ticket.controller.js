const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM film_ticket',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  const { dateTicket,user_id,film_id } = req.body;
  db.query(
    'INSERT INTO film_ticket (dateTicket,user_id,film_id) VALUES (?,?,?)',
    [dateTicket,user_id,film_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM film_ticket WHERE id=?',[req.params.id],(e,r)=>res.json(r));
};