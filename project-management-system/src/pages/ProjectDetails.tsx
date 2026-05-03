import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Users,
  Trash2,
  AlertCircle,
  Edit2,
} from 'lucide-react';
import { apiClient } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { TaskStatus, Task } from '../types';
import { toast } from 'sonner';
import { TaskModal } from '../components/TaskModal';
import { InviteMemberModal } from '../components/InviteMemberModal';
import { TaskCard } from '../components/TaskCard';
import { ProjectModal } from '../components/ProjectModal';

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentProject, setCurrentProject, tasks, setTasks, removeTask } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProject = useCallback(async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      const project = await apiClient.getProject(projectId);
      setCurrentProject(project);

      const tasksResponse = await apiClient.getTasks(projectId);
      setTasks(tasksResponse.data);
    } catch {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setIsLoading(false);
    }
  }, [projectId, setCurrentProject, setTasks, navigate]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleDeleteProject = async () => {
    if (!projectId) return;

    try {
      await apiClient.deleteProject(projectId);
      toast.success('Project deleted successfully');
      navigate('/projects');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleTaskSuccess = (success: boolean) => {
    if (success) {
      setShowTaskModal(false);
      setEditingTask(undefined);
      fetchProject();
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    if (!projectId) return;

    try {
      await apiClient.updateTask(projectId, taskId, { status: newStatus });
      toast.success('Task status updated');
      fetchProject();
    } catch {
      toast.error('Failed to update task status');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!projectId) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.deleteTask(projectId, taskId);
        removeTask(taskId);
        toast.success('Task deleted successfully');
      } catch {
        toast.error('Failed to delete task');
      }
    }
  };

  const isOwner = user?.id === currentProject?.owner.id;

  const statusGroups = {
    TODO: tasks.filter((t) => t.status === TaskStatus.TODO),
    IN_PROGRESS: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    IN_REVIEW: tasks.filter((t) => t.status === TaskStatus.IN_REVIEW),
    COMPLETED: tasks.filter((t) => t.status === TaskStatus.COMPLETED),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500 font-medium animate-pulse">Loading project details...</div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Project not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{currentProject.name}</h1>
            <p className="text-gray-500 mt-2 font-medium max-w-2xl leading-relaxed">{currentProject.description}</p>
          </div>

          {isOwner && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatBox label="Total Tasks" value={tasks.length} color="text-blue-600" />
        <StatBox
          label="Completed"
          value={tasks.filter((t) => t.status === TaskStatus.COMPLETED).length}
          color="text-green-600"
        />
        <StatBox label="Team Members" value={currentProject.members.length} color="text-purple-600" />
        <StatBox
          label="In Progress"
          value={tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length}
          color="text-orange-600"
        />
      </div>

      {/* Members & Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Members Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Team
              </h2>
              {isOwner && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {currentProject.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {member.user.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{member.user.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Main Board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">Task Board</h2>
            <button
              onClick={() => {
                setEditingTask(undefined);
                setShowTaskModal(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks created yet</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Get the project started by adding the first few tasks for your team.</p>
              <button
                onClick={() => setShowTaskModal(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
              >
                Create First Task
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Object.entries(statusGroups).map(([status, statusTasks]) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                      {status.replace(/_/g, ' ')}
                    </h3>
                    <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-black">
                      {statusTasks.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {statusTasks.map((task) => (
                      <div key={task.id} className="relative group">
                        <TaskCard
                          task={task}
                          onStatusChange={handleStatusChange}
                          onClick={() => handleEditTask(task)}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-200 z-10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Project Modal */}
      {showEditModal && (
        <ProjectModal
          project={currentProject}
          onClose={() => setShowEditModal(false)}
          onSuccess={(success) => {
            if (success) {
              setShowEditModal(false);
              fetchProject();
            }
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Delete Project?</h2>
            </div>

            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              You're about to delete <span className="text-gray-900 font-bold">"{currentProject.name}"</span>. This will permanently remove all tasks, files, and team access. This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3.5 border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
              >
                Keep Project
              </button>
              <button
                onClick={handleDeleteProject}
                className="flex-1 px-4 py-3.5 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Modal (Create/Edit) */}
      {showTaskModal && projectId && (
        <TaskModal
          projectId={projectId}
          task={editingTask}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(undefined);
          }}
          onSuccess={handleTaskSuccess}
        />
      )}

      {/* Invite Member Modal */}
      {showInviteModal && projectId && (
        <InviteMemberModal
          projectId={projectId}
          onClose={() => setShowInviteModal(false)}
          onSuccess={(success) => {
            if (success) {
              setShowInviteModal(false);
              fetchProject();
            }
          }}
        />
      )}
    </div>
  );
};

const StatBox = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <p className={`text-4xl font-black mt-2 ${color}`}>{value}</p>
  </div>
);
