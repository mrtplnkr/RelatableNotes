import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch } from 'react';
import { timeout } from 'd3';
import { useNotepadContext } from '../data/NotepadContext';

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
    
    const { notes, dispatchNotes } = useNotepadContext();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<INote[]>([]);
    const [showTextbox, setShowTextbox] = React.useState<boolean>(false);

    React.useEffect(() => {
        reloadChildren();
    }, [notes]);

    const reloadChildren = () => {
        setChildren(notes!.filter((x: INote) => x.parentId === props.mainNote.id));
        setLoading(true);
    }

    return (
      <>
          {loading ? <>
              {children?.length ? <details style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                <summary style={{fontSize: props.size}}>
                    <div className="dropdown">
                        <div className="dropbtn">{props.mainNote!.text}{children?.length > 0 ? ` - ${children?.length}` : ''}</div>
                        <div className="dropdown-content">
                            {!showTextbox ? 
                                <>
                                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                        setShowTextbox(!showTextbox);
                                    }}>+</button>
                                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                        props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                                    }}>-</button>
                                </>
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
                    <div className="dropdown">
                        <div className="dropbtn" style={{paddingRight:'10px'}}>{props.mainNote!.text}</div>
                        <div className="dropdown-content">
                            {!showTextbox ? 
                                <>
                                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                        setShowTextbox(!showTextbox);
                                    }}>+</button>
                                    <button style={{fontSize: '1.5em', fontWeight: 'bold'}} onClick={() => {
                                        props.dispatch({type: 'removeNote', payload: {id: props.mainNote.id, parentId: null, text: 'asdsdasfads'}});
                                    }}>-</button>
                                </>
                            :
                                <>
                                    <input style={{fontSize: '1.5em', fontWeight: 'bold'}} type="text" autoFocus onKeyDown={(e: any) => {
                                        if (e.keyCode == 13 && e.target.value) {
                                            props.dispatch({type: 'addNote', payload: {id: props.mainNote.id!, parentId: props.mainNote.id!, text: e.target.value }})
                                            setShowTextbox(!showTextbox);
                                        }
                                    }} />
                                </>
                            }
                        </div>
                    </div>
                </span>
              </span>}
          </>: <div>loading...</div>}
      </>
    );
});
