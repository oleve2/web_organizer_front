import Navigation from "../components/layout/Navigation"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store thunk
import { fetchFilesInfo, filesUpload } from "../rtkstore/upDownReducer";

// style
import './PageUpDownload.css';

export default function PageUpDownload(props) {
  const dispatch = useDispatch();

  const opers = ['download', 'upload'];
  const [operation, setoperation] = useState(opers[0]);

  // upload
  const [file, setFile] = useState('');

  // store
  const storeFilesInfo = useSelector( (store) => store.upDownReducer.filesInfo );
  const storeUplstatus = useSelector( (store) => store.upDownReducer.uploadStatus );

  // -----------------------------------
  const handleChooseMode = (value) => {
    setoperation(value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (file !== '') {
      // upload files with thunk function
      dispatch(filesUpload({file: file}))

      // clear input
      setFile('');
      let inp = document.getElementById("input_mult");
      inp.value = null;
    } else {
      alert('file not chosen!');
    }
  }

  useEffect( () => {
    dispatch( fetchFilesInfo({}) );
  }, [dispatch])

  return (
    <>
    <Navigation/>
    <hr />

    <div>
      <h3>Page Upload/Download</h3>
      
      {/*<div>storeFilesInfo: {JSON.stringify(storeFilesInfo)}</div>*/}
      
      <div className="divControls">
        { opers.map( (item) => {
          return <div key={item} className={"divControls_mode " + (item === operation ? 'divControls_mode__active' : '') }
            onClick={() => { handleChooseMode(item) }}
            >
            {item}
          </div>
        }) }
      </div>
      
      <div>current choise: {operation}</div> <br />
      
      {/* download */}
      
        { (operation === 'download') && 
          <>
          <button onClick={() => {
            dispatch( fetchFilesInfo({}) );
          }}>refresh files</button> 
          
          <div className="divDownload">
            { (storeFilesInfo.files_list !== undefined)
              ? <>
              { storeFilesInfo.files_list.map( (item) => {
                return <div key={item}>
                  <a href={process.env.REACT_APP_BASE_URL +  storeFilesInfo.serve_url + '/' + item}>{item}</a> {/* +'/f'+ */}
                </div>  
              }) }              
              </> 
              : <></> 
            }

          </div> 
          </>
        }
      
      {/* upload */}
      { (operation === 'upload') &&
        <div className="divUpload">
          <div className="divUpload_status">upload status: {storeUplstatus}</div>

          <form encType="multipart/form-data">
            <input type="file" multiple id="input_mult"
            onChange={(e) => {
              //console.log(e.target.files);
              let fl = e.target.files;
              setFile(fl);
            }} />
            <br /><br />
            <button type="submit" onClick={handleFormSubmit}>Submit</button>
          </form>
        </div>
      }
    </div>
    </>
  )
}



