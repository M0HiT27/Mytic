export default function GameButton(props){
    return (
        <button onClick={()=>props.dispatch({type:'move' , payload:props.index})} style={{color:props.color}}>{props.text}</button>
    )
}