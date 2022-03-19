const Encarregado = require('../models/encarregado');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getEncarregados = (req, res, next) => {
    Encarregado.findAll()
        .then(encarregados => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('encarregado/encarregados', {
                                pageTitle: 'Encarregados',
                                path: '/encarregados',
                                encarregados: encarregados,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addEncarregado = (req, res, next) => {
    const nome = req.body.nome;
    const parentesco = req.body.parentesco;
    const telefone = req.body.telefone;
    const email = req.body.email;

    Encarregado.findAll({where: {telefone: telefone}})
        .then(encarregados => {
            if(encarregados[0]){
                req.flash('msgError', 'Erro ao cadastrar! Já existe um encarregado com este nº de telefone: ' + encarregados[0].telefone );
                return res.redirect('/encarregados');
            }
            return Encarregado.findAll({where: {telefone: email}});
        }).then(encarregados => {
            if(encarregados[0]){
                req.flash('msgError', 'Erro ao cadastrar! Já existe um encarregado com este email: ' + encarregados[0].email );
                return res.redirect('/encarregados');
            }
            return req.user.createEncarregado({
                nome: nome,
                parentesco: parentesco,
                telefone: telefone,
                email: email
            });
        }).then(result => {
            req.flash('msgSuccess', 'Encarregado cadastrado com sucesso!');
            res.redirect('/encarregados');
        }).catch(err => console.log(err));
}

exports.getEditEncarregado = (req, res, next) => {
    const encarregadoId = req.body.encarregadoId;

    Encarregado.findByPk(encarregadoId)
        .then(encarregado => {
            res.render('encarregado/edit-encarregado', {
                pageTitle: 'Editar Encarregado',
                path: '/encarregados',
                encarregado: encarregado
            });
        }).catch(err => console.log(err));
}

exports.editEncarregado = (req, res, next) => {
    const encarregadoId = req.body.encarregadoId;
    const nome = req.body.nome;
    const parentesco = req.body.parentesco;
    const telefone = req.body.telefone;
    const email = req.body.email;

    Encarregado.findAll({where: {telefone: telefone}})
        .then(encarregados => {
            if(encarregados.length > 1){
                req.flash('msgError', 'Erro ao editar! Já existe um encarregado com este nº de telefone: ' + telefone )
                return res.redirect('/encarregados');
            }
            return Encarregado.findAll({where: {telefone: email}});
        }).then(encarregados => {
            if(encarregados.length > 1){
                req.flash('msgError', 'Erro ao editar! Já existe um encarregado com este email: ' + email )
                return res.redirect('/encarregados');
            }
            return Encarregado.findByPk(encarregadoId);
        }).then(encarregado => {
            encarregado.nome = nome;
            encarregado.parentesco = parentesco;
            encarregado.telefone = telefone;
            encarregado.email = email;
            return encarregado.save();
        }).then(result => {
            req.flash('msgSuccess', 'Encarregado editado com sucesso!');
            res.redirect('/encarregados');
        }).catch(err => console.log(err));
}

exports.deleteEncarregado = (req, res, next) => {
    const encarregadoId = req.body.encarregadoId;
    const userId = req.body.userId;

    Encarregado.destroy({where: {id: encarregadoId}})
        .then((result) => {   
            req.flash('msgSuccess', 'Encarregado excluído com sucesso!');
            res.redirect('/encarregados');
        }).catch(err => console.log(err));
}