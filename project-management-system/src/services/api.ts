import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  Project,
  ProjectCreateRequest,
  Task,
  TaskCreateRequest,
  TaskUpdateRequest,
  DashboardData,
  PaginatedResponse,
  InviteMemberRequest,
} from '../types';
import { mockApi } from './mockData';

// Simulate network latency (200–500 ms) so the UI loading states are visible
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms + Math.random() * 200));

/**
 * ApiClient backed by an in-memory mock store.
 * -  No real HTTP calls → no backend needed.
 * -  Swap `mockApi.*` calls with real `axios` calls when a backend is ready.
 */
class ApiClient {
  // ── Auth ──────────────────────────────────────────────────────────────
  async signup(data: SignupRequest): Promise<AuthResponse> {
    await delay();
    const result = mockApi.signup(data.name, data.email, data.password);
    return result;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    await delay();
    const result = mockApi.login(data.email, data.password);
    return result;
  }

  async getCurrentUser(): Promise<AuthResponse> {
    await delay();
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Not authenticated');
    try {
      const user = JSON.parse(userStr);
      return { token: localStorage.getItem('authToken') || '', user };
    } catch (e) {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      throw new Error('Session expired or corrupted');
    }
  }

  // ── Projects ─────────────────────────────────────────────────────────
  async getProjects(_page = 1, _limit = 10): Promise<PaginatedResponse<Project>> {
    await delay();
    return mockApi.getProjects();
  }

  async getProject(projectId: string): Promise<Project> {
    await delay();
    return mockApi.getProject(projectId);
  }

  async createProject(data: ProjectCreateRequest): Promise<Project> {
    await delay();
    const userStr = localStorage.getItem('user');
    const owner = userStr ? JSON.parse(userStr) : mockApi.login('admin@projecthub.com', 'password123').user;
    return mockApi.createProject(data.name, data.description, owner);
  }

  async updateProject(projectId: string, data: Partial<ProjectCreateRequest>): Promise<Project> {
    await delay();
    const project = mockApi.getProject(projectId);
    if (data.name) project.name = data.name;
    if (data.description) project.description = data.description;
    return project;
  }

  async deleteProject(projectId: string): Promise<void> {
    await delay();
    mockApi.deleteProject(projectId);
  }

  async inviteMember(projectId: string, data: InviteMemberRequest): Promise<void> {
    await delay();
    mockApi.inviteMember(projectId, data.email, data.role);
  }

  async removeMember(_projectId: string, _memberId: string): Promise<void> {
    await delay();
    // Mock: no-op
  }

  // ── Tasks ────────────────────────────────────────────────────────────
  async getTasks(projectId: string, _page = 1, _limit = 20): Promise<PaginatedResponse<Task>> {
    await delay();
    return mockApi.getTasks(projectId);
  }

  async getTask(projectId: string, taskId: string): Promise<Task> {
    await delay();
    const tasks = mockApi.getTasks(projectId);
    const task = tasks.data.find((t) => t.id === taskId);
    if (!task) throw new Error('Task not found');
    return task;
  }

  async createTask(projectId: string, data: TaskCreateRequest): Promise<Task> {
    await delay();
    const userStr = localStorage.getItem('user');
    const creator = userStr ? JSON.parse(userStr) : mockApi.login('admin@projecthub.com', '').user;
    return mockApi.createTask(
      projectId,
      data.title,
      data.description,
      data.priority,
      data.dueDate,
      data.assigneeId,
      creator
    );
  }

  async updateTask(projectId: string, taskId: string, data: TaskUpdateRequest): Promise<Task> {
    await delay();
    return mockApi.updateTask(projectId, taskId, data);
  }

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    await delay();
    mockApi.deleteTask(projectId, taskId);
  }

  async assignTask(projectId: string, taskId: string, assigneeId: string): Promise<Task> {
    await delay();
    return mockApi.updateTask(projectId, taskId, { assigneeId });
  }

  // ── Dashboard ────────────────────────────────────────────────────────
  async getDashboardData(): Promise<DashboardData> {
    await delay();
    const userStr = localStorage.getItem('user');
    let userId = '1';
    try {
      if (userStr) {
        const user = JSON.parse(userStr);
        userId = user.id || '1';
      }
    } catch (e) {
      console.error('Failed to parse user for dashboard', e);
    }
    return mockApi.getDashboardData(userId);
  }
}

export const apiClient = new ApiClient();
