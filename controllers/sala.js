const Sala = require('../models/sala');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getSalas = (req, res, next) => {
    Sala.findAll()
        .then(salas => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('sala/salas', {
                                pageTitle: 'Salas',
                                path: '/salas',
                                salas: salas,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addSala = (req, res, next) => {
    const designacao = req.body.sdesignacao;

    Sala.findAll()
        .then(salas => {
            if(salas.length > 0){
                for (const sala of salas) {
                    if (sala.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao adicionar! Esta sala já existe!');
                        return res.redirect('/salas');
                    }   
                }
            }
            return req.user.createSala({designacao: designacao});
        }).then(result => {
            req.flash('msgSuccess', 'Sala adicionada com sucesso!');
            res.redirect('/salas');
        }).catch(err => console.log(err));
}

exports.getEditSala = (req, res, next) => {
    const salaId = req.body.salaId;

    Sala.findByPk(salaId)
        .then(sala => {
            res.render('sala/edit-sala', {
                pageTitle: 'Editar Sala',
                path: '/salas',
                sala: sala
            });
        }).catch(err => console.log(err));
}

exports.editSala = (req, res, next) => {
    const salaId = req.body.salaId;
    const designacao = req.body.sdesignacao;

    Sala.findAll()
        .then(salas => {
            if(salas.length > 0){
                for (const sala of salas) {
                    if ( sala.id == salaId && sala.designacao.toLowerCase() === designacao.toLowerCase()) {
                        return res.redirect('/salas');
                    }  
                    if (sala.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao editar! Esta sala já existe!');
                        return res.redirect('/salas');
                    }
                }
            }
            return Sala.findByPk(salaId);
        }).then(sala => {
            sala.designacao = designacao
            return sala.save();
        }).then(result => {
            req.flash('msgSuccess', 'Sala editada com sucesso!');
            res.redirect('/salas');
        }).catch(err => console.log(err));
}

exports.deleteSala = (req, res, next) => {
    const salaId = req.body.salaId;
    const userId = req.body.userId;

    Sala.destroy({where: {id: salaId}})
        .then((result) => {   
            req.flash('msgSuccess', 'Sala excluída com sucesso!');
            res.redirect('/salas');
        }).catch(err => console.log(err));
}