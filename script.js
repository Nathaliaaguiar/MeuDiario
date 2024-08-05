document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    loadTheme();
});

function addEntry() {
    const entryText = document.getElementById('entry').value;
    if (entryText.trim() === '') {
        alert('Por favor, escreva uma entrada.');
        return;
    }

    const entry = {
        text: entryText,
        date: new Date().toLocaleString()
    };

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
    document.getElementById('entry').value = '';

    renderEntries(entries);
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
        entryDiv.className = 'entry';

        const entryDate = document.createElement('div');
        entryDate.className = 'entry-date';
        entryDate.innerText = entry.date;

        const entryText = document.createElement('div');
        entryText.className = 'entry-text';
        entryText.innerText = entry.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => deleteEntry(index);

        entryDiv.appendChild(entryDate);
        entryDiv.appendChild(entryText);
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
    document.getElementById('theme').value = theme;
}