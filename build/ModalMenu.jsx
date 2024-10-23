import React, { useState } from "react";

function ModalMenu({setIsOpen, tokenAttrs, changeTokenAttrs, glbStats, glbUpdate, glbId}){
    const charIndex =  glbStats.map(x => { return x.key }).indexOf(glbId);

    function editAttr(defaultV,elmtId,isTitle,del = false){
        const elmToken = JSON.parse(JSON.stringify(tokenAttrs));
        //console.log(elmToken);
        //encontrar o index real do elemento com key x
        let index = elmToken.map(x => { return x.attrId }).indexOf(elmtId);
        
        if (del){
            elmToken.splice(index,1);
        }else{
            let opt;
            if (isTitle){
                opt = prompt("Insira o novo título do atributo",defaultV)
                elmToken[index].attrName = opt === null?defaultV:opt;
            }else{
                opt = prompt("Insira o novo valor do atributo",defaultV)
                elmToken[index].attrValue = opt === null?defaultV:opt;
            }
        }
       
        //Atualizar visualmente
        changeTokenAttrs(elmToken);
        const tkDummy = JSON.parse(JSON.stringify(glbStats));
        tkDummy[charIndex]['attrs'] = elmToken;
        glbUpdate(tkDummy);
    }

    function addAttr(name, value){
        const transfer = JSON.parse(JSON.stringify(glbStats));
        let plcHold = {attrId: String(tokenAttrs.length + Math.trunc(Math.random() * 3000)),attrName:String(name),attrValue:String(value)}
        transfer[charIndex]['attrs'].push(plcHold);
        glbUpdate(transfer);
        changeTokenAttrs(transfer[charIndex]['attrs']);
       
    }
   
    function changeImg(link){
        const transfer = JSON.parse(JSON.stringify(glbStats));
        transfer[charIndex].img = link;
        glbUpdate(transfer);
    }

    function changeName(name){
        const transfer = JSON.parse(JSON.stringify(glbStats));
        transfer[charIndex].cardName = name;
        glbUpdate(transfer);
    }

    const attribLines = tokenAttrs.map(x =><tr className="trAttr" key={x.attrId}><td onClick={() => editAttr(x.attrValue,x.attrId,false,true)} className="material-symbols-outlined">delete </td><td onClick={() => {editAttr(x.attrName,x.attrId,true)}}>{x.attrName}</td><td onClick={() => {editAttr(x.attrValue,x.attrId,false)}}>{x.attrValue}</td></tr>);
    return(
        <>
        <div className='modalMenu'>
            <div className="modal_content">
            <div>
                <p className="optModal" onClick={() => {changeName(String(prompt("Insira o novo nome","...")))}} ><span className="material-symbols-outlined">edit_note</span></p>
                <p className="optModal" onClick={() => {changeImg(prompt("Insira o link da imagem"))}}><span className="material-symbols-outlined">pip</span></p>
                <p className="optModal" onClick={() =>{addAttr(prompt("Nome do atributo"),prompt("Valor do atributo"))}}><span className="material-symbols-outlined">add_circle</span></p>
                <p className="optModal" onClick={() => setIsOpen(false)}><span className="material-symbols-outlined">tab_close</span></p>
            </div>
                <table className="attrTable">
                    <tbody>
                        {attribLines}
                    </tbody>
                </table>


               
            </div>
        </div>
        
        </>
    );
}

export default ModalMenu