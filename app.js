// ===== I18N TRANSLATIONS =====
const translations = {
    en: {
        app: {
            title: 'Todo Manager'
        },
        sidebar: {
            views: 'Views',
            listView: 'List View',
            kanbanView: 'Kanban Board',
            categories: 'Categories',
            actions: 'Actions',
            export: 'Export Data',
            import: 'Import Data'
        },
        controls: {
            addTask: '+ Add Task',
            searchPlaceholder: 'Search tasks...'
        },
        filters: {
            allCategories: 'All Categories',
            allStatus: 'All Status',
            active: 'Active',
            completed: 'Completed',
            overdue: 'Overdue',
            sortByCreated: 'Sort by Created',
            sortByDue: 'Sort by Due Date',
            sortByPriority: 'Sort by Priority'
        },
        progress: {
            overall: 'Overall Progress',
            completed: 'completed',
            total: 'total'
        },
        kanban: {
            todo: 'To Do',
            inProgress: 'In Progress',
            completed: 'Completed'
        },
        modal: {
            addTask: 'Add Task',
            editTask: 'Edit Task',
            title: 'Title',
            description: 'Description',
            category: 'Category',
            priority: 'Priority',
            dueDate: 'Due Date',
            status: 'Status',
            parentTask: 'Parent Task (Optional)',
            noParent: 'No Parent',
            cancel: 'Cancel',
            save: 'Save'
        },
        priority: {
            low: 'Low',
            medium: 'Medium',
            high: 'High'
        },
        status: {
            todo: 'To Do',
            inProgress: 'In Progress',
            completed: 'Completed'
        },
        categoryModal: {
            title: 'Manage Categories',
            name: 'Category Name',
            color: 'Color',
            add: 'Add Category'
        },
        task: {
            edit: 'Edit',
            delete: 'Delete',
            addSubtask: 'Add Subtask',
            created: 'Created',
            due: 'Due',
            overdue: 'OVERDUE',
            subtasks: 'Subtasks'
        },
        messages: {
            deleteTask: 'Are you sure you want to delete this task?',
            deleteCategory: 'Delete this category?',
            exportSuccess: 'Data exported successfully!',
            importSuccess: 'Data imported successfully!',
            importError: 'Error importing data. Please check the file format.',
            autoHideInfo: 'ℹ️ Completed tasks are automatically hidden after 3 days'
        }
    },
    ja: {
        app: {
            title: 'タスク管理'
        },
        sidebar: {
            views: '表示',
            listView: 'リスト表示',
            kanbanView: 'カンバンボード',
            categories: 'カテゴリ',
            actions: 'アクション',
            export: 'データエクスポート',
            import: 'データインポート'
        },
        controls: {
            addTask: '+ タスク追加',
            searchPlaceholder: 'タスクを検索...'
        },
        filters: {
            allCategories: '全てのカテゴリ',
            allStatus: '全てのステータス',
            active: 'アクティブ',
            completed: '完了',
            overdue: '期限切れ',
            sortByCreated: '作成日順',
            sortByDue: '期限日順',
            sortByPriority: '優先度順'
        },
        progress: {
            overall: '全体の進捗',
            completed: '完了',
            total: '合計'
        },
        kanban: {
            todo: '未着手',
            inProgress: '進行中',
            completed: '完了'
        },
        modal: {
            addTask: 'タスク追加',
            editTask: 'タスク編集',
            title: 'タイトル',
            description: '説明',
            category: 'カテゴリ',
            priority: '優先度',
            dueDate: '期限日',
            status: 'ステータス',
            parentTask: '親タスク（オプション）',
            noParent: '親タスクなし',
            cancel: 'キャンセル',
            save: '保存'
        },
        priority: {
            low: '低',
            medium: '中',
            high: '高'
        },
        status: {
            todo: '未着手',
            inProgress: '進行中',
            completed: '完了'
        },
        categoryModal: {
            title: 'カテゴリ管理',
            name: 'カテゴリ名',
            color: '色',
            add: 'カテゴリ追加'
        },
        task: {
            edit: '編集',
            delete: '削除',
            addSubtask: 'サブタスク追加',
            created: '作成日',
            due: '期限',
            overdue: '期限切れ',
            subtasks: 'サブタスク'
        },
        messages: {
            deleteTask: 'このタスクを削除してもよろしいですか？',
            deleteCategory: 'このカテゴリを削除しますか？',
            exportSuccess: 'データのエクスポートに成功しました！',
            importSuccess: 'データのインポートに成功しました！',
            importError: 'データのインポートに失敗しました。ファイル形式を確認してください。',
            autoHideInfo: 'ℹ️ 完了したタスクは3日後に自動的に非表示になります'
        }
    }
};

// ===== APP STATE =====
class TodoApp {
    constructor() {
        this.tasks = [];
        this.categories = [];
        this.currentLang = localStorage.getItem('language') || 'en';
        this.currentView = 'list';
        this.editingTaskId = null;
        this.filters = {
            search: '',
            category: '',
            status: ''
        };
        this.sortBy = 'createdDate';

        this.init();
    }

    init() {
        this.loadData();
        this.initializeDefaultCategories();
        this.setupEventListeners();
        this.applyTheme();
        this.updateLanguage();
        this.render();
    }

    // ===== DATA MANAGEMENT =====
    loadData() {
        const savedTasks = localStorage.getItem('tasks');
        const savedCategories = localStorage.getItem('categories');

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        if (savedCategories) {
            this.categories = JSON.parse(savedCategories);
        }
    }

    saveData() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    initializeDefaultCategories() {
        if (this.categories.length === 0) {
            this.categories = [
                { id: this.generateId(), name: 'Work', nameJa: '仕事', color: '#3b82f6' },
                { id: this.generateId(), name: 'Personal', nameJa: '個人', color: '#10b981' },
                { id: this.generateId(), name: 'Shopping', nameJa: '買い物', color: '#f59e0b' },
                { id: this.generateId(), name: 'Health', nameJa: '健康', color: '#ef4444' }
            ];
            this.saveData();
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // ===== TASK OPERATIONS =====
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description || '',
            category: taskData.category,
            priority: taskData.priority,
            status: taskData.status,
            dueDate: taskData.dueDate || null,
            createdDate: new Date().toISOString(),
            completed: taskData.status === 'completed',
            parentId: taskData.parentId || null
        };

        this.tasks.push(task);
        this.saveData();
        this.render();
    }

    updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            if (updates.status === 'completed') {
                this.tasks[taskIndex].completed = true;
                // Track when task was completed
                if (!this.tasks[taskIndex].completedDate) {
                    this.tasks[taskIndex].completedDate = new Date().toISOString();
                }
            } else if (updates.hasOwnProperty('completed')) {
                this.tasks[taskIndex].completed = updates.completed;
                this.tasks[taskIndex].status = updates.completed ? 'completed' : 'todo';
                // Track when task was completed
                if (updates.completed && !this.tasks[taskIndex].completedDate) {
                    this.tasks[taskIndex].completedDate = new Date().toISOString();
                } else if (!updates.completed) {
                    // Clear completedDate if task is unmarked
                    this.tasks[taskIndex].completedDate = null;
                }
            }
            this.saveData();
            this.render();
        }
    }

    deleteTask(taskId) {
        // Delete task and all its subtasks
        const deleteRecursive = (id) => {
            const childTasks = this.tasks.filter(t => t.parentId === id);
            childTasks.forEach(child => deleteRecursive(child.id));
            this.tasks = this.tasks.filter(t => t.id !== id);
        };

        deleteRecursive(taskId);
        this.saveData();
        this.render();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.status = task.completed ? 'completed' : 'todo';
            // Track when task was completed
            if (task.completed && !task.completedDate) {
                task.completedDate = new Date().toISOString();
            } else if (!task.completed) {
                // Clear completedDate if task is unmarked
                task.completedDate = null;
            }
            this.saveData();
            this.render();
        }
    }

    getTaskById(taskId) {
        return this.tasks.find(t => t.id === taskId);
    }

    getSubtasks(parentId) {
        return this.tasks.filter(t => t.parentId === parentId);
    }

    // ===== CATEGORY OPERATIONS =====
    addCategory(name, color) {
        const category = {
            id: this.generateId(),
            name: name,
            nameJa: name,
            color: color
        };
        this.categories.push(category);
        this.saveData();
        this.renderCategories();
        this.updateCategorySelects();
    }

    deleteCategory(categoryId) {
        this.categories = this.categories.filter(c => c.id !== categoryId);
        this.saveData();
        this.renderCategories();
        this.updateCategorySelects();
    }

    getCategoryById(categoryId) {
        return this.categories.find(c => c.id === categoryId);
    }

    // ===== FILTERING AND SORTING =====
    getFilteredTasks() {
        let filtered = this.tasks.filter(task => !task.parentId); // Only root tasks

        // Search filter
        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(search) ||
                (task.description && task.description.toLowerCase().includes(search))
            );
        }

        // Category filter
        if (this.filters.category) {
            filtered = filtered.filter(task => task.category === this.filters.category);
        }

        // Status filter
        if (this.filters.status === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (this.filters.status === 'completed') {
            filtered = filtered.filter(task => task.completed);
        } else if (this.filters.status === 'overdue') {
            filtered = filtered.filter(task => this.isOverdue(task) && !task.completed);
        }

        // Auto-hide completed tasks older than 3 days
        filtered = filtered.filter(task => !this.shouldHideCompleted(task));

        // Sort
        filtered.sort((a, b) => {
            if (this.sortBy === 'dueDate') {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (this.sortBy === 'priority') {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else {
                return new Date(b.createdDate) - new Date(a.createdDate);
            }
        });

        return filtered;
    }

    isOverdue(task) {
        if (!task.dueDate || task.completed) return false;
        // Compare dates only (not time) - task is overdue only if due date is before today
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        // Set both to midnight for fair comparison
        dueDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return dueDate < today;
    }

    shouldHideCompleted(task) {
        // Auto-hide completed tasks after 3 days
        if (!task.completed || !task.completedDate) return false;

        const completedDate = new Date(task.completedDate);
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        // Set to midnight for fair comparison
        completedDate.setHours(0, 0, 0, 0);
        threeDaysAgo.setHours(0, 0, 0, 0);

        return completedDate < threeDaysAgo;
    }

    // ===== THEME =====
    applyTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    }

    // ===== LANGUAGE =====
    updateLanguage() {
        document.documentElement.lang = this.currentLang;

        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getTranslation(key);
            if (text) {
                element.textContent = text;
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const text = this.getTranslation(key);
            if (text) {
                element.placeholder = text;
            }
        });

        // Update language indicator
        const langIndicator = document.querySelector('.lang-indicator');
        if (langIndicator) {
            langIndicator.textContent = this.currentLang.toUpperCase();
        }

        // Re-render to update dynamic content
        this.render();
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = translations[this.currentLang];

        for (const k of keys) {
            value = value[k];
            if (!value) return key;
        }

        return value;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ja' : 'en';
        localStorage.setItem('language', this.currentLang);
        this.updateLanguage();
    }

    // ===== RENDERING =====
    render() {
        this.renderCategories();
        this.updateCategorySelects();
        this.renderProgress();

        if (this.currentView === 'list') {
            this.renderListView();
        } else {
            this.renderKanbanView();
        }
    }

    renderCategories() {
        const categoryList = document.getElementById('categoryList');
        const categoryManageList = document.getElementById('categoryManageList');

        const categoryHTML = this.categories.map(cat => {
            const name = this.currentLang === 'ja' ? cat.nameJa : cat.name;
            return `
                <div class="category-item" data-category="${cat.id}">
                    <div class="category-color" style="background: ${cat.color}"></div>
                    <span class="category-name">${name}</span>
                </div>
            `;
        }).join('');

        if (categoryList) {
            categoryList.innerHTML = categoryHTML;
        }

        if (categoryManageList) {
            const manageHTML = this.categories.map(cat => {
                const name = this.currentLang === 'ja' ? cat.nameJa : cat.name;
                return `
                    <div class="category-manage-item">
                        <div class="category-color" style="background: ${cat.color}"></div>
                        <span class="category-name">${name}</span>
                        <button class="btn-small btn-danger" onclick="app.handleDeleteCategory('${cat.id}')">
                            ${this.getTranslation('task.delete')}
                        </button>
                    </div>
                `;
            }).join('');
            categoryManageList.innerHTML = manageHTML;
        }
    }

    updateCategorySelects() {
        const selects = [
            document.getElementById('taskCategory'),
            document.getElementById('filterCategory')
        ];

        selects.forEach(select => {
            if (!select) return;

            const currentValue = select.value;
            const isFilterSelect = select.id === 'filterCategory';

            let html = isFilterSelect ? `<option value="">${this.getTranslation('filters.allCategories')}</option>` : '';

            html += this.categories.map(cat => {
                const name = this.currentLang === 'ja' ? cat.nameJa : cat.name;
                return `<option value="${cat.id}">${name}</option>`;
            }).join('');

            select.innerHTML = html;
            select.value = currentValue;
        });
    }

    renderProgress() {
        const allTasks = this.tasks;
        const completedTasks = allTasks.filter(t => t.completed);
        const percentage = allTasks.length > 0
            ? Math.round((completedTasks.length / allTasks.length) * 100)
            : 0;

        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progressPercent').textContent = `${percentage}%`;
        document.getElementById('completedCount').textContent = completedTasks.length;
        document.getElementById('totalCount').textContent = allTasks.length;
    }

    renderListView() {
        const taskList = document.getElementById('taskList');
        const tasks = this.getFilteredTasks();

        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-tertiary);">
                    <p>No tasks found</p>
                </div>
            `;
            return;
        }

        const html = tasks.map(task => this.renderTaskItem(task)).join('');
        taskList.innerHTML = html;
    }

    renderTaskItem(task, isSubtask = false) {
        const category = this.getCategoryById(task.category);
        const categoryName = category
            ? (this.currentLang === 'ja' ? category.nameJa : category.name)
            : 'Uncategorized';
        const categoryColor = category ? category.color : '#6b7280';

        const subtasks = this.getSubtasks(task.id);
        const isOverdue = this.isOverdue(task);

        const dueDate = task.dueDate
            ? new Date(task.dueDate).toLocaleDateString(this.currentLang === 'ja' ? 'ja-JP' : 'en-US')
            : '-';
        const createdDate = new Date(task.createdDate).toLocaleDateString(this.currentLang === 'ja' ? 'ja-JP' : 'en-US');

        const priorityText = this.getTranslation(`priority.${task.priority}`);
        const overdueText = this.getTranslation('task.overdue');

        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <input type="checkbox"
                           class="task-checkbox"
                           ${task.completed ? 'checked' : ''}
                           onchange="app.toggleTaskCompletion('${task.id}')">
                    <div class="task-content">
                        <div class="task-title-row">
                            <h3 class="task-title">${task.title}</h3>
                            <span class="task-priority ${task.priority}">${priorityText}</span>
                            <span class="task-category-badge" style="background: ${categoryColor}">
                                ${categoryName}
                            </span>
                        </div>
                        ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                        <div class="task-meta">
                            <span class="task-meta-item">
                                ${this.getTranslation('task.created')}: ${createdDate}
                            </span>
                            <span class="task-meta-item ${isOverdue ? 'overdue' : ''}">
                                ${this.getTranslation('task.due')}: ${dueDate}
                                ${isOverdue ? `(${overdueText})` : ''}
                            </span>
                        </div>
                        <div class="task-actions">
                            <button class="btn-small" onclick="app.openEditTask('${task.id}')">
                                ${this.getTranslation('task.edit')}
                            </button>
                            <button class="btn-small" onclick="app.openAddSubtask('${task.id}')">
                                ${this.getTranslation('task.addSubtask')}
                            </button>
                            <button class="btn-small btn-danger" onclick="app.handleDeleteTask('${task.id}')">
                                ${this.getTranslation('task.delete')}
                            </button>
                        </div>
                        ${subtasks.length > 0 ? `
                            <div class="subtasks">
                                <strong>${this.getTranslation('task.subtasks')}:</strong>
                                ${subtasks.map(st => this.renderTaskItem(st, true)).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderKanbanView() {
        const todoTasks = document.getElementById('todoTasks');
        const inProgressTasks = document.getElementById('inProgressTasks');
        const completedTasks = document.getElementById('completedTasks');

        const allTasks = this.getFilteredTasks();

        const todo = allTasks.filter(t => t.status === 'todo');
        const inProgress = allTasks.filter(t => t.status === 'in-progress');
        const completed = allTasks.filter(t => t.status === 'completed');

        document.getElementById('todoCount').textContent = todo.length;
        document.getElementById('inProgressCount').textContent = inProgress.length;
        document.getElementById('completedTasksCount').textContent = completed.length;

        todoTasks.innerHTML = todo.map(t => this.renderKanbanTask(t)).join('');
        inProgressTasks.innerHTML = inProgress.map(t => this.renderKanbanTask(t)).join('');
        completedTasks.innerHTML = completed.map(t => this.renderKanbanTask(t)).join('');
    }

    renderKanbanTask(task) {
        const category = this.getCategoryById(task.category);
        const categoryName = category
            ? (this.currentLang === 'ja' ? category.nameJa : category.name)
            : 'Uncategorized';
        const categoryColor = category ? category.color : '#6b7280';
        const isOverdue = this.isOverdue(task);
        const priorityText = this.getTranslation(`priority.${task.priority}`);

        return `
            <div class="kanban-task"
                 draggable="true"
                 data-task-id="${task.id}"
                 ondragstart="app.handleDragStart(event)"
                 ondragend="app.handleDragEnd(event)">
                <div class="task-title-row">
                    <h4 class="task-title">${task.title}</h4>
                </div>
                <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0; flex-wrap: wrap;">
                    <span class="task-priority ${task.priority}">${priorityText}</span>
                    <span class="task-category-badge" style="background: ${categoryColor}">
                        ${categoryName}
                    </span>
                </div>
                ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                ${task.dueDate ? `
                    <div class="task-meta-item ${isOverdue ? 'overdue' : ''}" style="margin-top: 0.5rem;">
                        ${this.getTranslation('task.due')}: ${new Date(task.dueDate).toLocaleDateString(this.currentLang === 'ja' ? 'ja-JP' : 'en-US')}
                        ${isOverdue ? `<br><strong>${this.getTranslation('task.overdue')}</strong>` : ''}
                    </div>
                ` : ''}
                <div class="task-actions" style="margin-top: 1rem;">
                    <button class="btn-small" onclick="app.openEditTask('${task.id}')">
                        ${this.getTranslation('task.edit')}
                    </button>
                    <button class="btn-small btn-danger" onclick="app.handleDeleteTask('${task.id}')">
                        ${this.getTranslation('task.delete')}
                    </button>
                </div>
            </div>
        `;
    }

    // ===== DRAG AND DROP =====
    handleDragStart(event) {
        event.target.classList.add('dragging');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    }

    handleDragEnd(event) {
        event.target.classList.remove('dragging');
        document.querySelectorAll('.kanban-tasks').forEach(el => {
            el.classList.remove('drag-over');
        });
    }

    // ===== EVENT HANDLERS =====
    handleDeleteTask(taskId) {
        if (confirm(this.getTranslation('messages.deleteTask'))) {
            this.deleteTask(taskId);
        }
    }

    handleDeleteCategory(categoryId) {
        if (confirm(this.getTranslation('messages.deleteCategory'))) {
            this.deleteCategory(categoryId);
        }
    }

    openAddTask() {
        this.editingTaskId = null;
        document.getElementById('modalTitle').textContent = this.getTranslation('modal.addTask');
        document.getElementById('taskForm').reset();
        this.updateParentTaskOptions();
        document.getElementById('taskModal').classList.add('active');
    }

    openEditTask(taskId) {
        this.editingTaskId = taskId;
        const task = this.getTaskById(taskId);

        document.getElementById('modalTitle').textContent = this.getTranslation('modal.editTask');
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskDueDate').value = task.dueDate ? task.dueDate.split('T')[0] : '';

        // Update parent options first, then set the value
        this.updateParentTaskOptions(taskId);
        document.getElementById('taskParent').value = task.parentId || '';

        document.getElementById('taskModal').classList.add('active');
    }

    openAddSubtask(parentId) {
        this.editingTaskId = null;
        document.getElementById('modalTitle').textContent = this.getTranslation('modal.addTask');
        document.getElementById('taskForm').reset();
        document.getElementById('taskParent').value = parentId;
        this.updateParentTaskOptions();
        document.getElementById('taskModal').classList.add('active');
    }

    updateParentTaskOptions(excludeId = null) {
        const select = document.getElementById('taskParent');
        const rootTasks = this.tasks.filter(t => !t.parentId && t.id !== excludeId);

        let html = `<option value="">${this.getTranslation('modal.noParent')}</option>`;
        html += rootTasks.map(t =>
            `<option value="${t.id}">${t.title}</option>`
        ).join('');

        select.innerHTML = html;
    }

    closeModal() {
        document.getElementById('taskModal').classList.remove('active');
        this.editingTaskId = null;
    }

    closeCategoryModal() {
        document.getElementById('categoryModal').classList.remove('active');
    }

    handleTaskSubmit(event) {
        event.preventDefault();

        const taskData = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            category: document.getElementById('taskCategory').value,
            priority: document.getElementById('taskPriority').value,
            status: document.getElementById('taskStatus').value,
            dueDate: document.getElementById('taskDueDate').value || null,
            parentId: document.getElementById('taskParent').value || null
        };

        if (this.editingTaskId) {
            this.updateTask(this.editingTaskId, taskData);
        } else {
            this.addTask(taskData);
        }

        this.closeModal();
    }

    handleCategorySubmit(event) {
        event.preventDefault();

        const name = document.getElementById('categoryName').value;
        const color = document.getElementById('categoryColor').value;

        this.addCategory(name, color);
        document.getElementById('categoryForm').reset();
    }

    handleExport() {
        const data = {
            tasks: this.tasks,
            categories: this.categories,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        alert(this.getTranslation('messages.exportSuccess'));
    }

    handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.tasks && data.categories) {
                    this.tasks = data.tasks;
                    this.categories = data.categories;
                    this.saveData();
                    this.render();
                    alert(this.getTranslation('messages.importSuccess'));
                } else {
                    throw new Error('Invalid format');
                }
            } catch (error) {
                alert(this.getTranslation('messages.importError'));
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    switchView(view) {
        this.currentView = view;

        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.toggle('active', container.id === `${view}View`);
        });

        this.render();
    }

    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Theme toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Language toggle
        document.getElementById('languageToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // View switching
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchView(btn.dataset.view);
            });
        });

        // Mobile menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Add task
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.openAddTask();
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('cancelModal').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') {
                this.closeModal();
            }
        });

        // Task form submit
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            this.handleTaskSubmit(e);
        });

        // Category modal
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            document.getElementById('categoryModal').classList.add('active');
        });
        document.getElementById('closeCategoryModal').addEventListener('click', () => {
            this.closeCategoryModal();
        });
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target.id === 'categoryModal') {
                this.closeCategoryModal();
            }
        });
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            this.handleCategorySubmit(e);
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.render();
        });

        // Filters
        document.getElementById('filterCategory').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.render();
        });
        document.getElementById('filterStatus').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.render();
        });

        // Sort
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.render();
        });

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.handleExport();
        });
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => {
            this.handleImport(e);
        });

        // Drag and drop for Kanban
        document.querySelectorAll('.kanban-tasks').forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                column.classList.add('drag-over');
            });

            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });

            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('drag-over');

                const taskId = e.dataTransfer.getData('text/plain');
                const newStatus = column.parentElement.dataset.status;

                this.updateTask(taskId, { status: newStatus });
            });
        });
    }
}

// Initialize app
const app = new TodoApp();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
