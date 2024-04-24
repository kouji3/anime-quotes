// HTML elements
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const quoteAnime = document.querySelector('#quote-anime');
const fetchQuoteButton = document.querySelector('#fetch-quote');
const addToFavoritesButton = document.querySelector('#add-to-favorites');
const toggleThemeButton = document.querySelector('#toggle-theme');
const favoritesContainer = document.querySelector('#favorites-container');
const favoritesList = document.querySelector('#favorites-list');

// Variables to hold the current quote and favorites list
let currentQuote = {};
let favorites = [];
const apiUrl = 'https://animechan.xyz/api/random';

// Function to fetch a new quote from the API
async function fetchNewQuote() {
    try {
        const response = await fetch(apiUrl);
        const quoteData = await response.json();

        // Update the current quote
        currentQuote = {
            quote: quoteData.quote,
            character: quoteData.character,
            anime: quoteData.anime
        };

        // Update the quote display
        quoteText.textContent = `"${quoteData.quote}"`;
        quoteAuthor.textContent = `- ${quoteData.character}`;
        quoteAnime.textContent = `Anime: ${quoteData.anime}`;
    } catch (error) {
        quoteText.textContent = 'Failed to fetch a quote. Please try again.';
        quoteAuthor.textContent = '';
        quoteAnime.textContent = '';
        console.error('Error fetching quote:', error);
    }
}

// Function to add the current quote to favorites
function addToFavorites() {
    // Check if the quote is already in the favorites list
    const isAlreadyFavorite = favorites.some(favorite => favorite.quote === currentQuote.quote && favorite.character === currentQuote.character);

    if (!isAlreadyFavorite) {
        // Add the current quote to favorites
        favorites.push(currentQuote);
        updateFavoritesList();
    }
}

// Function to update the favorites list display
function updateFavoritesList() {
    favoritesList.innerHTML = favorites.map((quote, index) => `
        <div class="quote-item">
            <p>"${quote.quote}"</p>
            <p><strong>- ${quote.character}</strong></p>
            <p><em>Anime: ${quote.anime}</em></p>
            <button onclick="removeFromFavorites(${index})">Remove</button>
        </div>
    `).join('');
}

// Function to remove a quote from favorites
function removeFromFavorites(index) {
    favorites.splice(index, 1);
    updateFavoritesList();
}

// Function to toggle dark theme
// Function to toggle dark theme
// Function to toggle dark theme
function toggleDarkTheme() {
    const body = document.body;
    const toggleThemeButton = document.querySelector('#toggle-theme');
    
    // Toggle the 'dark-theme' class on the body
    body.classList.toggle('dark-theme');
    
    // Change the button icon based on the theme
    if (body.classList.contains('dark-theme')) {
        toggleThemeButton.innerHTML = '&#9728;'; // Sun icon for light mode
    } else {
        toggleThemeButton.innerHTML = '&#127769;'; // Moon icon for dark mode
    }
}

// Add event listeners to buttons
fetchQuoteButton.addEventListener('click', fetchNewQuote);
addToFavoritesButton.addEventListener('click', addToFavorites);
toggleThemeButton.addEventListener('click', toggleDarkTheme);

// Fetch the initial quote when the page loads
window.addEventListener('load', fetchNewQuote);

