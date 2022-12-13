import { FC, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"

// components
import Navigation from '../components/layout/Navigation';
//import ULPartsList from '../components/layout/ULPartsList';
import ModTable from '../components/activities/ModTable';
import FormNewActivName from '../components/activities/FormNewActivName';
import FormNewActivLog from '../components/activities/FormNewActivLog';
import FormEditActivLog from '../components/activities/FormEditActivLog';
import AttrSelFilt from '../components/UI/AttrSelFilt';
import Paginator from '../components/UI/Paginator';

// models
import { ActivityLogModel, ActivityModel } from '../models/models';


// store
import { RootState, AppDispatch } from '../rtkstore/store';
import { actionsActivsRed, fetchSaveNewActiv, fetchSaveNewActivName, fetchDeleteActivLogById, fetchUpdateActivLogById } from '../rtkstore/activsReducer';
import { doActivsSearch } from '../rtkstore/activsReducer';


//
const PageActivities:FC = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditActivLog, setIsEditActivLog] = useState(false);
  const [isNewActivLog, setIsNewActivLog] = useState(false);
  const [isNewActivName, setIsNewActivName] = useState(false);
  
  // ActivLog edit item
  const [itemEditActivLog, setItemEditActivLog] = useState<ActivityLogModel>({
    id:0, activ_date: '', activ_name: '', activ_value: 0});
 
  // список activs и статус прогрузки
  const storeActivLogs = useSelector( (store: RootState) => store.activsReducer.activLogs); // store
  // activs после фильтрации
  const [activsFilt, setActivsFilt] = useState(storeActivLogs);

  // список activNames
  const {
    storeActivNamesList,
    activNameSelected,

    storeActivLogsFiltered,
    storeActivLogsFilteredPaged,

    storeCurrentPage,
    flgIsOpenActivs,

  } = useSelector( (store: RootState) => ({
    storeActivNamesList:    store.activsReducer.activNamesList,
    activNameSelected:      store.activsReducer.activNameSelected,

    storeActivLogsFiltered:       store.activsReducer.activLogsFiltered,
    storeActivLogsFilteredPaged:  store.activsReducer.activLogsFilteredPaged,

    storeCurrentPage: store.activsReducer.currentPage,
    flgIsOpenActivs: store.activsReducer.flgIsOpenActivs,
  })); 

  // 
  const clickIsNew = () => { setIsNewActivLog(!isNewActivLog); }

  const selectActivName = (val: string) => { 
    dispatch(actionsActivsRed.setActivNameSelected(val));
    dispatch(doActivsSearch({}));
    dispatch( actionsActivsRed.setCurrentPage(0) );
  } //setActivNameSelect(val);
  
  const handleIsNewActName = (val: boolean) => { setIsNewActivName(val) }
  const handleIsNewActivLog = (val: boolean) => { setIsNewActivLog(val) }

  const handleCloseEditActivLog = () => { setIsEditActivLog(false); }

  // change active show/hide div
  const handleChangeActivsChange = () => {
    dispatch(actionsActivsRed.setflgIsOpenActivs(!flgIsOpenActivs));
  }

  //
  const handleEditActivLog = (id: number) => {
    let itemActivLogEdit = storeActivLogs.filter( (item) => {
      return (item.id === id);
    })
    setItemEditActivLog(itemActivLogEdit[0]); // берем первый
    setIsEditActivLog(true);
  }

  const SetActivePageNum = (val: number) => {
    dispatch( actionsActivsRed.setCurrentPage(val) );
  }


  // saving new activity log
  const handleSaveNewActivLog = async (dataObj: ActivityLogModel) => {
    dispatch(fetchSaveNewActiv(dataObj));
  }
  // updating activity log
  const handleUpdateActivLog = async (dataObj: ActivityLogModel) => {
    dispatch(fetchUpdateActivLogById(dataObj));    
  }
  // deleting activity log item by id
  const handleDeleteActivLog = async (id: number) => {
    dispatch(fetchDeleteActivLogById(id));
  }

  const handleSaveNewActivName = async (dataObj: ActivityModel) => {
    //console.log(dataObj);
    dispatch(fetchSaveNewActivName(dataObj));
  }


  // ------------------
  // filter activs by activName
  // https://stackoverflow.com/questions/65321359/how-to-fix-warning-function-makes-the-dependencies-of-useeffect-hook-change
  // https://reactjs.org/docs/hooks-reference.html#usecallback
  /*
  const doFilterActivs = useCallback( () => {
    let bif = storeActivLogs  // from store
      .filter( (item) => {
        if (activNameSelect !== 'All') {
          return (item.activ_name === activNameSelect);
        } else {
          return item;
        }
      })
      setActivsFilt(bif);
  }, [storeActivLogs, activNameSelect])
  */
  

  useEffect( () => {
    document.title = "WA3: Activities";
    //doFilterActivs();
    dispatch(doActivsSearch({}));
  }, [storeActivLogs/*, doFilterActivs*/])

  // -------------------------------------------
  return (
    <>
      <Navigation/>
      <hr/>
      
      <div>
        <h3>Направления</h3> 
        {/*<button type="button" onClick={doFilterActivs}>Filter ActivNames</button>*/}
        <br/>
        
        <AttrSelFilt 
          attrTitle='ActivNames'
          attrSelected={activNameSelected}
          handleSelectAttr={selectActivName}
          isOpened={flgIsOpenActivs}
          partsArray={storeActivNamesList}
          showId={true}
          storeSetIsOpened={handleChangeActivsChange}
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
      <Paginator 
        numOfPages={storeActivLogsFilteredPaged.length}
        activePageNum={storeCurrentPage}
        setActivePageNum={SetActivePageNum}
      />

      {
        (storeActivLogsFilteredPaged[storeCurrentPage] !== undefined) 
        ? <>
        { <ModTable 
          activs={storeActivLogsFilteredPaged[storeCurrentPage]}
          handleEdit={handleEditActivLog}
          handleDelete={handleDeleteActivLog}
        />
      }
        </>
        : <></>
      }



      <hr/>

    </>
  )
}

export default PageActivities;