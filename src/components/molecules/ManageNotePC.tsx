import { faCut, faEdit, faFolderMinus, faFolderOpen, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import OrderButtons from '../atoms/OrderButtons';

export interface IManageNotePCProps {
  mainNote: INote;
  hasChildren: boolean;
  dispatch: Dispatch<{ type: string; payload: INote }>;
  showChildren: boolean;
  setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
  isAnythingCut: boolean;
  hasBrothers: boolean;
}

enum Property {
  none = 0, text, url
}

export function ManageNotePC (props: IManageNotePCProps) {
  const [showTextbox, setShowTextbox] = useState<Property>(0);
  const [updatingText, setUpdatingText] = useState<boolean>(false);

  return (
    <div className="dropdown">

      {!updatingText ? <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="dropbtn">
        <>
          {props.hasBrothers && <OrderButtons mainNote={props.mainNote} dispatch={props.dispatch} />}
          {props.mainNote!.url ? 
            <a target="_blank" href={props.mainNote.url} style={{margin: '0 10px'}} rel="noreferrer">{props.mainNote!.text}</a> 
          :
            <span style={{margin: '0 10px'}}>{props.mainNote!.text}</span>
          }
          
          <div style={{cursor: 'n-resize'}} onClick={() => props.hasChildren ? props.setShowChildren(!props.showChildren) : console.log('nothing')}>
                {props.hasChildren && !props.showChildren ? <FontAwesomeIcon icon={faFolderOpen} /> : <FontAwesomeIcon style={{color: props.hasChildren ? '' : 'grey'}} icon={faFolderMinus} />}
          </div>
        </>
      </div>
      :
      <>
        {updatingText &&
        <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => setUpdatingText(false)} onKeyDown={(e: any) => {
          if (e.keyCode === 13) {
            props.dispatch({type: 'updateNote', payload: {...props.mainNote, text: e.target.value }})
            setUpdatingText(false);
          } else if (e.keyCode === 27) {
            setUpdatingText(false);
          }
        }} />}
      </>
      }
      <div className="dropdown-content">
          {!showTextbox ? 
            <>
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    setShowTextbox(1);
                }}><FontAwesomeIcon icon={faPlus} /></button>
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    setUpdatingText(true);
                }}><FontAwesomeIcon icon={faEdit} /></button>
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    setShowTextbox(2);
                }}><FontAwesomeIcon icon={faLink} /></button>
                {!props.isAnythingCut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    props.dispatch({type: 'cutNote', payload: props.mainNote});
                }}><FontAwesomeIcon icon={faCut} /></button> :
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    props.dispatch({type: 'pasteNote', payload: props.mainNote});
                }}><FontAwesomeIcon icon={faPaste} /></button>}
                <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                    if (props.hasChildren) {
                      alert('Remove children first');
                    } else {
                      props.dispatch({type: 'removeNote', payload: {...props.mainNote, parentId: null, text: ''}});
                    }
                }}><FontAwesomeIcon icon={faTrash} /></button>
            </>
          :
            <div style={{display: 'flex'}}>
              <>{showTextbox === 2 ? <>
                  <input defaultValue={!props.mainNote.url ? 'https://' : props.mainNote.url} autoFocus style={{fontWeight:'bold'}} 
                      type="text" onBlur={() => setShowTextbox(0)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                      props.dispatch({type: 'updateNote', payload: {...props.mainNote, url: e.target.value }})
                      setShowTextbox(0);
                    } else if (e.keyCode === 27) {
                      setShowTextbox(0);
                    }
                  }} />
                </>
                :
                <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                  if (e.keyCode === 13) {
                    props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value }})
                    setShowTextbox(0);
                    props.setShowChildren(true);
                  } else if (e.keyCode === 27) {
                    setShowTextbox(0);
                  }
                }} />
              }</>
              <button onClick={() => setShowTextbox(0)}>x</button>
            </div>
          }
      </div>
  </div>
  );
}
