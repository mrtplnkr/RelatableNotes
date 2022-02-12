import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch, useState } from 'react';
import { timeout } from 'd3';
import { useNotepadContext } from '../data/NotepadContext';
import { ManageNotePC } from './molecules/ManageNotePC';
import { BrowserView, MobileView } from 'react-device-detect';
import { ManageNoteMobile } from './molecules/ManageNoteMobile';
import { compareLatest } from '../pages/Notepad';

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
    
    const { notes } = useNotepadContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [children, setChildren] = useState<INote[]>([]);
    const [childAdded, setChildAdded] = useState(false);

    React.useEffect(() => {
        reloadChildren();
    }, [notes]);

    const reloadChildren = () => {
        setChildren(notes.filter((x: INote) => x.parentId === props.mainNote.id));
        setLoading(true);
    }

    return (
      <>
          {loading ? <>
              {children?.length ? <details open={childAdded ? true : false} style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                <summary style={{fontSize: props.size}} onKeyUp={e => e.preventDefault()} >
                        <ManageNotePC setChildAdded={setChildAdded} mainNote={props.mainNote} hasChildren={children.length > 0} dispatch={props.dispatch} />
                    
                </summary>
                {props.mainNote && children?.length && children.sort(compareLatest).map(x => (
                    <div style={{padding:'5px'}} key={x.id}>
                        <ReusableObject reloadChildren={reloadChildren} dispatch={props.dispatch} mainNote={x} size={props.size!-1}></ReusableObject>
                    </div>
                ))}
              </details>
              :
              <div>
                <span style={{fontSize: props.size}}>
                        <ManageNotePC setChildAdded={setChildAdded} mainNote={props.mainNote} hasChildren={children.length > 0} dispatch={props.dispatch} />
                    
                </span>
              </div>}
          </>: <div>loading...</div>}
      </>
    );
});
