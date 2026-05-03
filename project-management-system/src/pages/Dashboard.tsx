import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  FolderOpen,
  Plus,
} from 'lucide-react';
import { apiClient } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { DashboardData, TaskStatus } from '../types';
import { formatDate, formatTaskStatus } from '../utils/formatting';
import { toast } from 'sonner';
import { ProjectModal } from '../components/ProjectModal';
import { TaskCard } from '../components/TaskCard';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getDashboardData();
      setDashboardData(data);
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Failed to load dashboard</div>
      </div>
    );
  }

  const { stats, recentTasks, overdueTasks, projectsSummary } = dashboardData;

  const handleProjectCreated = (success: boolean) => {
    if (success) {
      setShowCreateModal(false);
      fetchDashboard();
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const task = recentTasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await apiClient.updateTask(task.projectId, taskId, { status: newStatus });
      toast.success('Task status updated');
      fetchDashboard();
    } catch {
      toast.error('Failed to update task status');
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg shadow-blue-600/20">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100 font-medium">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={<FolderOpen className="w-6 h-6" />}
          color="bg-white border-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Tasks"
          value={stats.tasksInProgress}
          icon={<Clock className="w-6 h-6" />}
          color="bg-white border-purple-100 text-purple-600"
        />
        <StatCard
          title="Completed"
          value={stats.completedTasks}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="bg-white border-green-100 text-green-600"
        />
        <StatCard
          title="Overdue"
          value={stats.overdueTasks}
          icon={<AlertCircle className="w-6 h-6" />}
          color="bg-white border-red-100 text-red-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {projectsSummary.length > 0 ? (
            <div className="grid gap-4">
              {projectsSummary.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{project.members} members</span>
                  </div>
                  <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          project.totalTasks > 0
                            ? (project.completedTasks / project.totalTasks) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm font-medium text-gray-500">
                      {project.completedTasks} of {project.totalTasks} tasks completed
                    </p>
                    <span className="text-sm font-bold text-blue-600">
                       {project.totalTasks > 0 ? Math.round((project.completedTasks / project.totalTasks) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <FolderOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-600 mb-6 font-medium">No projects yet. Let's start something new!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Create your first project
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats & Overdue */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Activity Summary</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Completion Rate</span>
                  <span className="text-sm font-bold text-green-600">
                    {stats.totalTasks > 0
                      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-50 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <div className="space-y-4 text-sm">
                  <StatusRow label="To Do" value={stats.totalTasks - stats.tasksInProgress - stats.completedTasks} color="bg-gray-400" />
                  <StatusRow label="In Progress" value={stats.tasksInProgress} color="bg-purple-500" />
                  <StatusRow label="Completed" value={stats.completedTasks} color="bg-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 -mr-16 -mt-16 rounded-full opacity-50" />
              <div className="flex items-center gap-2 mb-6 relative">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-gray-900">Overdue</h3>
              </div>
              <div className="space-y-3 relative">
                {overdueTasks.slice(0, 4).map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => navigate(`/projects/${task.projectId}`)}
                    className="p-3 bg-red-50/50 hover:bg-red-50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-red-100"
                  >
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{task.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] font-bold text-red-600 uppercase">Due {formatDate(task.dueDate || '')}</span>
                      <span className="text-[10px] font-medium text-gray-500">{formatTaskStatus(task.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tasks */}
      {recentTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
            <button 
              onClick={() => navigate('/projects')}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              View all tasks
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTasks.slice(0, 6).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => navigate(`/projects/${task.projectId}`)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <ProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleProjectCreated}
        />
      )}
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className={`${color} bg-white rounded-2xl p-6 border shadow-sm flex items-center justify-between`}>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
  </div>
);

const StatusRow = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);
