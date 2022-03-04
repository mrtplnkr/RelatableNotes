import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { faChevronCircleDown, faChevronCircleUp, faCropAlt, faEdit, faLink, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShowHideInput } from '../organisms/ShowHideInput';

export interface IManageNoteMobileProps {
    mainNote: INote;
    hasChildren: boolean;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    showChildren: boolean;
    setShowChildren: Dispatch<React.SetStateAction<boolean>>;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState(false);
    const [addLink, setAddLink] = useState(false);

    return (
    <>
        <div className="">
            <div>
                <FontAwesomeIcon icon={faChevronCircleUp} onClick={() => {
                    props.dispatch({type: 'moveUp', payload: props.mainNote})
                }} />
                <FontAwesomeIcon icon={faChevronCircleDown} onClick={() => {
                    props.dispatch({type: 'moveDown', payload: props.mainNote})
                }} />
            </div>
            <ShowHideInput hasChildren={props.hasChildren} showChildren={props.showChildren} setShowChildren={props.setShowChildren} showOptions={showOptions} setShowOptions={setShowOptions} whileUpdating={whileUpdating} setWhileUpdating={setWhileUpdating} dispatch={props.dispatch} mainNote={props.mainNote} />
            {!showTextbox ? 
                <div style={{margin: '10px 0'}}>
                    {showOptions ? <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            setShowTextbox(!showTextbox);
                        }}><FontAwesomeIcon icon={faPlus} /></button>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            setWhileUpdating(true);
                        }}><FontAwesomeIcon icon={faEdit} /></button>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            setShowOptions(false);
                            setAddLink(true);
                        }}><FontAwesomeIcon icon={faLink} /></button>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            if (props.hasChildren) {
                              alert('Remove children first');
                            } else {
                              props.dispatch({type: 'removeNote', payload: {...props.mainNote, parentId: null, text: ''}});
                            }
                        }}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                    :
                    <>{addLink && 
                        <input defaultValue={props.mainNote.url} style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                            if (e.keyCode === 13) {
                                props.dispatch({type: 'updateNote', payload: {...props.mainNote, url: e.target.value }})
                                setShowOptions(true);
                                setAddLink(false);
                            } else if (e.keyCode === 27) {
                                setAddLink(false);
                                setShowOptions(true);
                            }
                        }} />
                    }</>
                }</div>
            :
                <div style={{display: 'flex'}}>
                  <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                      if (e.keyCode === 13) {
                          props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value }})
                          setShowOptions(true);
                          setShowTextbox(false);
                      } else if (e.keyCode === 27) {
                          setShowTextbox(false);
                      }
                  }} />
                  <button onClick={() => setShowTextbox(!showTextbox)}>x</button>
                </div>
            }
        </div>
    </>
  );
}

