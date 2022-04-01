import React, { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { faCut, faEdit, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    isCut: boolean;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);
    const [addLink, setAddLink] = useState(false);

    return (
    <>
        <div className="">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <OrderButtons mainNote={props.mainNote} dispatch={props.dispatch} />
                <div style={{flex: '1'}}>
                    <ShowHideInput hasChildren={props.hasChildren} showChildren={props.showChildren} setShowChildren={props.setShowChildren} showOptions={props.showOptions} setShowOptions={props.setShowOptions} whileUpdating={whileUpdating} setWhileUpdating={setWhileUpdating} dispatch={props.dispatch} mainNote={props.mainNote} />
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
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            props.setShowOptions(0);
                            setAddLink(true);
                        }}><FontAwesomeIcon icon={faLink} /></button>
                        {!props.isCut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
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
                              props.setShowOptions(0);
                            }
                        }}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                    :
                    <>{addLink && 
                        <input defaultValue={props.mainNote.url} style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus onKeyDown={(e: any) => {
                            if (e.keyCode === 13) {
                                props.dispatch({type: 'updateNote', payload: {...props.mainNote, url: e.target.value }})
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
                          props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value }})
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
        </div>
    </>
  );
}

