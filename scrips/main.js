const question = document.querySelector('.question')
const choices = document.querySelectorAll('[data-number]')
const scores = document.querySelectorAll('.score')
choices.forEach((choice) => { choice.addEventListener('click', (event) => { const response = event.target.innerText }) })

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let counterAnswer = 0
let availiableQuestions = []

let questions = [
    {
        question: "qual é a comida que jiraya não gostava?",
        choice1: "Wakame",
        choice2: "Sushi",
        choice3: "Konbu",
        choice4: "Kiwis e gratinados",
        answer: 4
    },

    {
        question: "qual era o animal invodado por Orochimaru?",
        choice1: "Cobra",
        choice2: "Sapo",
        choice3: "Lesma",
        choice4: "Macaco",
        answer: 1
    },

    {
        question: "qual posição de Hokage Tsunade ocupou?",
        choice1: "Terceira Hokage",
        choice2: "Segunda Hokage",
        choice3: "Quinta Hokage",
        choice4: "Sétima Hokage",
        answer: 3
    },

    {
        question: "quanto tempo jiraya treinou Naruto?",
        choice1: "4 anos",
        choice2: "3 anos",
        choice3: "10 anos",
        choice4: "Ele não treinou Naruto",
        answer: 2
    },

    {
        question: "quem matou jiraya?",
        choice1: "Nagato",
        choice2: "Orochimaru",
        choice3: "Pain",
        choice4: "Tsunade",
        answer: 3
    },

    {
        question: "quem treinou os 3 sannins?",
        choice1: "Kakashi Katake",
        choice2: "Raruzen Sarutobi",
        choice3: "Mito Uzumaki",
        choice4: "Hashirama Senzu",
        answer: 2
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availiableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availiableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        localStorage.getItem(score)
        return window.location.assign('/end.html')
    }

    const questionIndex = Math.floor(Math.random() * availiableQuestions.length)
    currentQuestion = availiableQuestions[questionIndex]

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availiableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            counterAnswer++
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 300)
    })
})

startGame()