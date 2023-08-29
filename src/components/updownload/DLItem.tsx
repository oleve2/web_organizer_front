import { useState, FC } from 'react';
import { useDispatch } from 'react-redux';

// models
import { IFileDownld, FileUpdateDeleteRequest } from '../../models/models';

// store
import { FileDoUpdateName, FileDoDelete } from '../../rtkstore/upDownReducer';
import { AppDispatch } from '../../rtkstore/store';

// styles
import './DLItem.css';

// images
import imgFolder from '../../assets/folder.webp';
import imgDoc from '../../assets/document.jpg';

interface DLItemProps {
  item: IFileDownld,
  serve_url: string,
}

//
const DLItem:FC<DLItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const findExtension = (item: IFileDownld) => {
    let arr = item.file_name.split('.');
    if (arr.length > 1) {
      let suff = arr[arr.length - 1];
      if (['webp','jpg','jpeg','png','gif'].includes(suff)) {
        return 'image';
      }
      if (['mp4','avi','flv'].includes(suff)) {
        return 'video';
      }      
      if (['mp3','ogg', 'asx'].includes(suff)) {
        return 'audio';
      }
      if (['txt','pdf','xls','doc','docx'].includes(suff)) {
        return 'document';
      }      
    } else {
      return '???'
    }
  }

  // button update -------------------------------
  const [udpatedFileName, set_udpatedFileName] = useState<string>(props.item.file_name)
  const [isUpdFNFormActive, set_isUpdFNFormActive] = useState<boolean>(false);

  const handleUdpFNChange = (e: any) => {
    set_udpatedFileName(e.target.value);
  }

  const handleBtnEdit = () => {
    set_isUpdFNFormActive(!isUpdFNFormActive);
  }

  const handleUpdFNForm_update = () => {
    // подготовка объекта запроса
    let dataObj: FileUpdateDeleteRequest = {
      file_new_name: udpatedFileName,
      file_original: props.item,
    }
    // вызов thunk на удаление
    dispatch( FileDoUpdateName(dataObj) );

    set_isUpdFNFormActive(false);
  }

  const handleUpdFNForm_discard = () => {
    set_udpatedFileName(props.item.file_name);  // return original filename
    set_isUpdFNFormActive(false);
  }


  // button delete -------------------------------
  const [isDelFNFormActive, set_isDelFNFormActive] = useState<boolean>(false);

  const handleBtnDelete = () => {
    set_isDelFNFormActive(!isDelFNFormActive);
  }

  const handleDelFNForm_delete = () => {
    // подготовка объекта запроса
    let dataObj: FileUpdateDeleteRequest = {
      file_new_name: "",
      file_original: props.item,
    }
    // вызов thunk на удаление
    dispatch( FileDoDelete(dataObj) );

    set_isDelFNFormActive(false);
  }

  const handleDelFNForm_discard = () => {
    set_isDelFNFormActive(false);
  }


  //
  return (
    <div className="dlitem">
      {/* DL Item */}
      <div className="dlitem">
        <a href={process.env.REACT_APP_BASE_URL +  props.serve_url + '/' + props.item.file_name}>
          {(props.item.file_isdir ? ' [DIR] ' : '' ) + props.item.file_name} 
        </a>    

        {(props.item.file_isdir) ? <img className='dlitem_shell' src={imgFolder} alt=""/> : ''}

        { (findExtension(props.item) === 'image')  
          ? <img className='dlitem_shell' src={process.env.REACT_APP_BASE_URL +  props.serve_url + '/' + props.item.file_name} alt=""/> 
          : ''
        }

        { (findExtension(props.item) === 'video')  
          ? <video className='dlitem_video' src={process.env.REACT_APP_BASE_URL +  props.serve_url + '/' + props.item.file_name} controls/> 
          : ''
        }

        { (findExtension(props.item) === 'audio')  
          ? <audio className='dlitem_video' src={process.env.REACT_APP_BASE_URL +  props.serve_url + '/' + props.item.file_name} controls/> 
          : ''
        }

        { (findExtension(props.item) === 'document')  
          ? <img className='dlitem_shell' src={imgDoc} alt=""/>
          : ''
        }   

        <button onClick={handleBtnEdit}>Edit Name</button>
        <button onClick={handleBtnDelete}>Delete</button>   
      </div>

      {/* update item name */}
      { (isUpdFNFormActive)
        ? <div>
            <div>new name: {udpatedFileName}</div>
            <input type="text" value={udpatedFileName} onChange={handleUdpFNChange} style={{width:'100%'}}/>
            <button onClick={handleUpdFNForm_update}>Save</button>
            <button onClick={handleUpdFNForm_discard}>Discard</button>
          </div>
        : <></>
      }

      { (isDelFNFormActive) 
        ? <div>
            <div>You delete item with name {props.item.file_name}. Delete it?</div>
            <button onClick={handleDelFNForm_delete}>Yes</button>
            <button onClick={handleDelFNForm_discard}>No</button>
        </div>
        : <></>
      }
    </div>
  )
}

export default DLItem;
