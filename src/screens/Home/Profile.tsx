import React, { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import {ProfileHeader, Avatar, TextWrapper, Section} from "../../components/styles";
import EditOrShow from "../../components/EditOrShow";

const ProfileScreen: React.FC = (): JSX.Element => {
  const {getProfile, profile} = useProfile();
  const [profilePicture, setProfilePicture] = useState(require('../../assets/avataaars.png'));

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if(Object.keys(profile).length > 0 && profile.avatar !== '') {
      console.log(profile);
      setProfilePicture({ uri: profile.avatar });
    }
  }, [profile]);

  return (
    <ProfileHeader>
      <Section>
        <Avatar source={profilePicture} />
        <TextWrapper fontSize={30}>@{profile.username}</TextWrapper>
      </Section>
      <Section spaceBetween marginTop='10%' width='100%'>
        <EditOrShow type='firstName' placeholder='No first name' />
        <EditOrShow type='lastName' placeholder='No last name' />
      </Section>
      <Section spaceBetween marginTop='5%' width='100%'>
        <EditOrShow type='' placeholder='Your email' />
      </Section>
    </ProfileHeader>
  );
}

export default ProfileScreen;
