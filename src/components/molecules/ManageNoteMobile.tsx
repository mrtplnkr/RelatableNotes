import React, { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { faCompressArrowsAlt, faCut, faEdit, faExpandArrowsAlt, faLink, faPaste, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoteHeader } from '../organisms/NoteHeader';

export interface IManageNoteMobileProps {
    mainNote: INote;
    hasChildren: boolean;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    showChildren: boolean;
    setShowChildren: Dispatch<React.SetStateAction<boolean>>;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
    isAnythingCut: boolean;
    hasBrothers: boolean;
    isHighlighted: boolean
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [updatingText, setUpdatingText] = useState<boolean>(false);
    const [addLink, setAddLink] = useState(false);

    const { isHighlighted, showChildren, hasChildren, setShowChildren, setShowOptions, hasBrothers, mainNote, dispatch } = props;

    return (
    <>
        <div style={{display: 'flex'}}>
            <NoteHeader {...{isHighlighted, setShowTextbox, showChildren, hasChildren, setShowChildren, setShowOptions, updatingText, setUpdatingText, hasBrothers, mainNote, dispatch }} />
            {!mainNote.cut && <div style={{alignSelf: 'center', marginLeft: '0.5em'}} onClick={() => props.showOptions === props.mainNote.id ? props.setShowOptions(0) : props.setShowOptions(props.mainNote.id)}>
                {props.showOptions === props.mainNote.id ? <FontAwesomeIcon icon={faCompressArrowsAlt} /> : <FontAwesomeIcon icon={faExpandArrowsAlt} />}
            </div>}
        </div>
        {!showTextbox ? 
            <div style={{margin: '10px 0'}}>
                {props.showOptions === props.mainNote!.id ? <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        setShowTextbox(!showTextbox);
                    }}><FontAwesomeIcon icon={faPlus} /></button>
                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        setUpdatingText(true);
                    }}><FontAwesomeIcon icon={faEdit} /></button>
                    {
                        <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                            props.setShowOptions(0);
                            setAddLink(true);
                        }}><FontAwesomeIcon icon={faLink} /></button>
                    }
                    {!props.isAnythingCut && !props.mainNote.cut ? <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                        props.dispatch({type: 'cutNote', payload: props.mainNote});
                        props.setShowOptions(0);
                        props.setShowChildren(false);
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
                <input style={{fontWeight:'bold', flex: '1'}} type="text" autoFocus
                    onBlur={() => setShowTextbox(false)}
                    onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'addNote', payload: {...props.mainNote, parentId: props.mainNote.id!, text: e.target.value, done: undefined }});
                        props.setShowOptions(0);
                        props.setShowChildren(true);
                        setShowTextbox(false);
                    } else if (e.keyCode === 27) {
                        setShowTextbox(false);
                    }
                }} />
                <button className={'noBorder'} onClick={() => setShowTextbox(false)}>x</button>
            </div>
        }
    </>
  );
}

