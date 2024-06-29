export interface SchoolAdminAllUsers {
    message: string;
    users: Users;
  }
  export interface Users {
    schoolName: string;
    membersDetails?: (MembersDetailsEntity)[] | null;
  }
  export interface MembersDetailsEntity {
    _id: string;
    email: string;
    name: string;
    role: string;
    projectsCount: number;
    mpCount: number;
    joinedProjectCount: number;
  }
  