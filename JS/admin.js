const sidebar = document.querySelector('.sidebar ul');
const traitContainers = document.querySelectorAll('.trait-container');
const addTraitButtons = document.querySelectorAll('.add-trait');

// Load traits from storage or default values
function loadTraits() {
    const storedTraits = JSON.parse(localStorage.getItem('traits')) || {};

    for (const traitContainer of traitContainers) {
        const traitName = traitContainer.dataset.trait;
        const traits = storedTraits[traitName] || [];

        // Create trait items for each stored trait
        traits.forEach(trait => {
            const traitItem = document.createElement('div');
            traitItem.classList.add('trait-item');
            traitItem.setAttribute('data-trait-id', trait.id);

            const image = document.createElement('img');
            image.src = trait.imageUrl;
            traitItem.appendChild(image);

            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.innerHTML = '×';
            deleteIcon.addEventListener('click', () => {
                deleteTrait(traitItem);
            });
            traitItem.appendChild(deleteIcon);

            traitContainer.querySelector('.traits').appendChild(traitItem);
        });
    }
}

// Handle sidebar clicks to show/hide trait containers
sidebar.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName === 'LI') {
        const traitName = target.dataset.trait;
        for (const traitContainer of traitContainers) {
            if (traitContainer.dataset.trait === traitName) {
                traitContainer.style.display = 'flex';
            } else {
                traitContainer.style.display = 'none';
            }
        }
    }
});

// Function to delete a trait
function deleteTrait(traitItem) {
    traitItem.remove();
    const traitId = traitItem.dataset.traitId;
    const traitName = traitItem.parentElement.parentElement.dataset.trait;

    // Update storage
    const storedTraits = JSON.parse(localStorage.getItem('traits')) || {};
    storedTraits[traitName] = storedTraits[traitName].filter(trait => trait.id !== traitId);
    localStorage.setItem('traits', JSON.stringify(storedTraits));
}

// Handle adding a new trait
addTraitButtons.forEach(button => {
    button.addEventListener('click', () => {
        const traitName = button.parentElement.dataset.trait;
        const newTrait = {
            id: Date.now(),
            imageUrl: 'placeholder.png', // Replace with actual image URL
        };

        // Create and append new trait item
        const traitItem = document.createElement('div');
        traitItem.classList.add('trait-item');
        traitItem.setAttribute('data-trait-id', newTrait.id);
        const image = document.createElement('img');
        image.src = newTrait.imageUrl;
        traitItem.appendChild(image);

        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.innerHTML = '×';
        deleteIcon.addEventListener('click', () => {
            deleteTrait(traitItem);
        });
        traitItem.appendChild(deleteIcon);

        button.parentElement.querySelector('.traits').appendChild(traitItem);

        // Update storage
        const storedTraits = JSON.parse(localStorage.getItem('traits')) || {};
        if (!storedTraits[traitName]) {
            storedTraits[traitName] = [];
        }
        storedTraits[traitName].push(newTrait);
        localStorage.setItem('traits', JSON.stringify(storedTraits));
    });
});

// Load traits on page load
loadTraits();
