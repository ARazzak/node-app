const express = require('express');
const app = express();

//Middlewire
app.use(express.json());

//Get - Read Data
//Post - add/create Data
//Put/Patch - update Data
//Delete - Delete Data

let notes = [
    {
        id: 1,
        title: 'note title 1',
        description: 'note description 1'
    },

    {
        id: 2,
        title: 'note title 2',
        description: 'note description 2'
    }

]




app.get('/', (req, res) => {
    res.send('Welcome to Notes App. Here You can Manage Your Note');
});

//Get Notes
app.get('/notes', (req, res) => {
    if(notes.length == 0){
        return res.send('No Notes Found or Not Yet created');
    }
    res.send(notes);
});

//Get Single Note
app.get('/notes/:noteId', (req, res) => {
    const noteId = parseInt(req.params.noteId);
    const note = notes.find(note => note.id === noteId);
    if(note) return res.send(note);
    res.status(404).send('Note Not Found');
});

//Adding Note
app.post('/notes', (req, res) => {
    const note = req.body;
    notes = [...notes, note];
    res.send(notes);
    
});

//Update note(Put Request)
app.put('/notes/:noteId', (req, res) => {
    const nodeId = parseInt(req.params.noteId);
    const noteInput = req.body;
    const gotNoteInput = Object.keys(noteInput);
    const allowedUpdates = ['title', 'description'];
    const isAllowed = gotNoteInput.every(update => 
        allowedUpdates.includes(update)
        );
        if(!isAllowed){
            return res.status(400).send('Invalid operation');
        }
        const note = notes.find(note => note.id === noteId);
        if(note){
            //Success update
            notes = notes.map(note => {
                if(note.id === noteId){
                    return {
                        ...note,
                        ...noteInput
                    };
                }else {
                    return note;
                }
            });
            return res.send(notes);
        }else {
            //Deal with Note That Not Found
            return res.status(404).send('Note Not Found');
        }
    
        //Server Error
        res.status(500).send('Internal server Error');
    
});


// app.get('/hello/:name', (req, res) => {
//     const name = req.params.name;
//     res.send(`Hello ${name}`);

// });

//Not Found
app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

//server creating 
app.listen(3000, () => {
    console.log('server created and listening port no 3000');
});
