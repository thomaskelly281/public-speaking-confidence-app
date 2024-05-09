document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
      {
        quote: "Let thy speech be better than silence, or be silent.",
        author: "Dionysius Of Halicarnassus",
      },
      {
        quote:
          "It usually takes me more than three weeks to prepare a good impromptu speech.",
        author: "Mark Twain",
      },
      {
        quote:
          "Speech is power: speech is to persuade, to convert, to compel",
        author: "Ralph Waldo Emerson",
      },
      {
        quote:
          "Oratory is the power to talk people out of their sober and natural opinions.",
        author: "Joseph Chatfield",
      },
      {
        quote:
          "Be still when you have nothing to say; when genuine passion moves you, say what you’ve got to say, and say it hot.",
        author: "D. H. Lawrence",
      },
      {
        quote: "Before anything else, preparation is the key to success.",
        author: "Alexander Graham Bell",
      },
      {
        quote: "The most precious things in speech are the... pauses.",
        author: "Sir Ralph Richardson",
      },
    ];

    // Function to get a random quote
    function getRandomQuote(quotesArray) {
      const randomIndex = Math.floor(Math.random() * quotesArray.length);
      return quotesArray[randomIndex];
    }

    // Get a random quote
    const randomQuote = getRandomQuote(quotes);

    // Display the quote and author
    document.getElementById("quote").textContent = randomQuote.quote;
    document.getElementById(
      "author"
    ).textContent = `- ${randomQuote.author}`;
  });