// Group Generator Logic
document.getElementById('generateButton').addEventListener('click', generateGroups);

function generateGroups() {
    const namesTextarea = document.getElementById('namesTextarea');
    const groupCountInput = document.getElementById('groupCount');
    const generatedGroupsDiv = document.getElementById('generatedGroups');

    const names = namesTextarea.value.split('\n').map(name => name.trim()).filter(name => name.length > 0);
    const groupCount = parseInt(groupCountInput.value);

    if (groupCount > 0 && names.length > 0) {
        const shuffledNames = shuffle(names);
        const groups = createGroups(shuffledNames, groupCount);
        displayGroups(groups, generatedGroupsDiv);

        // Save groups to localStorage
        localStorage.setItem('generatedGroups', JSON.stringify(groups));
    } else {
        generatedGroupsDiv.innerHTML = '<p>Please enter valid names and group count.</p>';
    }
}

// Load groups from localStorage on page load
window.addEventListener('load', () => {
    const savedGroups = JSON.parse(localStorage.getItem('generatedGroups'));
    if (savedGroups) {
        displayGroups(savedGroups, document.getElementById('generatedGroups'));
    }

    const savedComponents = JSON.parse(localStorage.getItem('savedComponents'));
    if (savedComponents) {
        savedComponents.forEach(displayComponent);
    }
});

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create groups from shuffled names
function createGroups(names, groupCount) {
    const groups = Array.from({ length: groupCount }, () => []);
    names.forEach((name, index) => {
        groups[index % groupCount].push(name);
    });
    return groups;
}

// Display generated groups
function displayGroups(groups, container) {
    container.innerHTML = ''; // Clear previous groups
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `<strong>Group ${index + 1}:</strong> ${group.join(', ')}`;
        container.appendChild(groupDiv);
    });
}

// Component Sheet Logic
document.getElementById('saveComponentButton').addEventListener('click', saveComponent);

function saveComponent() {
    const componentName = document.getElementById('componentName').value;
    const contentTextarea = document.getElementById('contentTextarea').value;
    const styleTextarea = document.getElementById('styleTextarea').value;
    const behaviorTextarea = document.getElementById('behaviorTextarea').value;
    const reusabilityTextarea = document.getElementById('reusabilityTextarea').value;

    if (componentName && contentTextarea && styleTextarea) {
        const component = {
            name: componentName,
            content: contentTextarea,
            style: styleTextarea,
            behavior: behaviorTextarea,
            reusability: reusabilityTextarea
        };

        const components = JSON.parse(localStorage.getItem('savedComponents')) || [];
        components.push(component);
        localStorage.setItem('savedComponents', JSON.stringify(components));

        displayComponent(component);
    } else {
        alert('Please fill out all fields.');
    }
}

function displayComponent(component) {
    const savedComponentsDiv = document.getElementById('savedComponents');
    const componentDiv = document.createElement('div');
    componentDiv.className = 'component-item';
    componentDiv.innerHTML = `
        <strong>Name:</strong><p class="title">${component.name}</p>
        <strong>Content:</strong><p>${component.content}</p>
        <strong>Style:</strong><p>${component.style}</p>
        <strong>Behavior:</strong><p>${component.behavior}</p>
        <strong>Reusability and Flexibility:</strong><p>${component.reusability}</p>
        <button onclick="removeComponent(this)">Remove</button>
    `;
    savedComponentsDiv.appendChild(componentDiv);
}

// Remove a saved component
function removeComponent(button) {
    const componentDiv = button.closest('.component-item');
    const componentName = componentDiv.querySelector('.title').textContent;

    // Remove from localStorage
    let components = JSON.parse(localStorage.getItem('savedComponents')) || [];
    components = components.filter(comp => comp.name !== componentName);
    localStorage.setItem('savedComponents', JSON.stringify(components));

    componentDiv.remove();
}

// Group Generator Toggle Logic
document.getElementById('toggleGroupGeneratorButton').addEventListener('click', toggleGroupGenerator);

function toggleGroupGenerator() {
    const groupGenerator = document.getElementById('groupGenerator');
    const toggleButton = document.getElementById('toggleGroupGeneratorButton');

    if (groupGenerator.classList.contains('hidden')) {
        groupGenerator.classList.remove('hidden');
        toggleButton.textContent = 'Hide Group Generator'; // Update button text
    } else {
        groupGenerator.classList.add('hidden');
        toggleButton.textContent = 'Show Group Generator'; // Update button text
    }
}