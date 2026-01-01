# Todo Manager - Bilingual Task Management Application

A fully-featured, production-ready Todo management web application with bilingual support (English/Japanese), Kanban board view, hierarchical tasks, and PWA capabilities.

## Features

### Core Features
- ✅ **Bilingual Support** - Switch between English and Japanese
- ✅ **Hierarchical Tasks** - Create parent-child task relationships (subtasks)
- ✅ **Task Completion** - Easy checkbox completion tracking
- ✅ **Date Tracking** - Creation date and due date with overdue warnings
- ✅ **Category Management** - Create and manage custom categories with colors
- ✅ **Kanban Board** - Visual board with drag-and-drop task management
- ✅ **Priority Levels** - High, Medium, Low priority settings
- ✅ **Search & Filter** - Filter by category, status, and search by text
- ✅ **Sort Options** - Sort by due date, priority, or creation date
- ✅ **Edit & Delete** - Full CRUD operations on tasks
- ✅ **Drag & Drop** - Move tasks between Kanban columns
- ✅ **Progress Tracking** - Visual progress bar showing completion percentage
- ✅ **Overdue Warnings** - Visual indicators for overdue tasks
- ✅ **Dark Mode** - Toggle between light and dark themes

### Technical Features
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🔌 **PWA Support** - Install as a standalone app
- 💾 **Data Persistence** - All data stored in localStorage
- 📤 **Export/Import** - Backup and restore your data
- 🚀 **No Framework** - Pure HTML, CSS, and JavaScript
- ⚡ **Fast & Lightweight** - No dependencies, loads instantly
- 🎨 **Modern UI** - Clean, intuitive interface

## Getting Started

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd Todo
   ```

2. **Generate PWA Icons**
   - Open `generate-icons.html` in your web browser
   - Click "Generate 192x192 Icon" and download the file
   - Click "Generate 512x512 Icon" and download the file
   - Save both files as `icon-192.png` and `icon-512.png` in the project root

3. **Serve the application**
   - Use a local web server (required for PWA features):
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

### Installing as PWA

1. Open the application in your browser
2. Look for the "Install" button in your browser's address bar
3. Click install to add the app to your home screen/desktop
4. The app will work offline after installation

## Usage Guide

### Creating Tasks

1. Click the **"+ Add Task"** button
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Category** - Select from your categories
   - **Priority** - High, Medium, or Low
   - **Due Date** - Optional deadline
   - **Status** - To Do, In Progress, or Completed
   - **Parent Task** - Optional, to create a subtask
3. Click **"Save"**

### Managing Categories

1. Click the **"+"** button next to "Categories" in the sidebar
2. Enter a category name
3. Choose a color
4. Click **"Add Category"**
5. To delete a category, click the delete button in the category management modal

### Using the Kanban Board

1. Click **"Kanban Board"** in the sidebar
2. Tasks are organized in three columns:
   - **To Do** - Not started tasks
   - **In Progress** - Tasks being worked on
   - **Completed** - Finished tasks
3. **Drag and drop** tasks between columns to change their status
4. Click on a task to edit or delete it

### Search and Filter

- **Search**: Type in the search box to find tasks by title or description
- **Filter by Category**: Select a category from the dropdown
- **Filter by Status**: Choose Active, Completed, or Overdue
- **Sort**: Sort tasks by creation date, due date, or priority

### Hierarchical Tasks (Subtasks)

1. Create a parent task first
2. Click **"Add Subtask"** on any task
3. Or select a parent task when creating a new task
4. Subtasks appear indented under their parent in List View

### Export and Import

**Export (Backup)**:
1. Click **"Export Data"** in the sidebar
2. A JSON file will be downloaded with all your tasks and categories

**Import (Restore)**:
1. Click **"Import Data"** in the sidebar
2. Select your previously exported JSON file
3. Your data will be restored

### Dark Mode

- Click the **moon icon** in the header to toggle dark mode
- Your preference is saved automatically

### Language Switching

- Click the **language indicator** (EN/JA) in the header
- The entire interface switches between English and Japanese
- Your language preference is saved automatically

## Project Structure

```
Todo/
├── index.html              # Main HTML structure
├── styles.css              # Styling with responsive design
├── app.js                  # Application logic
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── generate-icons.html     # Icon generation utility
├── icon.svg               # SVG icon source
├── icon-192.png           # 192x192 app icon (generated)
├── icon-512.png           # 512x512 app icon (generated)
└── README.md              # This file
```

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera
- Any modern browser with ES6+ support

## Data Storage

All data is stored locally in your browser's localStorage:
- **Tasks**: All task data including title, description, dates, etc.
- **Categories**: Custom categories with colors
- **Preferences**: Theme (light/dark) and language (en/ja)

**Important**: Clearing browser data will delete all tasks. Use Export regularly to backup your data!

## Keyboard Shortcuts

- **Escape**: Close open modals
- **Enter**: Submit forms (when focused on form fields)

## Troubleshooting

### PWA won't install
- Ensure you're using HTTPS or localhost
- Check that icon files (icon-192.png, icon-512.png) exist
- Try clearing browser cache and reloading

### Data not saving
- Check browser localStorage is enabled
- Ensure you're not in incognito/private mode
- Check browser console for errors

### Icons not loading
- Generate icons using `generate-icons.html`
- Ensure icons are named correctly: `icon-192.png` and `icon-512.png`
- Clear browser cache and reload

## Development

The application is built with vanilla JavaScript and requires no build process:

- **HTML**: Semantic, accessible markup
- **CSS**: CSS custom properties for theming, flexbox/grid for layout
- **JavaScript**: ES6+ features, modular class-based architecture

### Customization

**Colors**: Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #3b82f6;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
}
```

**Translations**: Edit the `translations` object in `app.js`:
```javascript
const translations = {
    en: { /* English translations */ },
    ja: { /* Japanese translations */ }
};
```

## License

This project is open source and available for personal and commercial use.

## Credits

Built with ❤️ using modern web technologies

---

**Enjoy managing your tasks!** 📝✅
