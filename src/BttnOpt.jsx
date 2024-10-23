
function BttnOpt(actionName,glbTk,glbChg){
//props is a object to retain data
//prop.func
function creatToken() {
    const tkD = glbTk;
    tkD.push(
      {
        key: String(tkD.length),
        cardName: "...",
        img:"/default.jpg",
        /* a esquerda do _ é o id do objeto pai, a direita é o id do atributo */
        attrs:[{attrId:"0",attrName:"Tutorial",attrValue:"Clique nas celulas para mudar o valor do atributo"}
        ]
      }
    )
    glbChg(tkD);
  }
  let hr = Math.trunc(Math.random() * 3000);
    
    return(
        <>
        
        </>
    );
}

export default BttnOpt