import React from "react"
import './App.css';
import TurnDisplay from "./components/TurnDisplay";
import GameButton from "./components/GameButton";
const wincon=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
const moves=[null , 'X' , 'O'];
function isGameOver(array){
  for(let i=0 ; i<wincon.length ; i++)
  {
    let temparr=wincon[i];
    if(array[temparr[0]]!=null && array[temparr[0]]===array[temparr[1]] && array[temparr[0]]===array[temparr[2]] )return 1;
  }
  for(let i=0 ; i<array.length ; i++)
  {
    if(array[i]==null)return 0;
  }
  return -1;
}
function reducer(state , {type , payload}){
  switch(type){
    case 'New-Game':
      return{
        ...state,
        arr:[null , null , null, null , null, null , null , null , null],
        turn:1,
        gameOver:false,
        msg:`Player 1's turn`
      }
    case 'move':
      if(state.arr[payload]!=null || state.gameOver===true){
        return state;
      }
      const newarr=state.arr.map((ele,index) =>{
        if(index===payload){
          return moves[state.turn];
        }
        return ele;
      });
      const result=isGameOver(newarr);
      if(result===-1){
        return {
          ...state,
          arr:newarr,
          gameOver:true,
          msg:`Draw , pls start a new game`
        }
      }
      if(result===1){
        return{
          ...state,
          arr:newarr,
          gameOver:true,
          msg:`Player ${state.turn} won , pls start a new game`
        }
      }
      const newTurn=(state.turn%2)+1;
      
      return{
        ...state,
        arr:newarr,
        turn:newTurn,
        msg:`Player ${newTurn}'s turn`
      }
  }
}
function App() {
  const [{arr , turn , gameOver , msg} , dispatch]=React.useReducer(reducer , {arr:Array(9).fill(null),turn:1 , gameOver:false , msg:`Player 1's turn`});
  return (
    <div className="ticTacGrid">
      <button onClick={()=> dispatch({type:'New-Game'})} className="newGameButton">New Game</button>
      {arr.map((ele , index) => {
        return (
          <GameButton index={index} dispatch={dispatch} color={(ele==='X')?'black':'red'} text={ele}></GameButton>
        )
      })}
      <TurnDisplay msg={msg}></TurnDisplay>
      
    </div>
  );
}

export default App;
