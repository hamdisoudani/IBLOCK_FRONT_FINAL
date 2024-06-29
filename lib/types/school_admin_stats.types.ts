export interface SchoolAdminStatstype {
    message: string;
    stats: Stats;
  }
  export interface Stats {
    schoolName: string;
    totalMembers: number;
    studentsCount: number;
    teachersCount: number;
    projectsCount: number;
    metaProjectsCount: number;
    projectsDetails?: (ProjectsDetailsEntity)[] | null;
    metaProjectsDetails?: (MetaProjectsDetailsEntity)[] | null;
    last5Users?: (ProjectOwnerDetailsEntityOrCreatedByDetailsEntityOrLast5UsersEntity)[] | null;
  }
  export interface ProjectsDetailsEntity {
    _id: string;
    projectName: string;
    projectType: string;
    projectOwnerDetails?: (ProjectOwnerDetailsEntityOrCreatedByDetailsEntityOrLast5UsersEntity)[] | null;
    members: number;
  }
  export interface ProjectOwnerDetailsEntityOrCreatedByDetailsEntityOrLast5UsersEntity {
    _id: string;
    email: string;
    name: string;
    role: string;
  }
  export interface MetaProjectsDetailsEntity {
    _id: string;
    projectName: string;
    createdByDetails?: (ProjectOwnerDetailsEntityOrCreatedByDetailsEntityOrLast5UsersEntity)[] | null;
    members: number;
  }
  