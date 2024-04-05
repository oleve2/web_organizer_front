
import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store 
import { RootState, AppDispatch } from "@/rtkstore/store";
import { fetchFilesInfo, filesUpload } from "@/rtkstore/upDownReducer";
import { actionsUpDownRed } from "@/rtkstore/upDownReducer";
import { filterPageFilesArray } from "@/rtkstore/upDownReducer";

// components
import Navigation from "@/components/layout/Navigation"
import DLItem from "@/components/updownload/DLItem";
import Paginator from "@/components/UI/Paginator";


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
    storeFilesInfoFiltered, 
    storeFilesInfoFilteredPaginated,
    storeUplstatus,
    storeSearchStr,
    numOfPages,
    currentPage,
  } = useSelector( (store: RootState) => ({
    storeFilesInfoFiltered: store.upDownReducer.filesInfoFiltered,
    storeFilesInfoFilteredPaginated: store.upDownReducer.filesInfoFilteredPaginated,
    storeUplstatus: store.upDownReducer.uploadStatus,
    storeSearchStr: store.upDownReducer.searchStr,
    numOfPages: store.upDownReducer.numOfPages,
    currentPage: store.upDownReducer.currentPage,
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

  const handleUpdateFilterPage = (e: any) => {
    dispatch(actionsUpDownRed.setsearchStr(e.target.value));
    dispatch(filterPageFilesArray({}));
  }

  const SetActivePageNum = (val: number) => {
    dispatch( actionsUpDownRed.setCurrentPage(val) );
  }


  useEffect( () => {
    document.title = "WA3: Up\\Down-load";
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

          <br /><br />
          <input 
            value={storeSearchStr}
            onChange={handleUpdateFilterPage}
          />
          
          <Paginator 
            numOfPages={numOfPages}
            activePageNum={currentPage}
            setActivePageNum={SetActivePageNum}
          />

          <div className="divDownload">
            <div className="downlds_wrapper">
            { (storeFilesInfoFilteredPaginated.files_list.length > 0)
              ? <>
              { storeFilesInfoFilteredPaginated.files_list[currentPage].map( (item) => {
                return <DLItem 
                    key={item.file_name}
                    item={item}
                    serve_url={storeFilesInfoFiltered.serve_url}
                  />
              }) }              
              </> 
              : <></> 
            }
            </div>
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

