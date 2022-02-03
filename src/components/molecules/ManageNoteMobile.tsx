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
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [stillHolding, setStillHolding] = useState<boolean>(false);

    const checkTime = () => {
        setStillHolding(true);
        timeout(() => {
            console.log('bingo', stillHolding);
            setShowOptions(true);
        },1111)
    }

    const cancelHold = () => {
        if (!showOptions) {
            setStillHolding(false);
            setShowOptions(false);
        }
    }

    return (
    <div className="" onTouchStart={() => checkTime()} onTouchEnd={() => cancelHold()}>
      <div className="">{props.mainNote!.text}{props.children?.length > 0 ? ` - ${props.children?.length}` : ''}</div>
      {showOptions && <div className="">
          {!showTextbox ? 
              <>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      setShowTextbox(!showTextbox);
                  }}>+</button>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                  }}>-</button>
                  <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                      setShowOptions(false);
                      setStillHolding(false);
                  }}>x</button>
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

