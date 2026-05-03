// User and Authentication Types
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  owner: User;
  members: ProjectMember[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  user: User;
  role: UserRole;
  joinedAt: string;
}

export interface ProjectCreateRequest {
  name: string;
  description: string;
}

export interface InviteMemberRequest {
  email: string;
  role: UserRole;
}

// Task Types
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  assigneeId?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
}

export interface TaskCreateRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
  assigneeId?: string;
}

export interface TaskUpdateRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  tasksInProgress: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentTasks: Task[];
  overdueTasks: Task[];
  projectsSummary: ProjectSummary[];
}

export interface ProjectSummary {
  id: string;
  name: string;
  totalTasks: number;
  completedTasks: number;
  members: number;
}

// Error Response
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
