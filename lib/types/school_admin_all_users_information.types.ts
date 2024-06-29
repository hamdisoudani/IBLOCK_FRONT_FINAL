export interface SchoolAdminAllUsersInformation {
    message: string;
    userInformation: UserInformation;
  }
  export interface UserInformation {
    userInfromation: UserInfromation;
    getUserProjects?: (GetUserProjectsEntity)[] | [];
    createdMetaProjects?: (CreatedMetaProjects)[] | [];
  }
  export interface UserInfromation {
    _id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  }
  export interface GetUserProjectsEntity {
    _id: string;
    projectName: string;
    projectDescription: string;
    projectOwner: string;
    projectType: string;
    members?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
  }
  export interface CreatedMetaProjects {
        _id: string;
        projectName: string;
        projectDescription: string;
        collaborative: boolean;
        invitationCode: string;
        members?: (string)[] | null;
        createdAt: string;
    }