import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch, MutableRefObject, RefObject, useContext, useRef } from 'react';
import { NotepadContext } from '../App';
import { timeout } from 'd3';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    reloadChildren: () => void;
    size?: number;
    // data: ReusableType;
    // addNote: (id: number, newNote: string) => void;
}

export const ReusableObject = React.memo(function RecursiveObject(props: IReusableObjectProps) {
    
    const notepadContext = useContext(NotepadContext);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<INote[]>([]);
    const [showTextbox, setShowTextbox] = React.useState<boolean>(false);

    React.useEffect(() => {
        reloadChildren();
        // console.log('qweqwe', notepadContext?.notepadState);
    }, [notepadContext?.notepadState]);

    const reloadChildren = () => {
        setChildren(notepadContext!.notepadState.allNotes.filter((x: INote) => x.parentId === props.mainNote.id));
        setLoading(true);
    }

    return (
      <>
          {loading ? <>
              {children?.length ? <details style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                <summary style={{fontSize: props.size}}>
                    <div className="dropdown">
                        <div className="dropbtn">{props.mainNote!.text} - {children?.length > 1 ? children?.length : ''}</div>
                        <div className="dropdown-content">
                            {!showTextbox ? 
                                <button onClick={() => {
                                    setShowTextbox(!showTextbox);
                                }}>+</button>
                            :
                                <>
                                    <input type="text" autoFocus onKeyDown={(e: any) => {
                                        if (e.keyCode == 13) {
                                            props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                                            setShowTextbox(!showTextbox);
                                        }
                                    }} />
                                </>
                            }
                        </div>
                    </div>
                </summary>
                {props.mainNote && children?.length && children?.map(x => (
                    <span key={x.id}>
                        <ReusableObject reloadChildren={reloadChildren} dispatch={props.dispatch} mainNote={x} size={props.size!-3}></ReusableObject>
                    </span>
                ))}
              </details>
              :
              <span style={{"display": "inlineFlex"}}>
                <span style={{fontSize: props.size}}>
                  {props.mainNote.text},<span> </span>
                    <button onClick={() => {
                        props.dispatch({type: 'addNote', payload: {id: props.mainNote.parentId!, parentId: null, text: 'asdsdasfads'}})
                        
                        // props.reloadChildren();
                    }}>+</button>

                    <button onClick={() => {
                        props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}})
                        
                        // props.reloadChildren();
                    }}>-</button>
                </span>
              </span>}
          </>: <div>loading...</div>}
      </>
    );
});
