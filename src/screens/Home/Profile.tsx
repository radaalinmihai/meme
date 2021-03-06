import React, { useEffect, useState } from "react";

import Avataar from "../../assets/avataaars.png";
import EditOrShow from "../../components/EditOrShow";
import { Avatar, ProfileHeader, Section, TextWrapper } from "../../components/styles";
import { useProfile } from "../../contexts/home/ProfileContext";

const ProfileScreen: React.FC = (): JSX.Element => {
	const { getProfile, profile } = useProfile();
	const [profilePicture, setProfilePicture] = useState(Avataar);

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		if (Object.keys(profile).length > 0 && profile.avatar !== "") {
			setProfilePicture({ uri: profile.avatar });
		}
	}, [profile]);

	return (
		<ProfileHeader>
			<Section>
				<Avatar source={profilePicture} />
				<TextWrapper fontSize={30}>@{profile.username}</TextWrapper>
			</Section>
			<Section spaceBetween marginTop="10%" width="100%">
				<EditOrShow type="firstName" placeholder="No first name" />
				<EditOrShow type="lastName" placeholder="No last name" />
			</Section>
			<Section spaceBetween marginTop="5%" width="100%">
				<EditOrShow disabled type="email" placeholder="Your email" />
			</Section>
		</ProfileHeader>
	);
};

export default ProfileScreen;
