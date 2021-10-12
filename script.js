const cards = document.querySelectorAll('.card'); // define constante das cards
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// seta ação de virar cartas: não prossegue caso lockBoard = true (quando duas cartas estão viradas), não prossegue quando this = firstCard( impede de clicar na mesma carta); adiciona classe 'flip' ao elemento 'card' quando clicada e roda função que checa o match
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    
        checkForMatch();
}

// checa se as cartas clicadas são iguais
function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }
    unflipCards();
}

// desabilita cartas 
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// vira as cartas
function unflipCards(){
    lockBoard = true; 
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// função que embaralha a ordem dos cards logo que a função é definida (immediatly invoked function)
(function shuffle(){
    cards.forEach((card) =>{
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();



// para cada 'card' clicado, adiciona evento de clique e aciona função 'flipcard'
cards.forEach((card) =>{
    card.addEventListener('click', flipCard)
});
