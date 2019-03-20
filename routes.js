const router = require("express").Router();

const Stream = require('./models/stream');
const User = require('./models/user');

const db = require('./DB/db');

router.get('/stream', (req, res) => {
    Stream.find()
    .then(streams => res.status(200).json(streams))
    .catch(err => res.status(401).json({ msg: 'No streams found' }));
});

router.get('/user', (req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(401).json({ msg: 'No users found' }));
});

router.post('/stream/add', async (req, res) => {
  const stream = req.body;
    try{
        StreamCount = await db.getStreamCount(stream.user);
        newStream = await db.createStream(stream);
        return res.status(201).json(newStream);
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/user/add', async (req, res) => {
    const user = req.body;
    try {
        newUser = await db.createUser(user);
        return res.status(201).json(newUser);
    } catch (err){
        console.log(err);
        return res.status(500).json("error occured");
    }
  });

  router.post('/getStreamCount', async (req, res) => {
    const user = req.body.user;
    try {
        streamCount = await db.getStreamCount(user);
        return res.status(201).json(streamCount);
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
  });

  router.delete('/user', async (req, res) => {
    const user = req.body.user;
    try {
        response = await db.deleteUser(user);
        return res.status(201).json(response);
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
  });

  router.delete('/stream', async (req, res) => {
    const streamId = req.body.id;
    try {
        response = await db.deleteStream(streamId);
        return res.status(201).json(response);
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }
  });

module.exports = router;