const Loader = () => {
  return (
    <>
      <style jsx>{`
        .line {
          animation: expand 1s ease-in-out infinite;
          border-radius: 10px;
          display: inline-block;
          transform-origin: center center;
          margin: 0 3px;
          width: 2px;
          height: 25px;
        }

        .line:nth-child(1) {
          background: var(--first-color);
        }

        .line:nth-child(2) {
          animation-delay: 180ms;
          background: var(--first-color);
        }

        .line:nth-child(3) {
          animation-delay: 360ms;
          background: var(--first-color);
        }

        .line:nth-child(4) {
          animation-delay: 540ms;
          background: var(--first-color);
        }

        @keyframes expand {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(2);
          }
        }
      `}</style>
      <div>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </>
  )
}

export default Loader
