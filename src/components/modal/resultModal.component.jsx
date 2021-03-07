import React, { useRef, useEffect, useCallback } from 'react'; 
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { Background, CloseModalButton, ModalContent, ModalImg, ModalWrapper } from './resultModal.styled';
import ModalImage from '../../resources/gotEm.jpg';

export const ResultModal = ({showModal, setShowModal}) => {

  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0, 
    transform: showModal ? `translateY(-100%)` : `translateY(-10%)`
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
                <h1> Are you ready?</h1>
                <p> GOT EM! </p>
                <button> Press me </button>
              </ModalContent>
              <CloseModalButton aria-label='Close modal' onClick={() => setShowModal (prev => !prev)} />
          </ModalWrapper>
        </animated.div>
      </Background>
    ) : null }
    </>
  )
};
