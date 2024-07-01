export interface SuperAdminGlobalStatsType {
    totalSchools: number;
    totalUsers: number;
    totalAdmins: number;
    totalStudents: number;
    totalTeachers: number;
    totalProjects: number;
    totalMetaProjects: number;
    totalPersonalProjects: number;
    totalTeamProjects: number;
    recentSchools?: (RecentSchoolsEntity)[] | null;
    recentUsers?: (RecentUsersEntity)[] | null;
    recentProjects?: (RecentProjectsEntity)[] | null;
    recentMpProjects?: (RecentMpProjectsEntity)[] | null;
  }
  export interface RecentSchoolsEntity {
    _id: string;
    schoolName: string;
    invitationCode: string;
    adminId: string;
    members?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface RecentUsersEntity {
    _id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  }
  export interface RecentProjectsEntity {
    _id: string;
    projectName: string;
    projectDescription: string;
    projectOwner: string;
    projectType: string;
    members?: (string | null)[] | null;
    invitationCode: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface RecentMpProjectsEntity {
    _id: string;
    projectName: string;
    projectDescription: string;
    projectOwner: string;
    projectType: string;
    members?: (string)[] | null;
    invitationCode: string;
    schoolId: string;
    metaProjectID: string;
    collaborative: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  