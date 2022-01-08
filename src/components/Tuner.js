/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import { PlayCircleOutline, StopCircle } from "@mui/icons-material";
import { Button } from '@mui/material';

import useFrequency from 'hooks/useFrequency';
import { setup, closeChanges } from 'utils/PitchDetection';
import { Content, Note, Progressbar, Main } from './Tuner.style'

/**
 * @description A component that use user's mic to check the tuning
 * @author <a href="mailto:alexandre.em@pm.me">Alexandre Em</a>
 * @param {boolean} show
 * @param {() => void} onStart
 * @param {() => void} onClose
 * @returns {JSX.Element}
 * @constructor
 */
export default function Tuner({ show=true, onStart, onClose }) {
  const [frequenciesBST, closestValue] = useFrequency();
  const [cv, setCv] = useState()
  const [note, setNote] = useState('');
  const [progress, setProgress] = useState(0);
  const [frequency, setFrequency] = useState();
  const [isStarted, setIsStarted] = React.useState(false);

  const buttonVariant = useMemo(() => !isStarted ? "contained" : "outlined", [isStarted]);
  const buttonColor = useMemo(() => !isStarted ? "primary" : "error", [isStarted]);
  const buttonIcon = useMemo(() => !isStarted ? <PlayCircleOutline /> : <StopCircle />, [isStarted]);

  const handleClick = useCallback(() => {
    if (!isStarted) {
      setup(setFrequency).then(() => {
        setIsStarted(true);
        if (onStart) onStart();
      });
    }
    if (isStarted) {
      closeChanges().then(() => {
        setIsStarted(false);
        if (onClose) onClose();
      })
    }
  }, [isStarted, onClose, onStart]);

  const backgroundColor = React.useMemo(() => {
    return `hsl(${Math.abs(120 - progress)}deg, 55%, 65%)`;
  }, [progress]);

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

  if (!show) return <></>

  return (
    <Main data-test='tuner'>
      <Content>
        <Progressbar backgroundColor={backgroundColor}>
          <div className="tuner__progress" style={{
            width: `${Math.abs(progress)}%`,
            height: '100%',
            ...((progress > 0) && { borderRight: '.25vw solid red' }),
            ...((progress < 0) && { borderLeft: '.25vw solid red' }),
          }} />
          <Note>
            <h1>{note ? `${note}` : '-/-'}</h1>
          </Note>
        </Progressbar>
        <Button
          variant={buttonVariant}
          color={buttonColor}
          startIcon={buttonIcon}
          onClick={() => handleClick()}
        >
          {!isStarted ? 'Start' : 'Stop'} tunning
        </Button>
      </Content>
    </Main>
  )
}

Tuner.propTypes = {
  show: PropTypes.bool,
  onStart: PropTypes.func,
  onClose: PropTypes.func,
}

Tuner.defaultProps = {
  show: true,
  onStart: () => null,
  onClose: () => null,
}
