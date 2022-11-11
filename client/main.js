const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const inspirationBtn = document.getElementById("inspirationButton")
const encouragementBtn = document.getElementById("encouragementButton")


const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/goals`

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const errCallback = err => console.log(err.response.data)

const getAllGoals = () => axios.get(baseURL).then(goalsCallback).catch(errCallback)
const createGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(errCallback)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)
const updateGoal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(goalsCallback).catch(errCallback)


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getInspiration = () => {
    axios.get("http://localhost:4000/api/inspiration/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getEncouragement = () => {
    axios.get("http://localhost:4000/api/encouragement/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createGoal(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createGoalCard(goal) {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = `<img alt='goal cover' src=${goal.imageURL} class="goal-cover"/>
    <p class="goal-title">${goal.title}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goal.id}, 'minus')">-</button>
        <p class="goal-rating">${goal.rating} stars</p>
        <button onclick="updateGoal(${goal.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${goal.id})">delete</button>
    `


    goalsContainer.appendChild(goalCard)
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}



complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
inspirationBtn.addEventListener('click', getInspiration)
encouragementBtn.addEventListener('click', getEncouragement)

form.addEventListener('submit', submitHandler)

getAllGoals()