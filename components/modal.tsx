import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { RiArrowRightUpFill, RiCloseFill, RiGithubFill } from 'react-icons/ri'
import { Project } from '../types'

interface IModal {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  project: Project
}

const Modal = ({ showModal, project, setShowModal }: IModal) => {
  const {
    slug,
    image,
    title,
    githubUrl,
    previewUrl,
    type,
    technologies,
    size,
    description,
  } = project
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: { opacity: 1 },
  }
  const modalVariants = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      tranition: { delay: 1 },
    },
  }
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className='backdrop'
          initial='hidden'
          animate='visible'
          variants={backdropVariants}
        >
          <motion.div
            className='modal'
            initial='hidden'
            animate='visible'
            variants={modalVariants}
          >
            <div className='modal__header'>
              <h3 className='modal__header__title'>{title}</h3>
              <button onClick={() => setShowModal(false)}>
                <RiCloseFill />
              </button>
            </div>
            <div className='modal__content'>
              <img src={image.url} alt={title} className='modal__img' />
              <div className='modal__head'>
                <div className='modal__metadata'>
                  <span>{type}</span> |{' '}
                  <span className='project__size'>{size}</span>
                  <h2 className='modal__title'>{title}</h2>
                </div>
                <div className='projects__content__links'>
                  <a
                    target='_blank'
                    href={githubUrl}
                    rel='noreferrer'
                    className='projects__button button button__small'
                    title='github repo'
                  >
                    Github <RiGithubFill />
                  </a>
                  <a
                    href={previewUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='projects__button button button__small'
                    title='live preview'
                  >
                    Preview <RiArrowRightUpFill />
                  </a>
                </div>
              </div>
              <div className='modal__heading'>
                <p className='modal__desc'>{description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
