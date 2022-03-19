const Classe = require('../models/classe');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getClasses = (req, res, next) => {
    Classe.findAll()
        .then(classes => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('classe/classes', {
                                pageTitle: 'Classes',
                                path: '/classes',
                                classes: classes,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addClasse = (req, res, next) => {
    const designacao = req.body.cldesignacao;

    Classe.findAll()
        .then(classes => {
            if(classes.length > 0){
                for (const classe of classes) {
                    if (classe.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao adicionar! Esta classe já existe!');
                        return res.redirect('/classes');
                    }   
                }
            }
            return req.user.createClasse({designacao: designacao});
        }).then(result => {
            req.flash('msgSuccess', 'Classe adicionada com sucesso!');
            res.redirect('/classes');
        }).catch(err => console.log(err));
}

exports.getEditClasse = (req, res, next) => {
    const classeId = req.body.classeId;

    Classe.findByPk(classeId)
        .then(classe => {
            res.render('classe/edit-classe', {
                pageTitle: 'Editar Classe',
                path: '/classes',
                classe: classe
            });
        }).catch(err => console.log(err));
}

exports.editClasse = (req, res, next) => {
    const classeId = req.body.classeId;
    const designacao = req.body.cldesignacao;

    Classe.findAll()
        .then(classes => {
            if(classes.length > 0){
                for (const classe of classes) {
                    if ( classe.id == classeId && classe.designacao.toLowerCase() === designacao.toLowerCase()) {
                        return res.redirect('/classes');
                    }  
                    if (classe.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao editar! Este classe já existe!');
                        return res.redirect('/classes');
                    }
                }
            }
            return Classe.findByPk(classeId);
        }).then(classe => {
            classe.designacao = designacao
            return classe.save();
        }).then(result => {
            req.flash('msgSuccess', 'Classe editado com sucesso!');
            res.redirect('/classes');
        }).catch(err => console.log(err));
}

exports.deleteClasse = (req, res, next) => {
    const classeId = req.body.classeId;
    const userId = req.body.userId;

    Classe.destroy({where: {id: classeId}})
        .then((result) => {   
            req.flash('msgSuccess', 'Classe excluída com sucesso!');
            res.redirect('/classes');
        }).catch(err => console.log(err));
}