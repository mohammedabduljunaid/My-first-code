# ✅ Todo List Application

A modern, feature-rich todo list application with local storage functionality. Keep track of your tasks, manage priorities, and organize your day efficiently.

## Features

✨ **Task Management**
- Add new tasks with keyboard support (Enter key)
- Delete tasks individually
- Mark tasks as completed
- Clear all completed tasks at once

🎯 **Priority System**
- Set task priority (Low, Medium, High)
- Cycle through priorities with one click
- Color-coded priority indicators
- Visual priority borders on task cards

🔍 **Smart Filtering**
- View all tasks
- Filter by active (incomplete) tasks
- Filter by completed tasks
- Active filter highlighting

💾 **Local Storage**
- Tasks automatically saved to browser
- Persistent data across sessions
- No server required
- Export tasks as JSON file

📊 **Statistics Dashboard**
- Total tasks count
- Active tasks count
- Completed tasks count
- Real-time stat updates

🎨 **Dark Mode**
- Toggle dark/light theme
- Settings saved locally
- Comfortable viewing in any lighting

🔔 **Notifications**
- Toast notifications for actions
- Sound feedback on task completion
- Enable/disable notifications
- Multiple notification types (success, error, info)

📱 **Responsive Design**
- Works perfectly on desktop
- Tablet-friendly layout
- Mobile-optimized interface
- Touch-friendly buttons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohammedabduljunaid/My-first-code.git
cd My-first-code/todo-list
```

2. Open `index.html` in your web browser

That's it! No build process or dependencies required.

## How to Use

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the "Add" button
3. Task appears in the list

### Managing Tasks
- **Complete Task**: Click the checkbox to mark as done
- **Delete Task**: Click the trash icon
- **Change Priority**: Click the flag icon to cycle through priorities

### Filtering
- **All**: View all tasks
- **Active**: View only incomplete tasks
- **Completed**: View only finished tasks

### Settings
- Click the settings icon (⚙️) at the bottom
- Toggle dark mode
- Enable/disable notifications
- Reset all tasks

### Export Tasks
- Click "Export" button to download tasks as JSON
- Share or backup your tasks
- Import by replacing the JSON file

## Files

- `index.html` - HTML structure and layout
- `style.css` - Styling, themes, and animations
- `app.js` - App logic and local storage management
- `README.md` - Documentation

## Local Storage Details

**Stored Data:**
- `todos` - Array of all tasks with metadata
- `darkMode` - Dark mode preference
- `notificationsEnabled` - Notification preference

**Task Object Structure:**
```json
{
  "id": 1234567890,
  "text": "Task description",
  "completed": false,
  "priority": "low",
  "createdAt": "2026-07-01T12:00:00.000Z"
}
```

**Browser Support:**
- Modern browsers with localStorage API
- Chrome, Firefox, Safari, Edge

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Flexbox, Grid, Animations, Gradients
- **JavaScript (Vanilla)** - App logic, local storage
- **LocalStorage API** - Data persistence
- **Web Audio API** - Notification sounds
- **Font Awesome Icons** - UI icons

## Task Statistics

The dashboard displays real-time statistics:
- **Total Tasks**: All tasks in the list
- **Active Tasks**: Incomplete tasks
- **Completed Tasks**: Finished tasks

## Priority System

**Low Priority**
- Blue indicator
- Default priority
- For less urgent tasks

**Medium Priority**
- Orange indicator
- Important tasks
- Requires attention

**High Priority**
- Red indicator
- Urgent tasks
- Needs immediate action

## Notification Sounds

- Simple notification tone on task completion
- Gentle audio feedback
- Can be disabled in settings
- Uses Web Audio API

## Keyboard Shortcuts

- **Enter** in input field - Add task
- **Settings Icon** - Open settings modal
- **Filter Buttons** - Quick filter switching

## Data Security

- Data stored locally in your browser
- No cloud storage or external servers
- No data tracking or analytics
- Privacy-focused design

## Export & Backup

- Export tasks as JSON file
- Download with automatic naming (todos-YYYY-MM-DD.json)
- Use for backup purposes
- Share tasks with others

## Responsive Breakpoints

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adjusted columns)
- **Mobile**: Below 768px (single column)
- **Small Mobile**: Below 480px (optimized)

## Future Enhancements

- Recurring tasks
- Task due dates
- Subtasks support
- Task categories/tags
- Search functionality
- Task notes/descriptions
- Drag and drop reordering
- Cloud sync option
- Mobile app
- Collaboration features
- Import tasks from file
- Task history/archive
- Productivity analytics
- Calendar view

## Performance

- Minimal JavaScript
- Efficient DOM manipulation
- Optimized CSS animations
- Local storage caching
- No external dependencies

## Troubleshooting

**Tasks not saving?**
- Check if localStorage is enabled in browser
- Try clearing browser cache
- Check browser developer console for errors

**Notifications not playing?**
- Check browser audio permissions
- Ensure notifications are enabled in settings
- Some browsers may require user interaction first

**Dark mode not working?**
- Hard refresh the page (Ctrl+Shift+R)
- Clear browser cache
- Check if dark mode setting is saved

## License

Open source - feel free to modify and enhance!

## Contributing

Want to improve the todo app? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Check browser console for errors

Stay organized and productive! ✅