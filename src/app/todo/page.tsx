'use client'

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'personal' | 'work' | 'shopping' | 'other';
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export default function TodoPage() {
  const { theme } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState<Todo['category']>('personal');
  const [newTodoPriority, setNewTodoPriority] = useState<Todo['priority']>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<Todo['category'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Todo['priority'] | 'all'>('all');
  
  // Load todos from localStorage on first render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error parsing stored todos:', e);
      }
    } else {
      // Demo todos for first-time users
      const demoTodos: Todo[] = [
        {
          id: uuidv4(),
          text: 'Complete project proposal',
          completed: false,
          category: 'work',
          createdAt: new Date().toISOString(),
          priority: 'high'
        },
        {
          id: uuidv4(),
          text: 'Buy groceries',
          completed: true,
          category: 'shopping',
          createdAt: new Date().toISOString(),
          priority: 'medium'
        },
        {
          id: uuidv4(),
          text: 'Schedule dentist appointment',
          completed: false,
          category: 'personal',
          createdAt: new Date().toISOString(),
          priority: 'low'
        }
      ];
      setTodos(demoTodos);
    }
  }, []);
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    const newTodo: Todo = {
      id: uuidv4(),
      text: newTodoText.trim(),
      completed: false,
      category: newTodoCategory,
      createdAt: new Date().toISOString(),
      priority: newTodoPriority
    };
    
    setTodos([newTodo, ...todos]);
    setNewTodoText('');
  };
  
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Filter todos based on filter criteria
  const filteredTodos = todos.filter(todo => {
    // Status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // Category filter
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    
    // Priority filter
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
    
    return true;
  });
  
  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondaryTextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  
  // Priority badge classes
  const getPriorityBadgeClass = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800';
      case 'medium':
        return theme === 'dark' ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800';
      case 'low':
        return theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800';
      default:
        return theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800';
    }
  };
  
  // Category badge classes
  const getCategoryBadgeClass = (category: Todo['category']) => {
    switch (category) {
      case 'work':
        return theme === 'dark' ? 'bg-indigo-900 text-indigo-100' : 'bg-indigo-100 text-indigo-800';
      case 'personal':
        return theme === 'dark' ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800';
      case 'shopping':
        return theme === 'dark' ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800';
      case 'other':
        return theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800';
      default:
        return theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>To-do List</h1>
          <p className={secondaryTextClass}>Organize and track your tasks</p>
        </div>
        
        {/* Add new todo form */}
        <div className={`mb-8 ${cardBgClass} rounded-xl shadow-sm border ${borderClass} p-6`}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTodo();
                  }
                }}
                className={`flex-1 px-4 py-2 rounded-lg border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textClass}`}
              />
              
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={newTodoCategory}
                  onChange={(e) => setNewTodoCategory(e.target.value as Todo['category'])}
                  className={`px-3 py-2 rounded-lg border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textClass}`}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>
                
                <select
                  value={newTodoPriority}
                  onChange={(e) => setNewTodoPriority(e.target.value as Todo['priority'])}
                  className={`px-3 py-2 rounded-lg border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textClass}`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                
                <button
                  onClick={addTodo}
                  disabled={!newTodoText.trim()}
                  className={`px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${!newTodoText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex flex-col">
            <span className={`text-sm font-medium mb-2 ${secondaryTextClass}`}>Status:</span>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : `${borderClass} ${inputBgClass} ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700`
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 text-sm font-medium border-t border-b ${
                  filter === 'active'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : `${borderClass} ${inputBgClass} ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700`
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  filter === 'completed'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : `${borderClass} ${inputBgClass} ${textClass} hover:bg-gray-50 dark:hover:bg-gray-700`
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className={`text-sm font-medium mb-2 ${secondaryTextClass}`}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Todo['category'] | 'all')}
              className={`px-3 py-2 rounded-lg border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textClass}`}
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <span className={`text-sm font-medium mb-2 ${secondaryTextClass}`}>Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Todo['priority'] | 'all')}
              className={`px-3 py-2 rounded-lg border ${borderClass} ${inputBgClass} focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textClass}`}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        {/* Todo list */}
        <div className={`${cardBgClass} rounded-xl shadow-sm border ${borderClass} overflow-hidden`}>
          {filteredTodos.length > 0 ? (
            <ul className={`divide-y ${borderClass}`}>
              {filteredTodos.map(todo => (
                <li key={todo.id} className={`p-4 flex items-start gap-3 ${todo.completed ? 'bg-opacity-50' : ''}`}>
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${textClass} font-medium ${todo.completed ? 'line-through opacity-70' : ''}`}>{todo.text}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryBadgeClass(todo.category)}`}>
                        {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(todo.priority)}`}>
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`flex-shrink-0 p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    aria-label="Delete todo"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <h3 className={`mt-2 text-lg font-medium ${textClass}`}>No tasks found</h3>
              <p className={`mt-1 ${secondaryTextClass}`}>
                {filter === 'active'
                  ? 'No active tasks. Everything is completed!'
                  : filter === 'completed'
                  ? 'No completed tasks yet. Keep working!'
                  : 'Add a new task to get started!'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}