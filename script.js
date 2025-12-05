// ===== CONFIGURATION =====
const CONFIG = {
    SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    GOOGLE_SHEET_URL: 'YOUR_GOOGLE_SHEET_URL_HERE',
    LOGIN_USERNAME: 'admin',
    LOGIN_PASSWORD: 'nmcp2025',
    STORAGE_KEY_PENDING: 'malariaSupervisionPending',
    STORAGE_KEY_DRAFTS: 'malariaSupervisionDrafts',
    TOTAL_SECTIONS: 10
};

// ===== SINGLE FLAT DATA ARRAY =====
// Format: Region||District
// Format: District||Chiefdom
// Format: Chiefdom||Facility
// Format: Facility||UID
const HIERARCHY_DATA = [
    // Region to District
    'Eastern Region||Kailahun District',
    'Eastern Region||Kenema District',
    'Eastern Region||Kono District',
    'Northern Region||Bombali District',
    'Northern Region||Falaba District',
    'Northern Region||Koinadugu District',
    'Northern Region||Tonkolili District',
    'North West Region||Kambia District',
    'North West Region||Karene District',
    'North West Region||Port Loko District',
    'Southern Region||Bo District',
    'Southern Region||Bonthe District',
    'Southern Region||Moyamba District',
    'Southern Region||Pujehun District',
    'Western Area||Western Area Rural District',
    'Western Area||Western Area Urban District',
    // District to Chiefdom (Bo District example)
    'Bo District||Badjia Chiefdom',
    'Bo District||Bagbwe Chiefdom',
    'Bo District||Baoma Chiefdom',
    'Bo District||Bargbo Chiefdom',
    'Bo District||Bo City',
    // Add more district-chiefdom mappings here...
    // Chiefdom to Facility
    'Badjia Chiefdom||Ngelehun (Badjia) CHC',
    'Badjia Chiefdom||Njagbahun (Badjia) MCHP',
    'Badjia Chiefdom||Njandama MCHP',
    'Bagbwe Chiefdom||Barlie MCHP',
    'Bagbwe Chiefdom||Benduma (Bagbwe) MCHP',
    'Bagbwe Chiefdom||Kondiama MCHP',
    // Add more chiefdom-facility mappings here...
    // Facility to UID
    'Ngelehun (Badjia) CHC||xxAfuLUYASs',
    'Njagbahun (Badjia) MCHP||cOJo1p4XAxY',
    'Njandama MCHP||gHahSf0ocWN',
    'Barlie MCHP||AXDmrJDUPHu',
    'Benduma (Bagbwe) MCHP||HOJJW4KMJ40',
    'Kondiama MCHP||d5zcRw5mpNg',
    // Add more facility-UID mappings here...
];

// ===== PARSE SINGLE ARRAY INTO MAPS =====
const REGION_DISTRICT_MAP = {};
const DISTRICT_CHIEFDOM_MAP = {};
const CHIEFDOM_FACILITY_MAP = {};
const FACILITY_UID_MAP = {};

function parseHierarchyData() {
    // First pass: collect all known entities
    const districts = new Set();
    const chiefdoms = new Set();
    const facilities = new Set();
    
    // Identify regions, districts, chiefdoms by patterns
    HIERARCHY_DATA.forEach(line => {
        const parts = line.split('||');
        if (parts.length !== 2) return;
        
        const parent = parts[0].trim();
        const child = parts[1].trim();
        
        // Region -> District (parent contains "Region" or is "Western Area")
        if (parent.includes('Region') || parent === 'Western Area') {
            districts.add(child);
        }
        // District -> Chiefdom (parent ends with "District")
        else if (parent.endsWith('District')) {
            chiefdoms.add(child);
        }
        // Chiefdom -> Facility (parent ends with "Chiefdom" or "City")
        else if (parent.endsWith('Chiefdom') || parent.endsWith('City')) {
            facilities.add(child);
        }
    });
    
    // Second pass: build maps
    HIERARCHY_DATA.forEach(line => {
        const parts = line.split('||');
        if (parts.length !== 2) return;
        
        const parent = parts[0].trim();
        const child = parts[1].trim();
        
        // Region -> District
        if (parent.includes('Region') || parent === 'Western Area') {
            if (!REGION_DISTRICT_MAP[parent]) REGION_DISTRICT_MAP[parent] = [];
            REGION_DISTRICT_MAP[parent].push(child);
        }
        // District -> Chiefdom
        else if (parent.endsWith('District')) {
            if (!DISTRICT_CHIEFDOM_MAP[parent]) DISTRICT_CHIEFDOM_MAP[parent] = [];
            DISTRICT_CHIEFDOM_MAP[parent].push(child);
        }
        // Chiefdom -> Facility
        else if (parent.endsWith('Chiefdom') || parent.endsWith('City')) {
            if (!CHIEFDOM_FACILITY_MAP[parent]) CHIEFDOM_FACILITY_MAP[parent] = [];
            CHIEFDOM_FACILITY_MAP[parent].push(child);
        }
        // Facility -> UID (facility is in facilities set)
        else if (facilities.has(parent)) {
            FACILITY_UID_MAP[parent] = child;
        }
    });
}

// Initialize on load
parseHierarchyData();

// ===== APPLICATION STATE =====
let currentSection = 1;
let formData = {};
let isDraft = true;
let currentDraftId = null;
let isOnline = navigator.onLine;
let gpsCoordinates = null;
let facilityPhoto = null;
let supervisorSignatures = {};
let staffSignature = null;

// ===== DOM ELEMENTS =====
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
const supervisionForm = document.getElementById('supervisionForm');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const formStatusBadge = document.getElementById('formStatusBadge');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const draftCount = document.getElementById('draftCount');
const pendingCount = document.getElementById('pendingCount');
const notification = document.getElementById('notification');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupOnlineOfflineDetection();
    updateStatusDisplay();
    updateDraftCount();
    updatePendingCount();
    populateRegionDropdown();
    initializeSignaturePads();
    requestGPSCoordinates();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('region').addEventListener('change', handleRegionChange);
    document.getElementById('district').addEventListener('change', handleDistrictChange);
    document.getElementById('chiefdom').addEventListener('change', handleChiefdomChange);
    document.getElementById('facilityName').addEventListener('change', handleFacilityChange);
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    document.getElementById('newFormBtn').addEventListener('click', startNewForm);
    document.getElementById('viewDraftsBtn').addEventListener('click', openDraftsModal);
    document.getElementById('viewAnalysisBtn').addEventListener('click', openAnalysisModal);
    document.getElementById('photoInput').addEventListener('change', handlePhotoCapture);
    document.getElementById('capturePhotoBtn').addEventListener('click', () => document.getElementById('photoInput').click());
    document.getElementById('deletePhotoBtn').addEventListener('click', deletePhoto);
    document.getElementById('refreshGpsBtn').addEventListener('click', requestGPSCoordinates);
    
    setupConditionalFields();
    supervisionForm.addEventListener('change', debounce(autoSaveDraft, 2000));
    supervisionForm.addEventListener('input', debounce(autoSaveDraft, 5000));
}

// ===== LOGIN =====
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    
    if (username === CONFIG.LOGIN_USERNAME && password === CONFIG.LOGIN_PASSWORD) {
        loginContainer.style.display = 'none';
        mainContent.classList.add('show');
        showNotification('Login successful! Welcome to the Supervision Checklist.', 'success');
    } else {
        errorEl.textContent = 'Invalid username or password. Please try again.';
        errorEl.classList.add('show');
    }
}

// ===== CASCADING DROPDOWNS =====
function populateRegionDropdown() {
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = '<option value="">-- Select Region --</option>';
    
    Object.keys(REGION_DISTRICT_MAP).sort().forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

function handleRegionChange(e) {
    const region = e.target.value;
    const districtSelect = document.getElementById('district');
    const chiefdomSelect = document.getElementById('chiefdom');
    const facilitySelect = document.getElementById('facilityName');
    
    districtSelect.innerHTML = '<option value="">-- Select District --</option>';
    chiefdomSelect.innerHTML = '<option value="">-- Select Chiefdom --</option>';
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    document.getElementById('facilityId').value = '';
    
    if (region && REGION_DISTRICT_MAP[region]) {
        REGION_DISTRICT_MAP[region].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function handleDistrictChange(e) {
    const district = e.target.value;
    const chiefdomSelect = document.getElementById('chiefdom');
    const facilitySelect = document.getElementById('facilityName');
    
    chiefdomSelect.innerHTML = '<option value="">-- Select Chiefdom --</option>';
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    document.getElementById('facilityId').value = '';
    
    if (district && DISTRICT_CHIEFDOM_MAP[district]) {
        DISTRICT_CHIEFDOM_MAP[district].forEach(chiefdom => {
            const option = document.createElement('option');
            option.value = chiefdom;
            option.textContent = chiefdom;
            chiefdomSelect.appendChild(option);
        });
    }
}

function handleChiefdomChange(e) {
    const chiefdom = e.target.value;
    const facilitySelect = document.getElementById('facilityName');
    
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    document.getElementById('facilityId').value = '';
    
    if (chiefdom && CHIEFDOM_FACILITY_MAP[chiefdom]) {
        CHIEFDOM_FACILITY_MAP[chiefdom].forEach(facility => {
            const option = document.createElement('option');
            option.value = facility;
            option.textContent = facility;
            facilitySelect.appendChild(option);
        });
    }
}

function handleFacilityChange(e) {
    const facility = e.target.value;
    const uid = FACILITY_UID_MAP[facility] || '';
    document.getElementById('facilityId').value = uid;
}

// ===== NAVIGATION =====
function handleNavigation(e) {
    const action = e.target.dataset.action;
    
    switch(action) {
        case 'back':
            if (currentSection > 1) goToSection(currentSection - 1);
            break;
        case 'next':
            if (validateCurrentSection() && currentSection < CONFIG.TOTAL_SECTIONS) {
                goToSection(currentSection + 1);
            }
            break;
        case 'draft':
            saveDraft();
            break;
        case 'finalize':
            finalizeForm();
            break;
        case 'submit':
            submitForm();
            break;
    }
}

function goToSection(sectionNum) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`section${sectionNum}`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionNum;
        updateProgress();
        document.querySelector('.form-content').scrollIntoView({ behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = (currentSection / CONFIG.TOTAL_SECTIONS) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Section ${currentSection} of ${CONFIG.TOTAL_SECTIONS}`;
    
    if (isDraft) {
        formStatusBadge.textContent = 'DRAFT';
        formStatusBadge.className = 'draft';
    } else {
        formStatusBadge.textContent = 'FINALIZED';
        formStatusBadge.className = 'finalized';
    }
}

// ===== VALIDATION =====
function validateCurrentSection() {
    const currentSectionEl = document.getElementById(`section${currentSection}`);
    const requiredFields = currentSectionEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields before proceeding.', 'error');
    }
    return isValid;
}

function validateEntireForm() {
    let isValid = true;
    for (let i = 1; i <= CONFIG.TOTAL_SECTIONS; i++) {
        const sectionEl = document.getElementById(`section${i}`);
        const requiredFields = sectionEl.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) isValid = false;
        });
    }
    return isValid;
}

// ===== FORM DATA =====
function collectFormData() {
    const formElements = supervisionForm.elements;
    const data = {
        timestamp: new Date().toISOString(),
        gpsCoordinates: gpsCoordinates,
        facilityPhoto: facilityPhoto,
        supervisorSignatures: supervisorSignatures,
        staffSignature: staffSignature,
        isDraft: isDraft,
        sections: {}
    };
    
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            if (element.type === 'checkbox') {
                if (!data.sections[element.name]) data.sections[element.name] = [];
                if (element.checked) data.sections[element.name].push(element.value);
            } else if (element.type === 'radio') {
                if (element.checked) data.sections[element.name] = element.value;
            } else {
                data.sections[element.name] = element.value;
            }
        }
    }
    return data;
}

function loadFormData(data) {
    if (!data) return;
    
    gpsCoordinates = data.gpsCoordinates;
    facilityPhoto = data.facilityPhoto;
    supervisorSignatures = data.supervisorSignatures || {};
    staffSignature = data.staffSignature;
    isDraft = data.isDraft !== false;
    
    if (gpsCoordinates) {
        document.getElementById('gpsLatitude').textContent = gpsCoordinates.latitude.toFixed(6);
        document.getElementById('gpsLongitude').textContent = gpsCoordinates.longitude.toFixed(6);
        document.getElementById('gpsAccuracy').textContent = gpsCoordinates.accuracy.toFixed(2);
    }
    
    if (facilityPhoto) {
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = facilityPhoto;
        photoPreview.classList.add('show');
        document.getElementById('deletePhotoBtn').classList.add('show');
    }
    
    if (data.sections) {
        Object.keys(data.sections).forEach(key => {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    const elements = document.querySelectorAll(`[name="${key}"]`);
                    elements.forEach(el => {
                        if (Array.isArray(data.sections[key])) {
                            el.checked = data.sections[key].includes(el.value);
                        } else {
                            el.checked = el.value === data.sections[key];
                        }
                    });
                } else {
                    element.value = data.sections[key];
                    if (element.tagName === 'SELECT') element.dispatchEvent(new Event('change'));
                }
            }
        });
    }
    updateProgress();
}

// ===== DRAFT MANAGEMENT =====
function saveDraft() { openDraftNameModal(); }

function openDraftNameModal() {
    const modal = document.getElementById('draftNameModal');
    const input = document.getElementById('draftNameInput');
    const facilityName = document.getElementById('facilityName').value || 'Unnamed Facility';
    const date = new Date().toLocaleDateString();
    input.value = `${facilityName} - ${date}`;
    modal.classList.add('show');
    
    document.getElementById('saveDraftBtn').onclick = () => {
        const draftName = input.value.trim() || `Draft ${Date.now()}`;
        saveDraftWithName(draftName);
        modal.classList.remove('show');
    };
    document.getElementById('cancelDraftBtn').onclick = () => modal.classList.remove('show');
}

function saveDraftWithName(name) {
    const data = collectFormData();
    data.draftName = name;
    data.draftId = currentDraftId || `draft_${Date.now()}`;
    data.savedAt = new Date().toISOString();
    currentDraftId = data.draftId;
    
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    const existingIndex = drafts.findIndex(d => d.draftId === data.draftId);
    if (existingIndex >= 0) drafts[existingIndex] = data;
    else drafts.push(data);
    
    localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(drafts));
    updateDraftCount();
    showNotification(`Draft "${name}" saved successfully!`, 'success');
}

function autoSaveDraft() {
    if (currentDraftId) {
        const data = collectFormData();
        data.draftName = data.sections.facilityName || 'Auto-saved Draft';
        data.draftId = currentDraftId;
        data.savedAt = new Date().toISOString();
        data.isAutoSave = true;
        
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const existingIndex = drafts.findIndex(d => d.draftId === data.draftId);
        if (existingIndex >= 0) {
            drafts[existingIndex] = data;
            localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(drafts));
        }
    }
}

function loadDraft(draftId) {
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    const draft = drafts.find(d => d.draftId === draftId);
    if (draft) {
        currentDraftId = draftId;
        loadFormData(draft);
        closeDraftsModal();
        goToSection(1);
        showNotification(`Draft "${draft.draftName}" loaded successfully!`, 'success');
    }
}

function deleteDraft(draftId) {
    if (confirm('Are you sure you want to delete this draft?')) {
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const filtered = drafts.filter(d => d.draftId !== draftId);
        localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
        updateDraftCount();
        renderDraftsList();
        showNotification('Draft deleted successfully!', 'success');
    }
}

function openDraftsModal() {
    const modal = document.getElementById('draftsModal');
    modal.classList.add('show');
    renderDraftsList();
    document.getElementById('closeDraftsModal').onclick = closeDraftsModal;
}

function closeDraftsModal() { document.getElementById('draftsModal').classList.remove('show'); }

function renderDraftsList() {
    const container = document.getElementById('draftsList');
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    
    if (drafts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d;">No drafts saved yet.</p>';
        return;
    }
    
    container.innerHTML = drafts.map(draft => `
        <div class="draft-item">
            <div class="draft-item-header">
                <div>
                    <div class="draft-item-name">${draft.draftName}</div>
                    <div class="draft-item-date">Saved: ${new Date(draft.savedAt).toLocaleString()}</div>
                </div>
            </div>
            <div class="draft-item-actions">
                <button class="draft-action-btn load" onclick="loadDraft('${draft.draftId}')">Load</button>
                <button class="draft-action-btn delete" onclick="deleteDraft('${draft.draftId}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateDraftCount() {
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    draftCount.textContent = drafts.length;
}

// ===== FORM SUBMISSION =====
function finalizeForm() {
    if (!validateEntireForm()) {
        showNotification('Please complete all required fields before finalizing.', 'error');
        return;
    }
    if (confirm('Are you sure you want to finalize this form?')) {
        isDraft = false;
        updateProgress();
        showNotification('Form finalized! You can now submit it.', 'success');
    }
}

function submitForm() {
    if (isDraft) {
        showNotification('Please finalize the form before submitting.', 'warning');
        return;
    }
    const data = collectFormData();
    if (isOnline) submitToServer(data);
    else saveForLaterSubmission(data);
}

function submitToServer(data) {
    showNotification('Submitting form...', 'warning');
    fetch(CONFIG.SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        if (currentDraftId) {
            const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
            const filtered = drafts.filter(d => d.draftId !== currentDraftId);
            localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
            updateDraftCount();
        }
        showNotification('Form submitted successfully!', 'success');
        startNewForm();
    })
    .catch(error => {
        console.error('Submission error:', error);
        saveForLaterSubmission(data);
    });
}

function saveForLaterSubmission(data) {
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    data.pendingId = `pending_${Date.now()}`;
    pending.push(data);
    localStorage.setItem(CONFIG.STORAGE_KEY_PENDING, JSON.stringify(pending));
    updatePendingCount();
    
    if (currentDraftId) {
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const filtered = drafts.filter(d => d.draftId !== currentDraftId);
        localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
        updateDraftCount();
    }
    showNotification('Form saved for submission when online.', 'warning');
    startNewForm();
}

function updatePendingCount() {
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    pendingCount.textContent = pending.length;
}

function syncPendingSubmissions() {
    if (!isOnline) return;
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    if (pending.length === 0) return;
    
    pending.forEach((data) => {
        fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            const currentPending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
            const filtered = currentPending.filter(d => d.pendingId !== data.pendingId);
            localStorage.setItem(CONFIG.STORAGE_KEY_PENDING, JSON.stringify(filtered));
            updatePendingCount();
        })
        .catch(error => console.error('Sync error:', error));
    });
}

// ===== NEW FORM =====
function startNewForm() {
    if (confirm('Start a new form? Any unsaved changes will be lost.')) {
        supervisionForm.reset();
        currentSection = 1;
        currentDraftId = null;
        isDraft = true;
        gpsCoordinates = null;
        facilityPhoto = null;
        supervisorSignatures = {};
        staffSignature = null;
        
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = '';
        photoPreview.classList.remove('show');
        document.getElementById('deletePhotoBtn').classList.remove('show');
        
        document.getElementById('gpsLatitude').textContent = '--';
        document.getElementById('gpsLongitude').textContent = '--';
        document.getElementById('gpsAccuracy').textContent = '--';
        
        clearAllSignatures();
        goToSection(1);
        requestGPSCoordinates();
        showNotification('New form started!', 'success');
    }
}

// ===== GPS =====
function requestGPSCoordinates() {
    if (!navigator.geolocation) {
        showNotification('GPS is not supported by your browser.', 'error');
        return;
    }
    
    document.getElementById('gpsLatitude').textContent = 'Loading...';
    document.getElementById('gpsLongitude').textContent = 'Loading...';
    document.getElementById('gpsAccuracy').textContent = 'Loading...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            gpsCoordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: new Date().toISOString()
            };
            document.getElementById('gpsLatitude').textContent = gpsCoordinates.latitude.toFixed(6);
            document.getElementById('gpsLongitude').textContent = gpsCoordinates.longitude.toFixed(6);
            document.getElementById('gpsAccuracy').textContent = gpsCoordinates.accuracy.toFixed(2) + ' m';
            showNotification('GPS coordinates captured!', 'success');
        },
        (error) => {
            document.getElementById('gpsLatitude').textContent = 'Error';
            document.getElementById('gpsLongitude').textContent = 'Error';
            document.getElementById('gpsAccuracy').textContent = 'Error';
            let errorMsg = 'Unable to get GPS coordinates.';
            if (error.code === error.PERMISSION_DENIED) errorMsg = 'GPS permission denied.';
            else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = 'Location unavailable.';
            else if (error.code === error.TIMEOUT) errorMsg = 'GPS request timed out.';
            showNotification(errorMsg, 'error');
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 60000 }
    );
}

// ===== PHOTO =====
function handlePhotoCapture(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        facilityPhoto = event.target.result;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = facilityPhoto;
        photoPreview.classList.add('show');
        document.getElementById('deletePhotoBtn').classList.add('show');
        showNotification('Photo captured successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function deletePhoto() {
    if (confirm('Delete this photo?')) {
        facilityPhoto = null;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = '';
        photoPreview.classList.remove('show');
        document.getElementById('deletePhotoBtn').classList.remove('show');
        document.getElementById('photoInput').value = '';
        showNotification('Photo deleted.', 'success');
    }
}

// ===== SIGNATURES =====
function initializeSignaturePads() {
    for (let i = 1; i <= 4; i++) {
        const canvas = document.getElementById(`supervisorSignature${i}`);
        if (canvas) setupSignaturePad(canvas, `supervisor${i}`);
    }
    const staffCanvas = document.getElementById('staffSignature');
    if (staffCanvas) setupSignaturePad(staffCanvas, 'staff');
}

function setupSignaturePad(canvas, id) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false, lastX = 0, lastY = 0;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || e.touches[0].clientX) - rect.left,
            y: (e.clientY || e.touches[0].clientY) - rect.top
        };
    }
    
    function startDrawing(e) { isDrawing = true; const c = getCoords(e); lastX = c.x; lastY = c.y; }
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const c = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        lastX = c.x; lastY = c.y;
    }
    function stopDrawing() { if (isDrawing) { isDrawing = false; saveSignature(canvas, id); } }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
}

function saveSignature(canvas, id) {
    const dataUrl = canvas.toDataURL('image/png');
    if (id === 'staff') staffSignature = dataUrl;
    else supervisorSignatures[id] = dataUrl;
}

function clearSignature(canvasId, signatureId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (signatureId === 'staff') staffSignature = null;
    else delete supervisorSignatures[signatureId];
}

function clearAllSignatures() {
    for (let i = 1; i <= 4; i++) {
        const canvas = document.getElementById(`supervisorSignature${i}`);
        if (canvas) { const ctx = canvas.getContext('2d'); ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    }
    const staffCanvas = document.getElementById('staffSignature');
    if (staffCanvas) { const ctx = staffCanvas.getContext('2d'); ctx.fillStyle = 'white'; ctx.fillRect(0, 0, staffCanvas.width, staffCanvas.height); }
    supervisorSignatures = {};
    staffSignature = null;
}

// ===== CONDITIONAL FIELDS =====
function setupConditionalFields() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const conditionalField = document.getElementById(`${this.name}Conditional`);
            if (conditionalField) {
                if (this.value === 'No' || this.value === 'no') conditionalField.classList.add('show');
                else conditionalField.classList.remove('show');
            }
        });
    });
}

// ===== ONLINE/OFFLINE =====
function setupOnlineOfflineDetection() {
    window.addEventListener('online', () => {
        isOnline = true;
        updateStatusDisplay();
        syncPendingSubmissions();
        showNotification('You are now online!', 'success');
    });
    window.addEventListener('offline', () => {
        isOnline = false;
        updateStatusDisplay();
        showNotification('You are now offline.', 'warning');
    });
}

function updateStatusDisplay() {
    if (isOnline) {
        statusIndicator.className = 'status-indicator online';
        statusText.textContent = 'ONLINE';
    } else {
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = 'OFFLINE';
    }
}

// ===== ANALYSIS MODAL =====
function openAnalysisModal() {
    const modal = document.getElementById('analysisModal');
    modal.classList.add('show');
    document.getElementById('closeAnalysisModal').onclick = () => modal.classList.remove('show');
    document.getElementById('analysisBody').innerHTML = `<div class="analysis-loading"><p>Analysis feature coming soon!</p></div>`;
}

// ===== UTILITIES =====
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ===== GLOBAL EXPORTS =====
window.loadDraft = loadDraft;
window.deleteDraft = deleteDraft;
window.clearSignature = clearSignature;
