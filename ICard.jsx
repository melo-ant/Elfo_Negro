import React, { useState } from "react";

function ICard({cardName, img, setIsOpen, modalSet, attrs, setTkId, idS, delMod, setDelMod, delFunc}){
    return(
        <div className="iCard" onClick={() => {
            setTkId(idS);
            if (!delMod){
                modalSet(attrs);
                setIsOpen(true);
            }else{
                delFunc(idS);
            }

            }}>
            
            {delMod && <span className="delCard"><span className="material-symbols-outlined">close</span></span>}
            <h4 className="iCardName">{cardName}</h4>
           
            <figure>
                <img alt="card imge" src={img}></img>
                
            </figure>
            
            <hr>
            </hr>
            
            
        </div>
        
    );
}

export default ICard