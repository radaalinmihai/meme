import styled from 'styled-components/native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

interface ITextWrapper {
  fontSize?: number;
}

interface ISection {
  spaceBetween?: boolean;
  marginTop?: string;
  width?: string;
}

interface IEditInput {
  width?: string;
}

export const ProfileHeader = styled.View`
  padding: 10px;
`;

export const Section = styled.View<ISection>`
  flex-direction: row;
  align-items: center;
  ${({spaceBetween}) => spaceBetween && `
    justify-content: space-between;
  `}
  ${({marginTop}) => marginTop && `
    margin-top: ${marginTop};
  `}
  ${({width}) => width && `
    width: ${width};
  `}
`;

export const TextWrapper = styled.Text<ITextWrapper>`
  font-size: 16px;
  color: white;
  ${({fontSize}) => fontSize && `
    font-size: ${fontSize}px;
  `}
`;

export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  resizeMode: center;
`;

export const EditWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 40%;
`;

export const EditInput = styled.TextInput<IEditInput>`
  color: white;
  font-size: 16px;
  border-bottom-color: #545454;
  border-bottom-width: 1px;
  padding: 10px 0 0 5px;
  width: 100%;
`;

export const Icon = styled(MaterialIcon)`
  color: white;
  font-size: 16px;
  margin: 7% 0 0 -15%;
`;
