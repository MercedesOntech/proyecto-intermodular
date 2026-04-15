const db = require('../db/connection');

exports.getAll = (req,res)=>{
  db.query('SELECT * FROM film_ticket_has_schedule',(e,r)=>res.json(r));
};

exports.create = (req,res)=>{
  const { film_ticket_id, schedule_id } = req.body;

  db.query(
    'INSERT INTO film_ticket_has_schedule (film_ticket_id, schedule_id) VALUES (?,?)',
    [film_ticket_id, schedule_id],
    (e,r)=>res.json(r)
  );
};

exports.delete = (req,res)=>{
  const { film_ticket_id, schedule_id } = req.body;

  db.query(
    'DELETE FROM film_ticket_has_schedule WHERE film_ticket_id=? AND schedule_id=?',
    [film_ticket_id, schedule_id],
    (e,r)=>res.json(r)
  );
};