import { faChevronCircleDown, faChevronCircleUp, faCompressArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IShowHideInputProps {
    whileUpdating: boolean;
    setWhileUpdating: Dispatch<React.SetStateAction<boolean>>;
    showOptions: boolean;
    setShowOptions: Dispatch<React.SetStateAction<boolean>>;
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
            <div onClick={() => props.hasChildren ? props.setShowChildren(!props.showChildren) : console.log('nothing')}>
                {props.showChildren ? <FontAwesomeIcon icon={faChevronCircleUp} /> : <FontAwesomeIcon style={{color: props.hasChildren ? '' : 'grey'}} icon={faChevronCircleDown} />}
            </div>

            <div style={{margin: '0 10px'}}>
                {!props.whileUpdating ? <div className="dropbtn" onClick={() => props.setWhileUpdating(!props.whileUpdating)}>{props.mainNote!.text}
                </div>
                :
                <input autoFocus defaultValue={props.mainNote.text} style={{fontWeight:'bold', textAlign: 'center'}} type="text" onBlur={() => props.setWhileUpdating(false)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                        props.setWhileUpdating(false);
                    } else if (e.keyCode === 27) {
                        props.setWhileUpdating(false);
                    }
                }} />}
            </div>

            <div onClick={() => props.setShowOptions(!props.showOptions)}>
                {props.showOptions ? <FontAwesomeIcon icon={faCompressArrowsAlt} /> : <FontAwesomeIcon icon={faExpandArrowsAlt} />}
            </div>
        </div>
        </>
    );
}
