'use client';

import { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, X, ListTodo } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      {/* Toggle Button - Fixed to right side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 -translate-y-1/2 -right-3 bg-highlight border-2 border-r-0 border-border rounded-l-lg px-6 py-3 hover:bg-border hover:right-0 transition-all duration-300 cursor-pointer z-40 shadow-md"
        aria-label="Toggle todo list"
      >
        <ListTodo className="w-5 h-5 text-foreground transition-colors" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-accent/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 -right-96 h-2/3 w-96 bg-highlight border-2 border-border rounded-2xl shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-x-[25rem]' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-border rounded transition-colors cursor-pointer"
              aria-label="Close todo list"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Add Task Form */}
          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-secondary text-foreground placeholder:text-secondary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-foreground text-highlight rounded hover:bg-accent transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </form>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {tasks.length === 0 ? (
              <p className="text-secondary text-center mt-8">
                No tasks yet. Add one to get started!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-background border border-border rounded hover:border-secondary transition-colors group"
                >
                  <Checkbox.Root
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="w-5 h-5 bg-highlight border-2 border-border rounded flex items-center justify-center hover:border-secondary transition-colors cursor-pointer data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-4 h-4 text-highlight" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>

                  <span
                    className={`flex-1 text-foreground ${
                      task.completed ? 'line-through text-secondary' : ''
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-border rounded transition-all cursor-pointer"
                    aria-label="Delete task"
                  >
                    <X className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
