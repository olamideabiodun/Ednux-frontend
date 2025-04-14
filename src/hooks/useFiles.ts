// src/hooks/useFiles.ts

import { useState, useCallback } from 'react';
import axios from 'axios';

interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UseFilesReturn {
  files: File[];
  folders: Folder[];
  isLoading: boolean;
  error: string | null;
  fetchFiles: (folderId?: string) => Promise<void>;
  uploadFile: (file: Blob, folderId?: string) => Promise<File>;
  createFolder: (name: string, parentId?: string) => Promise<Folder>;
  deleteFile: (fileId: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const useFiles = (): UseFilesReturn => {
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('ednux_token');
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchFiles = useCallback(async (folderId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = folderId
        ? `${API_BASE_URL}/api/folders/${folderId}/contents`
        : `${API_BASE_URL}/api/files`;

      const response = await axios.get(url, {
        headers: getAuthHeaders(),
      });

      setFiles(response.data.files || []);
      setFolders(response.data.folders || []);
    } catch (err) {
      setError('Failed to fetch files');
      console.error('Error fetching files:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadFile = useCallback(
    async (file: Blob, folderId?: string): Promise<File> => {
      setIsLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        if (folderId) {
          formData.append('folderId', folderId);
        }

        const response = await axios.post(`${API_BASE_URL}/api/files/upload`, formData, {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        });

        const newFile = response.data;
        setFiles((prevFiles) => [...prevFiles, newFile]);
        return newFile;
      } catch (err) {
        setError('Failed to upload file');
        console.error('Error uploading file:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createFolder = useCallback(
    async (name: string, parentId?: string): Promise<Folder> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/folders`,
          {
            name,
            parentId: parentId || null,
          },
          {
            headers: getAuthHeaders(),
          }
        );

        const newFolder = response.data;
        setFolders((prevFolders) => [...prevFolders, newFolder]);
        return newFolder;
      } catch (err) {
        setError('Failed to create folder');
        console.error('Error creating folder:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteFile = useCallback(async (fileId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/api/files/${fileId}`, {
        headers: getAuthHeaders(),
      });

      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (err) {
      setError('Failed to delete file');
      console.error('Error deleting file:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteFolder = useCallback(async (folderId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/api/folders/${folderId}`, {
        headers: getAuthHeaders(),
      });

      setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== folderId));
    } catch (err) {
      setError('Failed to delete folder');
      console.error('Error deleting folder:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    files,
    folders,
    isLoading,
    error,
    fetchFiles,
    uploadFile,
    createFolder,
    deleteFile,
    deleteFolder,
  };
};