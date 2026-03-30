// Main application JavaScript

// Store instance
let allReports = [...mockReports];
let currentFilters = {};
let currentViewMode = 'grid';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  setupHeader();
  loadRegionsData();
  initializePage();
});

// Setup header scroll behavior
function setupHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-visible');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-visible');
      });
    });
  }
}

// Load regions data for dropdowns
function loadRegionsData() {
  const regionSelect = document.getElementById('regionFilter') || document.querySelector('[data-region-select]');
  if (!regionSelect) return;
  
  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region.region;
    option.textContent = region.region;
    regionSelect.appendChild(option);
  });
}

// Initialize page-specific functionality
function initializePage() {
  const page = document.body.getAttribute('data-page');
  
  if (page === 'dashboard') {
    initDashboard();
  } else if (page === 'report') {
    initReportForm();
  } else if (page === 'track') {
    initTrackPage();
  } else if (page === 'home') {
    initHomePage();
  } else if (page === 'admin-dashboard') {
    initAdminDashboard();
  }
}

// Home page initialization
function initHomePage() {
  displayAnimatedStats();
  loadFeaturedReports();
}

// Display animated stats
function displayAnimatedStats() {
  const stats = [
    { element: '.stat-total', value: platformStats.totalReports },
    { element: '.stat-resolved', value: platformStats.resolvedReports },
    { element: '.stat-regions', value: platformStats.activeRegions }
  ];
  
  stats.forEach(stat => {
    const element = document.querySelector(stat.element);
    if (!element) return;
    
    animateCounter(element, stat.value);
  });
}

// Animate counter
function animateCounter(element, endValue, duration = 2000) {
  const startValue = 0;
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
}

// Load featured reports on home page
function loadFeaturedReports() {
  const container = document.querySelector('.featured-reports-container');
  if (!container) return;
  
  const featured = mockReports.slice(0, 3);
  
  container.innerHTML = featured.map(report => createReportCard(report)).join('');
}

// Dashboard initialization
function initDashboard() {
  displayReports();
  setupFilters();
  setupViewToggle();
  setupCategoryFilter();
}

// Display reports with current filters
function displayReports() {
  const container = document.querySelector('.reports-container');
  if (!container) return;
  
  const filtered = filterReports(currentFilters);
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; padding: 3rem;"><p>No reports found matching your filters.</p></div>';
    return;
  }
  
  const html = filtered.map(report => createReportCard(report)).join('');
  container.innerHTML = html;
}

// Create report card HTML
function createReportCard(report) {
  const category = getCategoryInfo(report.category);
  const statusColor = getStatusColor(report.status);
  
  return `
    <div class="card report-card animate-slideIn">
      <div class="report-card-header">
        <span class="report-id">#${report.id}</span>
        <span class="status-badge status-${report.status}">${report.status.replace('_', ' ')}</span>
      </div>
      <h3 class="card-title">${escapeHtml(report.title)}</h3>
      <p class="card-description">${escapeHtml(report.description.substring(0, 100))}...</p>
      <div class="flex gap-2 mt-2" style="flex-wrap: wrap;">
        <span class="severity-badge severity-${report.severity || 'medium'}">${report.severity || 'medium'}</span>
        <span style="background-color: rgba(26, 107, 255, 0.1); color: #2563EB; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem; font-weight: 600;">
          ${category.label}
        </span>
      </div>
      <p style="color: #718096; font-size: 0.875rem; margin-top: 0.75rem;">
        📍 ${escapeHtml(report.region)} • ${escapeHtml(report.street_landmark)}
      </p>
      <p style="color: #718096; font-size: 0.75rem; margin-top: 0.5rem;">
        Reported: ${formatDate(report.submitted_at)}
      </p>
      <a href="track.html?id=${report.id}" class="btn btn-primary btn-sm" style="margin-top: 1rem;">View Details</a>
    </div>
  `;
}

// Setup filter event listeners
function setupFilters() {
  const regionFilter = document.getElementById('regionFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const clearBtn = document.querySelector('.btn-clear-filters');
  
  if (regionFilter) {
    regionFilter.addEventListener('change', (e) => {
      currentFilters.region = e.target.value || undefined;
      displayReports();
      updateFilterInfo();
    });
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      currentFilters.category = e.target.value || undefined;
      displayReports();
      updateFilterInfo();
    });
  }
  
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      currentFilters.status = e.target.value || undefined;
      displayReports();
      updateFilterInfo();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentFilters = {};
      if (regionFilter) regionFilter.value = '';
      if (categoryFilter) categoryFilter.value = '';
      if (statusFilter) statusFilter.value = '';
      displayReports();
      updateFilterInfo();
    });
  }
}

// Set up category filter options
function setupCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return;
  
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.label;
    categoryFilter.appendChild(option);
  });
}

// Update filter information display
function updateFilterInfo() {
  const activeCount = Object.values(currentFilters).filter(v => v).length;
  const filterInfo = document.querySelector('.active-filter-count');
  if (filterInfo) {
    filterInfo.textContent = activeCount > 0 ? `(${activeCount} active)` : '';
  }
}

// Setup view toggle (grid/list)
function setupViewToggle() {
  const gridViewBtn = document.querySelector('[data-view="grid"]');
  const listViewBtn = document.querySelector('[data-view="list"]');
  const container = document.querySelector('.reports-container');
  
  if (gridViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      if (container) container.classList.remove('list-view');
      gridViewBtn.style.backgroundColor = 'var(--primary)';
      gridViewBtn.style.color = 'white';
      if (listViewBtn) {
        listViewBtn.style.backgroundColor = 'white';
        listViewBtn.style.color = 'var(--muted-foreground)';
      }
    });
  }
  
  if (listViewBtn) {
    listViewBtn.addEventListener('click', () => {
      currentViewMode = 'list';
      if (container) container.classList.add('list-view');
      listViewBtn.style.backgroundColor = 'var(--primary)';
      listViewBtn.style.color = 'white';
      if (gridViewBtn) {
        gridViewBtn.style.backgroundColor = 'white';
        gridViewBtn.style.color = 'var(--muted-foreground)';
      }
    });
  }
}

// Report form initialization
function initReportForm() {
  const form = document.getElementById('reportForm');
  if (!form) return;
  
  // Populate category options
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.label;
      categorySelect.appendChild(option);
    });
  }
  
  // Populate region options
  const regionSelect = document.getElementById('region');
  if (regionSelect) {
    regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region.region;
      option.textContent = region.region;
      regionSelect.appendChild(option);
    });
    
    // Update constituencies based on selected region
    regionSelect.addEventListener('change', () => {
      updateConstituencies(regionSelect.value);
    });
  }
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const newReport = {
      id: generateReportId(),
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      severity: formData.get('severity'),
      region: formData.get('region'),
      constituency: formData.get('constituency'),
      street_landmark: formData.get('street_landmark'),
      images: [],
      status: 'pending',
      anonymous: formData.get('anonymous') === 'on',
      notify: formData.get('notify') === 'on',
      submitted_at: new Date(),
      updated_at: new Date(),
      status_history: [{ status: 'pending', timestamp: new Date() }]
    };
    
    // Add to reports array
    mockReports.unshift(newReport);
    
    // Show success message
    alert(`Report submitted successfully! Your report ID is: ${newReport.id}`);
    
    // Reset form
    form.reset();
    
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  });
}

// Update constituencies based on region
function updateConstituencies(regionName) {
  const constituencySelect = document.getElementById('constituency');
  if (!constituencySelect) return;
  
  constituencySelect.innerHTML = '<option value="">Select Constituency</option>';
  
  const region = regions.find(r => r.region === regionName);
  if (region) {
    region.constituencies.forEach(const_name => {
      const option = document.createElement('option');
      option.value = const_name;
      option.textContent = const_name;
      constituencySelect.appendChild(option);
    });
  }
}

// Track page initialization
function initTrackPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get('id');
  
  if (reportId) {
    displayReportDetails(reportId);
  } else {
    // Show search form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.querySelector('[name="report_id"]').value;
        window.location.href = `track.html?id=${id}`;
      });
    }
  }
}

// Display report details
function displayReportDetails(reportId) {
  const report = getReportById(reportId);
  
  if (!report) {
    document.querySelector('.report-details').innerHTML = '<p>Report not found.</p>';
    return;
  }
  
  const category = getCategoryInfo(report.category);
  const detailsHTML = `
    <div class="card">
      <div class="card-header">
        <h1 class="card-title">${escapeHtml(report.title)}</h1>
        <span class="status-badge status-${report.status}">${report.status.replace('_', ' ')}</span>
      </div>
      
      <p class="card-description" style="margin: 1rem 0;">${escapeHtml(report.description)}</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
        <div>
          <strong>Report ID:</strong> <code>#${report.id}</code>
        </div>
        <div>
          <strong>Category:</strong> ${category.label}
        </div>
        <div>
          <strong>Severity:</strong> <span class="severity-badge severity-${report.severity}">${report.severity}</span>
        </div>
        <div>
          <strong>Region:</strong> ${escapeHtml(report.region)}
        </div>
        <div>
          <strong>Constituency:</strong> ${escapeHtml(report.constituency)}
        </div>
        <div>
          <strong>Location:</strong> ${escapeHtml(report.street_landmark)}
        </div>
        <div>
          <strong>Submitted:</strong> ${formatDate(report.submitted_at)}
        </div>
        <div>
          <strong>Last Updated:</strong> ${formatDate(report.updated_at)}
        </div>
      </div>
      
      <div style="margin-top: 2rem;">
        <h3 class="card-title">Status History</h3>
        <div style="margin-top: 1rem;">
          ${report.status_history.map(entry => `
            <div style="padding: 1rem; border-left: 3px solid ${getStatusColor(entry.status)}; margin-bottom: 1rem;">
              <strong>${entry.status.replace('_', ' ').toUpperCase()}</strong>
              <p style="color: #718096; font-size: 0.875rem; margin: 0.5rem 0;">
                ${formatDate(entry.timestamp)}
              </p>
              ${entry.note ? `<p style="margin: 0.5rem 0;">${escapeHtml(entry.note)}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  const container = document.querySelector('.report-details');
  if (container) {
    container.innerHTML = detailsHTML;
  }
}

// Admin dashboard initialization
function initAdminDashboard() {
  displayAdminStats();
  displayAllReports();
}

// Display admin statistics
function displayAdminStats() {
  const pending = mockReports.filter(r => r.status === 'pending').length;
  const inProgress = mockReports.filter(r => r.status === 'in_progress').length;
  const resolved = mockReports.filter(r => r.status === 'resolved').length;
  
  document.querySelectorAll('[data-stat]').forEach(el => {
    const stat = el.getAttribute('data-stat');
    if (stat === 'pending') el.textContent = pending;
    if (stat === 'in_progress') el.textContent = inProgress;
    if (stat === 'resolved') el.textContent = resolved;
  });
}

// Display all reports in admin
function displayAllReports() {
  const container = document.querySelector('.admin-reports-container');
  if (!container) return;
  
  const html = mockReports.map(report => `
    <tr>
      <td>#${report.id}</td>
      <td>${escapeHtml(report.title.substring(0, 50))}...</td>
      <td>${getCategoryInfo(report.category).label}</td>
      <td><span class="status-badge status-${report.status}">${report.status.replace('_', ' ')}</span></td>
      <td>${report.region}</td>
      <td>${formatDate(report.submitted_at)}</td>
      <td><a href="report-detail.html?id=${report.id}" class="btn btn-primary btn-sm">View</a></td>
    </tr>
  `).join('');
  
  container.innerHTML = html;
}

// Utility functions
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
