import {
  User,
  UserRole,
  Project,
  ProjectMember,
  Task,
  TaskStatus,
  TaskPriority,
  DashboardData,
  DashboardStats,
  ProjectSummary,
} from '../types';

// ─── Helper ────────────────────────────────────────────────────────────
let idCounter = Math.floor(Math.random() * 10000) + 1000;
const nextId = () => {
  idCounter++;
  return String(idCounter);
};

const now = () => new Date().toISOString();
const daysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString();
const daysFromNow = (d: number) => new Date(Date.now() + d * 86400000).toISOString();

// ─── Users ─────────────────────────────────────────────────────────────
const initialUsers: User[] = [
  {
    id: '1',
    email: 'admin@projecthub.com',
    name: 'Alex Johnson',
    role: UserRole.ADMIN,
    createdAt: daysAgo(90),
  },
  {
    id: '2',
    email: 'sarah@projecthub.com',
    name: 'Sarah Miller',
    role: UserRole.MEMBER,
    createdAt: daysAgo(60),
  },
  {
    id: '3',
    email: 'james@projecthub.com',
    name: 'James Wilson',
    role: UserRole.MEMBER,
    createdAt: daysAgo(45),
  },
  {
    id: '4',
    email: 'emily@projecthub.com',
    name: 'Emily Chen',
    role: UserRole.MEMBER,
    createdAt: daysAgo(30),
  },
  {
    id: '5',
    email: 'michael@projecthub.com',
    name: 'Michael Brown',
    role: UserRole.MEMBER,
    createdAt: daysAgo(20),
  },
];

// Load users from localStorage or use initial
const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem('mock_users');
    return stored ? JSON.parse(stored) : initialUsers;
  } catch (e) {
    console.error('Failed to load mock users', e);
    return initialUsers;
  }
};

export const demoUsers: User[] = loadUsers();

const saveUsers = () => {
  localStorage.setItem('mock_users', JSON.stringify(demoUsers));
};

// ─── Project Members ───────────────────────────────────────────────────
const makeMember = (user: User, role: UserRole = UserRole.MEMBER): ProjectMember => ({
  id: nextId(),
  user,
  role,
  joinedAt: daysAgo(Math.floor(Math.random() * 30)),
});

// ─── Mutable store (persisted in memory for the session) ───────────────
const loadProjects = (): Project[] => {
  try {
    const stored = localStorage.getItem('mock_projects');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load mock projects', e);
    return [];
  }
};

let projects: Project[] = loadProjects();

const saveProjects = () => {
  localStorage.setItem('mock_projects', JSON.stringify(projects));
};

const loadPasswords = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem('mock_passwords');
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Failed to load mock passwords', e);
    return {};
  }
};

const userPasswords: Record<string, string> = loadPasswords();

const savePasswords = () => {
  localStorage.setItem('mock_passwords', JSON.stringify(userPasswords));
};

const getProjectById = (id: string) => projects.find((p) => p.id === id);

// ─── Public API (mirrors ApiClient interface) ──────────────────────────
export const mockApi = {
  // Auth
  login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const user = demoUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const storedPassword = userPasswords[normalizedEmail] || 'password123';
    if (storedPassword !== password) {
      throw new Error('Invalid email or password');
    }
    
    return { token: `mock-jwt-${user.id}`, user };
  },

  signup(name: string, email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = demoUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      throw new Error('Email is already registered');
    }
    const newUser: User = {
      id: nextId(),
      email: normalizedEmail,
      name,
      role: UserRole.ADMIN,
      createdAt: now(),
    };
    demoUsers.push(newUser);
    userPasswords[normalizedEmail] = password;
    saveUsers();
    savePasswords();
    return { token: `mock-jwt-${newUser.id}`, user: newUser };
  },

  // Dashboard
  getDashboardData(userId: string): DashboardData {
    const userProjects = projects.filter(
      (p) => p.owner.id === userId || p.members.some((m) => m.user.id === userId)
    );

    const allTasks = userProjects.flatMap((p) => p.tasks);
    const completed = allTasks.filter((t) => t.status === TaskStatus.COMPLETED);
    const inProgress = allTasks.filter(
      (t) => t.status === TaskStatus.IN_PROGRESS || t.status === TaskStatus.IN_REVIEW
    );
    const overdue = allTasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.COMPLETED
    );

    const stats: DashboardStats = {
      totalProjects: userProjects.length,
      totalTasks: allTasks.length,
      completedTasks: completed.length,
      overdueTasks: overdue.length,
      tasksInProgress: inProgress.length,
    };

    const projectsSummary: ProjectSummary[] = userProjects.map((p) => ({
      id: p.id,
      name: p.name,
      totalTasks: p.tasks.length,
      completedTasks: p.tasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
      members: p.members.length,
    }));

    return {
      stats,
      recentTasks: allTasks
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6),
      overdueTasks: overdue,
      projectsSummary,
    };
  },

  // Projects
  getProjects() {
    return { data: projects, pagination: { page: 1, limit: 10, total: projects.length, pages: 1 } };
  },

  getProject(projectId: string) {
    const p = getProjectById(projectId);
    if (!p) throw new Error('Project not found');
    return p;
  },

  createProject(name: string, description: string, owner: User): Project {
    const newProject: Project = {
      id: `proj-${nextId()}`,
      name,
      description,
      owner,
      members: [makeMember(owner, UserRole.ADMIN)],
      tasks: [],
      createdAt: now(),
      updatedAt: now(),
    };
    projects = [newProject, ...projects];
    saveProjects();
    return newProject;
  },

  deleteProject(projectId: string) {
    projects = projects.filter((p) => p.id !== projectId);
    saveProjects();
  },

  inviteMember(projectId: string, email: string, role: UserRole) {
    const project = getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const userToInvite = demoUsers.find((u) => u.email === email);
    if (!userToInvite) {
      throw new Error('User not found. They must sign up first.');
    }

    if (project.members.some((m) => m.user.id === userToInvite.id)) {
      throw new Error('User is already a member of this project');
    }

    project.members.push(makeMember(userToInvite, role));
    project.updatedAt = now();
    saveProjects();
  },

  // Tasks
  getTasks(projectId: string) {
    const p = getProjectById(projectId);
    const tasks = p ? p.tasks : [];
    return { data: tasks, pagination: { page: 1, limit: 20, total: tasks.length, pages: 1 } };
  },

  createTask(
    projectId: string,
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: string | undefined,
    assigneeId: string | undefined,
    createdBy: User
  ): Task {
    const project = getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const assignee = assigneeId ? demoUsers.find((u) => u.id === assigneeId) : undefined;

    const task: Task = {
      id: `task-${nextId()}`,
      projectId,
      title,
      description,
      status: TaskStatus.TODO,
      priority,
      assignee,
      assigneeId,
      dueDate,
      createdAt: now(),
      updatedAt: now(),
      createdBy,
    };

    project.tasks = [task, ...project.tasks];
    saveProjects();
    return task;
  },

  updateTask(projectId: string, taskId: string, updates: Partial<Task>): Task {
    const project = getProjectById(projectId);
    if (!project) throw new Error('Project not found');

    const idx = project.tasks.findIndex((t) => t.id === taskId);
    if (idx === -1) throw new Error('Task not found');

    project.tasks[idx] = { ...project.tasks[idx], ...updates, updatedAt: now() };
    saveProjects();
    return project.tasks[idx];
  },

  deleteTask(projectId: string, taskId: string) {
    const project = getProjectById(projectId);
    if (!project) throw new Error('Project not found');
    project.tasks = project.tasks.filter((t) => t.id !== taskId);
    saveProjects();
  },
};
