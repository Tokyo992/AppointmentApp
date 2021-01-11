var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', (req, res, next) => {
  const { appointmentDateTime, name, email } = req.body;
  if (!appointmentDateTime|| !name || !email) {
    return res.status(400).json({
      message: 'Date, time, name and email are required',
    });
  }

  const payload = { appointmentDateTime,  name, email };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.status(400).json(
      { message: 'No appointments available on that date and time'},
    ));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
