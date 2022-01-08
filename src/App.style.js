import styled from '@emotion/styled';

const Footer = styled.a`
	position: absolute;
	bottom: 10px;
	right: 10px;
	display: flex;
	flex-direction: column;
	alignItems: center;
	color: gray;
	text-decoration: none;
	cursor: pointer;
`

const Main = styled.div`
	display: flex;
	position: relative;
	background-color: #ededed;
	height: 100%;
	width: 100%;
	justify-content: center;
`;

const paperStyle = {
	padding: 5,
	width: '80%',
	height: 'min-content',
	alignSelf: 'center'
};

export { Footer, Main, paperStyle }
