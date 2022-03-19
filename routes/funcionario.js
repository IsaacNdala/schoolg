const express = require('express');

const multer = require('multer');

const funcionarioController = require('../controllers/funcionario');
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

router.get('/funcionarios', authChecker, funcionarioController.getFuncionarios);

router.get('/funcionarios/exportar-pdf', authChecker, funcionarioController.exportFuncionariosToPDF);

router.get('/funcionarios/reciclagem', authChecker, funcionarioController.getReciclagem);

router.get('/professores', authChecker, funcionarioController.getProfessores);

router.post('/funcionario/add', authChecker, upload.single('foto'), funcionarioController.postFuncionario);

router.get('/funcionarios/detalhes/:funId', authChecker, funcionarioController.getDetalhes);

router.get('/professores/detalhes/:funId', authChecker, funcionarioController.getProfessorDetalhes);

router.post('/funcionarios/detalhes/editar', authChecker, funcionarioController.getEditFuncionario);

router.post('/funcionario/reciclagem/restaurar', authChecker, funcionarioController.restoreFuncionario);

router.post('/funcionario/edit', authChecker, upload.single('foto'), funcionarioController.editFuncionario);

router.post('/funcionario/delete', authChecker, funcionarioController.deleteFuncionario);

// FUNCAO
router.get('/funcionarios/funcoes', authChecker, funcionarioController.getFuncaos);

router.post('/funcoes/add', authChecker, funcionarioController.addFuncao);

router.post('/funcoes/delete', authChecker, funcionarioController.deleteFuncao);

router.post('/funcionarios/funcoes/editar', authChecker, funcionarioController.getEditFuncao);

router.post('/funcoes/edit', authChecker, funcionarioController.editFuncao);

module.exports = router;