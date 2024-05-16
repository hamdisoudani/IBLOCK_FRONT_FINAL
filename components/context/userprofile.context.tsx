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
};

const ProfileContext = createContext<ProfileContextType>({
  currentProfile: null,
  setCurrentProfile: () => {},
  userInformation: null,
});

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
    const [userInformation, setUserInformation] = useState<accessTokenType | null>(null);
    const [isLoadins, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const response = await axiosInstance.get('/users/whoami');
                if(response.data) {
                    setUserInformation(response.data.myInformation);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataFromApi();
    }, []);
    if(isLoadins) return (<div>Loading...</div>)
    return (
      <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, userInformation }}>
        {children}
      </ProfileContext.Provider>
    );
  };
