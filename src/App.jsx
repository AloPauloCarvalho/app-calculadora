import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numInput, setCount] = useState(0)
  const [operator, setOperator] = useState()

  

  function handleOperationInput() {
    
  }

  return (
    <>
      <h1>{numInput}</h1>
      
      <div className="card">
        {[...Array(10).keys()].map((num) => (
          <button
          key={num}
          type='button'
          onClick={() => setCount((numInput) => numInput = num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div>
        {['+','-','*','➗'].map((operatorInput) => (
          <button
          key={operatorInput}
          type='button'
          onClick={() => setOperator((operator) => operator = operatorInput)}
          >
            {operatorInput}
          </button>
        ))}
      </div>
      
    </>
  )
}

export default App
