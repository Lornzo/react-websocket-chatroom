import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
// import webSocket from 'socket.io-client'


const App = () => {
  const [ws,setWs] = useState(null)
  const [msg,setMsg] = useState("")

  // 連線到WebSocket
  const connectWebSocket = () => {
    if(!ws){
      setWs(new WebSocket("ws://127.0.0.1:9527/ws"))
    }else{
      console.log("已經連線，所以不動作")
    }
  }

  // 初始化WebSocket的動作
  const initWebSocket = () => {
    if(ws){

      // 連線成功
      ws.onopen = ()=>{
        console.log("連線成功",ws)
        ws.send("小夫，我要進來囉!")
      }

      //連線關閉
      ws.onclose = ()=>{
        console.log("關閉連線",ws)
      }

      // 在接到Server發進來的訊息
      ws.onmessage = (event) => {
        console.log("來自Server:",event)
      }

    }
  }

  //向Server傳東西
  const sendMessage = () => {
    if(ws && msg){
      ws.send(msg)
    }
  }
  

  useEffect(()=>{
    if(ws){

        console.log("WebSocket連線中...")

        // 初始化websocket對應的動作
        initWebSocket()

    }
  },[ws])

  const inputMessage = (event)=>{
    setMsg(event.target.value)
  }

  // 最終Render
  return (
    <div>
        <input type="text" onChange={inputMessage}></input>
        <input type='button' value='連線' onClick={connectWebSocket} />
        <input type='button' value='送出訊息' onClick={sendMessage} />
    </div>
  )
}
export default App;
