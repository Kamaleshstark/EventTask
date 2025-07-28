import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { taskService } from '../services/taskService';
import { useAuth } from './AuthContext';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: {
    status?: string;
    priority?: string;
    search?: string;
  };
  sortBy: 'dueDate' | 'priority' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

type TaskAction =
  | { type: 'LOAD_TASKS_START' }
  | { type: 'LOAD_TASKS_SUCCESS'; payload: Task[] }
  | { type: 'LOAD_TASKS_ERROR'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskState['filters']> }
  | { type: 'SET_SORT'; payload: { sortBy: TaskState['sortBy']; sortOrder: TaskState['sortOrder'] } }
  | { type: 'CLEAR_ERROR' };

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  filters: {},
  sortBy: 'dueDate',
  sortOrder: 'asc',
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'LOAD_TASKS_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, isLoading: false, error: null };
    case 'LOAD_TASKS_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface TaskContextType extends TaskState {
  loadTasks: () => Promise<void>;
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => Promise<void>;
  updateTask: (id: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  setSort: (sortBy: TaskState['sortBy'], sortOrder: TaskState['sortOrder']) => void;
  clearError: () => void;
  filteredAndSortedTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { user } = useAuth();

  const loadTasks = async () => {
    dispatch({ type: 'LOAD_TASKS_START' });
    try {
      const tasks = await taskService.getTasks();
      dispatch({ type: 'LOAD_TASKS_SUCCESS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'LOAD_TASKS_ERROR', payload: 'Failed to load tasks' });
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    try {
      const task = await taskService.createTask({
        ...taskData,
        createdBy: user!.id,
      });
      dispatch({ type: 'ADD_TASK', payload: task });
    } catch (error) {
      throw new Error('Failed to create task');
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const task = await taskService.updateTask(id, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: task });
    } catch (error) {
      throw new Error('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  };

  const setFilters = (filters: Partial<TaskState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSort = (sortBy: TaskState['sortBy'], sortOrder: TaskState['sortOrder']) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = state.tasks;

    // Apply role-based filtering
    if (user) {
      if (user.role === 'user') {
        filtered = filtered.filter(task => task.createdBy === user.id || task.assignedTo === user.id);
      } else if (user.role === 'manager') {
        // Managers can see their own tasks and tasks assigned to them
        filtered = filtered.filter(task => 
          task.createdBy === user.id || 
          task.assignedTo === user.id ||
          // In a real app, you'd filter by team membership
          true
        );
      }
      // Admins can see all tasks
    }

    // Apply filters
    if (state.filters.status) {
      filtered = filtered.filter(task => task.status === state.filters.status);
    }
    if (state.filters.priority) {
      filtered = filtered.filter(task => task.priority === state.filters.priority);
    }
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (state.sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aVal = priorityOrder[a.priority];
          bVal = priorityOrder[b.priority];
          break;
        case 'dueDate':
          aVal = new Date(a.dueDate).getTime();
          bVal = new Date(b.dueDate).getTime();
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          aVal = a.title;
          bVal = b.title;
      }

      if (aVal < bVal) return state.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return state.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [state.tasks, state.filters, state.sortBy, state.sortOrder, user]);

  const value: TaskContextType = {
    ...state,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    setSort,
    clearError,
    filteredAndSortedTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};