import './style.css'
import { areas, people, roleDefinitions, projects, sops } from './data.js'

const container = document.getElementById('raci-container');
const legendContainer = document.getElementById('legend-grid');
const viewToggle = document.getElementById('view-toggle');
const personFilter = document.getElementById('person-filter');
const projectFilter = document.getElementById('project-filter');

let currentNav = 'raci';
let currentView = 'grid';
let currentPersonFilter = 'all';
let currentProjectFilter = 'all';
let currentSort = 'label';

function getFilteredAreas() {
  let filtered = currentPersonFilter === 'all'
    ? [...areas]
    : areas.filter(area =>
      area.r.includes(currentPersonFilter) ||
      area.a.includes(currentPersonFilter) ||
      area.c.includes(currentPersonFilter) ||
      area.i.includes(currentPersonFilter)
    );

  if (currentProjectFilter !== 'all') {
    filtered = filtered.filter(area => area.project === currentProjectFilter);
  }

  return filtered.sort((a, b) => {
    // Pinned content always first
    if (a.id === 'dae_team_management') return -1;
    if (b.id === 'dae_team_management') return 1;

    if (currentSort === 'project') {
      const projA = getProjectName(a.project);
      const projB = getProjectName(b.project);
      if (projA !== projB) return projA.localeCompare(projB);
    } else if (currentSort.startsWith('effective')) {
      const dateA = a.effectiveDate || 'TBD';
      const dateB = b.effectiveDate || 'TBD';

      // Move TBD to end regardless of direction
      if (dateA === 'TBD' && dateB !== 'TBD') return 1;
      if (dateA !== 'TBD' && dateB === 'TBD') return -1;

      if (dateA !== dateB) {
        return currentSort === 'effective-asc'
          ? dateA.localeCompare(dateB)
          : dateB.localeCompare(dateA);
      }
    }

    // Default: Sort by label
    return a.label.localeCompare(b.label);
  });
}

function getFilteredSOPs() {
  let filtered = [...sops];

  if (currentPersonFilter !== 'all') {
    filtered = filtered.filter(sop => sop.responsible === currentPersonFilter);
  }

  if (currentProjectFilter !== 'all') {
    filtered = filtered.filter(sop => sop.project === currentProjectFilter);
  }

  return filtered;
}

function render() {
  if (currentNav === 'raci') {
    if (currentView === 'grid') renderGrid();
    else renderTable();
  } else {
    if (currentView === 'grid') renderSOPGrid();
    else renderSOPTable();
  }
}

function renderGrid() {
  container.className = 'view-grid';
  const filtered = getFilteredAreas();

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">No areas found for filter terms.</div>`;
    return;
  }

  container.innerHTML = filtered.map(area => {
    const areaSops = sops.filter(s => s.area === area.id && s.project === area.project);

    return `
      <article class="raci-card ${area.id === 'dae_team_management' ? 'pinned-card' : ''}">
        ${area.id === 'dae_team_management' ? '<div class="pin-badge" title="Pinned Area"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.68a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg></div>' : ''}
        <div class="card-header">
          <h3>
            ${area.hideProject ? area.label : getProjectName(area.project) + ' ' + area.label} 
            ${area.tbd ? '<span class="pending-badge">PENDING</span>' : ''}
          </h3>
          <div class="area-meta-info">
            <span class="effective-badge">Effective: ${area.effectiveDate || 'TBD'}</span>
            ${area.objective ? `<p class="area-objective">${area.objective}</p>` : ''}
          </div>
        </div>

        <div class="card-body">
          ${renderRoleGroup('Responsible', area.r, 'r', area.responsibleRegularity)}
          ${renderRoleGroup('Accountable', area.a, 'a', area.accountableRegularity)}
          ${renderRoleGroup('Consulted', area.c, 'c', area.meetingRegularity)}
          ${renderRoleGroup('Informed', area.i, 'i', area.informedRegularity)}
        </div>

        ${areaSops.length > 0 ? `
          <div class="card-sops">
            <h4>Related SOPs</h4>
            <ul>
              ${areaSops.map(sop => `
                <li>
                  <button class="sop-text-link" onclick="openSOPModal('${sop.id}')">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <span>${sop.title}</span>
                  </button>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

function renderRoleGroup(label, personIds, roleKey, subtext = '') {
  if (!personIds || personIds.length === 0) return '';

  const names = personIds.map(id => {
    const person = people.find(p => p.id === id);
    const isFiltered = currentPersonFilter !== 'all' && currentPersonFilter === id;
    return `<li class="name-tag ${isFiltered ? 'highlight' : ''}">${person ? person.name : id}</li>`;
  }).join('');

  return `
    <div class="role-group">
      <div class="role-label">
        <span>${label}</span>
        ${subtext ? `<span class="role-subtext">${subtext}</span>` : ''}
      </div>
      <ul class="names-list" aria-label="${label} list">${names}</ul>
    </div>
  `;
}

function renderTable() {
  container.className = 'view-table';
  const filteredAreas = getFilteredAreas();

  // Show all people in table, but maybe highlight the filtered one
  const headers = ['Area', 'Effective', ...people.map(p => p.name)];

  const rows = filteredAreas.map(area => {
    const cells = people.map(person => {
      let role = '';
      if (area.r.includes(person.id)) role = 'R';
      else if (area.a.includes(person.id)) role = 'A';
      else if (area.c.includes(person.id)) role = 'C';
      else if (area.i.includes(person.id)) role = 'I';

      if (!role) return '<td></td>';

      const isFiltered = currentPersonFilter !== 'all' && currentPersonFilter === person.id;

      return `
        <td>
          <span class="raci-badge ${isFiltered ? 'glow' : ''}" style="background: var(--accent-${role.toLowerCase()})" aria-label="${roleDefinitions[role].title}">
            ${role}
          </span>
        </td>
      `;
    });

    const areaSops = sops.filter(s => s.area === area.id && s.project === area.project);

    return `
      <tr>
        <th scope="row">
          <div class="table-area-cell">
            <div class="area-label-group">
              ${area.hideProject ? '' : `<span class="p-name">${getProjectName(area.project)}</span>`}
              <span class="a-label">
                ${area.id === 'dae_team_management' ? '<svg aria-hidden="true" class="pin-icon-inline" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; color: var(--accent-r);"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.68V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.68a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>' : ''}
                ${area.label}
              </span>
              ${area.objective ? `<p class="table-area-objective">${area.objective}</p>` : ''}
              ${areaSops.length > 0 ? `
                <div class="table-sops">
                  ${areaSops.map(sop => `
                    <button class="sop-text-link mini" onclick="openSOPModal('${sop.id}')">
                      <span>${sop.title}</span>
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </th>
        <td><span class="table-effective-date">${area.effectiveDate || 'TBD'}</span></td>
        ${cells.join('')}
      </tr>
    `;
  });

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          ${headers.map((h, index) => {
    const person = people.find(p => p.name === h);
    const isFiltered = person && currentPersonFilter === person.id;
    return `<th scope="col" class="${isFiltered ? 'header-highlight' : ''}">${h}</th>`;
  }).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.join('')}
      </tbody>
    </table>
  `;
}

function renderSOPGrid() {
  container.className = 'view-grid';
  const filteredSOPs = getFilteredSOPs();

  if (filteredSOPs.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">No SOPs found for filter terms.</div>`;
    return;
  }

  // Group by Area
  const sopsByArea = {};
  filteredSOPs.forEach(sop => {
    if (!sopsByArea[sop.area]) sopsByArea[sop.area] = [];
    sopsByArea[sop.area].push(sop);
  });

  const cardsHtml = Object.keys(sopsByArea).map(areaId => {
    const area = areas.find(a => a.id === areaId) || { label: 'Unknown Area', project: sopsByArea[areaId][0].project };
    const areaSOPs = sopsByArea[areaId];

    return `
      <article class="raci-card">
        <h3>${area.hideProject ? area.label : getProjectName(area.project) + ' ' + area.label}</h3>
        <div class="sop-list">
          ${areaSOPs.map(sop => `
            <button class="sop-item-btn" data-sop-id="${sop.id}">
              <span class="sop-title">${sop.title}</span>
              <span class="sop-meta">Responsible: ${getPersonName(sop.responsible)}</span>
            </button>
          `).join('')}
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
  attachSOPListeners();
}

function renderSOPTable() {
  container.className = 'view-table sop-table-view';
  const filteredSOPs = getFilteredSOPs();

  if (filteredSOPs.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 4rem; color: var(--text-muted);">No SOPs found for filter terms.</div>`;
    return;
  }

  const rows = filteredSOPs.map(sop => {
    const area = areas.find(a => a.id === sop.area);
    return `
      <tr>
        <td style="font-weight: 600;">
          <button class="sop-table-link" data-sop-id="${sop.id}">${sop.title}</button>
        </td>
        <td>${area ? area.label : sop.area}</td>
        <td>${getPersonName(sop.responsible)}</td>
        <td>${getPersonName(sop.accountable)}</td>
        <td>${sop.reviewCadence || 'N/A'}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <table class="sop-table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Area</th>
          <th scope="col">Responsible</th>
          <th scope="col">Accountable</th>
          <th scope="col">Update Meeting</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join('')}
      </tbody>
    </table>
  `;
  attachSOPListeners();
}

function attachSOPListeners() {
  document.querySelectorAll('[data-sop-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sopId = e.currentTarget.dataset.sopId;
      openSOPModal(sopId);
    });
  });
}

let lastFocusedElement = null;

window.openSOPModal = function (sopId) {
  const sop = sops.find(s => s.id === sopId);
  if (!sop) return;

  lastFocusedElement = document.activeElement;

  const modal = document.getElementById('sop-modal');
  const titleEl = document.getElementById('sop-modal-title');
  const bodyEl = document.getElementById('sop-modal-body');

  titleEl.textContent = `${sop.title}`;
  titleEl.setAttribute('tabindex', '-1'); // Ensure title can receive programmatic focus

  bodyEl.innerHTML = `
    <div class="sop-meta-header">
      <span><strong>Responsible:</strong> ${getPersonName(sop.responsible)}</span>
      <span><strong>Approved By:</strong> ${getPersonName(sop.accountable)}</span>
      <span><strong>Effective:</strong> ${sop.effectiveDate}</span>
      <span><strong>Update Meeting:</strong> ${sop.reviewCadence}</span>
      <span><strong>Report Regularity:</strong> ${sop.reportRegularity || 'On Updates'}</span>
    </div>
    <div class="sop-document-content">
      ${sop.content}
    </div>
  `;
  
  // Make the body focusable for scrolling
  bodyEl.setAttribute('tabindex', '0');

  modal.showModal();
  updateUrl(sopId);

  // Set focus to the modal title so screen readers start reading from top
  titleEl.focus();

  // Initialize and run Mermaid for diagrams
  if (window.mermaid) {
    window.mermaid.run({
      nodes: document.querySelectorAll('.mermaid')
    });
  }
}

// Handle dialog close (either by click, JS, or Escape key)
document.getElementById('sop-modal').addEventListener('close', () => {
  updateUrl();
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('sop-modal').close();
});

// Close modal when clicking on the backdrop (overlay)
document.getElementById('sop-modal').addEventListener('click', (e) => {
  if (e.target.id === 'sop-modal') {
    document.getElementById('sop-modal').close();
  }
});

function getPersonName(personId) {
  const person = people.find(p => p.id === personId);
  return person ? person.name : personId;
}

function renderLegend() {
  legendContainer.innerHTML = Object.entries(roleDefinitions).map(([key, def]) => `
    <div class="legend-item">
      <h4><div class="circle" style="background: ${def.color}"></div> ${def.title} (${key})</h4>
      <p>${def.description}</p>
    </div>
  `).join('');
}

function populatePersonFilter() {
  people.forEach(person => {
    const option = document.createElement('option');
    option.value = person.id;
    option.textContent = person.name;
    personFilter.appendChild(option);
  });
}

function populateProjectFilter() {
  projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    projectFilter.appendChild(option);
  });
}

function getProjectName(projectId) {
  const project = projects.find(p => p.id === projectId);
  return project ? project.name : '';
}

// Event Listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    currentNav = e.target.dataset.nav;
    render();
    updateUrl();

    // Toggle Legend visibility based on mode
    const legendEl = document.querySelector('.legend');
    if (legendEl) {
      legendEl.style.display = currentNav === 'raci' ? 'block' : 'none';
    }
  });
});

projectFilter.addEventListener('change', (e) => {
  currentProjectFilter = e.target.value;
  render();
  updateUrl();

  // Announce the change
  const count = getFilteredAreas().length;
  const projectName = e.target.options[e.target.selectedIndex].text;
  const message = `Showing ${count} areas for ${projectName}`;
  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = message;
  }
});

viewToggle.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-btn')) {
    // Update active tab state
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');

    currentView = e.target.dataset.view;
    render();
    updateUrl();
  }
});

personFilter.addEventListener('change', (e) => {
  currentPersonFilter = e.target.value;
  render();
  updateUrl();

  // Announce the change
  const count = getFilteredAreas().length;
  const personName = e.target.options[e.target.selectedIndex].text;
  const message = `Showing ${count} areas for ${personName}`;
  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = message;
  }
});

function updateUrl(openSopId = null) {
  const urlParams = new URLSearchParams();

  if (currentNav !== 'raci') urlParams.set('nav', currentNav);
  if (currentView !== 'grid') urlParams.set('view', currentView);
  if (currentProjectFilter !== 'all') urlParams.set('project', currentProjectFilter);
  if (currentPersonFilter !== 'all') urlParams.set('person', currentPersonFilter);
  if (currentSort !== 'label') urlParams.set('sort', currentSort);

  // If the modal is explicitly passed, or if it is currently open
  const modal = document.getElementById('sop-modal');
  if (openSopId) {
    urlParams.set('sop', openSopId);
  } else if (modal && modal.open) {
    // try to find the currently open SOP ID from the title
    const titleEl = document.getElementById('sop-modal-title');
    const sop = sops.find(s => s.title === titleEl.textContent);
    if (sop) {
      urlParams.set('sop', sop.id);
    }
  }

  const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
  window.history.pushState({ path: newUrl }, '', newUrl);
}

function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);

  // Parse Nav
  const navParam = urlParams.get('nav');
  if (navParam && ['raci', 'sops'].includes(navParam)) {
    currentNav = navParam;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeNavBtn = document.querySelector(`.nav-btn[data-nav="${navParam}"]`);
    if (activeNavBtn) activeNavBtn.classList.add('active');
  } else {
    currentNav = 'raci';
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('nav-raci').classList.add('active');
  }

  // Parse View
  const viewParam = urlParams.get('view');
  if (viewParam && ['grid', 'table'].includes(viewParam)) {
    currentView = viewParam;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    const activeViewBtn = document.querySelector(`.tab-btn[data-view="${viewParam}"]`);
    if (activeViewBtn) {
      activeViewBtn.classList.add('active');
      activeViewBtn.setAttribute('aria-selected', 'true');
    }
  } else {
    currentView = 'grid';
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    const defaultGridBtn = document.querySelector(`.tab-btn[data-view="grid"]`);
    if (defaultGridBtn) {
      defaultGridBtn.classList.add('active');
      defaultGridBtn.setAttribute('aria-selected', 'true');
    }
  }

  // Parse Project
  const projectParam = urlParams.get('project');
  if (projectParam && projects.some(p => p.id === projectParam)) {
    currentProjectFilter = projectParam;
    projectFilter.value = projectParam;
  } else {
    currentProjectFilter = 'all';
    projectFilter.value = 'all';
  }

  // Parse Person
  const personParam = urlParams.get('person');
  if (personParam && people.some(p => p.id === personParam)) {
    currentPersonFilter = personParam;
    personFilter.value = personParam;
  } else {
    currentPersonFilter = 'all';
    personFilter.value = 'all';
  }

  // Parse Sort
  const sortParam = urlParams.get('sort');
  if (sortParam && ['label', 'project', 'effective-asc', 'effective-desc'].includes(sortParam)) {
    currentSort = sortParam;
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = sortParam;
  } else {
    currentSort = 'label';
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'label';
  }
}

// Handle Browser Back/Forward
window.addEventListener('popstate', () => {
  handleUrlParams();
  render();

  // Toggle Legend
  const legendEl = document.querySelector('.legend');
  if (legendEl) {
    legendEl.style.display = currentNav === 'raci' ? 'block' : 'none';
  }

  // Handle Modal
  const urlParams = new URLSearchParams(window.location.search);
  const sopParam = urlParams.get('sop');
  const modal = document.getElementById('sop-modal');

  if (sopParam) {
    openSOPModal(sopParam);
  } else if (modal && modal.open) {
    modal.close();
  }
});

// Init
function init() {
  // Initialize Mermaid
  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }

  populatePersonFilter();
  populateProjectFilter();

  handleUrlParams();

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = currentSort;
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      render();
      updateUrl();
    });
  }

  render();
  renderLegend();

  // Toggle Legend explicitly on load based on parsed state
  const legendEl = document.querySelector('.legend');
  if (legendEl) {
    legendEl.style.display = currentNav === 'raci' ? 'block' : 'none';
  }

  // Check for SOP modal in URL on load
  const urlParams = new URLSearchParams(window.location.search);
  const sopParam = urlParams.get('sop');
  if (sopParam) {
    // Small delay to ensure render completes before attaching
    setTimeout(() => openSOPModal(sopParam), 50);
  }
}

init();

window.navigateToSops = function (areaId, projectId) {
  currentNav = 'sops';
  currentProjectFilter = projectId;
  currentView = 'table';

  // Set filter UI
  projectFilter.value = projectId;

  // Update active inner navigation button state
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sopNavBtn = document.querySelector('.nav-btn[data-nav="sops"]');
  if (sopNavBtn) sopNavBtn.classList.add('active');

  // Update active view tab state (switch to table tab)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  const tableTabBtn = document.querySelector('.tab-btn[data-view="table"]');
  if (tableTabBtn) {
    tableTabBtn.classList.add('active');
    tableTabBtn.setAttribute('aria-selected', 'true');
  }

  // Hide legend in SOP view
  const legendEl = document.querySelector('.legend');
  if (legendEl) legendEl.style.display = 'none';

  render();
  updateUrl();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
