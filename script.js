const quote = document.querySelector('.quote');
const quoteBtn = document.querySelector('.quoteBtn');
const authorName = document.querySelector('.name');
const readQuote = document.querySelector('.read-quote');
const copyQuote = document.querySelector('.copy-quote');
const tweetQuote = document.querySelector('.tweet-quote');


quoteBtn.addEventListener('click', generateQuote);
readQuote.addEventListener('click', funcSpeech);

copyQuote.addEventListener('click', () =>{
    navigator.clipboard.writeText(quote.innerHTML);

    //copy button function
    copyQuote.innerHTML = '<i class="fa-solid fa-check"></i>'
    setTimeout(()=>{
        copyQuote.innerHTML = '<i class="fas fa-copy"></i>'
    }, 1000)
});

//tweet function
tweetQuote.addEventListener('click', () =>{
    let tweetLink = `https://twitter.com/intent/tweet?url=${quote.innerHTML}`;

    //opening a new tweet on Twitter webpage and putting 'new quote' in it's url
    window.open(tweetLink, '_blank')
});

function generateQuote(){
    quoteBtn.innerHTML = 'Loading Quote...';
    quoteBtn.classList.add('loading');

    //fecthing quotes from an API and then parsing into JS object
    fetch('https://api.quotable.io/random').then(res => res.json()).then(newQuote =>{
        quote.innerHTML = newQuote.content;
        authorName.innerHTML = newQuote.author;
        quoteBtn.innerHTML = 'New Quote';
        quoteBtn.classList.remove('loading');
    })

    if(funcSpeech() = true){
        return
    }
}

function funcSpeech(){
    //using web sppech api(SpeechSynthesisUtterance) that represents a speech request
    let speech = new SpeechSynthesisUtterance(`${quote.innerHTML} by ${authorName.innerHTML}`)

    //using speechSynthesis method(speak) to speak the 'speech' 
    speechSynthesis.speak(speech);
}