import { Component, h } from 'preact';
import { styled, setPragma } from 'goober';

setPragma(h);

const Title = styled('h1')`
  color: lightblue;
  text-align: center;
`;

export default class App extends Component {
	render() {
		return (
			<div>
				<Title>Hello, World!</Title>
			</div>
		);
	}
}
