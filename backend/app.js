const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const connection = require('./lib/conn');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/notes', (req, res) => {

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'SELECT * FROM notes';

        connection.query(query, (err, data) => {
            if (err) console.log('err', err);

            console.log('notes', data);
            res.json(data);
        })
    })
});

app.post('/notes', (req, res) => {

    let title = req.body.title;
    let text = req.body.text;
    let userId = req.body.userId; // skall skapas ett random userId

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'INSERT into notes (title, text, userId) VALUES (?, ?, ?)';
        let values = [title, text, userId];

        connection.query(query, values, (err, data) => {
            if (err) console.log('err', err);

            console.log('notes', data);
            res.json({message: 'Note saved'});
        })
    })
});

app.patch('/note/:id', (req, res) => {

    let title = req.body.title;
    let text = req.body.text;
    let noteId = req.params.id;

    console.log(noteId);

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'UPDATE notes SET title = ?, text = ?, edited = 1, edited_at = CURRENT_TIMESTAMP WHERE id = ?';
        let values = [title, text, noteId, noteId];

        connection.query(query, values, (err, data) => {
            if (err) console.log('err', err);
            
            console.log('notes', data);
            res.json(data);
        })
    })
});

app.delete('/note/:id', (req, res) => {

    let noteId = req.params.id;

    connection.connect((err) => {
        if (err) console.log('err', err);

        let query = 'UPDATE notes SET deleted = 1, edited_at = CURRENT_TIMESTAMP WHERE id = ?';
        let values = [noteId];

        connection.query(query, values, (err, data) => {
            if (err) console.log('err', err);

            console.log('notes', data);
            res.json({message: 'Note deleted'});
        })
    })

});

module.exports = app;
