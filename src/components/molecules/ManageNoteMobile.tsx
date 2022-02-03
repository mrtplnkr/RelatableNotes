import { timeout } from 'd3';
import { useState, Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

export interface IManageNoteMobileProps {
    mainNote: INote;
    children: INote[];
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

export function ManageNoteMobile (props: IManageNoteMobileProps) {
    const [showTextbox, setShowTextbox] = useState<boolean>(false);
    const [whileUpdating, setWhileUpdating] = useState<boolean>(false);
    const [updatedValue, setUpdatedValue] = useState<string>('');

    return (
    <div className="">
      {<div className="">
          {!showTextbox ? 
              <>
                <button style={{fontWeight: 'bold', paddingRight: '10px'}} onClick={() => {
                    setShowTextbox(!showTextbox);
                }}>+</button>
                {!whileUpdating ? <span className="" onTouchStart={() => {setWhileUpdating(true)}}>{props.mainNote!.text}{props.children?.length > 0 ? ` - ${props.children?.length}` : ''}</span>
                :
                <input defaultValue={props.mainNote.text} style={{fontWeight:'bold'}} type="text" onKeyDown={(e: any) => {
                    if (e.keyCode === 13) {
                        props.dispatch({type: 'updateNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                        setWhileUpdating(false);
                    }
                }} />}
                <button style={{fontWeight: 'bold', paddingLeft: '10px'}} onClick={() => {
                    props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                }}>-</button>
              </>
          :
              <>
                  <input style={{fontWeight:'bold'}} type="text" autoFocus onKeyDown={(e: any) => {
                      if (e.keyCode === 13) {
                          props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                          setShowTextbox(!showTextbox);
                      }
                  }} />
                  <button onClick={() => setShowTextbox(!showTextbox)}>x</button>
              </>
          }
      </div>}
  </div>
  );
}

