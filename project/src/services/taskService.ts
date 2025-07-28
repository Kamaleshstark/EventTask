import { Task } from '../contexts/TaskContext';

const TASKS_KEY = 'task_app_tasks';

// Realistic project tasks that look like actual development work
const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Fix login form validation bug',
    description: 'Users can submit empty forms. Need to add proper validation for email format and password length. Also fix the error message styling that overlaps with input fields.',
    status: 'done',
    priority: 'high',
    dueDate: '2025-01-15',
    createdBy: '1',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-12T16:30:00Z'
  },
  {
    id: '2',
    title: 'Add dark mode toggle',
    description: 'Marketing team requested dark mode. Need to implement theme switching with localStorage persistence. Should work across all components and maintain user preference.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-01-25',
    createdBy: '2',
    assignedTo: '3',
    createdAt: '2025-01-18T10:15:00Z',
    updatedAt: '2025-01-20T14:20:00Z'
  },
  {
    id: '3',
    title: 'Optimize dashboard loading time',
    description: 'Dashboard takes 3+ seconds to load with large datasets. Implement pagination, lazy loading for task cards, and maybe add skeleton loaders for better UX.',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-01-28',
    createdBy: '1',
    assignedTo: '2',
    createdAt: '2025-01-19T11:30:00Z',
    updatedAt: '2025-01-19T11:30:00Z'
  },
  {
    id: '4',
    title: 'Mobile responsive issues on iPhone',
    description: 'Task cards are breaking on mobile Safari. The create task button is also too small on touch devices. Need to test and fix responsive design issues.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2025-01-26',
    createdBy: '3',
    createdAt: '2025-01-17T13:45:00Z',
    updatedAt: '2025-01-21T10:30:00Z'
  },
  {
    id: '5',
    title: 'Add task due date notifications',
    description: 'Users want to get notified about upcoming deadlines. Implement browser notifications for tasks due in 24 hours. Need permission handling and fallback to in-app notifications.',
    status: 'todo',
    priority: 'low',
    dueDate: '2025-02-01',
    createdBy: '2',
    assignedTo: '1',
    createdAt: '2025-01-20T09:20:00Z',
    updatedAt: '2025-01-20T09:20:00Z'
  },
  {
    id: '6',
    title: 'Refactor task filtering logic',
    description: 'Current filter code is messy and hard to maintain. Split into separate hooks, add debouncing for search, and improve performance with useMemo.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-01-30',
    createdBy: '1',
    createdAt: '2025-01-21T11:00:00Z',
    updatedAt: '2025-01-21T11:00:00Z'
  },
  {
    id: '7',
    title: 'Security audit findings',
    description: 'Security team found XSS vulnerability in task description rendering. Need to sanitize HTML input and review all user-generated content display.',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-01-24',
    createdBy: '1',
    assignedTo: '2',
    createdAt: '2025-01-22T16:20:00Z',
    updatedAt: '2025-01-22T16:20:00Z'
  },
  {
    id: '8',
    title: 'Add bulk task operations',
    description: 'Users want to select multiple tasks and change status/delete at once. Need checkboxes, select all functionality, and confirmation dialogs for bulk actions.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-02-05',
    createdBy: '3',
    assignedTo: '1',
    createdAt: '2025-01-23T12:00:00Z',
    updatedAt: '2025-01-23T12:00:00Z'
  },
  {
    id: '9',
    title: 'Fix memory leak in task updates',
    description: 'React DevTools showing memory leak when rapidly updating task status. Probably missing cleanup in useEffect. Need to investigate and fix.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-01-27',
    createdBy: '2',
    createdAt: '2025-01-24T14:30:00Z',
    updatedAt: '2025-01-25T09:15:00Z'
  },
  {
    id: '10',
    title: 'Improve error handling',
    description: 'App crashes when API is down. Need better error boundaries, retry logic for failed requests, and user-friendly error messages instead of technical ones.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-02-03',
    createdBy: '1',
    assignedTo: '3',
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z'
  },
  {
    id: '11',
    title: 'Add task search functionality',
    description: 'Users can\'t find tasks easily with many items. Implement real-time search that looks through title and description. Maybe add search history too.',
    status: 'done',
    priority: 'medium',
    dueDate: '2025-01-23',
    createdBy: '3',
    createdAt: '2025-01-16T09:15:00Z',
    updatedAt: '2025-01-22T15:45:00Z'
  },
  {
    id: '12',
    title: 'Update dependencies and fix vulnerabilities',
    description: 'npm audit showing 15 vulnerabilities. Update React to latest version, fix deprecated lifecycle methods, and ensure all packages are up to date.',
    status: 'todo',
    priority: 'low',
    dueDate: '2025-02-10',
    createdBy: '2',
    assignedTo: '1',
    createdAt: '2025-01-26T15:20:00Z',
    updatedAt: '2025-01-26T15:20:00Z'
  }
];

const initializeTasks = () => {
  const existingTasks = localStorage.getItem(TASKS_KEY);
  if (!existingTasks) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks));
  }
};

const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(300);
    initializeTasks();
    return getTasks();
  },

  async getTask(id: string): Promise<Task> {
    await delay(200);
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await delay(400);
    const tasks = getTasks();
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasks(tasks);
    
    return newTask;
  },

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    await delay(300);
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);
    
    return updatedTask;
  },

  async deleteTask(id: string): Promise<void> {
    await delay(300);
    const tasks = getTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) {
      throw new Error('Task not found');
    }

    saveTasks(filteredTasks);
  },
};