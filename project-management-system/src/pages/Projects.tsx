import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FolderOpen, Edit2, Trash2, UserPlus } from 'lucide-react';
import { apiClient } from '../services/api';
import { useProjectStore } from '../store/projectStore';
import { Project } from '../types';
import { toast } from 'sonner';
import { ProjectModal } from '../components/ProjectModal';
import { InviteMemberModal } from '../components/InviteMemberModal';

export const Projects = () => {
  const navigate = useNavigate();
  const { projects, setProjects, removeProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getProjects();
      setProjects(response.data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, [setProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModalSuccess = (success: boolean) => {
    if (success) {
      setShowModal(false);
      setEditingProject(undefined);
      fetchProjects();
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.deleteProject(projectId);
        removeProject(projectId);
        toast.success('Project deleted successfully');
      } catch {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleAssignMember = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setSelectedProjectId(projectId);
    setShowInviteModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your projects and teams</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(undefined);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
              onEdit={(e) => handleEditProject(e, project)}
              onDelete={(e) => handleDeleteProject(e, project.id)}
              onAssign={(e) => handleAssignMember(e, project.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'No projects found matching your search' : 'No projects yet'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create your first project
            </button>
          )}
        </div>
      )}

      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowModal(false);
            setEditingProject(undefined);
          }}
          onSuccess={handleModalSuccess}
        />
      )}

      {showInviteModal && selectedProjectId && (
        <InviteMemberModal
          projectId={selectedProjectId}
          onClose={() => {
            setShowInviteModal(false);
            setSelectedProjectId(null);
          }}
          onSuccess={(success) => {
            if (success) {
              setShowInviteModal(false);
              setSelectedProjectId(null);
              fetchProjects();
            }
          }}
        />
      )}
    </div>
  );
};

const ProjectCard = ({
  project,
  onClick,
  onEdit,
  onDelete,
  onAssign,
}: {
  project: Project;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onAssign: (e: React.MouseEvent) => void;
}) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg cursor-pointer transition-all relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{project.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{project.description}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onAssign}
          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
          title="Assign Member"
        >
          <UserPlus className="w-4 h-4" />
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-md transition-colors"
          title="Edit Project"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors"
          title="Delete Project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="space-y-3 border-t border-gray-200 pt-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-700">Progress</span>
          <span className="text-xs font-bold text-gray-900">
            {project.tasks.length > 0
              ? Math.round(
                  (project.tasks.filter((t) => t.status === 'COMPLETED').length /
                    project.tasks.length) *
                    100
                )
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${
                project.tasks.length > 0
                  ? (project.tasks.filter((t) => t.status === 'COMPLETED').length /
                      project.tasks.length) *
                    100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 rounded p-2 text-center">
          <p className="text-gray-600 text-xs">Tasks</p>
          <p className="font-bold text-gray-900">{project.tasks.length}</p>
        </div>
        <div className="bg-gray-50 rounded p-2 text-center">
          <p className="text-gray-600 text-xs">Members</p>
          <p className="font-bold text-gray-900">{project.members.length}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="text-xs text-gray-600">
        Owner: <span className="font-semibold">{project.owner.name}</span>
      </p>
    </div>
  </div>
);
