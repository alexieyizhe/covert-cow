import { styled } from 'goober';

/**
 * Styles
 */
const Container = styled('footer')`
  position: absolute;
  width: 100%;
  bottom: 5px;
  text-align: center;

  & > * {
    color: lightgray;
    font-size: 14px;
  }

  & > a:hover {
    text-decoration: none;
  }
`;

const Footer = () => (
  <Container>
    <span>a game by </span>
    <a
      href="https://github.com/alexieyizhe"
      target="_blank"
      rel="noopener noreferrer"
    >
      alex
    </a>
  </Container>
);

export default Footer;
