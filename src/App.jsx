import { useState } from 'react'
import './App.css'

function App() {
  const [arrOperatorMemory, setArrOperatorMemory] = useState([]);
  const [numOperationResult, setNumOperationResult] = useState(0);
  const [numResultSetted, setNumResultSetted] = useState(false);

  // 0- função responsável por tratar os inputs do usuário e organizar a expressão que será executada
  function handleOperationInput(input) {
    setArrOperatorMemory((arr) => {

      // 1- primeiro input não pode ser um operador, apenas '-' para representar um numero negativo
      if ((arr.length === 0 && ['*', '/', '+'].includes(input))) {
        return arr;
      }

      // 1.5 - caso exista resultado de uma conta prévia, inicie nova operação com o resultado anterior ao clicar em um operador
      if (numResultSetted) {
        if(numOperationResult === 'Erro'){
          setNumResultSetted(false)
          setNumOperationResult(0)
          setArrOperatorMemory([]);
          return handleOperationInput(input);
        }

        if (!Number.isInteger(input)) {
          setNumResultSetted(false);
          return [numOperationResult, input];
        }

        return arr;
      }

      // 2- tratamento dos operadores considerando possibilidade de números negativos
      if (!Number.isInteger(input)) {


        //permite divisão e multiplicação por negativo, sem deixar existir um terceiro operador
        if (['*', '/'].includes(arr[arr.length - 2]) && arr[arr.length - 1] === '-') {
          const tempArr = [...arr];
          tempArr.pop();
          tempArr[tempArr.length - 1] = input;
          return tempArr;
        }

        //não pode existir um operador depois do '-'
        if (!Number.isInteger(arr[arr.length - 2]) && arr[arr.length - 1] === '-') {
          return arr;
        }

        // não pode existir dois operadores iguais seguidos
        if (arr[arr.length - 1] === input) {
          return arr;
        }

        // caso seja multiplicação ou divisão, próximo operador pode indicar número negativo
        if (['*', '/'].includes(arr[arr.length - 1]) && input === '-') {
          //se for um operador negativo seguido
          if (arr.length > 2 && !Number.isInteger(arr[arr.length - 2])) {
            const tempArr = [...arr];
            tempArr[tempArr.length - 1] = input;
            return tempArr;
          }
          return [...arr, input];
        }


        //caso não seja nenhuma das excessões e exista um operador no index anterior, ele é substituido pelo novo operador
        if (['-', '*', '/', '+', '.'].includes(arr[arr.length - 1])) {
          const tempArr = [...arr];
          tempArr[tempArr.length - 1] = input;
          return tempArr;
        }
      }

      // 3- caso o último input seja um número e input anterior também, concatena esse input com o número anterior
      if (Number.isInteger(input) && numResultSetted) {
        if (arr.length > 0 && Number.isInteger(arr[arr.length - 1])) {
          const tempArr = [...arr];
          tempArr[tempArr.length - 1] = (tempArr[tempArr.length - 1] * 10) + input;
          setNumResultSetted(false);
          return tempArr;
        }
      }

      // 4- caso seja o primeiro input ou seja um input de operador, adiciona novo index a expressão
      return [...arr, input];
    });

    console.log(arrOperatorMemory);
  }

  // 0- função que executa a expressão armazenada no arrOperatorMemory
  function handleOperationResult(arr) {
    setNumResultSetted(true);
    setNumOperationResult(() => {
      let tempArr = [...arr];

      // 1- último index não pode ser um operador
      while (tempArr.length > 0 && !Number.isInteger(tempArr[tempArr.length - 1])) {
        tempArr.pop();
      }

      //atualiza o display sem os operadores no final
      setArrOperatorMemory(tempArr);

      const expressaoTratada = tempArr.join('').replace(',', '.');

      //trata decimais e dizimas periodicas
      try {
        const result = eval(expressaoTratada);

      // seila pq mas quando chega perto de 0, ele retorna -0, coisa de maluco
      if (Object.is(result, -0)) {
        result = 0;
      }

        return result.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 3});
      } catch (error) {
        return 'Erro';
      }
    })
  }

  function handleBackspace() {
    setArrOperatorMemory((arr) => {
      if (arr.length === 0) return arr; //não pode dar backspace no arr vazio

      const tempArr = [...arr];
      const lastInput = tempArr[tempArr.length - 1];

      if (Number.isInteger(lastInput) && lastInput.length > 1) {
        tempArr[tempArr.length - 1] = lastInput.slice(0, -1); //caso seja numero
      } else {
        tempArr.pop(); //caso seja operador
      }

      return tempArr;
    });
  }


  return (
    <>
      <h2>{...arrOperatorMemory}</h2>
      <h1>{numOperationResult}</h1>

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

        <button
          type='button'
          onClick={() => handleOperationInput('.')}>.</button>
      </div>

      <div>
        <button
          onClick={() => { setArrOperatorMemory([]); setNumOperationResult(0); setNumResultSetted(false) }}>
          Clear
        </button>
        <button
          onClick={handleBackspace}>
          Backspace
        </button>
        <button
          onClick={() => handleOperationResult(arrOperatorMemory)}>
          =
        </button>
      </div>

    </>
  )
}

export default App
