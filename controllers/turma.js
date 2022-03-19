const Turma = require('../models/turma');
const Curso = require('../models/curso');
const Classe = require('../models/classe');
const Sala = require('../models/sala');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getTurmas = (req, res, next) => {
    Turma.findAll()
        .then(turmas => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            Curso.findAll()
                                .then(cursos => { 
                                    Classe.findAll()
                                        .then(classes => { 
                                            Sala.findAll()
                                                .then(salas => { 
                                                    res.render('turma/turmas', {
                                                        pageTitle: 'Turmas',
                                                        path: '/turmas',
                                                        turmas: turmas,
                                                        users: users,
                                                        funcionarios: funcionarios,
                                                        salas: salas,
                                                        cursos: cursos,
                                                        classes: classes
                                                    });
                                                }).catch(err => console.log(err));
                                        }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addTurma  = (req, res, next) => {
    const designacao = req.body.tdesignacao;
    const cursoId = req.body.cursoId;
    const classeId = req.body.classeId;
    const salaId = req.body.salaId;

    Turma.findAll()
        .then(turmas => {
            if(turmas.length > 0){
                for (const turma  of turmas) {
                    if (
                        turma.designacao.toLowerCase() === designacao.toLowerCase() && 
                        turma.cursoId.toString() === cursoId.toString()
                        ) {
                            Curso.findByPk(turma.cursoId)
                            .then(curso => {
                                req.flash('msgError', 'Falha ao editar! Já existe uma turma <<' + turma.designacao + '>> do curso de <<' + curso.designacao + '>>');
                                return res.redirect('/turmas');
                            }).catch(err => console.log(err));
                    }   
                }
            }
            return req.user.createTurma ({
                designacao: designacao,
                cursoId: cursoId,
                classeId: classeId,
                salaId: salaId
            });
        }).then(result => {
            req.flash('msgSuccess', 'Turma adicionada com sucesso!');
            res.redirect('/turmas');
        }).catch(err => console.log(err));
}

exports.getEditTurma  = (req, res, next) => {
    const turmaId = req.body.turmaId;

    Turma.findByPk(turmaId)
        .then(turma  => {
            Curso.findAll()
                .then(cursos => {
                    Classe.findAll()
                        .then(classes => {
                            Sala.findAll()
                                .then(salas => {
                                    res.render('turma/edit-turma', {
                                        pageTitle: 'Editar Turma',
                                        path: '/turmas',
                                        turma : turma,
                                        cursos: cursos,
                                        classes: classes,
                                        salas: salas
                                    });
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

exports.editTurma  = (req, res, next) => {
    const turmaId = req.body.turmaId;
    const designacao = req.body.tdesignacao;
    const cursoId = req.body.cursoId;
    const classeId = req.body.classeId;
    const salaId = req.body.salaId;

    Turma.findAll()
        .then(turmas => {
            if(turmas.length > 0){
                for (const turma of turmas) {
                    if (
                        turma.id.toString() === turmaId.toString() && 
                        turma.designacao.toLowerCase() === designacao.toLowerCase() &&
                        turma.cursoId.toLowerCase() === cursoId.toLowerCase() &&
                        turma.classeId.toLowerCase() === classeId.toLowerCase() &&
                        turma.salaId.toLowerCase() === salaId.toLowerCase()
                        ) {
                        return res.redirect('/turmas');
                    }  
                    if (
                        turma.id.toString() !== turmaId.toString() && 
                        turma.designacao.toLowerCase() === designacao.toLowerCase() &&
                        turma.cursoId.toString() === cursoId.toString()
                        ) {
                        Curso.findByPk(turma.cursoId)
                            .then(curso => {
                                req.flash('msgError', 'Falha ao editar! Já existe uma turma <<' + turma.designacao + '>> do curso de <<' + curso.designacao + '>>');
                                return res.redirect('/turmas');
                            }).catch(err => console.log(err));
                    }
                }
            }
            return Turma.findByPk(turmaId);
        }).then(turma  => {
            turma.designacao = designacao;
            turma.cursoId = cursoId;
            turma.classeId = classeId;
            turma.salaId = salaId;
            return turma.save();
        }).then(result => {
            req.flash('msgSuccess', 'Turma editada com sucesso!');
            res.redirect('/turmas');
        }).catch(err => console.log(err));
}

exports.deleteTurma  = (req, res, next) => {
    const turmaId = req.body.turmaId;
    const userId = req.body.userId;

    Turma.destroy({where: {id: turmaId}})
        .then((result) => {   
            req.flash('msgSuccess', 'Turma excluída com sucesso!');
            res.redirect('/turmas');
        }).catch(err => console.log(err));
}