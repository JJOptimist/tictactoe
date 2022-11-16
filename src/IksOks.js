import React from 'react'
import './IksOks.css';
import {useState} from 'react';
var counter = 0;
const IksOks = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState(null);
    
    

    const checkForWinner = (squares) => {
        let kombinacije = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down: [
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],
            diag: [
                [0,4,8],
                [2,4,6],
            
            ],

        };
        for (let kombo in kombinacije) {
            kombinacije[kombo].forEach((pattern) =>{

                if (squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === '' 
                ) {

                } else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
                    setWinner(squares[pattern[0]]);
                    counter = 0;
                    
                
                    
                    
                } else if(winner === null && counter === 9){
                    
                        setWinner('Tie');
                        counter = 0;
                        
                    
                }

            });
        }
    };

    const handleClick = (num) => {
        if(cells[num] !== '') {
            alert('Already clicked');
            return;
        }
        let squares = [...cells];
        if(turn === 'x') {
            squares[num] = 'x';
            setTurn('o');
            counter++;
        } else  {
            squares[num] = 'o';
            setTurn('x');
            counter++;
        }
    
        checkForWinner(squares);
        setCells(squares);
    };

    const handleRestart = () => {
        setWinner(null);
        setTurn('x');
        setCells(Array(9).fill(''));
    }

    const Cell = ({num}) => {
        return <td onClick={() => handleClick (num)}>{cells[num]}</td>
    };
    
    

  return (
    <div className='container'>
        <p className='turn'>Turn: {turn}</p>
        {(() => {
        if (winner !== null && winner !== 'Tie') {
          return (
            <div className='winner'>
                    <h1>Winner is {winner}</h1>
                    <button onClick={() => handleRestart()}>Play Again</button>
                </div>
          )
        } else if (winner === 'Tie') {
          return (
            <div className='winner'>
                    <h1>It's a tie!</h1>
                    <button onClick={() => handleRestart()}>Play Again</button>
                </div>
          )
        }
      })()}
        <table>
            <tbody>
                <tr>
                    <Cell num ={0}/>
                    <Cell num ={1}/>
                    <Cell num ={2}/>
                </tr>
                <tr>
                    <Cell num ={3}/>
                    <Cell num ={4}/>
                    <Cell num ={5}/>
                </tr>
                <tr>
                    <Cell num ={6}/>
                    <Cell num ={7}/>
                    <Cell num ={8}/>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default IksOks