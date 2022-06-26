import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"

import Navigation from '../components/layout/Navigation';
import ULPartsList from '../components/layout/ULPartsList';

import ModTable from '../components/activities/ModTable';
import FormNewActivName from '../components/activities/FormNewActivName';
import FormNewActivLog from '../components/activities/FormNewActivLog';
import FormEditActivLog from '../components/activities/FormEditActivLog';

import { fetchSaveNewActiv, fetchSaveNewActivName, 
  fetchDeleteActivLogById, fetchUpdateActivLogById } from '../rtkstore/activsReducer';

export default function PageActivities(props) {
  const dispatch = useDispatch();

  const [isEditActivLog, setIsEditActivLog] = useState(false);
  const [isNewActivLog, setIsNewActivLog] = useState(false);
  const [isNewActivName, setIsNewActivName] = useState(false);
  
  // ActivLog edit item
  const [itemEditActivLog, setItemEditActivLog] = useState({id:0, name:''});
 
  // список activs и статус прогрузки
  const storeActivLogs = useSelector( (store) => store.activsReducer.activLogs); // store
  // activs после фильтрации
  const [activsFilt, setActivsFilt] = useState(storeActivLogs);

  // список activNames
  const storeActivNamesList = useSelector( (store) => store.activsReducer.activNamesList); // store
  const [activNameSelect, setActivNameSelect] = useState('All');

  // 
  const clickIsNew = () => { setIsNewActivLog(!isNewActivLog); }
  const selectActivName = (val) => { setActivNameSelect(val); }
  const handleIsNewActName = (val) => { setIsNewActivName(val) }
  const handleIsNewActivLog = (val) => { setIsNewActivLog(val) }
  const handleCloseEditActivLog = () => { setIsEditActivLog(false); }

  //
  const handleEditActivLog = (id) => {
    let itemActivLogEdit = storeActivLogs.filter( (item) => {
      return (item.id === id);
    })
    setItemEditActivLog(itemActivLogEdit[0]); // берем первый
    setIsEditActivLog(true);
  }


  // saving new activity log
  const handleSaveNewActivLog = async (dataObj) => {
    console.log(dataObj);
    dispatch(fetchSaveNewActiv(dataObj));
  }
  // updating activity log
  const handleUpdateActivLog = async (dataObj) => {
    console.log(dataObj);
    dispatch(fetchUpdateActivLogById(dataObj));    
  }
  // deleting activity log item by id
  const handleDeleteActivLog = async (id) => {
    console.log(`deleting ${id}`);
    dispatch(fetchDeleteActivLogById(id));
  }

  const handleSaveNewActivName = async (dataObj) => {
    console.log(dataObj);
    dispatch(fetchSaveNewActivName(dataObj));
  }


  // ------------------
  // filter activs by activName
  const doFilterActivs = () => {
    let bif = storeActivLogs  // from store
      .filter( (item) => {
        if (activNameSelect !== 'All') {
          return (item.activ_name === activNameSelect);
        } else {
          return item;
        }
      })
      setActivsFilt(bif);
  }


  useEffect( () => {
    document.title = "WA3: Activities";
    doFilterActivs();
  }, [storeActivLogs])

  // -------------------------------------------
  return (
    <>
      <Navigation/>
      <hr/>
      
      <div>
        <h3>Направления</h3> 
        <button type="button" onClick={doFilterActivs}>Filter ActivNames</button>
        <br/>
        
        <ULPartsList
          partsArray={storeActivNamesList}
          part='activ_name'
          storePartSelected={activNameSelect}
          selectPart={selectActivName}
        />

        <br/>
        <button className='button-control button-new' onClick={() => { setIsNewActivName(!isNewActivName) }}>Create new activity Name</button>
        {/* компонент - новая ActivName */}
        { (isNewActivName) 
          ? <FormNewActivName 
              handleSaveNewActivName={handleSaveNewActivName}
              handleIsNewActName={handleIsNewActName}
            />
          : <></> 
        }        
      </div>
      
      <hr/>
      <h3>Аналитика по активностям</h3>
      <Link to="/analytics">Аналитика по активностям</Link> 
      {/*<button type="button" className='button-control'> </button> */}


      <hr/>
      <h3>Список активностей</h3>
      {/* компонент - новая ActivLog */}
      <button className='button-control button-new' onClick={clickIsNew}>Create new ActivLog </button>

      { (isNewActivLog) 
        ? <FormNewActivLog
            handleSaveNewActivLog={handleSaveNewActivLog} 
            handleIsNewActivLog={handleIsNewActivLog}
          />
        : <></> 
      }

      {/* компонент - редактирование ActivLog */}
      { (isEditActivLog) 
        ? <FormEditActivLog 
            handleCloseEditActivLog={handleCloseEditActivLog}
            itemEditActivLog={itemEditActivLog}
            handleUpdateActivLog={handleUpdateActivLog}
          />
        : <></> 
      }
      
      <br/><br/>
      {/* компонент - таблица с данными по Activ */}
      { <ModTable 
          activs={activsFilt}
          handleEdit={handleEditActivLog}
          handleDelete={handleDeleteActivLog}
        />
      }
      <hr/>

    </>
  )
}