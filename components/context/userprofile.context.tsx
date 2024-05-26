// ProfileContext.tsx
import axiosInstance from '@/plugins/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Profile = {
  _id: string;
  profileName: string;
  type: string;
};
export type accessTokenType = {
  userId: string,
  email: string,
  role: string,
  activeProfileId: string,
  iat: number,
  name: string
}

type ProfileContextType = {
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile) => void;
  userInformation: accessTokenType | null;
  isLoadingProfiles: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType>({
  currentProfile: null,
  setCurrentProfile: () => {},
  userInformation: null,
  isLoadingProfiles: true,
  setIsLoading: () => {}
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
    const [userInformation, setUserInformation] = useState<accessTokenType | null>(null);
    const [isLoadingProfiles, setIsLoading] = useState<boolean>(true);
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await axiosInstance.get('/users/whoami');
                if(response.data) {
                    setUserInformation(response.data.myInformation);
                } else {
                    setIsLoadingError(true);
                }
            } catch (error) {
                setIsLoadingError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataFromApi();
    }, []);
    //if(isLoadingProfiles) return (<div>Loading...</div>)
    if(isLoadingError) return (<div>Error fetching your data please refresh this page</div>)
    return (
      <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, userInformation, isLoadingProfiles, setIsLoading }}>
        {children}
      </ProfileContext.Provider>
    );
  };
