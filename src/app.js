import express from 'express';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';
import fs from 'fs'



const app = express();


// Handlebars setup
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
});
app.engine('handlebars', hbs.engine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

// Endpoints
app.use('/', viewsRouter);




const server = app.listen(8080, () => console.log('Server is running on port 8080'));

// Socket.io setup
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Connected');
});
