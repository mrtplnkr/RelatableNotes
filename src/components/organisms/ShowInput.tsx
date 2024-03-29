import { faCompressArrowsAlt, faExpandArrowsAlt, faFolderMinus, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IShowHideInputProps {
    whileUpdating: boolean;
    setWhileUpdating: Dispatch<React.SetStateAction<boolean>>;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    hasChildren: boolean;
    showChildren: boolean;
    setShowChildren: Dispatch<React.SetStateAction<boolean>>;
}

export function ShowHideInput (props: IShowHideInputProps) {
    return (
        <>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'end'}}>
            <div style={{margin: '0 0.5em', flex: 1}}>
                {!props.whileUpdating ? <div className="dropbtn">
                    <>
                        {props.mainNote!.url ? 
                            <a target="_blank" href={props.mainNote.url} style={{margin: '0 10px'}} rel="noreferrer">{props.mainNote!.text}</a> 
                            :
                            <span style={{margin: '0 10px'}}>
                                    {props.mainNote.text}</span>
                        }
                    </>
                </div>
                :
                <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold', textAlign: 'center'}} type="text" onBlur={() => props.setWhileUpdating(false)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'updateNote', payload: {...props.mainNote, text: e.target.value }})
                        props.setWhileUpdating(false);
                        props.setShowOptions(0);
                    } else if (e.keyCode === 27) {
                        props.setWhileUpdating(false);
                    }
                }} />}
            </div>
            <div style={{marginRight: '1em'}} onClick={() => props.hasChildren ? props.setShowChildren(!props.showChildren) : console.log('nothing')}>
                {props.showChildren ? <FontAwesomeIcon icon={faFolderMinus} /> :
                <FontAwesomeIcon style={{color: props.hasChildren ? '' : 'grey'}} icon={faFolderOpen} />}
            </div>
            <div onClick={() => props.showOptions === props.mainNote.id ? props.setShowOptions(0) : props.setShowOptions(props.mainNote.id)}>
                {props.showOptions === props.mainNote.id ? <FontAwesomeIcon icon={faCompressArrowsAlt} /> : <FontAwesomeIcon icon={faExpandArrowsAlt} />}
            </div>
        </div>
        </>
    );
}
