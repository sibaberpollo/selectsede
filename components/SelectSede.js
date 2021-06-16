import React, { useState, useEffect } from "react";
//import Pointer from './PointerMap';


const mesasBK = [
  {
      "local": "Estadio Nacional",
      "mesas": [
          { "id": 1001, "mesa": "Mesa grande" },
          { "id": 1002, "mesa": "Mesa chica" }
      ],
      "candidatos" : [
        ["700071", "Claudio Orrego Larraín" ],
        ["700067",  "Karina Loretta Oliva Pérez" ]
      ]
  },
  {
      "local": "Providencia",
      "mesas": [
          { "id": 2001, "mesa": "Mesa cuica" },
          { "id": 2002, "mesa": "Mesa flaite" }
      ],
      "candidatos" : [
        ["700079", "Segundo Lee" ],
        ["700080",  "José D Ibarra" ]
      ]
  }
];



const Form = ( { setShowCandidates, setSede } ) => {
  
  const [{ loslocales, lamesa, lamesa_name }, setData] = useState({
    loslocales: "",
    lamesa: "",
    lamesa_name: ""
  });

  //const [mesasData, setMesaData] = useState([]);
  const [mesasData, setMesaData] = useState([]);
  
  useEffect(() => {
    //Para evitar el error: Can't perform a React state update on an unmounted component.
    setMesaData(mesasBK)

  }, [mesasBK])
    
  
  //const [value,setValue]=useState('');
  
  const loslocalesDeVotacion = mesasData.map((centro, index) => {
    return(
      <option key={index} value={centro.local}>
        {centro.local}
      </option>
    )
  });

  
  let centros = [];
  mesasData.find(centro => {
    if(centro.local !== loslocales) return; 
    const mesa = centro.mesas.map((item, index) => {
      centros.push(<option key={index} value={item.id}>
          {item.mesa}
        </option>)
    });   
  }); 


  function handleloslocalesChange(event) {
    //console.log(event.target.value);
    window.localStorage.setItem('local', event.target.value);
    setData(data => ({ lamesa: '', lamesa_name : '',  loslocales: event.target.value }));
  }

  function handleStateChange(event) {
    var index = event.nativeEvent.target.selectedIndex;
    window.localStorage.setItem('mesa', event.nativeEvent.target[index].text);
    setData(data => ({ ...data, lamesa: event.target.value, lamesa_name : event.nativeEvent.target[index].text }));
  }
  
  /*
  const handleSelect=()=>{
    
    if(!lamesa || lamesa == 'Seleccione') return;
    
    const candidatos = mesasData.find((candidatos) => { 
      if (candidatos.local === loslocales) { 
        
        return candidatos
      }

    });

    let sedeObj = [{
        centro: loslocales, 
        id: lamesa, 
        nombre: lamesa_name,
        los_candidatos : candidatos.candidatos
    }];
    sedeObj = JSON.stringify(sedeObj);
    //console.log(sedeObj);
    //setValue(sedeObj)
    setShowCandidates(true)
    setSede(sedeObj)
    window.localStorage.setItem('sede', sedeObj);
    
  } */ 
  
  
  return (
    <>
    <div className="select-local">
        <div>
          <label>🏫 Centro:</label>
          <select onChange={handleloslocalesChange}>
            <option>Seleccione</option>
            {loslocalesDeVotacion}
          </select>
        </div>
        <div>
          <label>🗳️ Mesa:</label>
          <select value={lamesa} onChange={handleStateChange}>
            <option>Seleccione</option>
            {centros}
          </select>
        </div>
      </div>
    </>
  );
 
}



export default Form;