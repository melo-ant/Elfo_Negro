//import BttnOpt from "./BttnOpt.jsx"
import ICard from "./ICard.jsx"
import ModalMenu from "./ModalMenu.jsx"
import React, { useState, useEffect } from "react";


function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [deleteModeState, setDeleteModeState] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  //atributos que serão usados pelo modal para exibir
  const [actualID,setActualID] = useState(0)
  const [tokenAttrs, setTokenAttrs] = useState({})
  /*
    //token example
    {
        cardName:"",
        img:"",
        attrs:[{attrName:"foo",attrValue:""}]
    }
  */
 const [tokens, setTokens] = useState([
  {
    key:"0",
    cardName:"Clique-me",
    img:"/default.jpg",
    /* a esquerda do _ é o id do objeto pai, a direita é o id do atributo */
    attrs:[{attrId:"0",attrName:"Tutorial",attrValue:"Clique nas celulas para mudar o valor do atributo"}
    ]
  }
])
  function creatToken(event){
    const tkD = tokens;
    tkD.push(
      {
        key: String(tkD.length + Math.trunc(Math.random() * 3000)),
        cardName: "...",
        img:"/default.jpg",
        /* a esquerda do _ é o id do objeto pai, a direita é o id do atributo */
        attrs:[{attrId:"0",attrName:"Tutorial",attrValue:"Clique nas celulas para mudar o valor do atributo"}
        ]
      }
    )
    setTokens(tkD);
  }

  function delFunc(i){
    let tkD = JSON.parse(JSON.stringify(tokens));
    let iX = tkD.map(x => { return x.key }).indexOf(String(i))
    tkD.splice(Number(iX),1);
    setTokens(tkD);
    return setDeleteModeState(false);
  }

  function loadFile(event){
    const fileList = event.target.files;
    const file = fileList[0];
    const reader = new FileReader();
    //Caso o carregamento tenha funcionado
    reader.onload = onReaderLoad;
    reader.readAsText(file);
  }
  //carregar JSON como tokens
  function onReaderLoad(event){
    const obj = JSON.parse(event.target.result);
    obj.length > 0 && setTokens(obj);
  }
  //salvar arquivo
  function saveAndDownload(){
    //save file
    const textFile = new Blob([JSON.stringify(tokens)]); //pass data from localStorage API to blob
  
    //download file
    const ref = document.getElementById('outputFile');
    ref.href = URL.createObjectURL(textFile);
    ref.download = "pacote.json";
    ref.click();
  }

  return (
    <>
    <img id="logoElf" alt="logo" src="./logo.png"></img>
    <button key={"1"} className='bttnOpt' onClick={(e) => {creatToken(e);forceUpdate()}}><span className="material-symbols-outlined">new_window</span></button>
    <button key={"2"} className='bttnOpt' onClick={() => {deleteModeState?setDeleteModeState(false):setDeleteModeState(true);}}><span className="material-symbols-outlined">delete_forever</span></button>
    <button key={"3"} className='bttnOpt' onClick={() => {document.getElementById('inputFileLoad').click()}}><span className="material-symbols-outlined">upload_file</span></button>
    <button key={"4"} className='bttnOpt' onClick={() => {saveAndDownload()}}><span className="material-symbols-outlined">download</span></button>

    <input type="file" id="inputFileLoad" onChange={(e) => {loadFile(e)}} accept=".json"></input>
    <a id="outputFile"></a>
    <p id="here">Crie, administre e compartilhe fichas de RPG mais facilmente!<br></br>{tokens.length}</p>

    <br></br>
    <section>
    
    
    <div className='cardDiv'>
      {tokens.map((token) => <ICard cardName = {token.cardName} img = {token.img} key={token.key} setIsOpen={setIsOpen} modalSet={setTokenAttrs} attrs={token.attrs} setTkId={setActualID} idS={token.key} tkId = {token.key} delMod= {deleteModeState} setDelMod={setDeleteModeState} delFunc={delFunc}/>)}
    </div>

    </section>
    
    {isOpen && <ModalMenu setIsOpen={setIsOpen} tokenAttrs={tokenAttrs} changeTokenAttrs={setTokenAttrs} glbStats={tokens} glbUpdate={setTokens} glbId={actualID}/>}

    </>

  )
}

export default App
