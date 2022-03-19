const Disciplina = require('../models/disciplina');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getDisciplinas = (req, res, next) => {
    Disciplina.findAll()
        .then(disciplinas => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('disciplina/disciplinas', {
                                pageTitle: 'Disciplinas',
                                path: '/disciplinas',
                                disciplinas: disciplinas,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addDisciplina = (req, res, next) => {
    const designacao = req.body.designacao;

    Disciplina.findAll()
        .then(disciplinas => {
            if(disciplinas.length > 0){
                for (const disciplina of disciplinas) {
                    if (disciplina.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao adicionar! Esta disciplina já existe!');
                        return res.redirect('/disciplinas');
                    }   
                }
            }
            return req.user.createDisciplina({designacao: designacao});
        }).then(result => {
            req.flash('msgSuccess', 'Disciplina adicionada com sucesso!');
            res.redirect('/disciplinas');
        }).catch(err => console.log(err));
}

exports.getEditDisciplina = (req, res, next) => {
    const disciplinaId = req.body.disciplinaId;

    Disciplina.findByPk(disciplinaId)
        .then(disciplina => {
            res.render('disciplina/edit-disciplina', {
                pageTitle: 'Editar disciplina',
                path: '/disciplinas',
                disciplina: disciplina
            });
        }).catch(err => console.log(err));
}

exports.editDisciplina = (req, res, next) => {
    const disciplinaId = req.body.disciplinaId;
    const designacao = req.body.designacao;

    Disciplina.findAll()
        .then(disciplinas => {
            if(disciplinas.length > 0){
                for (const disciplina of disciplinas) {
                    if ( disciplina.id == disciplinaId && disciplina.designacao.toLowerCase() === designacao.toLowerCase()) {
                        return res.redirect('/disciplinas');
                    }  
                    if (disciplina.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao editar! Este disciplina já existe!');
                        return res.redirect('/disciplinas');
                    }
                }
            }
            return Disciplina.findByPk(disciplinaId);
        }).then(disciplina => {
            disciplina.designacao = designacao
            return disciplina.save();
        }).then(result => {
            req.flash('msgSuccess', 'Disciplina editado com sucesso!');
            res.redirect('/disciplinas');
        }).catch(err => console.log(err));
}

exports.deleteDisciplina = (req, res, next) => {
    const disciplinaId = req.body.disciplinaId;
    const userId = req.body.userId;

    Disciplina.destroy({where: {id: disciplinaId}})
        .then((result) => {   
            req.flash('msgSuccess', 'Disciplina excluída com sucesso!');
            res.redirect('/disciplinas');
        }).catch(err => console.log(err));
}