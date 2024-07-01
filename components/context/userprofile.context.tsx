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
export type ProfileType = {
  _id: string, 
  profileName: string,
  createdAt: string,
  updatedAt: string,
  type: string
}
interface Profiles {
  selectedProfile: ProfileType,
  availableProfiles: ProfileType[]
}
type ProfileContextType = {
  currentProfile: Profile | null;
  userInformation: accessTokenType | null;
  isLoadingProfiles: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
  profilesData: Profiles  | undefined,
  getUserProfiles: () => void
};

const ProfileContext = createContext<ProfileContextType>({
  currentProfile: null,
  userInformation: null,
  isLoadingProfiles: true,
  setIsLoading: () => {},
  setIsLoadingError: () => {},
  profilesData: undefined,
  getUserProfiles: () => {}
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
    const [userInformation, setUserInformation] = useState<accessTokenType | null>(null);
    const [isLoadingProfiles, setIsLoading] = useState<boolean>(true);
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
    const { isOffline } = useIsOnline();
    const [profilesData, setData] = useState<Profiles>();
    const fetchCurrentUserInformation = async () => {
      try {
          const response = await axiosInstance.get('/users/whoami');
          if(response.data) {
              setUserInformation(response.data.myInformation);
          } else {
              setIsLoadingError(true);
          }
      } catch (error) {
          setIsLoadingError(true);
      }
  };

  const getUserProfiles = async () => {
      try {
      // Contact the API endpoint
      const response = await axiosInstance.get('/profile');
      
      if (response.data) {
          setData(response.data);
          setCurrentProfile(response.data.selectedProfile)
      } else {
          console.error('Failed to fetch data:', response.statusText);
      }
      } catch (error) {
      console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
  };
    useEffect(() => {
        fetchCurrentUserInformation();
        getUserProfiles()
    }, []);
    //if(isLoadingProfiles) return (<div>Loading...</div>)
    if(isLoadingError) return <ErrorLoadingPgae />
    if(isOffline) return <NoInternetConnection />
    return (

      <ProfileContext.Provider value={{ currentProfile, userInformation, isLoadingProfiles, setIsLoading, profilesData, getUserProfiles, setIsLoadingError }}>
        {children}
      </ProfileContext.Provider>
    );
  };
