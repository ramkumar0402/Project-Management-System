import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { apiClient } from '../services/api';
import { useProjectStore } from '../store/projectStore';
import { Task, TaskPriority, User, TaskStatus } from '../types';
import { toast } from 'sonner';

interface TaskModalProps {
  projectId: string;
  onClose: () => void;
  onSuccess: (success: boolean) => void;
  task?: Task;
}

export const TaskModal = ({ projectId, onClose, onSuccess, task }: TaskModalProps) => {
  const { currentProject, addTask, updateTaskInStore } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || TaskPriority.MEDIUM,
    status: task?.status || TaskStatus.TODO,
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    assigneeId: task?.assigneeId || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (currentProject?.members) {
      setTeamMembers(currentProject.members.map((m) => m.user));
    }
  }, [currentProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      if (task) {
        const updatedTask = await apiClient.updateTask(projectId, task.id, {
          title: formData.title,
          description: formData.description,
          priority: formData.priority as TaskPriority,
          status: formData.status as TaskStatus,
          dueDate: formData.dueDate || undefined,
          assigneeId: formData.assigneeId || undefined,
        });
        updateTaskInStore(updatedTask);
        toast.success('Task updated successfully!');
      } else {
        const newTask = await apiClient.createTask(projectId, {
          title: formData.title,
          description: formData.description,
          priority: formData.priority as TaskPriority,
          dueDate: formData.dueDate || undefined,
          assigneeId: formData.assigneeId || undefined,
        });
        addTask(newTask);
        toast.success('Task created successfully!');
      }
      onSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save task';
      setErrors({ form: message });
      toast.error(message);
      onSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="What needs to be done?"
              disabled={isLoading}
            />
            {errors.title && <p className="text-red-600 text-xs mt-1 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="Add more details..."
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-no-repeat bg-right pr-10"
                disabled={isLoading}
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
                <option value={TaskPriority.URGENT}>Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-no-repeat bg-right pr-10"
                disabled={isLoading}
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.IN_REVIEW}>In Review</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Assignee
              </label>
              <select
                name="assigneeId"
                value={formData.assigneeId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-no-repeat bg-right pr-10"
                disabled={isLoading}
              >
                <option value="">Unassigned</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errors.form && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs text-red-600 font-medium">{errors.form}</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-all shadow-lg shadow-blue-600/20"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (task ? 'Save Changes' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
