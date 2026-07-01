// Todo List Application with Local Storage

class TodoApp {
    constructor() {
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.notificationsToggle = document.getElementById('notificationsToggle');
        this.resetBtn = document.getElementById('resetBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');

        // State
        this.todos = [];
        this.currentFilter = 'all';
        this.darkMode = false;
        this.notificationsEnabled = true;

        // Initialize
        this.init();
    }

    init() {
        this.loadTodos();
        this.loadSettings();
        this.setupEventListeners();
        this.updateDate();
        this.render();
        setInterval(() => this.updateDate(), 60000);
    }

    setupEventListeners() {
        // Add Todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filters
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.closest('.filter-btn')));
        });

        // Clear Completed
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Export
        this.exportBtn.addEventListener('click', () => this.exportTodos());

        // Settings
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.closeSettings();
        });

        // Dark Mode
        this.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());

        // Notifications
        this.notificationsToggle.addEventListener('change', () => this.toggleNotifications());

        // Reset
        this.resetBtn.addEventListener('click', () => this.resetAllTasks());
    }

    addTodo() {
        const text = this.todoInput.value.trim();

        if (!text) {
            this.showToast('Please enter a task', 'error');
            return;
        }

        if (text.length < 3) {
            this.showToast('Task must be at least 3 characters', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'low',
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        this.showToast('Task added successfully', 'success');
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
        this.showToast('Task deleted', 'info');
    }

    toggleComplete(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            const message = todo.completed ? 'Task completed! 🎉' : 'Task uncompleted';
            this.showToast(message, 'success');
        }
    }

    cyclePriority(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const priorities = ['low', 'medium', 'high'];
            const currentIndex = priorities.indexOf(todo.priority);
            todo.priority = priorities[(currentIndex + 1) % priorities.length];
            this.saveTodos();
            this.render();
            this.showToast(`Priority changed to ${todo.priority}`, 'info');
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showToast('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
            this.showToast('Completed tasks cleared', 'success');
        }
    }

    setFilter(btn) {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filtered = this.getFilteredTodos();

        // Show/hide empty state
        if (filtered.length === 0) {
            this.todoList.style.display = 'none';
            this.emptyState.style.display = 'block';
        } else {
            this.todoList.style.display = 'flex';
            this.emptyState.style.display = 'none';
        }

        // Render todos
        this.todoList.innerHTML = filtered.map(todo => this.createTodoElement(todo)).join('');

        // Add event listeners to todo items
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.toggleComplete(id);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteTodo(id);
            });
        });

        document.querySelectorAll('.btn-priority').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.cyclePriority(id);
            });
        });

        // Update stats
        this.updateStats();

        // Show/hide clear completed button
        const hasCompleted = this.todos.some(t => t.completed);
        this.clearCompletedBtn.style.display = hasCompleted ? 'flex' : 'none';
    }

    createTodoElement(todo) {
        const priorityIcon = {
            high: '<i class="fas fa-exclamation-circle"></i>',
            medium: '<i class="fas fa-minus-circle"></i>',
            low: '<i class="fas fa-info-circle"></i>'
        };

        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''} ${todo.priority}-priority">
                <div class="checkbox-container">
                    <div class="checkbox ${todo.completed ? 'checked' : ''}" data-id="${todo.id}">
                        ${todo.completed ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                </div>
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-priority priority-${todo.priority}">
                        ${priorityIcon[todo.priority]} ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn-todo btn-priority" data-id="${todo.id}" title="Toggle Priority">
                        <i class="fas fa-flag"></i>
                    </button>
                    <button class="btn-todo btn-delete" data-id="${todo.id}" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;
    }

    updateDate() {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const date = new Date().toLocaleDateString('en-US', options);
        document.getElementById('currentDate').textContent = date;
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.darkMode);
        this.showToast(this.darkMode ? 'Dark mode enabled' : 'Light mode enabled', 'info');
    }

    toggleNotifications() {
        this.notificationsEnabled = !this.notificationsEnabled;
        localStorage.setItem('notificationsEnabled', this.notificationsEnabled);
        this.showToast(
            this.notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled',
            'info'
        );
    }

    openSettings() {
        this.settingsModal.style.display = 'flex';
    }

    closeSettings() {
        this.settingsModal.style.display = 'none';
    }

    resetAllTasks() {
        if (confirm('Are you sure? This will delete all tasks permanently.')) {
            this.todos = [];
            this.saveTodos();
            this.render();
            this.closeSettings();
            this.showToast('All tasks have been reset', 'info');
        }
    }

    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showToast('Tasks exported successfully', 'success');
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        if (this.notificationsEnabled && type === 'success') {
            this.playNotificationSound();
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    playNotificationSound() {
        // Simple notification using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        this.todos = saved ? JSON.parse(saved) : [];
    }

    loadSettings() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const notifications = localStorage.getItem('notificationsEnabled') !== 'false';

        this.darkMode = darkMode;
        this.notificationsEnabled = notifications;

        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }

        this.darkModeToggle.checked = this.darkMode;
        this.notificationsToggle.checked = this.notificationsEnabled;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TodoApp();
    });
} else {
    new TodoApp();
}