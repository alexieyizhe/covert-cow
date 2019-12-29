import { styled } from 'goober';

const Container = styled('span')`
  display: inline-block;
  margin: auto;
  padding: 15px 20px;

  text-align: center;
  border: 2px solid black;
`;

const Card = ({ children }) => <Container>{children}</Container>;

export default Card;
