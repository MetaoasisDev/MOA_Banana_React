import React ,{Fragment , useEffect }from "react";
import logo from "./logo.svg";
import "./App.css";
import { Unity, useUnityContext } from "react-unity-webgl";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { View, Button, Vibration } from 'react-native';



const App = () => {
  
  window.Telegram.WebApp.expand();

  const root = document.querySelector("#root");



  const { unityProvider ,sendMessage ,addEventListener ,removeEventListener } = useUnityContext({
    loaderUrl: "https://lys-test.s3.ap-northeast-2.amazonaws.com/Version36/Build.loader.js",
    dataUrl: "https://lys-test.s3.ap-northeast-2.amazonaws.com/Version36/Build.data",
    frameworkUrl: "https://lys-test.s3.ap-northeast-2.amazonaws.com/Version36/Build.framework.js",
    codeUrl: "https://lys-test.s3.ap-northeast-2.amazonaws.com/Version36/Build.wasm",
  });

  const TestUnityMessage = () => {
    sendMessage('SendReactManager' , 'ReciveUnity' , document.location.pathname)
  }

  const handleVibrate = () => {
    Vibration.vibrate(100); 
  };

  const OpenUrl = () => {
    window.Telegram.WebApp.openLink("https://x.com/MetaOasisVR");
  };
  const OpenUrl2 = () => {
    window.Telegram.WebApp.openLink("https://www.youtube.com/watch?v=m-kiWzkuolU");
  };
  const OpenUrl3 = () => {
    //window.Telegram.WebApp.openLink("https://t.me/tonny_community");
  };

  const handleCopyClipBoard = (text_s) => {
    //   navigator.clipboard.writeText(text_s);
    //  document.execCommand('copy', true, text_s);



     const element = document.createElement('textarea');
     element.value = text_s;
     element.setAttribute('readonly', '');
     element.style.position = 'fixed';
     element.style.opacity = '0';
     document.body.appendChild(element);
     element.select();
     const copyValue = document.execCommand('copy');
     document.body.removeChild(element);

  };


  useEffect( () => {
    addEventListener('TakeTokenFromReact',TestUnityMessage);
    addEventListener('MobileVibrate',handleVibrate);
    addEventListener('handleCopyClipBoard',handleCopyClipBoard);
    addEventListener('OpenUrl',OpenUrl);
    addEventListener('OpenUrl2',OpenUrl2);
    addEventListener('OpenUrl3',OpenUrl3);
    return () => {
      removeEventListener('TakeTokenFromReact',TestUnityMessage)
      removeEventListener('MobileVibrate',handleVibrate)
      removeEventListener('handleCopyClipBoard',handleCopyClipBoard)
      removeEventListener('OpenUrl',OpenUrl)
      removeEventListener('OpenUrl2',OpenUrl2)
      removeEventListener('OpenUrl3',OpenUrl3)
    }

  },[addEventListener,removeEventListener,TestUnityMessage,handleCopyClipBoard,OpenUrl])

  return (

  <div className="App">

      <Unity
      devicePixelRatio={2}  
      style={{
          width: window.innerWidth || document.body.clientWidth,
          height: window.innerHeight || document.body.clientHeight ,
          justifySelf: 'center',
          alignSelf: 'center', 
          
      }} unityProvider={unityProvider}/>

  </div>

  ) ;
  
};

export default App; 