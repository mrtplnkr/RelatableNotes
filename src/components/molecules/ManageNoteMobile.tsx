import React, { useState, Dispatch } from 'react';
import { ENoteType, INote } from '../../data/NotepadReducer';
import { faCheck, faCut, faEdit, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShowHideInput } from '../organisms/ShowHideInput';
import OrderButtons from '../atoms/OrderButtons';

export interface IManageNoteMobileProps {
    mainNote: INote;
    hasChildren: boolean;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    showChildren: boolean;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
    setShowChildren: Dispatch<React.SetStateAction<boolean>>;
    isAnythingCut: boolean;
    hasBrothers: boolean;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);
    const [addLink, setAddLink] = useState(false);

    return (
    <>
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {props.hasBrothers && !props.mainNote.cut && <OrderButtons mainNote={props.mainNote} dispatch={props.dispatch} />}
                <div style={{flex: '1'}}>
                    {props.mainNote.cut ? <div style={{opacity: '0.1'}}>{props.mainNote.text}</div> :
                        <ShowHideInput hasChildren={props.hasChildren} showChildren={props.showChildren} setShowChildren={props.setShowChildren} showOptions={props.showOptions} setShowOptions={props.setShowOptions} whileUpdating={whileUpdating} setWhileUpdating={setWhileUpdating} dispatch={props.dispatch} mainNote={props.mainNote} />
                    }
                </div>
            </div>
            {!showTextbox ? 
                <div style={{margin: '10px 0'}}>
                    {props.showOptions === props.mainNote!.id ? <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            setShowTextbox(!showTextbox);
                        }}><FontAwesomeIcon icon={faPlus} /></button>
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            setWhileUpdating(true);
                        }}><FontAwesomeIcon icon={faEdit} /></button>
                        {
                            props.mainNote.type === ENoteType.todo ?
                            <>
                                {props.mainNote.type === ENoteType.todo && !props.hasChildren && <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                    props.dispatch({type: 'updateNote', payload: {...props.mainNote, done: !props.mainNote.done }});
                                    props.setShowOptions(0);
                                }}><FontAwesomeIcon icon={faCheck} /></button>}
                            </>
                            :
                            <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                props.setShowOptions(0);
                                setAddLink(true);
                            }}><FontAwesomeIcon icon={faLink} /></button>
                        }
                        {!props.isAnythingCut && !props.mainNote.cut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            props.dispatch({type: 'cutNote', payload: props.mainNote});
                            props.setShowOptions(0);
                        }}><FontAwesomeIcon icon={faCut} /></button> :
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            props.dispatch({type: 'pasteNote', payload: props.mainNote});
                            props.setShowChildren(true);
                        }}><FontAwesomeIcon icon={faPaste} /></button>}
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            if (props.hasChildren) {
                              alert('Remove children first');
                            } else {
                              props.dispatch({type: 'removeNote', payload: props.mainNote});
                              props.setShowOptions(0);
                            }
                        }}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                    :
                    <>{addLink && 
                        <input defaultValue={props.mainNote.url} style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                            if (e.keyCode === 13) {
                                props.dispatch({type: 'updateNote', payload: {...props.mainNote, url: e.target.value }});
                                props.setShowOptions(0);
                                setAddLink(false);
                            } else if (e.keyCode === 27) {
                                setAddLink(false);
                                props.setShowOptions(0);
                            }
                        }} />
                    }</>
                }</div>
            :
                <div style={{display: 'flex'}}>
                  <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                      if (e.keyCode === 13) {
                          props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value, done: undefined }});
                          props.setShowOptions(0);
                          props.setShowChildren(true);
                          setShowTextbox(false);
                      } else if (e.keyCode === 27) {
                          setShowTextbox(false);
                      }
                  }} />
                  <button onClick={() => setShowTextbox(!showTextbox)}>x</button>
                </div>
            }
        </>
    </>
  );
}

