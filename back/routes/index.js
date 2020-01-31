var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/videos', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
})

router.post('/videos', (req, res, next) => {
  const { url, tags } = req.body;
  if (!url || !tags ) {
    return res.status(404).json({
      message: 'url and tags required'
    })
  }

  const payload = { url, tags };
  req.collection.insertOne(payload)
    .then(result => res.json(result))
    .catch(error => res.send(error));
})

router.put('/videos/:id', (req, res, next) => {
  console.log('req.body.tags: ',req.body.tags);
  const id = req.params.id;
  const tags = req.body.tags;
  const _id = ObjectID(id);

  req.collection.updateOne({_id},{$set: {tags: tags}})
    .then(result => res.json(result))
    .catch(error => {res.send(error)})
})

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
})

module.exports = router;
