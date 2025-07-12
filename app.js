// app.js
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Get references to all DOM elements ---
    const mofGrid = document.getElementById('mof-grid');
    const metalFiltersContainer = document.getElementById('metal-filters');
    const ligandFilterSelect = document.getElementById('ligand-filter'); // New element
    const resultCount = document.getElementById('result-count');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort-by');
    const conductivitySlider = document.getElementById('conductivity-slider');
    const sliderValueDisplay = document.getElementById('slider-value');

    // --- 2. Populate the UI with data ---

    // Create and add MOF cards to the grid
    mofData.forEach(item => {
        const conductivity = parseFloat(item['Conductivity (S/cm)']);
        let conductivityTagColor = 'bg-slate-200 text-slate-800';
        if (conductivity > 1) conductivityTagColor = 'bg-blue-200 text-blue-800';
        if (conductivity > 100) conductivityTagColor = 'bg-red-200 text-red-800';

        const card = document.createElement('div');
        card.className = `grid-item p-4 bg-white rounded-lg shadow-md mb-4 flex flex-col ${item.Metal}`;
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-slate-900 mb-1 name">${item['MOF Name']}</h3>
                <span class="conductivity-tag text-xs font-semibold px-2.5 py-1 rounded-full ${conductivityTagColor}">${conductivity.toExponential(2)} S/cm</span>
            </div>
            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold">Metal:</span> ${item.Metal} | 
                <span class="font-semibold">Ligand:</span> <span class="ligand-text">${item.Ligand}</span>
            </p>
            <p class="text-sm text-slate-700"><span class="font-semibold">Application:</span> ${item.Application}</p>
            <p class="text-sm text-slate-600 mt-2 flex-grow italic">“${item['Research Title']}”</p>
            ${item.imageFile ? `<img src="${item.imageFile}" alt="${item.Ligand}" class="rounded-md mt-3 self-center">` : ''}
            <a href="https://www.google.com/search?q=${encodeURIComponent(item['Research Title'])}" target="_blank" rel="noopener noreferrer" class="mt-4 text-center w-full bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-700 transition-colors">
                Search Title on Google
            </a>
            <span class="conductivity" style="display:none;">${conductivity}</span>
        `;
        mofGrid.appendChild(card);
    });

    // Create and add metal filter checkboxes
    const metals = [...new Set(mofData.map(item => item.Metal))].sort();
    metals.forEach(metal => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'flex items-center';
        checkboxDiv.innerHTML = `
            <input id="${metal}" type="checkbox" value="${metal}" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 metal-checkbox">
            <label for="${metal}" class="ml-2 block text-sm text-slate-900">${metal}</label>
        `;
        metalFiltersContainer.appendChild(checkboxDiv);
    });

    // NEW: Populate the ligand filter dropdown
    const ligands = [...new Set(mofData.map(item => item.Ligand))].sort();
    ligandFilterSelect.innerHTML = '<option value="all">All Ligands</option>';
    ligands.forEach(ligand => {
        const option = document.createElement('option');
        option.value = ligand;
        option.textContent = ligand;
        ligandFilterSelect.appendChild(option);
    });


    // --- 3. Initialize Isotope ---
    const iso = new Isotope(mofGrid, {
        itemSelector: '.grid-item',
        layoutMode: 'vertical',
        getSortData: { name: '.name', conductivity: '.conductivity parseFloat' }
    });
    iso.arrange({ sortBy: 'conductivity', sortAscending: false });
    updateResultCount();

    // --- 4. Unified Filtering Logic ---
    let searchTerm = '';
    let checkedMetals = [];
    let selectedLigand = 'all'; // New state variable for the ligand filter
    let conductivityThreshold = Math.pow(10, -14);

    function applyAllFilters() {
        iso.arrange({
            filter: function(itemElem) {
                const text = itemElem.textContent.toLowerCase();
                const conductivity = parseFloat(itemElem.querySelector('.conductivity').textContent);
                const metalClass = Array.from(itemElem.classList).find(c => metals.includes(c));
                const ligandText = itemElem.querySelector('.ligand-text').textContent; // Get ligand text

                const searchMatch = text.includes(searchTerm);
                const conductivityMatch = conductivity >= conductivityThreshold;
                const metalMatch = checkedMetals.length > 0 ? checkedMetals.includes(metalClass) : true;
                const ligandMatch = selectedLigand === 'all' ? true : ligandText === selectedLigand; // Check against selected ligand

                return searchMatch && conductivityMatch && metalMatch && ligandMatch;
            }
        });
        updateResultCount();
    }
    
    // --- 5. Wire Up Event Listeners ---
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        iso.arrange({ sortBy: sortBy, sortAscending: sortBy === 'conductivity-asc' });
    });

    searchInput.addEventListener('keyup', () => {
        searchTerm = searchInput.value.toLowerCase();
        applyAllFilters();
    });

    metalFiltersContainer.addEventListener('change', () => {
        checkedMetals = Array.from(metalFiltersContainer.querySelectorAll('input:checked')).map(cb => cb.value);
        applyAllFilters();
    });
    
    // NEW: Add event listener for the ligand dropdown
    ligandFilterSelect.addEventListener('change', () => {
        selectedLigand = ligandFilterSelect.value;
        applyAllFilters();
    });

    conductivitySlider.addEventListener('input', () => {
        const sliderRawValue = parseInt(conductivitySlider.value);
        conductivityThreshold = Math.pow(10, sliderRawValue);
        sliderValueDisplay.textContent = sliderRawValue === -14 ? 'Any' : `> ${conductivityThreshold.toExponential(1)} S/cm`;
        applyAllFilters();
    });
    
    function updateResultCount() {
         setTimeout(() => {
            resultCount.textContent = `${iso.filteredItems.length} of ${mofData.length} results shown`;
        }, 300);
    }
});
