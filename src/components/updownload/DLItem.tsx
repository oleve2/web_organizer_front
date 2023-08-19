import { FC } from 'react';

// models
import { IFileDownld } from '../../models/models';

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
      if (['mp3','ogg'].includes(suff)) {
        return 'audio';
      }
      if (['txt','pdf','xls','doc','docx'].includes(suff)) {
        return 'document';
      }      
    } else {
      return '???'
    }
  }


  //
  return (
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
    </div>
  )
}

export default DLItem;
