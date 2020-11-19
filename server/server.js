const express = require('express');
const cors = require('cors');
const Database = require('./Database');
const bodyParser = require('body-parser');

const db = new Database();

const app = express();
const port = 3000;
// Cross origin resource sharing. Important so that client will be able to make calls to APIs on a different domain.
app.use(cors());
app.use(bodyParser.json());
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false)
// or the qs library (when true). 
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let json = {health:true};
    res.send(json);
});

app.get('/notes', (req, res) => {
    const { title } = req.query;
    if(title) {
        db.getNotesByTitle(title)
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            });

    } else {
        db.getNotes()
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
    }
});

app.post('/notes', (req, res) => {
    db.addNote(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteById(id)
    .then(data => {
        if(!data) {
            res.status(404).send(`Note with id ${id} doesn't exist`);
        } else {
            res.send(data);
        }
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.put('/notes', (req, res) => {
    db.updateNote(req.body)
        .then(data => {
            if(!data) {
                res.status(404).send(`Note doesn't exist`);
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.listen(port, () => {
    console.log(`Started node server and listening to port ${port}`);
    db.connect();
});