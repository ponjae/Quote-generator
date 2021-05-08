const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true;
}

// hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//Get a new random quote from the list
function singleQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 95) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete()
}

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        complete()
        singleQuote();
    } catch (err) {
        console.log('Error: ', err)
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listerner
newQuoteBtn.addEventListener('click', singleQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On load 
getQuotes()