document.addEventListener('DOMContentLoaded', function() {
    const dogListContainer = document.getElementById('dog-list');
    const fetchDogBtn = document.getElementById('fetch-dog-btn');

    function fetchDogs() {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const dogImageUrl = data.message;
                const dogCard = createDogCard(dogImageUrl);
                dogListContainer.appendChild(dogCard);
            })
            .catch(function(error) {
                console.error('Error occur while fetching data:', error);
            });
    }

    function createDogCard(imageUrl) {
        const card = document.createElement('div');
        card.classList.add('dog-card');

        const dogImage = document.createElement('img');
        dogImage.src = imageUrl;
        card.appendChild(dogImage);

        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = 'Leave a comment';
        commentSection.appendChild(inputBox);

        const postButton = document.createElement('button');
        postButton.textContent = 'Post Comment';
        commentSection.appendChild(postButton);

        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments');
        commentSection.appendChild(commentsDiv);

        card.appendChild(commentSection);

        postButton.addEventListener('click', function() {
            const commentText = inputBox.value.trim();
            if (commentText) {
                const comment = document.createElement('p');
                comment.textContent = commentText;
                commentsDiv.appendChild(comment);
                inputBox.value = '';
            }
        });

        return card;
    }

    fetchDogs();

    fetchDogBtn.addEventListener('click', fetchDogs);
});
