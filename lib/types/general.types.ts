export type UserProject = {
    createdAt: string,
    projectDescription: string, 
    projectName: string,
    projectOwner: string,
    updatedAt: string
    members?: [],
    _id: string
}

// This interfaces are for the owned and joined meta projects for teacher and student
export interface ownedMetaProjectsType {
    _id: string;
    projectName: string;
    projectDescription: string;
    members?: (MembersEntity)[] | null;
    numberOfCollaborativeInvitationCodes: number;
    collaborative: "Yes" | "No";
    invitationCode: string;
    createdAt: string;
}

export interface joinedMetaProjectsType {
    _id: string;
    projectName: string;
    projectDescription: string;
    owner: MembersEntity;
    collaborative: "Yes" | "No";
    createdAt: string;
    numberOfMembers: number;
}

export interface MembersEntity {
    _id: string;
    email: string;
    name: string;
    role: string;
}
// End of interfaces for owned and joined meta projects for teacher and student


// This interfaces are for the owned meta projects for teacher

export interface MetaProject {
    _id: string;
    projectName: string;
    projectDescription: string;
    members?: (MembersEntity)[] | null;
    projectCodes?: (MetaProjectCollaborativeCodes)[] | null;
    numberOfCollaborativeInvitationCodes: number;
    collaborative: "Yes" | "No";
    invitationCode: string;
    createdAt: string;
    owner?: (MembersEntity) | null;
}

export interface MetaProjectCollaborativeCodes {
    _id: string;
    childProjectName: string;
    childProjectDescription: string;
    members?: (MembersEntity)[] | null;
    numberOfMembers: number;
    code: string;
    createdAt: string;
}