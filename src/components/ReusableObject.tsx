import * as React from 'react';
import randomColor from 'randomcolor';
import { INotepadState, NotepadReducer, initialState, INote } from '../data/NotepadReducer';
import { Dispatch } from 'react';
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
    
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<INote[]>([]);

    const [state] = React.useReducer(NotepadReducer, {allNotes: [...initialState.allNotes]});

    React.useEffect(() => {
        reloadChildren();
        console.log('effect', state);
        
    }, []);

    const reloadChildren = () => {
        console.log('state.allNotes', state.allNotes);
        
        setChildren(state.allNotes.filter((x: INote) => x.parentId === props.mainNote.id));
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
                            <button onClick={() => console.log(props.mainNote, 'new parent child')}>+</button>
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
