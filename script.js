document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    loadTheme();
});

function addEntry() {
    const entryText = document.getElementById('entry').value;
    const entryImage = document.getElementById('image').files[0];

    if (entryText.trim() === '') {
        alert('Por favor, escreva uma entrada.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const entry = {
            text: entryText,
            date: new Date().toLocaleString(),
            image: event.target.result
        };

        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        document.getElementById('entry').value = '';
        document.getElementById('image').value = '';

        renderEntries(entries);
    };

    if (entryImage) {
        reader.readAsDataURL(entryImage);
    } else {
        const entry = {
            text: entryText,
            date: new Date().toLocaleString(),
            image: null
        };

        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        document.getElementById('entry').value = '';

        renderEntries(entries);
    }
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    renderEntries(entries);
}

function renderEntries(entries) {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = '';

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const dateP = document.createElement('p');
        dateP.classList.add('entry-date');
        dateP.textContent = entry.date;
        entryDiv.appendChild(dateP);

        const textP = document.createElement('p');
        textP.classList.add('entry-text');
        textP.textContent = entry.text;
        entryDiv.appendChild(textP);

        if (entry.image) {
            const img = document.createElement('img');
            img.classList.add('entry-image');
            img.src = entry.image;
            entryDiv.appendChild(img);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => deleteEntry(index);
        entryDiv.appendChild(deleteBtn);

        entriesContainer.appendChild(entryDiv);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries(entries);
}

function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
}