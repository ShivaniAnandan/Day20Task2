// Get the characters container element
const charactersContainer = document.getElementById("characters");

// Initialize variables
let loadMorePage = "";
let currentPage = "https://api.disneyapi.dev/character";

// Function to fetch and display characters
function fetchAndDisplayCharacters(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Ensure the nextPage URL uses HTTPS
            if (data.info.nextPage) {
                loadMorePage = data.info.nextPage.replace('http://', 'https://');
            }

            data.data.forEach(character => {
                const col = document.createElement("div");
                col.className = "col-md-4";

                const card = document.createElement("div");
                card.className = "card";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                const characterName = document.createElement("h5");
                characterName.className = "card-title";
                characterName.textContent = character.name;

                const characterImage = document.createElement("img");
                characterImage.className = "card-img-top";
                characterImage.src = character.imageUrl;
                characterImage.alt = character.name;

                const characterCreatedAt = document.createElement("p");
                characterCreatedAt.textContent = `CreatedAt : ${character.createdAt}`;

                cardBody.append(characterName);
                cardBody.append(characterCreatedAt);
                card.append(characterImage);
                card.append(cardBody);
                col.append(card);
                charactersContainer.append(col);
            });
        })
        .catch(error => console.error('Failed to fetch', error));
}

// Initial fetch and display
fetchAndDisplayCharacters(currentPage);

// Add event listener to load more button
document.getElementById("loadMoreBtn").addEventListener("click", () => {
    if (loadMorePage) {
        fetchAndDisplayCharacters(loadMorePage);
    }
});
