const express = require('express');
const mongoose = require('mongoose');
const taskroutes = require('./routes/app');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');   //for static files

const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log('Successfully connected to the database');
    }
    )
    .catch(error => {
        console.log('Could not connect to the database. Exiting now...', error);
        process.exit();
    }
    );
    app.use(express.static(__dirname));

app.use('/', taskroutes);

// app.get('/api/alltasks', function(req, res) {
//     // Replace this with your actual code to retrieve the Postman results
//     const postmanResults = [
      
//     ];
  
//     res.json(postmanResults);
//   });
//   app.post('/api/tasks', function(req, res) {
//     // Replace this with your actual code to process the posted task for "/tasks"
//     const task = req.body.task;
//     const priority = req.body.priority;
  
//     // Perform any necessary operations with the task
  
//     res.json({ task: task, priority: priority });
//   });

const tasks=[];
app.route('/alltasks')
  .get(function(req, res) {
    res.json(tasks);
  })
  .post(function(req, res) {
    const task = req.body.task;
    const priority = req.body.priority;

    tasks.push({ task: task, priority: priority });

    res.json({ task: task, priority: priority });
  });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);




