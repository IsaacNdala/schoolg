const Funcionario = require('../models/funcionario');
const Funcao = require('../models/funcao');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getPerfil = (req, res, next) => {
    res.render('perfil/perfil', {
        pageTitle: 'Perfil',
        path: '/perfil',
    });
}

exports.editInfoPessoal = (req, res, next) => {
    const funId = req.body.funId;
    const nome = req.body.nome;
    const dtNascimento = req.body.dtNascimento;
    const sexo = req.body.sexo;
    const codBi = req.body.codBi;
    const endereco = req.body.endereco;

    let anoNascimento = dtNascimento[0] + dtNascimento[1] + dtNascimento[2] + dtNascimento[3];
    let anoActual = new Date().getFullYear();

    let idade = anoActual - +anoNascimento;

    if (idade < 18) {
        req.flash('msgError', 'Falha ao editar! Com ' + idade + ' ano(s) é menor de idade');
        return res.redirect('/perfil');
    }

    Funcionario.findAll({ where: { codBi: codBi } })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! Já existe um funcionário com o mesmo número do Bilhete!');
                return res.redirect('/perfil');
            }
            return Funcionario.findByPk(funId);
        }).then(fun => {
            fun.nome = nome;
            if (dtNascimento.length > 0) {
                fun.dtNascimento = dtNascimento;
            }
            fun.sexo = sexo;
            fun.codBi = codBi;
            fun.endereco = endereco;
            return fun.save();
        }).then(result => {
            req.flash('msgSuccess', 'Editado com sucesso!');
            res.redirect('/perfil');
        }).catch(err => console.log(err));
}

exports.editInfoProfissional = (req, res, next) => {
    const funId = req.body.funId;
    const numConta = req.body.numConta;

    Funcionario.findAll({ where: { numConta: numConta } })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! Já existe um funcionário com o mesmo número da Conta Bancária!');
                return res.redirect('/perfil');
            }
            return Funcionario.findByPk(funId);
        }).then(fun => {
            fun.numConta = numConta;
            return fun.save();
        }).then(result => {
            req.flash('msgSuccess', 'Editado com sucesso!');
            res.redirect('/perfil');
        }).catch(err => console.log(err));
}

exports.editContactos = (req, res, next) => {
    const funId = req.body.funId;
    const telefone = req.body.telefone;
    const email = req.body.email;

    Funcionario.findAll({ where: { telefone: telefone } })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! Já existe um funcionário com o mesmo número de Telefone!');
                return res.redirect('/perfil');
            }
            return Funcionario.findAll({ where: { email: email } });
        }).then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! Já existe um funcionário com o mesmo e-mail!');
                return res.redirect('/perfil');
            }
            return Funcionario.findByPk(funId)
        }).then(fun => {
            User.findAll({ where: { email: fun.email } })
                .then(user => {
                    user[0].email = fun.email;
                    user[0].save();
                }).catch(err => console.log(err));

            fun.telefone = telefone;
            fun.email = email;
            req.session.user.email = email;
            return fun.save();
        }).then(result => {
            req.flash('msgSuccess', 'Editado com sucesso!');
            res.redirect('/perfil');
        }).catch(err => console.log(err));
}

exports.editPassword = (req, res, next) => {
    const userPassword = req.body.userPassword;
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    bcrypt.compare(oldPassword, userPassword)
        .then(match => {
            if (!match) {
                req.flash('msgError', 'Falha ao editar! Senha actual está incorrecta!');
                return res.redirect('/perfil');
            }
            if (password !== confirmPassword) {
                req.flash('msgError', 'Falha ao editar! Primeira senha é diferente da segunda!');
                return res.redirect('/perfil');
            }

            User.findByPk(userId).then(user => {
                bcrypt.hash(password, 12)
                    .then(hashPassword => {
                        console.log('user.password: ' + user.password)
                        user.password = hashPassword;
                        return user.save();
                    }).then(result => {
                        req.flash('msgSuccess', 'Senha editada com sucesso!');
                        res.redirect('/perfil');
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch (err => console.log(err));
}