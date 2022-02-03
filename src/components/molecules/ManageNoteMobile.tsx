import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';
import { faPlus, faTrash, faDoorClosed, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IManageNoteMobileProps {
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [whileAdding, setWhileAdding] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);

    return (
    <div className="">
        {<div>
            <div style={{display:'flex'}}>
                <button style={{fontWeight: 'bold', marginRight: '10px'}} onClick={() => {
                    setWhileAdding(!whileAdding);
                }}><FontAwesomeIcon icon={faPlus} /></button>
                {!whileUpdating ? <>
                    <div style={{flex: '1'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{flex:'1'}} onTouchStart={() => {setWhileUpdating(true)}}>{props.mainNote!.text}</div>
                            {whileAdding && <>
                                <div>
                                    <input style={{fontWeight:'bold'}} type="text" autoFocus onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                                            setWhileAdding(!whileAdding);
                                        }
                                    }} />
                                    <button onClick={() => setWhileAdding(false)}>
                                        <FontAwesomeIcon icon={faWindowClose} />
                                    </button>
                                </div>
                            </>}
                        </div>
                    </div>
                </>
                :
                <input defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onBlur={() => setWhileUpdating(false)} onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                        setWhileUpdating(false);
                    }
                }} />}
                <button style={{fontWeight: 'bold', marginLeft: '10px'}} onClick={() => {
                    props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                }}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>}
  </div>
  );
}

