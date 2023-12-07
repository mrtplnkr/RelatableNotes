import { faFolderMinus, faFolderOpen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch } from 'react';
import { useNotepadContext } from '../../data/NotepadContext';
import { INote } from '../../data/NotepadReducer';
import OrderButtons from '../atoms/OrderButtons';

export interface INoteHeaderProps {
    hasChildren: boolean;
    showChildren: boolean;
    setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions: React.Dispatch<React.SetStateAction<number>>;
    setUpdatingText: React.Dispatch<React.SetStateAction<boolean>>;
    hasBrothers: boolean;
    updatingText: boolean;
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    isHighlighted: boolean;
    setShowTextbox: (val: boolean) => void;
}

export function NoteHeader (props: INoteHeaderProps) {
  
  const { forceUpdate } = useNotepadContext();

  return (
    <>
      {props.mainNote.cut ? 
      <div style={{opacity: '0.1', flex: '1'}}>{props.mainNote.text}</div> :
        <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
          <div>
            {props.hasBrothers && <OrderButtons mainNote={props.mainNote!} dispatch={props.dispatch!} />}
          </div>
          <div className="dropdown" style={{flex: '1', margin: '0 5px', wordBreak: 'break-word'}}>
            {!props.updatingText ? <div style={{justifyContent: 'center', padding: '0 5px', borderRadius: '5px', display: 'flex', alignItems: 'center'}} className="dropbtn">
              <>
                {props.mainNote!.url ? 
                  // eslint-disable-next-line react/jsx-no-target-blank
                  <a id={`lbl${props.mainNote.id}`} target="_blank" href={props.mainNote.url}
                    className={props.isHighlighted ? 'zoom-in-zoom-out' : ''}>
                      {props.mainNote.text}</a>
                :
                  <span id={`lbl${props.mainNote.id}`}
                    className={props.isHighlighted ? 'zoom-in-zoom-out' : ''}>
                      {props.mainNote.text}</span>
                }
              </>
            </div>
            :
            <>
              {props.updatingText &&
                <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => props.setUpdatingText(false)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                      props.dispatch({type: 'updateNote', payload: {...props.mainNote, text: e.target.value }})
                      forceUpdate!();
                      props.setUpdatingText(false);
                    } else if (e.keyCode === 27) {
                      props.setUpdatingText(false);
                    }
                  }}
                />
              }
            </>
            }
          </div>
          <div onClick={() => {
            if (props.hasChildren) { 
              props.setShowChildren(!props.showChildren)
              if (props.showChildren) props.setShowOptions(0)
            } else console.log('nothing')}}>
            {props.hasChildren ?
              <>{
                props.showChildren ? 
                <FontAwesomeIcon style={{cursor: 'n-resize', color: props.hasChildren ? '' : 'grey'}} className={props.isHighlighted ? 'blink' : ''} icon={faFolderMinus} />
                :
                <FontAwesomeIcon style={{cursor: 'n-resize'}} icon={faFolderOpen} className={props.isHighlighted ? 'blink' : ''} />
              }</> 
              :
              <FontAwesomeIcon icon={faPlusCircle} onClick={() => props.setShowTextbox(true)} />
            }
          </div>
        </div>
      }
    </>
  );
}
