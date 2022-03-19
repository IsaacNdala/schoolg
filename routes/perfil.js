const express = require('express');

const multer = require('multer');

const perfilController = require('../controllers/perfil');
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

  const upload = multer({ storage: storage});

router.get('/perfil', authChecker, perfilController.getPerfil);

router.post('/perfil/info-pessoal/edit', authChecker, perfilController.editInfoPessoal);

router.post('/perfil/password/edit', authChecker, perfilController.editPassword);

router.post('/perfil/info-profissional/edit', authChecker, perfilController.editInfoProfissional);

router.post('/perfil/contactos/edit', authChecker, perfilController.editContactos);

// router.post('/funcionario/add', authChecker, upload.single('foto'), perfilController.postFuncionario);

// router.post('/funcionario/edit', authChecker, upload.single('foto'), perfilController.editFuncionario);

module.exports = router;