/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import * as math from 'mathjs';
function App() {
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  const clear = () => {
    setResult('');
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(math.evaluate(result).toString());
    } catch (err) {
      console.error('Ошибка вычисления:', err.message);
      setResult('Ошибка');
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (/[0-9+\-*/.=]/.test(key)) {
        event.preventDefault();
        if (key === '=') {
          calculate();
        } else {
          setResult((prev) => prev + key);
        }
      } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
      } else if (key === 'Escape') {
        event.preventDefault();
        clear();
      } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculate, backspace, clear]);
  return (
    <div className="calculator">
      <input placeholder='Введите данные'
        onChange={(e) => setResult(e.target.value)}
        type="text"
        value={result}
      />

      <div className="keypad">
        <button onClick={clear} id="clear">
          Clear
        </button>
        <button onClick={backspace} id="backspace">
          C
        </button>
        <button name="7" onClick={handleClick}>
          7
        </button>
        <button name="/" onClick={handleClick}>
          &divide;
        </button>
        <button name="8" onClick={handleClick}>
          8
        </button>
        <button name="9" onClick={handleClick}>
          9
        </button>
        <button name="4" onClick={handleClick}>
          4
        </button>
        <button name="*" onClick={handleClick}>
          &times;
        </button>
        <button name="5" onClick={handleClick}>
          5
        </button>
        <button name="6" onClick={handleClick}>
          6
        </button>
        <button name="1" onClick={handleClick}>
          1
        </button>
        <button name="-" onClick={handleClick}>
          &ndash;
        </button>
        <button name="2" onClick={handleClick}>
          2
        </button>
        <button name="3" onClick={handleClick}>
          3
        </button>
        <button name="0" onClick={handleClick}>
          0
        </button>
        <button name="+" onClick={handleClick}>
          +
        </button>
        <button name="." onClick={handleClick}>
          .
        </button>
        <button onClick={calculate} id="result">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
