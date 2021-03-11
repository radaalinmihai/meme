import styled from 'styled-components/native';

interface ITextWrapper {
  fontSize?: number;
}

export const ProfileHeader = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: flex-start;
`;

export const Section = styled.View`
  flex-direction: column;
  margin-top: 10px;
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
