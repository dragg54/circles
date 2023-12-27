import React from 'react'

const LoadingSpinner = ({loading}:{loading: boolean}) => {
  return (
<div className="flex items-center justify-center h-screen">
    {loading && 
      // Display the loading spinner when loading is true
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-black border-solid"></div>
    }
  </div>  )
}

export default LoadingSpinner