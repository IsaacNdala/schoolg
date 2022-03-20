// IMPORTING PACKETS
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');

const port = process.env.PORT || 300

// IMPORTING PAIGES
const errController = require('./controllers/404');
const models = require('./models/main-model');
const User = require('./models/user');
const Funcionario = require('./models/funcionario');
const Funcao = require('./models/funcao');
const routes = require('./routes/main-route');
const db = require('./database/db');

// REGISTERS 
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const accessLog = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' })

app.use(compression());
app.use(morgan('combined', { stream: accessLog }));

// SESSION
app.use(
    session({
        secret: 'thi$block&d4you',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// MEDDLEWARE
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            return req.user = user;
        }).then(result => {
            return Funcionario.findAll({ where: { email: req.session.user.email } });
        }).then(fun => {
            req.fun = fun[0];
            Funcao.findByPk(fun[0].funcaoId)
                .then(funcao => {
                    req.funcao = funcao;
                    next();
                }).catch((err) => console.log(err));
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.msgSuccess = req.flash('msgSuccess');
    res.locals.msgError = req.flash('msgError');
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.loggedUser = req.user;
    res.locals.loggedFun = req.fun;
    res.locals.loggedFuncao = req.funcao;
    next();
});

// ROUTES
app.use(routes);
app.use(errController.get404);

db
    // .sync({force: true})
    .sync()
    .then((result) => {
        app.listen(port);
    }).catch((err) => {
        console.log(err);
    });