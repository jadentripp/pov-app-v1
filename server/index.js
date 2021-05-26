require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

//Controllers
const authCtrl = require('./controllers/authcontroller')
const qCtrl = require('./controllers/questioncontroller')
const povCtrl = require('./controllers/povcontroller')

const app = express();

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db =>{
  app.set('db', db)
  console.log("Database Connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))


//endpoints (auth)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.getUser)
//endpoints (questions)
app.post('/question/create', qCtrl.createQuestion)
app.get('/question/get', qCtrl.getQuestions)
//endpoints (pov)
app.post('/pov/create', povCtrl.createPov)
app.post('/pov/delete', povCtrl.deletePov)
app.get('/api/get', povCtrl.getPovs)