// ProfileContext.tsx
import axiosInstance from '@/plugins/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useIsOnline } from 'react-use-is-online';
import NoInternetConnection from '../errors/no_internet_connection';
import ErrorLoadingPgae from '../errors/error_loading_page';

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
  setIsLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType>({
  currentProfile: null,
  setCurrentProfile: () => {},
  userInformation: null,
  isLoadingProfiles: true,
  setIsLoading: () => {},
  setIsLoadingError: () => {}
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
    const [userInformation, setUserInformation] = useState<accessTokenType | null>(null);
    const [isLoadingProfiles, setIsLoading] = useState<boolean>(true);
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
    const { isOffline } = useIsOnline();

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
    if(isLoadingError) return <ErrorLoadingPgae />
    if(isOffline) return <NoInternetConnection />
    return (
      <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, userInformation, isLoadingProfiles, setIsLoading, setIsLoadingError }}>
        {children}
      </ProfileContext.Provider>
    );
  };
