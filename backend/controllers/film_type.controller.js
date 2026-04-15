const db = require('../db/connection');

// GET ALL
exports.getAll = (req, res) => {
  db.query('SELECT * FROM film_type', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// GET BY ID
exports.getById = (req, res) => {
  db.query('SELECT * FROM film_type WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// CREATE
exports.create = (req, res) => {
  const { type } = req.body;

  db.query(
    'INSERT INTO film_type (type) VALUES (?)',
    [type],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Film type creado' });
    }
  );
};

// UPDATE
exports.update = (req, res) => {
  const { type } = req.body;

  db.query(
    'UPDATE film_type SET type=? WHERE id=?',
    [type, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Film type actualizado' });
    }
  );
};

// DELETE
exports.delete = (req, res) => {
  db.query(
    'DELETE FROM film_type WHERE id=?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Film type eliminado' });
    }
  );
};