const Curso = require('../models/curso');
const User = require('../models/user');
const Funcionario = require('../models/funcionario');

exports.getCursos = (req, res, next) => {
    Curso.findAll()
        .then(cursos => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('curso/cursos', {
                                pageTitle: 'Cursos',
                                path: '/cursos',
                                cursos: cursos,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addCurso = (req, res, next) => {
    const designacao = req.body.cdesignacao;

    Curso.findAll()
        .then(cursos => {
            if (cursos.length > 0) {
                for (const curso of cursos) {
                    if (curso.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao adicionar! Este curso já existe!');
                        return res.redirect('/cursos');
                    }
                }
            }
            return req.user.createCurso({ designacao: designacao });
        }).then(result => {
            req.flash('msgSuccess', 'Curso adicionado com sucesso!');
            res.redirect('/cursos');
        }).catch(err => console.log(err));
}

exports.getEditCurso = (req, res, next) => {
    const cursoId = req.body.cursoId;

    Curso.findByPk(cursoId)
        .then(curso => {
            res.render('curso/edit-curso', {
                pageTitle: 'Editar Curso',
                path: '/cursos',
                curso: curso
            });
        }).catch(err => console.log(err));
}

exports.editCurso = (req, res, next) => {
    const cursoId = req.body.cursoId;
    const designacao = req.body.cdesignacao;

    Curso.findAll()
        .then(cursos => {
            if (cursos.length > 0) {
                for (const curso of cursos) {
                    if (curso.id == cursoId && curso.designacao.toLowerCase() === designacao.toLowerCase()) {
                        return res.redirect('/cursos');
                    }
                    if (curso.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao editar! Este curso já existe!');
                        return res.redirect('/cursos');
                    }
                }
            }
            return Curso.findByPk(cursoId);
        }).then(curso => {
            curso.designacao = designacao
            return curso.save();
        }).then(result => {
            req.flash('msgSuccess', 'Curso editado com sucesso!');
            res.redirect('/cursos');
        }).catch(err => console.log(err));
}

exports.deleteCurso = (req, res, next) => {
    const cursoId = req.body.cursoId;
    const userId = req.body.userId;

    Curso.destroy({ where: { id: cursoId } })
        .then((result) => {
            req.flash('msgSuccess', 'Curso excluído com sucesso!');
            res.redirect('/cursos');
        }).catch(err => console.log(err));
}