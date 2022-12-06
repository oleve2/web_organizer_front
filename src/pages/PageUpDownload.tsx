import Navigation from "../components/layout/Navigation"
import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store 
import { RootState, AppDispatch } from "../rtkstore/store";
import { fetchFilesInfo, filesUpload } from "../rtkstore/upDownReducer";

// style
import './PageUpDownload.css';

//
const PageUpDownload:FC = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const opers: string[] = ['download', 'upload'];
  const [operation, setoperation] = useState<string>(opers[0]);

  // upload
  const [file, setFile] = useState<FileList | null>(null);

  // store
  const {
    storeFilesInfo, 
    storeUplstatus,
  } = useSelector( (store: RootState) => ({
    storeFilesInfo: store.upDownReducer.filesInfo,
    storeUplstatus: store.upDownReducer.uploadStatus,
  })
  );

  // -----------------------------------
  const handleChooseMode = (value: string) => {
    setoperation(value);
  }

  const handleFormSubmit = async () => { //event: Event
    //event.preventDefault();

    if (file !== null) {
      // upload files with thunk function
      dispatch(filesUpload({file: file}))
      // clear input
      setFile(null);
      let inp = document.getElementById("input_mult") as HTMLInputElement;
      inp.value = '';
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
                return <div key={item} style={{marginBottom:'10px'}}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let fl = e.target.files;
              setFile(fl);
            }} />
            <br /><br />
            <button type="button" onClick={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}>Submit</button>
          </form>
        </div>
      }
    </div>
    </>
  )
}

export default PageUpDownload;

