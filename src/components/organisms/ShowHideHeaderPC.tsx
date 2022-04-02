import { faFolderMinus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import OrderButtons from '../atoms/OrderButtons';

export interface IShowHideHeaderPCProps {
    hasChildren: boolean;
    showChildren: boolean;
    setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdatingText: React.Dispatch<React.SetStateAction<boolean>>;
    hasBrothers: boolean;
    updatingText: boolean;
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ShowHideHeaderPC (props: IShowHideHeaderPCProps) {

  return (
    <>
        <div className="dropdown">
          {!props.updatingText ? <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="dropbtn">
            <>
              {props.hasBrothers && <OrderButtons mainNote={props.mainNote} dispatch={props.dispatch} />}
              {props.mainNote!.url ? 
                // eslint-disable-next-line react/jsx-no-target-blank
                <a target="_blank" href={props.mainNote.url} style={{margin: '0 10px'}}>{props.mainNote!.text}</a> 
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
            {props.updatingText &&
            <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => props.setUpdatingText(false)} onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                props.dispatch({type: 'updateNote', payload: {...props.mainNote, text: e.target.value }})
                props.setUpdatingText(false);
              } else if (e.keyCode === 27) {
                props.setUpdatingText(false);
              }
            }} />}
          </>
          }
        </div>
    </>
  );
}
