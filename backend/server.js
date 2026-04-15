const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use('/actor', require('./routes/actor.routes'));
app.use('/bar_ticket', require('./routes/bar_ticket.routes'));
app.use('/chair_type', require('./routes/chair_type.routes'));
app.use('/chair', require('./routes/chair.routes'));
app.use('/director', require('./routes/director.routes'));
app.use('/film_has_actor', require('./routes/film_has_actor.routes'));
app.use('/film_has_director', require('./routes/film_has_director.routes'));
app.use('/film_has_genre', require('./routes/film_has_genre.routes'));
app.use('/film_ticket_has_schedule', require('./routes/film_ticket_has_schedule.routes'));
app.use('/film_ticket', require('./routes/film_ticket.routes'));
app.use('/film_type', require('./routes/film_type.routes'));
app.use('/film', require('./routes/film.routes'));
app.use('/genre', require('./routes/genre.routes'));
app.use('/product_has_bar_ticket', require('./routes/product_has_bar_ticket.routes'));
app.use('/product', require('./routes/product.routes'));
app.use('/room', require('./routes/room.routes'));
app.use('/schedule', require('./routes/schedule.routes'));
app.use('/tarjet', require('./routes/user_type.routes'));
app.use('/user_type', require('./routes/user_type.routes'));
app.use('/user', require('./routes/user.routes'));

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});