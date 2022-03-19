const Aluno = require('../models/aluno');
const User = require('../models/user');
const Encarregado = require('../models/encarregado');
const Curso = require('../models/curso');
const Classe = require('../models/classe');
const Matricula = require('../models/matricula');
const Turma = require('../models/turma');
const pdfDocument = require('pdfkit');
const fileHelper = require('../util/file');

function generateHeader(doc, date) {
    doc.image('public/img/logo.png', 50, 45, { width: 100 })
        .fillColor('#444444')
        .font('public/fonts/fonts/OpenSans-Regular.ttf')
        .fontSize(10)
        .text('Data de emissão', 200, 45, { align: 'right' })
        .text(date, 200, 65, { align: 'right' })
        .moveDown();
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc.fontSize(10)
        .text(c1, 50, y)
        .text(c2, 170, y)
        .text(c3, 190, y, { width: 90, align: 'right' })
        .text(c4, 260, y, { width: 90, align: 'right' })
        .text(c5, 0, y, { align: 'right' });
}

function generateAlunosTable(doc, alunos) {
    let i,
        tableTop = 250;

    doc.fontSize(15)
        .text('Nome', 50, 247)
        .text('Processo', 170, 247)
        .text('Sexo', 190, 247, { width: 90, align: 'right' })
        .text('Tel', 260, 247, { width: 90, align: 'right' })
        .text('Email', 0, 247, { align: 'right' });

    for (i = 0; i < alunos.length; i++) {
        const aluno = alunos[i];
        const position = tableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            aluno.nome,
            aluno.numProcesso,
            aluno.sexo,
            aluno.telefone,
            aluno.email
        );
    }
}

exports.getAlunos = (req, res, next) => {
    Aluno.findAll({ where: { status: 'activo' }, order: [['id', 'DESC']] })
        .then((alunos) => {
            Aluno.findAll({ where: { status: 'inactivo' }, order: [['id', 'DESC']] })
                .then((reciclados) => {
                    Encarregado.findAll()
                        .then(encarregados => {
                            Curso.findAll()
                                .then(cursos => {
                                    Classe.findAll()
                                        .then(classes => {
                                            Turma.findAll()
                                                .then(turmas => {
                                                    res.render('aluno/alunos', {
                                                        pageTitle: 'Alunos',
                                                        path: '/alunos',
                                                        alunos: alunos,
                                                        encarregados: encarregados,
                                                        cursos: cursos,
                                                        classes: classes,
                                                        turmas: turmas,
                                                        reciclados: reciclados
                                                    });
                                                }).catch(err => console.log(err));
                                        }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch((err) => console.log(err));
        }).catch(err => console.log(err));
}

// Show all alunos in reciclagem (trash)
exports.getReciclagem = (req, res) => {
    Aluno.findAll({ where: { status: 'inactivo' }, order: [['id', 'DESC']] })
        .then(alunos => {
            res.render('aluno/reciclagem', {
                pageTitle: 'Reciclagem',
                path: '/professores',
                alunos: alunos,
            });
        }).catch(err => console.log(err))
}

// Restore the aluno in reciclagem
exports.restoreAluno = (req, res) => {
    const alunoId = req.body.alunoId;

    Aluno.findByPk(alunoId)
        .then(aluno => {
            aluno.status = 'activo';

            return aluno.save();
        }).then(result => {
            req.flash('msgSuccess', 'Aluno restaurado com sucesso!');
            res.redirect('/alunos');
        }).catch(err => console.log(err));
}

// Export alunos into pdf file
exports.exportAlunosInPDF = (req, res, next) => {
    Aluno.findAll({ where: { status: 'activo' } })
        .then((alunos) => {
            const doc = new pdfDocument({
                size: 'A4',
                pdfVersion: '1.5',
                tagged: true,
                info: {
                    Title: 'Alunos'
                },
                displayTitle: true,
            });
            doc.pipe(res);

            let date = Date.now();
            date = new Date().toLocaleDateString(date);

            generateHeader(doc, date);

            doc.fontSize(30)
                .text('Alunos', 0, 180, { align: 'center' });

            generateAlunosTable(doc, alunos);

            doc.end();

        }).catch(err => console.log(err));
}

exports.addAluno = (req, res, next) => {
    const nome = req.body.anome;
    const dtNascimento = req.body.dtNascimento;
    const sexo = req.body.sexo;
    const estadoCivil = req.body.estadoCivil;
    const codBi = req.body.codBi;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const numProcesso = req.body.numProcesso;
    const encarregadoId = req.body.encarregadoId;
    const endereco = req.body.endereco;
    const status = 'activo';
    const file = req.file;

    if(!file) {
        req.flash('msgError', 'Falha ao cadastrar! O arquivo deve ser uma imagem!');
        return res.redirect('/alunos');
    }

    // FIELDS FOR MATRICULA
    const cursoId = req.body.cursoId;
    const classeId = req.body.classeId;
    const turno = req.body.turno;
    const anoLectivo = req.body.anoLectivo;
    const matriculaStatus = 'inactivo';

    let data = dtNascimento;
    let ano = data[0] + data[1] + data[2] + data[3];
    let anoActual = new Date().getFullYear();
    let idade = anoActual - ano;

    if (idade < 5) {
        req.flash('msgError', 'Falha ao cadastrar! Menor de idade (' + idade + ' ano(s))!');
        return res.redirect('/alunos');
    }

    if (!file) {
        req.flash('msgError', 'Falha ao cadastrar! Selecione uma imagem!');
        return res.redirect('/alunos');
    }

    if (telefone.length !== 9) {
        req.flash('msgError', 'Falha ao editar! O número de Telefone deve conter 9 dígitos');
        return res.redirect('/alunos');
    }

    const foto = file.filename;

    Aluno.findAll({ where: { telefone: telefone } })
        .then(aluno => {
            if (aluno[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Número de Telefone já existe!');
                return res.redirect('/alunos');
            }
            return Aluno.findAll({ where: { email: email } });
        })
        .then(aluno => {
            if (aluno[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Email já existe!');
                return res.redirect('/alunos');
            }
            return Aluno.findAll({ where: { codBi: codBi } });
        })
        .then(aluno => {
            if (aluno[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Código do Bilhete já existe!');
                return res.redirect('/alunos');
            }
            return Aluno.findAll({ where: { numProcesso: numProcesso } });
        })
        .then(aluno => {
            if (aluno[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O nº de processo já existe!');
                return res.redirect('/alunos');
            }

            return req.user.createAluno({
                nome: nome,
                dtNascimento: dtNascimento,
                sexo: sexo,
                estadoCivil: estadoCivil,
                codBi: codBi,
                telefone: telefone,
                email: email,
                numProcesso: numProcesso,
                encarregadoId: encarregadoId,
                endereco: endereco,
                foto: foto,
                status: status
            });
        })
        .then(result => {
            Turma.findAll({ where: { designacao: 'Default' } })
                .then(turma => {
                    if (!turma[0]) {
                        req.flash('msgError', 'Falha ao cadastrar! Não exit uma turma <<Default>>!');
                        return res.redirect('/alunos');
                    }
                    return req.user.createMatricula({
                        cursoId: cursoId,
                        classeId: classeId,
                        turmaId: turma[0].id,
                        turno: turno,
                        anoLectivo: anoLectivo,
                        numProcesso: numProcesso,
                        status: matriculaStatus
                    });
                }).catch(err => console.log(err));
        })
        .then(result => {
            req.flash('msgSuccess', 'Aluno cadastrado com sucesso!');
            res.redirect('/alunos');
        })
        .catch(err => console.log(err));
}

exports.getDetalhes = (req, res, next) => {
    const id = req.params.alunoId;
    Aluno.findByPk(id)
        .then((aluno) => {
            if (!aluno) {
                return res.redirect('/alunos');
            }
            User.findAll({ where: { email: aluno.email } })
                .then(user => {
                    if (!user) {
                        return res.redirect('/alunos');
                    }
                    Encarregado.findByPk(aluno.encarregadoId)
                        .then(encarregado => {
                            Matricula.findAll({ where: { numProcesso: aluno.numProcesso } })
                                .then(matriculas => {
                                    Classe.findAll()
                                        .then(classes => {
                                            Curso.findAll()
                                                .then(cursos => {
                                                    Turma.findAll()
                                                        .then(turmas => {
                                                            let data = aluno.dtNascimento
                                                            let dia = data[8] + data[9];
                                                            let mes = data[5] + data[6];
                                                            let ano = data[0] + data[1] + data[2] + data[3];
                                                            const dtNasc = dia + '/' + mes + '/' + ano;

                                                            let anoActual = new Date().getFullYear();
                                                            let idade = anoActual - ano;

                                                            res.render('aluno/detalhes', {
                                                                pageTitle: 'Detalhes do aluno',
                                                                path: '/alunos',
                                                                aluno: aluno,
                                                                user: user[0],
                                                                dtNasc: dtNasc,
                                                                idade: idade,
                                                                encarregado: encarregado,
                                                                classes: classes,
                                                                cursos: cursos,
                                                                matriculas: matriculas,
                                                                turmas: turmas,
                                                            });
                                                        }).catch(err => console.log(err));
                                                }).catch(err => console.log(err));
                                        }).catch(err => console.log(err));
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

exports.getEditAluno = (req, res, next) => {
    const alunoId = req.params.alunoId;

    Aluno.findByPk(alunoId)
        .then(aluno => {
            let data = aluno.dtNascimento
            let dia = data[8] + data[9];
            let mes = data[5] + data[6];
            let ano = data[0] + data[1] + data[2] + data[3];
            const dtNasc = dia + '/' + mes + '/' + ano;

            Encarregado.findAll()
                .then(encarregados => {
                    res.render('aluno/edit-aluno', {
                        pageTitle: 'Editar o aluno',
                        path: '/alunos',
                        aluno: aluno,
                        dtNasc: dtNasc,
                        encarregados: encarregados
                    });
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

exports.editAluno = (req, res, next) => {
    const alunoId = req.body.alunoId;
    const userId = req.body.userId;
    const nome = req.body.nome;
    const encarregadoId = req.body.encarregadoId;
    const dtNascimento = req.body.dtNascimento;
    const endereco = req.body.endereco;
    const sexo = req.body.sexo;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const numProcesso = req.body.numProcesso;
    const estadoCivil = req.body.estadoCivil;
    const codBi = req.body.codBi;
    const file = req.file;

    if(!file) {
        req.flash('msgError', 'Falha ao editar! O arquivo deve ser uma imagem');
        return res.redirect('/alunos');
    }

    let data = dtNascimento;
    let ano = data[0] + data[1] + data[2] + data[3];
    let anoActual = new Date().getFullYear();
    let idade = anoActual - ano;

    if (idade < 5) {
        req.flash('msgError', 'Falha ao editar! Menor de idade (' + idade + ' ano(s))!');
        return res.redirect('/alunos');
    }

    if (telefone.length !== 9) {
        req.flash('msgError', 'Falha ao editar! O número de Telefone deve conter 9 dígitos');
        return res.redirect('/alunos');
    }

    Aluno.findAll({ where: { telefone: telefone } })
        .then(aluno => {
            if (aluno.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Número de Telefone já existe!');
                return res.redirect('/alunos/detalhes/' + alunoId);
            }
            return Aluno.findAll({ where: { email: email } });
        })
        .then(aluno => {
            if (aluno.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Email já existe!');
                return res.redirect('/alunos/detalhes/' + alunoId);
            }
            return Aluno.findAll({ where: { codBi: codBi } });
        })
        .then(aluno => {
            if (aluno.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Código do Bilhete já existe!');
                return res.redirect('/alunos/detalhes/' + alunoId);
            }
            return Aluno.findByPk(alunoId);
        })
        .then(aluno => {
            aluno.nome = nome;
            aluno.encarregadoId = encarregadoId;
            aluno.codBi = codBi;
            aluno.endereco = endereco;
            aluno.sexo = sexo;
            aluno.numProcesso = numProcesso;
            aluno.estadoCivil = estadoCivil;
            aluno.telefone = telefone;
            if (dtNascimento.length > 0) {
                aluno.dtNascimento = dtNascimento;
            }
            if (file) {
                // Helper function to delete file
                fileHelper.deleteFile(aluno.foto);

                aluno.foto = file.filename;
            }
            return aluno.save();
        }).then(result => {
            req.flash('msgSuccess', 'Aluno editado com sucesso!');
            res.redirect('/alunos/detalhes/' + alunoId);
        })
        .catch(err => console.log(err));
}

exports.deleteAluno = (req, res, next) => {
    const alunoId = req.body.alunoId;
    const reciclar = req.body.reciclar;
    const userId = req.body.userId;

    if (reciclar === 'reciclar') {
        return Aluno.findByPk(alunoId)
            .then(aluno => {
                aluno.status = 'inactivo';
                return aluno.save();
            }).then(result => {
                req.flash('msgSuccess', 'Aluno movido para a reciclagem!');
                res.redirect('/alunos');
            }).catch((err) => {
                console.log(err)
            });
    }

    Aluno.findByPk(alunoId)
        .then(aluno => {
            //Helper Function to delete file
            fileHelper.deleteFile(aluno.foto);

            return Aluno.destroy({ where: { id: alunoId } });
        })
        .then(result => {
            req.flash('msgSuccess', 'Aluno excluído com sucesso!');
            res.redirect('/alunos');
        }).catch((err) => {
            console.log(err);
        });
}