import { create } from 'zustand';
import { Project, Task } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setTasks: (tasks: Task[]) => void;
  addProject: (project: Project) => void;
  updateProjectInStore: (project: Project) => void;
  removeProject: (projectId: string) => void;
  addTask: (task: Task) => void;
  updateTaskInStore: (task: Task) => void;
  removeTask: (taskId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  tasks: [],
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  
  setCurrentProject: (project) => set({ currentProject: project }),
  
  setTasks: (tasks) => set({ tasks }),
  
  addProject: (project) => set((state) => ({
    projects: [project, ...state.projects],
  })),
  
  updateProjectInStore: (project) => set((state) => ({
    projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    currentProject: state.currentProject?.id === project.id ? project : state.currentProject,
  })),
  
  removeProject: (projectId) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== projectId),
    currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
  })),
  
  addTask: (task) => set((state) => ({
    tasks: [task, ...state.tasks],
  })),
  
  updateTaskInStore: (task) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
