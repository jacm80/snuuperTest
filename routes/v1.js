const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport)

router.post('/users/login', UserController.login);                                                // TOKEN AUTH

router.post('/users', passport.authenticate('jwt', { session: false }), UserController.create);        // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAll);         // R
router.get('/users/:id', passport.authenticate('jwt', { session: false }), UserController.get);        // R
router.put('/users/:id', passport.authenticate('jwt', { session: false }), UserController.update);     // U
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), UserController.remove);  // D

//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;