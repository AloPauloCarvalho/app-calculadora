import { useState } from 'react'
import './App.css'

function App() {
  const [arrOperatorDisplay, setArrOperatorDisplay] = useState([]);

  function handleOperationInput(input) {
    setArrOperatorDisplay((arr) => {
      if (Number.isInteger(input)) {
        if (arr.length > 0 && Number.isInteger(arr[arr.length - 1])) {
          const tempArr = [...arr]; 
          tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1].toString() + input.toString();
          return tempArr; 
        }
      }
      return [...arr, input]; 
    });
  }

  return (
    <>
      <h1>{...arrOperatorDisplay}</h1>

      <div className="card">
        {[...Array(10).keys()].map((numInput) => (
          <button
            key={numInput}
            type='button'
            onClick={() => handleOperationInput(numInput)}
          >
            {numInput}
          </button>
        ))}
      </div>

      <div>
        {['+', '-', '*', '/'].map((operatorInput) => (
          <button
            key={operatorInput}
            type='button'
            onClick={() => handleOperationInput(operatorInput)}
          >
            {operatorInput}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={() => setArrOperatorDisplay([])}>
          Clear
        </button>
      </div>

    </>
  )
}

export default App
