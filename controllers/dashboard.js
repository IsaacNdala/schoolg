const Aluno = require('../models/aluno');
const Encarregado = require('../models/encarregado');
const Curso = require('../models/curso');
const Funcionario = require('../models/funcionario');
const Disciplina = require('../models/disciplina');

exports.getDashboard = (req, res, next) => {
    Aluno.findAll({where: { status: 'activo' }})
        .then(alunos => {
            Encarregado.findAll()
                .then(encarregados => {
                    Curso.findAll()
                        .then(cursos => {
                            Funcionario.findAll({where: { status: 'activo' }})
                                .then(funcionarios => {
                                    Funcionario.findAll({where: { status: 'activo', funcaoId: 2 }})
                                        .then(professores => {
                                            Disciplina.findAll()
                                                .then(disciplinas => {
                                                    res.render('dashboard/dashboard', {
                                                        pageTitle: 'Painel de Controle',
                                                        path: '/dashboard',
                                                        alunos: alunos,
                                                        encarregados: encarregados,
                                                        cursos: cursos,
                                                        funcionarios: funcionarios,
                                                        professores: professores,
                                                        disciplinas: disciplinas
                                                    });
                                                }).catch(err => console.log(err));
                                        }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
};