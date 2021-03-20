import React, { useRef, useEffect, useCallback, useContext } from 'react'; 
import { useSpring, animated } from 'react-spring';
import { Background, CloseModalButton, ModalContent, ModalImg, ModalWrapper } from './resultModal.styled';
import ModalImage from '../../resources/gotEm.jpg';
import { WpmContext } from '../../context/wpmContext';
import { AccuracyContext } from '../../context/accuracyContext';

export const ResultModal = ({showModal, setShowModal}) => {

  const [wpm, setWpm] = useContext(WpmContext); //eslint-disable-line no-unused-vars
  const [accuracy, setAccuracy] = useContext(AccuracyContext); //eslint-disable-line no-unused-vars

  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0, 
    transform: showModal ? `translateY(-145%)` : `translateY(-10%)`
  })

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const keyPress = useCallback(e => {
    if (e.key === 'Escape' && showModal){
      setShowModal(false)
    }
  }, [setShowModal, showModal])

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return(
    <>
    {showModal ? (
      <Background ref={modalRef} onClick={closeModal}>
        <animated.div style={animation}>
          <ModalWrapper showModal={showModal}>
            <ModalImg src={ModalImage} alt='Got em!' />
              <ModalContent>
                <p> WPM: {wpm}</p>
                <p> Accuracy: {accuracy}% </p>
              </ModalContent>
              <CloseModalButton aria-label='Close modal' onClick={() => setShowModal (prev => !prev)} />
          </ModalWrapper>
        </animated.div>
      </Background>
    ) : null }
    </>
  )
};
