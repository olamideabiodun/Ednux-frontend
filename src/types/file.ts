// src/types/file.ts

export interface File {
    id: string;
    name: string;
    type: string;
    size: number;
    url?: string;
    folderId: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    sharedWith?: string[];
  }
  
  export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    sharedWith?: string[];
  }
  
  export interface FilePermission {
    id: string;
    fileId: string;
    userId: string;
    permission: 'view' | 'edit' | 'owner';
    createdAt: string;
  }
  
  export interface FolderPermission {
    id: string;
    folderId: string;
    userId: string;
    permission: 'view' | 'edit' | 'owner';
    createdAt: string;
  }
  
  export interface FileComment {
    id: string;
    fileId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FileVersion {
    id: string;
    fileId: string;
    version: number;
    url: string;
    size: number;
    createdAt: string;
    createdBy: string;
    comment?: string;
  }