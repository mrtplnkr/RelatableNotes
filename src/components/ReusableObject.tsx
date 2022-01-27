import * as React from 'react';
import randomColor from 'randomcolor';
import { INotepadState, NotepadReducer, initialState, INote } from '../data/NotepadReducer';
import { Dispatch } from 'react';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    mainNote: ReusableType;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    // data: ReusableType;
    // addNote: (id: number, newNote: string) => void;
}

export const ReusableObject = React.memo(function RecursiveObject(props: IReusableObjectProps) {
    
    const [fontSize, setFontSize] = React.useState<number>(18);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<INote[]>([]);

    const [state, dispatch] = React.useReducer(NotepadReducer, initialState);

    React.useEffect(() => {
        // setFontSize(props.data?.size ? props.data.size! - 3 : 18);
        downloadChildren();
    }, []);

    const downloadChildren = () => {
        setTimeout(() => {
            setChildren(state.allNotes.filter((x: INote) => x.parentId === props.mainNote.id));
            // setChildren(props.data.children ? props.data.children! : []);
            setLoading(true);
        }, 5000);
    }

    return (
      <>
          {loading ? <>
              {children?.length ? <details style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                <summary style={{fontSize: fontSize}}>
                  {props.mainNote!.text} - {children?.length > 1 ? children?.length : ''}
                  <button onClick={() => console.log(props.mainNote, 'new parent child')}>+</button>
                </summary>
                {props.mainNote && children?.length && children?.map(x => (
                    <span key={x.id}>
                        <ReusableObject dispatch={props.dispatch} mainNote={x}></ReusableObject>
                    </span>
                ))}
              </details>
              :
              <span style={{"display": "inlineFlex"}}>
                <span style={{fontSize: fontSize}}>
                  {props.mainNote.text},<span> </span>
                  <button onClick={() => props.dispatch({type: 'addNote', payload: {id: 123, parentId: null, text: 'asdsdasfads'}})}>+</button>
                </span>
                {props.mainNote && props.mainNote.children?.length && children?.map(x => (
                    <span key={x.id}>
                        <ReusableObject dispatch={dispatch} mainNote={x}></ReusableObject>
                    </span>
                ))}
              </span>}
          </>: <div>loading...</div>}
      </>
    );
});
