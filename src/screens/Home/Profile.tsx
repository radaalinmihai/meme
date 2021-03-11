import React, { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import {ProfileHeader, Avatar, TextWrapper, Section} from "../../components/styles";

const ProfileScreen: React.FC = (): JSX.Element => {
  const {getProfile, profile, loading} = useProfile();
  const [profilePicture, setProfilePicture] = useState(require('../../assets/avataaars.png'));

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if(Object.keys(profile).length > 0 && profile.avatar !== '') {
      setProfilePicture({ uri: profile.avatar });
    }
    console.log(profile);
  }, [profile]);

  return (
    <ProfileHeader>
      <Avatar source={profilePicture} />
      <Section>
        <TextWrapper fontSize={30}>@{profile.username}</TextWrapper>
        <TextWrapper fontSize={16}>{profile.firstName} {profile.lastName}</TextWrapper>
      </Section>
    </ProfileHeader>
  );
}

export default ProfileScreen;
