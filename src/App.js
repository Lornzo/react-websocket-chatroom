import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
// import webSocket from 'socket.io-client'


const App = () => {
  const [ws,setWs] = useState(null)
  const [msg,setMsg] = useState("")
  // ws://127.0.0.1:9527/ws
  // ws://127.0.0.1:9527/ws
  // 正式：wss://chainss-dex-node.azurewebsites.net

  // const [wsAddress,setWsAddress] = useState("ws://13.88.218.45:9527/ws/market-summary")
  // const [wsAddress,setWsAddress] = useState("ws://127.0.0.1:9527/ws/market-summary")
  // const [wsAddress,setWsAddress] = useState("ws://127.0.0.1:9527/ws/markets-summary")
  // const [wsAddress,setWsAddress] = useState("ws://127.0.0.1:9527/ws/market-summary")
  // const [wsAddress,setWsAddress] = useState("wss://13.88.218.45/ws/market-summary")
  const [wsAddress,setWsAddress] = useState("ws://127.0.0.1/ws/subscribe") 

  const [wsRoute,setWsRoute] = useState("")

  // 連線到WebSocket
  const connectWebSocket = () => {
    if(!ws){
      if(wsAddress != ""){
        var wsTarget = wsAddress
        if (wsRoute != ""){
          wsTarget += "/"+wsRoute
        }
        setWs(new WebSocket(wsTarget))
      }
    }else{
      console.log("已經連線，所以不動作")
    }
  }

  const desConnectWebSocket = ()=>{
    if(ws){
      ws.onclose = ()=>{
        setWs(null)
      }
    }
  }

  // 初始化WebSocket的動作
  const initWebSocket = () => {
    if(ws){

      // 連線成功
      ws.onopen = ()=>{
        console.log("連線成功",ws)
        ws.send('{"token":"胖虎","content":"小夫，我要進來囉!"}')
      }

      //連線關閉
      
      ws.onclose = ()=>{
        setWs(null)
        ws.send("小夫進不來!")
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

  const inputRoute = (event)=>{
    setWsRoute(event.target.value)
  }

  // 最終Render
  return (
    <div>
      <div>
        <span>市場輸入</span>
        <input type="text" onChange={inputRoute}/>
        <input type='button' value='打開連線' onClick={connectWebSocket} />
        <input type='button' value='中斷連線' onClick={desConnectWebSocket} />
      </div>
      {/* <div>
          <input type="text" onChange={inputMessage}></input>
          
          
          <input type='button' value='送出訊息' onClick={sendMessage} />
      </div> */}
    </div>
  )
}
export default App;
