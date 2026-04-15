const db = require('../db/connection');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM user', (err, r) => res.json(r));
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM user WHERE id=?', [req.params.id], (err, r) => res.json(r));
};

exports.create = (req, res) => {
  const { name, email, age, password, user_type_id, tarjet_id } = req.body;
  db.query(
    'INSERT INTO user (name,email,age,password,user_type_id,tarjet_id) VALUES (?,?,?,?,?,?)',
    [name,email,age,password,user_type_id,tarjet_id],
    (err,r)=>res.json(r)
  );
};

exports.update = (req,res)=>{
  const { name,email,age } = req.body;
  db.query('UPDATE user SET name=?,email=?,age=? WHERE id=?',
  [name,email,age,req.params.id],(err,r)=>res.json(r));
};

exports.delete = (req,res)=>{
  db.query('DELETE FROM user WHERE id=?',[req.params.id],(err,r)=>res.json(r));
};