/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useFrequency, usePitch } from 'hooks';

import { Content, Note, Progressbar, Main } from './Tuner.style'

export default function Tuner({ isStarted, onStart, onClose }) {
  const [frequenciesBST, closestValue] = useFrequency();
  const { state: { frequency, isUsed }, closeChanges, setIsUsed, setup } = usePitch();
  const [cv, setCv] = useState()
  const [note, setNote] = useState('');
  const [progress, setProgress] = useState(0);

  const backgroundColor = React.useMemo(() => {
    return `hsl(${Math.abs(100 - progress)}deg, 55%, 65%)`;
  }, [progress]);

  useEffect(() => {
    if (isStarted){
      setIsUsed(true);
      setup().then(onStart);
    } 
    if (!isStarted && isUsed) {
      setIsUsed(false);
      closeChanges().then(onClose);
    }
  }, [isStarted, isUsed]);

  useEffect(() => {
    return () => closeChanges().then(onClose);
  }, [])

  useEffect(() => {
    if (frequency && isStarted) {
      if (cv) {
        const prog = Math.floor((Math.abs(Math.floor(frequency)) - cv.val.frequency) * 5.9)
        if (prog < -105 || prog > 105)
          setCv(closestValue(frequenciesBST, Math.abs(Math.floor(frequency))))
        setProgress(prog)
        setNote(cv.val.note)
      } else
        setCv(closestValue(frequenciesBST, Math.abs(Math.floor(frequency))))
    }
  }, [frequency, isStarted]);

  return (
    <Main>
      <h2>Em Tuner</h2>
      <Content>
        <Progressbar backgroundColor={backgroundColor}>
          <div className="tuner__progress" style={{
            width: `${Math.abs(progress)}%`,
            height: '100%',
            ...((progress > 0) && { borderRight: '.25vw solid red' }),
            ...((progress < 0) && { borderLeft: '.25vw solid red' }),
          }}/>
        </Progressbar>
        <Note>
          <h1>{note ? `${note}` : '-/-'}</h1>
        </Note>
      </Content>
    </Main>
  )
}

Tuner.propTypes = {
  isStarted: PropTypes.bool,
  onStart: PropTypes.func,
  onClose: PropTypes.func,
}

Tuner.defaultProps = {
  isStarted: true,
  onStart: () => null,
  onClose: () => null,
}
