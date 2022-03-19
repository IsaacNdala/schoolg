const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    let emailValue = req.flash('emailValue');
    if (emailValue.length > 0) {
        emailValue = emailValue[0];
    } else {
        emailValue = null;
    }
    res.render('login', {
        pageTitle: 'Login',
        path: '/login',
        emailValue: emailValue
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({where: {email: email}})
        .then(user => {
            if(!user[0]){
                req.flash('msgError', 'Sem usário com este e-mail!');
                return res.redirect('/login');
            }
            const fetchedUser = user[0];
            return bcrypt.compare(password, fetchedUser.password)
                .then(match => {
                    if(match){
                        req.session.isLoggedIn = true;
                        req.session.user = fetchedUser;
                        return res.redirect('/');
                    }
                    req.flash('msgError', 'Senha Errada!');
                    req.flash('emailValue', fetchedUser.email);
                    return res.redirect('/login');
                })
                .catch(err => console.log(err));
        })
        .catch((err) =>  console.log(err));
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
      res.redirect('/login');
    });
};