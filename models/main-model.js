const Funcao = require('./funcao');
const Funcionario = require('./funcionario');
const Encarregado = require('./encarregado');
const User = require('./user');
const Aluno = require('./aluno');
const Curso = require('./curso');
const Sala = require('./sala');
const Classe = require('./classe');
const Nota = require('./nota');
const Turma = require('./turma');
const Disciplina = require('./disciplina');

Funcionario.belongsTo(Funcao, {constraits: true});
Funcao.hasMany(Funcionario);

Turma.belongsTo(Classe, {constraits: true});
Classe.hasMany(Turma);

Turma.belongsTo(Sala, {constraits: true});
Sala.hasMany(Turma);

Turma.belongsTo(Curso, {constraits: true});
Curso.hasMany(Turma);

Aluno.belongsTo(Encarregado, {constraits: true});
Encarregado.hasMany(Aluno);

Nota.belongsTo(Aluno, {constraits: true, onDelete: 'CASCADE'});
Aluno.hasMany(Nota);

// USER RELACTIONS
Funcao.belongsTo(User, {constraits: true});
User.hasMany(Funcao);

Funcionario.belongsTo(User, {constraits: true});
User.hasMany(Funcionario);

Encarregado.belongsTo(User, {constraits: true});
User.hasMany(Encarregado);

Aluno.belongsTo(User, {constraits: true});
User.hasMany(Aluno);

Curso.belongsTo(User, {constraits: true});
User.hasMany(Curso);

Turma.belongsTo(User, {constraits: true});
User.hasMany(Turma);

Sala.belongsTo(User, {constraits: true});
User.hasMany(Sala);

Classe.belongsTo(User, {constraits: true});
User.hasMany(Classe);

Disciplina.belongsTo(User, {constraits: true});
User.hasMany(Disciplina);