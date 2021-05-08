let apiQuotes = [];


//Get a new random quote from the list
function singleQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote)
}

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        singleQuote();
    } catch (err) {
        console.log('Error: ', err)
    }
}

// On load 
getQuotes()