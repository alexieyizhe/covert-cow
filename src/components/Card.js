import { styled } from 'goober';
import 'wired-card';

const CardContents = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = ({ children }) => (
  <wired-card elevation="2">
    <CardContents>{children}</CardContents>
  </wired-card>
);

export default Card;
