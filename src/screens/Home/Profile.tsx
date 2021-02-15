import React, { useEffect, useState } from "react";
import useProfile from "../../hooks/useProfile";
import {Wrapper, Avatar} from "../../components/styles";

const ProfileScreen: React.FC = (): JSX.Element => {
  const {getProfile, profile, loading} = useProfile();
  const [profilePicture, setProfilePicture] = useState(require('../../assets/avataaars.png'));

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log({profile, loading});
    if(Object.keys(profile).length > 0 && profile.avatar !== '') {
      setProfilePicture({ uri: profile.avatar });
    }
  }, [profile]);

  return (
    <Wrapper>
      <Avatar source={profilePicture} />
    </Wrapper>
  );
}

export default ProfileScreen;
