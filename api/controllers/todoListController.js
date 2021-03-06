'use strict';

var sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'test.db')
const db = new sqlite3.Database(dbPath)

exports.getData = function(req, res) {
  db.get("SELECT value FROM counts", function(err, row) {
        res.json({ "count" : row.value });
    });
};

exports.setData = function(req, res) {
    db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
};