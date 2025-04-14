// src/hooks/useProjects.ts
import { useState, useCallback } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
  assigneeId?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  members: { id: string; name: string; email: string; avatar?: string }[];
}

interface UseProjectsReturn {
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: string) => Promise<void>;
  fetchTasks: (projectId: string) => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<Project>;
  updateProject: (projectId: string, data: Partial<Project>) => Promise<Project>;
  createTask: (data: Partial<Task>) => Promise<Task>;
  updateTask: (taskId: string, data: Partial<Task>) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('ednux_token');
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects`, {
        headers: getAuthHeaders(),
      });
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProject = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects/${projectId}`, {
        headers: getAuthHeaders(),
      });
      setCurrentProject(response.data);
    } catch (err) {
      setError('Failed to fetch project');
      console.error('Error fetching project:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async (projectId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/projects/${projectId}/tasks`, {
        headers: getAuthHeaders(),
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = useCallback(async (data: Partial<Project>): Promise<Project> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/projects`,
        data,
        {
          headers: getAuthHeaders(),
        }
      );
      const newProject = response.data;
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      console.error('Error creating project:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(
    async (projectId: string, data: Partial<Project>): Promise<Project> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/projects/${projectId}`,
          data,
          {
            headers: getAuthHeaders(),
          }
        );
        const updatedProject = response.data;
        
        setProjects((prev) =>
          prev.map((project) => (project.id === projectId ? updatedProject : project))
        );
        
        if (currentProject && currentProject.id === projectId) {
          setCurrentProject(updatedProject);
        }
        
        return updatedProject;
      } catch (err) {
        setError('Failed to update project');
        console.error('Error updating project:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentProject]
  );

  const createTask = useCallback(async (data: Partial<Task>): Promise<Task> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/projects/${data.projectId}/tasks`,
        data,
        {
          headers: getAuthHeaders(),
        }
      );
      const newTask = response.data;
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTask = useCallback(
    async (taskId: string, data: Partial<Task>): Promise<Task> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/tasks/${taskId}`,
          data,
          {
            headers: getAuthHeaders(),
          }
        );
        const updatedTask = response.data;
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task))
        );
        return updatedTask;
      } catch (err) {
        setError('Failed to update task');
        console.error('Error updating task:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
        headers: getAuthHeaders(),
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    projects,
    currentProject,
    tasks,
    isLoading,
    error,
    fetchProjects,
    fetchProject,
    fetchTasks,
    createProject,
    updateProject,
    createTask,
    updateTask,
    deleteTask,
  };
};