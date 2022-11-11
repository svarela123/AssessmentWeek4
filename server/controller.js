const goals = require('./db.json')
let globalId = 3

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortune = ["Allow compassion to guide your decisions.", "An acquaintance of the past will affect you in the near future.", "An agreeable romance might begin to take on the appearance.","An important person will offer you support.","Any decision you have to make tomorrow is a good decision."];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortune.length);
        let randomFortune = fortune[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getInspiration: (req, res) => {
        const inspiration = ["Real change, enduring change, happens one step at a time.", "Wake up determined, go to bed satisfied.", "Life is like riding a bicycle. To keep your balance, you must keep moving."]
      
        // choose random inspirational quote
        let randomIndex = Math.floor(Math.random() * inspiration.length);
        let randomInspiration = inspiration[randomIndex];
      
        res.status(200).send(randomInspiration);
    },

    getEncouragement: (req, res) => {
        const encouragement = ["Keep your face always toward the sunshine―and shadows will fall behind you.", "Success is stumbling from failure to failure with no loss of enthusiasm.", "Only those who will risk going too far can possibly find out how far one can go."]
      
        // choose random inspirational quote
        let randomIndex = Math.floor(Math.random() * encouragement.length);
        let randomEncouragement = encouragement[randomIndex];
      
        res.status(200).send(randomEncouragement);
    },

    getGoals: (req, res) => res.status(200).send(goals),
    deleteGoal: (req, res) => {
        let index = goals.findIndex(elem => elem.id === +req.params.id)
        goals.splice(index, 1)
        res.status(200).send(goals)
    },
    createGoal: (req, res) => {
        let { title, rating, imageURL } = req.body
        let newgoal = {
            id: globalId,
            title, 
            rating,
            imageURL
        }
        goals.push(newgoal)
        res.status(200).send(goals)
        globalId++
    },
    updateGoal: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = goals.findIndex(elem => +elem.id === +id)

        if (goals[index].rating === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (goals[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            goals[index].rating++
            res.status(200).send(goals)
        } else if (type === 'minus') {
            goals[index].rating--
            res.status(200).send(goals)
        } else {
            res.sendStatus(400)
        }
    }
}
