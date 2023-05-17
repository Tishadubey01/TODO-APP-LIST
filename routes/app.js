const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
    create,
    findAll,
    findOne,
    find,
    completed,
    canceled,
    deleted,
    getcount
} = require('../routes/controller');

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + 'public' });
});
router.post('/tasks', create);
router.put('/tasks/:id/completed', completed);
router.put('/tasks/:id/canceled',canceled);
router.put('/tasks/:id/deleted', deleted);
router.get('/tasks', findAll);
router.get('/tasks/:id', findOne);
router.get('/alltasks',find);
router.get('/getcount',getcount);

module.exports = router;
