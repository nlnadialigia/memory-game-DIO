const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false

function flipCard() {
    if (lockBoard) return
    if (this == firstCard) return //operação para não permitir clicar 2 vezes na mesma carta

    this.classList.add('flip')
    //o this representa a carta que está sendo selecionada

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlippedCard = false
    checkForMath()
}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards()
        return
    }

    unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
    }, 1500);
    resetBoard()
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffleCards() {
    //mexe com o atributo order do css
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random()*12)
        card.style.order = randomPosition
        //math.floor = arrendonda o valor encontrado
        //math.random = números entre 0 e 1
    })
})()//a função é invocada automaticamente quando a página é iniciada

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})



