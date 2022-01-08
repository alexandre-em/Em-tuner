import styled from '@emotion/styled';

const Main = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
	align-items: center;
  justify-content: space-around;
`;

const Progressbar = styled.div(({ backgroundColor }) => ({
  backgroundColor,
  position: 'relative',
  width: '80%',
  height: 80,
  borderRadius: 100,
  display: 'flex',
  justifyContent: 'center',
  border: '2px solid white',
  color: 'rgb(76, 150, 76)',
  boxShadow: '10px 10px 21px -7px rgba(0, 0, 0, 0.2)',
  WebkitBoxShadow: '10px 10px 21px -7px rgba(0, 0, 0, 0.2)',
  MozBoxShadow: '10px 10px 21px -7px rgba(0, 0, 0, 0.2)',
}));

const Progress = styled.div(({ progress }) => ({
  width: `${Math.abs(progress)}%`,
  height: '100%',
  ...((progress > 0) && { borderRight: '.25vw solid red' }),
  ...((progress < 0) && { borderLeft: '.25vw solid red' }),
}));

const Note = styled.div`
  position: absolute;
  top: 25%;
  color: white;
`;

export { Content, Note, Progress, Progressbar, Main }
