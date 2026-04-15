const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM chair',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  const { film_ticket_id, chair_type_id } = req.body;
  db.query(
    'INSERT INTO chair (film_ticket_id,chair_type_id) VALUES (?,?)',
    [film_ticket_id,chair_type_id],
    (e,r)=>res.json(r)
  );
};