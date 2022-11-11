const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller')
const { getFortune } = require('./controller')
const { getInspiration } = require('./controller')
const { getEncouragement } = require('./controller')

const { getGoals, deleteGoal, createGoal, updateGoal } = require('./controller.js')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/inspiration", getInspiration);
app.get("/api/encouragement", getEncouragement);

app.get('/api/goal', getGoals)
app.delete('/api/goal/:id', deleteGoal)
app.post('/api/goal', createGoal)
app.put('/api/goal/:id', updateGoal)

app.listen(4000, () => console.log("Server running on 4000"));
