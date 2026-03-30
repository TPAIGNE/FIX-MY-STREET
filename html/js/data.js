// Mock data for infrastructure reports

const categories = [
  {
    id: 'pothole',
    label: 'Pothole',
    icon: '🕳️',
    color: '#E53E3E',
    description: 'Road damage, holes, cracks'
  },
  {
    id: 'streetlight',
    label: 'Streetlight',
    icon: '💡',
    color: '#F6C90E',
    description: 'Broken or non-functional lights'
  },
  {
    id: 'waste',
    label: 'Waste',
    icon: '🗑️',
    color: '#718096',
    description: 'Garbage collection issues'
  },
  {
    id: 'flooding',
    label: 'Flooding',
    icon: '💧',
    color: '#3182CE',
    description: 'Water overflow or drainage issues'
  },
  {
    id: 'water',
    label: 'Water',
    icon: '💦',
    color: '#0DBD8B',
    description: 'Water supply problems'
  },
  {
    id: 'drainage',
    label: 'Drainage',
    icon: '🌊',
    color: '#2B6CB0',
    description: 'Blocked or damaged drains'
  },
  {
    id: 'other',
    label: 'Other',
    icon: '⚠️',
    color: '#A0AEC0',
    description: 'Other infrastructure issues'
  }
];

const mockReports = [
  {
    id: 'FMS8K2N4',
    title: 'Large pothole causing accidents on main road',
    description: 'There is a very large pothole near the junction that has caused multiple motorcycle accidents. It fills with water during rain making it invisible to drivers. Urgent repair needed.',
    category: 'pothole',
    severity: 'high',
    region: 'Greater Accra',
    constituency: 'Tema Central',
    street_landmark: 'Near Community 1 Junction',
    images: ['/placeholder-pothole.jpg'],
    status: 'in_progress',
    anonymous: false,
    notify: true,
    submitted_at: new Date('2026-03-25T10:30:00'),
    updated_at: new Date('2026-03-27T14:00:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-25T10:30:00') },
      { status: 'in_progress', timestamp: new Date('2026-03-27T14:00:00'), admin_id: 'admin1', note: 'Work crew dispatched' }
    ]
  },
  {
    id: 'FMS3M7P2',
    title: 'Broken streetlight making road dangerous at night',
    description: 'The streetlight at this location has been broken for over 2 weeks. The area becomes very dark at night creating safety concerns for pedestrians and drivers.',
    category: 'streetlight',
    severity: 'medium',
    region: 'Ashanti',
    constituency: 'Kumasi Central',
    street_landmark: 'Opposite Kejetia Market Gate 2',
    images: ['/placeholder-streetlight.jpg'],
    status: 'pending',
    anonymous: false,
    notify: true,
    submitted_at: new Date('2026-03-27T08:15:00'),
    updated_at: new Date('2026-03-27T08:15:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-27T08:15:00') }
    ]
  },
  {
    id: 'FMS9R4K8',
    title: 'Garbage piling up for weeks without collection',
    description: 'Waste has been accumulating at this collection point for 3 weeks now. The smell is unbearable and there are concerns about disease outbreak. Please send waste collection truck immediately.',
    category: 'waste',
    severity: 'high',
    region: 'Greater Accra',
    constituency: 'Ablekuma Central',
    street_landmark: 'Behind Kaneshie Market',
    images: ['/placeholder-waste.jpg'],
    status: 'resolved',
    anonymous: true,
    notify: false,
    submitted_at: new Date('2026-03-20T16:45:00'),
    updated_at: new Date('2026-03-24T09:30:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-20T16:45:00') },
      { status: 'in_progress', timestamp: new Date('2026-03-22T11:00:00'), admin_id: 'admin2', note: 'Coordinating with Zoomlion' },
      { status: 'resolved', timestamp: new Date('2026-03-24T09:30:00'), admin_id: 'admin2', note: 'Area cleared and sanitized' }
    ]
  },
  {
    id: 'FMS2L5W9',
    title: 'Severe flooding blocking access to homes',
    description: 'Every time it rains, this area floods severely blocking residents from accessing their homes. The drainage system is completely clogged and needs urgent attention.',
    category: 'flooding',
    severity: 'high',
    region: 'Northern',
    constituency: 'Tamale Central',
    street_landmark: 'Sakasaka Area',
    images: ['/placeholder-flooding.jpg'],
    status: 'in_progress',
    anonymous: false,
    notify: true,
    submitted_at: new Date('2026-03-26T07:00:00'),
    updated_at: new Date('2026-03-28T10:00:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-26T07:00:00') },
      { status: 'in_progress', timestamp: new Date('2026-03-28T10:00:00'), admin_id: 'admin3', note: 'Engineering team assessing' }
    ]
  },
  {
    id: 'FMS6T1H3',
    title: 'Water supply cut off for entire neighborhood',
    description: 'Our neighborhood has been without water supply for 5 days. We have tried calling Ghana Water but no response. Children and elderly are suffering.',
    category: 'water',
    severity: 'high',
    region: 'Western',
    constituency: 'Takoradi',
    street_landmark: 'Anaji Estate Block C',
    images: ['/placeholder-water.jpg'],
    status: 'pending',
    anonymous: false,
    notify: true,
    submitted_at: new Date('2026-03-28T14:20:00'),
    updated_at: new Date('2026-03-28T14:20:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-28T14:20:00') }
    ]
  },
  {
    id: 'FMS7Y8D5',
    title: 'Blocked drainage causing sewage overflow',
    description: 'The main drain in this area is completely blocked causing sewage to overflow onto the street. The situation is very unhygienic and poses health risks.',
    category: 'drainage',
    severity: 'medium',
    region: 'Central',
    constituency: 'Cape Coast South',
    street_landmark: 'Near University of Cape Coast Main Gate',
    images: ['/placeholder-drainage.jpg'],
    status: 'resolved',
    anonymous: false,
    notify: true,
    submitted_at: new Date('2026-03-15T11:30:00'),
    updated_at: new Date('2026-03-19T15:45:00'),
    status_history: [
      { status: 'pending', timestamp: new Date('2026-03-15T11:30:00') },
      { status: 'in_progress', timestamp: new Date('2026-03-17T08:00:00'), admin_id: 'admin1', note: 'Drain cleaning scheduled' },
      { status: 'resolved', timestamp: new Date('2026-03-19T15:45:00'), admin_id: 'admin1', note: 'Drain cleared and functioning' }
    ]
  }
];

const regions = [
  { region: 'Greater Accra', constituencies: ['Tema Central', 'Ablekuma Central', 'Accra Metropolis'] },
  { region: 'Ashanti', constituencies: ['Kumasi Central', 'Obuasi', 'Mampong'] },
  { region: 'Northern', constituencies: ['Tamale Central', 'Gushegu', 'Karaga'] },
  { region: 'Western', constituencies: ['Takoradi', 'Sekondi', 'Dixcove'] },
  { region: 'Central', constituencies: ['Cape Coast South', 'Elmina', 'Twifo/Heman/Lower Denkyira'] },
  { region: 'Volta', constituencies: ['Ho Central', 'Keta', 'Ketu South'] },
  { region: 'Eastern', constituencies: ['Koforidua', 'New Juabeng', 'Asuogyaman'] },
  { region: 'Upper West', constituencies: ['Wa Central', 'Wa East', 'Wa West'] }
];

const platformStats = {
  totalReports: 2847,
  resolvedReports: 1923,
  activeRegions: 14
};

// Utility functions
function generateReportId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function filterReports(filters = {}) {
  const { region, category, status } = filters;
  return mockReports.filter(report => {
    if (region && report.region !== region) return false;
    if (category && report.category !== category) return false;
    if (status && report.status !== status) return false;
    if (report.anonymous) return false;
    return true;
  });
}

function getReportById(id) {
  return mockReports.find(report => report.id === id);
}

function getCategoryInfo(categoryId) {
  return categories.find(cat => cat.id === categoryId);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getStatusColor(status) {
  const colors = {
    'pending': '#F6C90E',
    'in_progress': '#3182CE',
    'resolved': '#0DBD8B',
    'rejected': '#E53E3E'
  };
  return colors[status] || '#718096';
}

function getSeverityColor(severity) {
  const colors = {
    'low': '#0DBD8B',
    'medium': '#F6C90E',
    'high': '#E53E3E'
  };
  return colors[severity] || '#718096';
}
