import { motion } from 'framer-motion'

const Loader = () => {
  const loaderVariants = {
    animate: {
      x: [-20, 20],
      y: [0, -30],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.5,
        },
        y: {
          yoyo: Infinity,
          duration: 0.25,
          ease: 'easeOut',
        },
      },
    },
  }
  return (
    <>
      <motion.div
        style={{
          width: '10px',
          height: '10px',
          margin: '40px auto',
          borderRadius: '50%',
          backgroundColor: 'var(--first-color)',
        }}
        variants={loaderVariants}
        animate='animate'
      />
    </>
  )
}

export default Loader
