// Create web server and listen on port 3000
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Comments
const comments = [];

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// Create a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex !== -1) {
    comments[commentIndex] = req.body;
    res.json(comments[commentIndex]);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex !== -1) {
    comments.splice(commentIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
