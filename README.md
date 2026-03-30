# FixMyStreet Ghana - Pure HTML/CSS/JavaScript Version

A community infrastructure reporting platform built with **ONLY HTML, CSS, and JavaScript** - no frameworks, no build tools required.

## 📁 Project Structure

```
html/
├── index.html              # Home page
├── dashboard.html          # View all reports
├── report.html            # Submit new report
├── track.html             # Track report by ID
├── admin/
│   ├── dashboard.html     # Admin dashboard
│   └── report-detail.html # Admin report details
├── css/
│   └── styles.css         # All styling
└── js/
    ├── data.js            # Mock data & utility functions
    └── app.js             # Main application logic
```

## 🚀 Getting Started

1. **No installation needed!** Just open the HTML files in your browser
2. Start with `html/index.html` - that's it!

## 📋 Available Pages

### Public Pages
- **Home** (`index.html`) - Landing page with stats and featured reports
- **Dashboard** (`dashboard.html`) - View all reports with filters
- **Report** (`report.html`) - Submit a new infrastructure report
- **Track** (`track.html`) - Track a report by ID

### Admin Pages
- **Admin Dashboard** (`admin/dashboard.html`) - View all reports in table format
- **Report Details** (`admin/report-detail.html`) - View detailed report info

## 🎨 Features

✅ Fully responsive design
✅ Filter reports by region, category, and status
✅ Submit new reports (stored in browser)
✅ Track report status
✅ Admin dashboard
✅ Beautiful UI with smooth animations
✅ No external dependencies
✅ Works offline

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid
- **Vanilla JavaScript** - No frameworks or libraries

## 📝 Report Categories

- Pothole 🕳️
- Streetlight 💡
- Waste 🗑️
- Flooding 💧
- Water 💦
- Drainage 🌊
- Other ⚠️

## 🌍 Supported Regions

- Greater Accra
- Ashanti
- Northern
- Western
- Central
- Volta
- Eastern
- Upper West

## 💾 Data Storage

Data is stored in:
- `js/data.js` - Mock data (in memory)
- Browser LocalStorage (for new reports submitted)

## 🎯 How to Use

### For Citizens
1. Go to Home page
2. Click "Report an Issue"
3. Fill in the form with issue details
4. Submit and get a report ID
5. Track your report using the Track page

### For Admins
1. Go to Admin Dashboard
2. View all reports in a table
3. Click "View" to see detailed report info
4. Update report status with notes

## ⚙️ Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 📄 License

© 2026 FixMyStreet Ghana. All rights reserved.

---

**Made with ❤️ using pure HTML, CSS, and JavaScript**
No frameworks. No build tools. No dependencies.
