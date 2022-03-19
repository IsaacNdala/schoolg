const Funcionario = require('../models/funcionario');
const Funcao = require('../models/funcao');
const User = require('../models/user');
const pdfDocument = require('pdfkit');
const fileHelper = require('../util/file');
const path = require('path');
const bcrypt = require('bcryptjs');

function generateHeader(doc) {
    let date = Date.now();
    date = new Date().toLocaleDateString(date);

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
        .text(c2, 190, y)
        .text(c3, 215, y, { width: 90, align: 'right' })
        .text(c4, 285, y, { width: 90, align: 'right' })
        .text(c5, 0, y, { align: 'right' });
}

function generateFuncionariosTable(doc, funcionarios) {
    let i,
        tableTop = 250;

    doc.fontSize(15)
        .text('Nome', 50, 247)
        .text('Função', 190, 247)
        .text('Sexo', 215, 247, { width: 90, align: 'right' })
        .text('Tel', 285, 247, { width: 90, align: 'right' })
        .text('Email', 0, 247, { align: 'right' });

    for (i = 0; i < funcionarios.length; i++) {
        const funcionario = funcionarios[i];
        const position = tableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            funcionario.nome,
            funcionario.funcao.designacao,
            funcionario.sexo,
            funcionario.telefone,
            funcionario.email
        );
    }
}

// Get all funcionarios
exports.getFuncionarios = (req, res, next) => {
    Funcionario.findAll({ where: { status: 'activo' }, include: Funcao, order: [['id', 'DESC']] })
        .then((funcionarios) => {
            Funcionario.findAll({ where: { status: 'inactivo' } })
                .then((reciclados) => {
                    Funcao.findAll()
                        .then(funcao => {
                            res.render('funcionario/funcionarios', {
                                pageTitle: 'Funcionários',
                                path: '/funcionarios',
                                funcionarios: funcionarios,
                                reciclados: reciclados,
                                funcao: funcao
                            });
                        }).catch((err) => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

// Export funcionarios to pdf
exports.exportFuncionariosToPDF = (req, res, next) => {
    Funcionario.findAll({ where: { status: 'activo' }, include: Funcao })
        .then((funcionarios) => {
            Funcao.findAll()
                .then(funcao => {
                    const doc = new pdfDocument({
                        size: 'A4',
                        pdfVersion: '1.5',
                        tagged: true,
                        info: {
                            Title: 'Funcionários'
                        },
                        displayTitle: true,
                    });
                    doc.pipe(res);

                    generateHeader(doc);

                    doc.fontSize(30)
                        .text('Funcionários', 0, 180, { align: 'center' });

                    generateFuncionariosTable(doc, funcionarios);

                    doc.end();
                }).catch((err) => console.log(err));
        }).catch(err => console.log(err));
}

// Show all funcionarios in reciclagem (trash)
exports.getReciclagem = (req, res) => {
    Funcionario.findAll({ where: { status: 'inactivo' }, include: Funcao, order: [['id', 'DESC']] })
        .then(funcionarios => {
            User.findAll()
                .then(users => {
                    res.render('funcionario/reciclagem', {
                        pageTitle: 'Reciclagem',
                        path: '/professores',
                        funcionarios: funcionarios,
                        users: users
                    });
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

// Restore the funcionario in reciclagem
exports.restoreFuncionario = (req, res) => {
    const funId = req.body.funId;

    Funcionario.findByPk(funId)
        .then(funcionario => {
            funcionario.status = 'activo';

            return funcionario.save();
        }).then(result => {
            req.flash('msgSuccess', 'Funcionário restaurado com sucesso!');
            res.redirect('/funcionarios');
        }).catch(err => console.log(err));
}

// Get all professores
exports.getProfessores = (req, res, next) => {
    Funcionario.findAll({ where: { status: 'activo', funcaoId: 2 } })
        .then((funcionarios) => {
            Funcao.findAll()
                .then(funcao => {
                    res.render('funcionario/professores', {
                        pageTitle: 'Professores',
                        path: '/professores',
                        funcionarios: funcionarios,
                        funcao: funcao
                    });
                }).catch((err) => console.log(err));
        }).catch(err => console.log(err));
}

// Add a funcionario
exports.postFuncionario = (req, res, next) => {
    const nome = req.body.nome;
    const dtNascimento = req.body.dtNascimento;
    const sexo = req.body.sexo;
    const estadoCivil = req.body.estadoCivil;
    const codBi = req.body.codBi;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const funcaoId = req.body.funcaoId;
    const salario = req.body.salario;
    const numConta = req.body.numConta;
    const password = req.body.password;
    const status = 'activo';
    const file = req.file;

    if(!file) {
        req.flash('msgError', 'Falha ao cadastrar! O arquivo deve ser uma imagem!');
        return res.redirect('/funcionarios');
    }

    let data = dtNascimento;
    let ano = data[0] + data[1] + data[2] + data[3];
    let anoActual = new Date().getFullYear();
    let idade = anoActual - ano;

    if (idade < 18) {
        req.flash('msgError', 'Falha ao cadastrar! Menor de idade (' + idade + ' ano(s))!');
        return res.redirect('/funcionarios');
    }

    if (!file) {
        req.flash('msgError', 'Falha ao cadastrar! Selecione uma imagem!');
        return res.redirect('/funcionarios');
    }

    if (telefone.length !== 9) {
        req.flash('msgError', 'Falha ao editar! O número de Telefone deve conter 9 dígitos');
        return res.redirect('/funcionarios');
    }

    const foto = file.filename;

    Funcionario.findAll({ where: { telefone: telefone } })
        .then(funcionario => {
            if (funcionario[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Número de Telefone já existe!');
                return res.redirect('/funcionarios');
            }
            return Funcionario.findAll({ where: { email: email } });
        })
        .then(funcionario => {
            if (funcionario[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Email já existe!');
                return res.redirect('/funcionarios');
            }
            return Funcionario.findAll({ where: { codBi: codBi } });
        })
        .then(funcionario => {
            if (funcionario[0]) {
                req.flash('msgError', 'Falha ao cadastrar! O Código do Bilhete já existe!');
                return res.redirect('/funcionarios');
            }
            return Funcionario.findAll({ where: { numConta: numConta } });
        })
        .then(funcionario => {
            if (funcionario[0]) {
                req.flash('msgError', 'Falha ao cadastrar! A Conta Bancária já existe!');
                return res.redirect('/funcionarios');
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashPassword => {
            return User.create({
                email: email,
                password: hashPassword,
                status: status,
            });
        })
        .then(result => {
            return req.user.createFuncionario({
                nome: nome,
                dtNascimento: dtNascimento,
                sexo: sexo,
                estadoCivil: estadoCivil,
                codBi: codBi,
                endereco: endereco,
                telefone: telefone,
                email: email,
                funcaoId: funcaoId,
                salario: salario,
                numConta: numConta,
                foto: foto,
                status: status
            });
        })
        .then(result => {
            req.flash('msgSuccess', 'Funcionário cadatrado com sucesso!');
            res.redirect('/funcionarios');
        })
        .catch(err => console.log(err));
}

// Get the information of a funcionario
exports.getDetalhes = (req, res, next) => {
    const id = req.params.funId;
    Funcionario.findByPk(id)
        .then((funcionario) => {
            if (!funcionario) {
                return res.redirect('/funcionarios');
            }
            User.findAll({ where: { email: funcionario.email } })
                .then(user => {
                    if (!user) {
                        return res.redirect('/funcionarios');
                    }
                    Funcao.findByPk(funcionario.funcaoId)
                        .then(funcao => {
                            let data = funcionario.dtNascimento
                            let dia = data[8] + data[9];
                            let mes = data[5] + data[6];
                            let ano = data[0] + data[1] + data[2] + data[3];
                            const dtNasc = dia + '/' + mes + '/' + ano;

                            let anoActual = new Date().getFullYear();
                            let idade = anoActual - ano;

                            res.render('funcionario/detalhes', {
                                pageTitle: 'Detalhes do funcinário',
                                path: '/funcionarios',
                                funcionario: funcionario,
                                pathUrl: 'funcionario',
                                user: user[0],
                                dtNasc: dtNasc,
                                idade: idade,
                                funcao: funcao,
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

// Get the information of a professor
exports.getProfessorDetalhes = (req, res, next) => {
    const id = req.params.funId;
    Funcionario.findByPk(id)
        .then((funcionario) => {
            if (!funcionario) {
                return res.redirect('/professores');
            }
            User.findAll({ where: { email: funcionario.email } })
                .then(user => {
                    if (!user) {
                        return res.redirect('/professores');
                    }
                    Funcao.findByPk(funcionario.funcaoId)
                        .then(funcao => {
                            let data = funcionario.dtNascimento
                            let dia = data[8] + data[9];
                            let mes = data[5] + data[6];
                            let ano = data[0] + data[1] + data[2] + data[3];
                            const dtNasc = dia + '/' + mes + '/' + ano;

                            let anoActual = new Date().getFullYear();
                            let idade = anoActual - ano;

                            res.render('funcionario/detalhes', {
                                pageTitle: 'Detalhes do Professor',
                                path: '/professores',
                                funcionario: funcionario,
                                pathUrl: 'professores',
                                user: user[0],
                                dtNasc: dtNasc,
                                idade: idade,
                                funcao: funcao,
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

// Get the information of funcionario to be edited
exports.getEditFuncionario = (req, res, next) => {
    const funId = req.body.funId;
    const userId = req.body.userId;
    const password = req.body.password;

    User.findByPk(userId)
        .then(user => {
            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) {
                        req.flash('msgError', 'Desculpe, senha errada!');
                        return res.redirect('/funcionarios/detalhes/' + funId);
                    }
                    Funcionario.findByPk(funId)
                        .then(funcionario => {
                            let data = funcionario.dtNascimento
                            let dia = data[8] + data[9];
                            let mes = data[5] + data[6];
                            let ano = data[0] + data[1] + data[2] + data[3];
                            const dtNasc = dia + '/' + mes + '/' + ano;

                            Funcao.findAll()
                                .then(funcao => {
                                    res.render('funcionario/edit-fun', {
                                        pageTitle: 'Editar o funcionário',
                                        path: '/funcionarios',
                                        funcionario: funcionario,
                                        user: user,
                                        dtNasc: dtNasc,
                                        funcao: funcao,
                                    });
                                }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

exports.editFuncionario = (req, res, next) => {
    const funId = req.body.funId;
    const userId = req.body.userId;
    const nome = req.body.nome;
    const funcaoId = req.body.funcaoId;
    const salario = req.body.salario;
    const dtNascimento = req.body.dtNascimento;
    const sexo = req.body.sexo;
    const telefone = req.body.telefone;
    const email = req.body.email;
    const numConta = req.body.numConta;
    const endereco = req.body.endereco;
    const codBi = req.body.codBi;
    const file = req.file;

    if(!file) {
        req.flash('msgError', 'Falha ao editar! O arquivo deve ser uma imagem!');
        return res.redirect('/funcionarios');
    }

    let data = dtNascimento;
    let ano = data[0] + data[1] + data[2] + data[3];
    let anoActual = new Date().getFullYear();
    let idade = anoActual - ano;

    if (idade < 18) {
        req.flash('msgError', 'Falha ao editar! Menor de idade (' + idade + ' ano(s))!');
        return res.redirect('/funcionarios');
    }

    if (telefone.length !== 9) {
        req.flash('msgError', 'Falha ao editar! O número de Telefone deve conter 9 dígitos');
        return res.redirect('/funcionarios');
    }

    Funcionario.findAll({ where: { telefone: telefone } })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Número de Telefone já existe!');
                return res.redirect('/funcionarios/detalhes/' + funId);
            }
            return Funcionario.findAll({ where: { email: email } });
        })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Email já existe!');
                return res.redirect('/funcionarios/detalhes/' + funId);
            }
            return Funcionario.findAll({ where: { codBi: codBi } });
        })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! O Código do Bilhete já existe!');
                return res.redirect('/funcionarios/detalhes/' + funId);
            }
            return Funcionario.findAll({ where: { numConta: numConta } });
        })
        .then(funcionario => {
            if (funcionario.length > 1) {
                req.flash('msgError', 'Falha ao editar! A Conta Bancária já existe!');
                return res.redirect('/funcionarios/detalhes/' + funId);
            }
            return Funcionario.findByPk(funId)
        })
        .then(funcionario => {
            funcionario.nome = nome;
            funcionario.funcaoId = funcaoId;
            funcionario.salario = salario;
            funcionario.codBi = codBi;
            funcionario.numConta = numConta;
            funcionario.sexo = sexo;
            funcionario.email = email;
            funcionario.telefone = telefone;
            funcionario.endereco = endereco;

            if (dtNascimento.length > 0) {
                funcionario.dtNascimento = dtNascimento;
            }
            if (file) {
                // Helper function to delete file
                fileHelper.deleteFile(funcionario.foto);
                funcionario.foto = file.filename;
            }
            return funcionario.save();
        }).then(result => {
            return User.findByPk(userId);
        }).then(user => {
            user.email = email;
            return user.save();
        }).then(result => {
            req.flash('msgSuccess', 'Funcionário editado com sucesso!');
            res.redirect('/funcionarios/detalhes/' + funId);
        })
        .catch(err => console.log(err));
}

exports.deleteFuncionario = (req, res, next) => {
    const funId = req.body.funId;
    const reciclar = req.body.reciclar;
    let fun;

    if (reciclar === 'reciclar') {
        return Funcionario.findByPk(funId)
            .then(funcionario => {
                funcionario.status = 'inactivo';
                return funcionario.save();
            }).then(result => {
                req.flash('msgSuccess', 'Funcionário movido para a reciclagem!');
                res.redirect('/funcionarios');
            }).catch((err) => {
                console.log(err)
            });
    }

    Funcionario.findByPk(funId)
        .then(funcionario => {
            if (funcionario.nome === 'Isaac Augusto Figueira Ndala' || funcionario.email === 'isaac@server.com' || funcionario.codBi === '007325844LA043') {
                req.flash('msgError', 'Erro! Não podes excluir este funcioárion!');
                return res.redirect('/funcionarios');
            }

            fun = funcionario;

            // Helper function to delete file
            fileHelper.deleteFile(funcionario.foto);
            return Funcionario.destroy({ where: { id: funId } });
        }).then((result) => {
            return User.destroy({ where: { email: fun.email } });
        }).then(result => {
            req.flash('msgSuccess', 'Funcionário excluído com sucesso!');
            res.redirect('/funcionarios');
        }).catch((err) => {
            console.log(err);
        });
}

// FUNÇÕES
exports.getFuncaos = (req, res, next) => {
    Funcao.findAll()
        .then(funcaos => {
            User.findAll()
                .then(users => {
                    Funcionario.findAll()
                        .then(funcionarios => {
                            res.render('funcionario/funcoes', {
                                pageTitle: 'Funções',
                                path: '/funcionarios',
                                funcaos: funcaos,
                                users: users,
                                funcionarios: funcionarios
                            });
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch((err) => console.log(err));
}

exports.addFuncao = (req, res, next) => {
    const designacao = req.body.fdesignacao;
    let nivelAcesso;
    if (designacao === 'Director(a)' || designacao === 'Director' || designacao === 'Directora') {
        nivelAcesso = 1;
    } else if (designacao === 'Professor(a)' || designacao === 'Professor' || designacao === 'Professora') {
        nivelAcesso = 2;
    } else if (designacao === 'Secretário(a)' || designacao === 'Secretário' || designacao === 'Secretário') {
        nivelAcesso = 3;
    } else {
        nivelAcesso = 4;
    }

    Funcao.findAll()
        .then(funcaos => {
            if (funcaos.length > 0) {
                for (const funcao of funcaos) {
                    if (funcao.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao adicionar! Já existe uma função com este nome!');
                        return res.redirect('/funcionarios/funcoes');
                    }
                }
            }
            return req.user.createFuncao({
                designacao: designacao,
                nivelAcesso: nivelAcesso
            });
        }).then(result => {
            req.flash('msgSuccess', 'Função adicionada com sucesso!');
            res.redirect('/funcionarios/funcoes');
        }).catch(err => console.log(err));
}

exports.getEditFuncao = (req, res, next) => {
    const funcaoId = req.body.funcaoId;

    Funcao.findByPk(funcaoId)
        .then(funcao => {
            res.render('funcionario/edit-funcao', {
                pageTitle: 'Editar Função',
                path: '/funcionarios',
                funcao: funcao
            });
        }).catch(err => console.log(err));
}

exports.editFuncao = (req, res, next) => {
    const funcaoId = req.body.funcaoId;
    const designacao = req.body.fdesignacao;
    let nivelAcesso;

    if (designacao === 'Director(a)' || designacao === 'Director' || designacao === 'Directora') {
        nivelAcesso = 1;
    } else if (designacao === 'Professor(a)' || designacao === 'Professor' || designacao === 'Professora') {
        nivelAcesso = 2;
    } else if (designacao === 'Secretário(a)' || designacao === 'Secretário' || designacao === 'Secretária') {
        nivelAcesso = 3;
    } else {
        nivelAcesso = 4;
    }

    Funcao.findAll()
        .then(funcaos => {
            if (funcaos.length > 0) {
                for (const funcao of funcaos) {
                    if (funcao.id == funcaoId && funcao.designacao.toLowerCase() === designacao.toLowerCase()) {
                        return res.redirect('/funcionarios/funcoes');
                    }
                    if (funcao.designacao.toLowerCase() === designacao.toLowerCase()) {
                        req.flash('msgError', 'Falha ao editar! Esta função já existe!');
                        return res.redirect('/funcionarios/funcoes');
                    }
                }
            }
            return Funcao.findByPk(funcaoId);
        }).then(funcao => {
            funcao.designacao = designacao;
            funcao.nivelAcesso = nivelAcesso;
            return funcao.save();
        }).then(result => {
            req.flash('msgSuccess', 'Função editada com sucesso!');
            res.redirect('/funcionarios/funcoes');
        }).catch(err => console.log(err));
}

exports.deleteFuncao = (req, res, next) => {
    const funcaoId = req.body.funcaoId;

    Funcao.destroy({ where: { id: funcaoId } })
        .then((result) => {
            req.flash('msgSuccess', 'Função excluída com sucesso!');
            res.redirect('/funcionarios/funcoes');
        }).catch(err => console.log(err));
}