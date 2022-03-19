const express = require('express');

const multer = require('multer');

const alunoController = require('../controllers/aluno');
const authChecker = require('../middleware/ath-checker');

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
      cb(null, 'SG_IMG_' + Date.now() + '.png');
    }
  })
  
  const filter = (req, file, cb) => {
      if (
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png'
        ) 
        {
            cb(null, true);
        } else {
            cb(null, false);
        }
  }

const upload = multer({ storage: storage, fileFilter: filter});

router.get('/alunos', authChecker, alunoController.getAlunos);

router.get('/alunos/detalhes/:alunoId', authChecker, alunoController.getDetalhes);

router.get('/alunos/reciclagem', authChecker, alunoController.getReciclagem);

router.get('/alunos/exportar-pdf', authChecker, alunoController.exportAlunosInPDF);

router.post('/aluno/add', authChecker, upload.single('foto'), alunoController.addAluno);

router.post('/aluno/reciclagem/restaurar', authChecker, alunoController.restoreAluno);

router.get('/alunos/detalhes/editar/:alunoId', authChecker, alunoController.getEditAluno);

router.post('/aluno/edit', authChecker, upload.single('foto'), alunoController.editAluno);

router.post('/aluno/delete', authChecker, alunoController.deleteAluno);

module.exports = router;