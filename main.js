// main.js
document.addEventListener('DOMContentLoaded', async function () {
    const apiKey = "QITquCbvASgToco4IJRqwlFllNyR1BvCAl7P0kAs";
    
    // Fetch quotes from API based on category
    async function fetchQuotes(category) {
        const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
        
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "X-Api-Key": apiKey
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Display quote
    function displayQuote(index) {
        const quoteElement = document.getElementById('quote');
        if (quotes.length > 0 && index >= 0 && index < quotes.length) {
            const quoteText = quotes[index].quote;
            quoteElement.innerText = quoteText || 'Quote text is not available';
        } else {
            quoteElement.innerText = 'No quotes available';
        }
    }

    // Fetch quotes and display on page load
    let quotes = [];
    try {
        // Fetch quotes from the "inspirational" category initially
        quotes = await fetchQuotes("inspirational","computers","family", "fitness");
        displayQuote(0);
    } catch (error) {
        console.error('Failed to fetch quotes:', error);
    }

    // Automatically change quotes every 10 seconds
    setInterval(async () => {
        try {
            quotes = await fetchQuotes("inspirational");
            currentIndex = (currentIndex + 1) % quotes.length;
            displayQuote(currentIndex);
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        }
    }, 10000); // 10 seconds interval
});
