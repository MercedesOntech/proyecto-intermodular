const db = require('../db/connection');

exports.getAll = (req,res)=>db.query('SELECT * FROM schedule',(e,r)=>res.json(r));

exports.create = (req,res)=>{
  db.query('INSERT INTO schedule (timeSchedule) VALUES (?)',[req.body.timeSchedule],(e,r)=>res.json(r));
};