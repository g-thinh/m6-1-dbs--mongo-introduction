'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const createGreeting = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('exercises');

    const r = await db.collection('two').insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};

const getGreeting = async (req, res) => {
  const { _id } = req.params;

  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = client.db('exercises');

  db.collection('two').findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: 'Not Found' });
    client.close();
  });
};

module.exports = { createGreeting, getGreeting };
