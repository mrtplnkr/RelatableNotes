import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch } from 'react';
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
    
    const { notes, dispatchNotes } = useNotepadContext();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<INote[]>([]);

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
              {children?.length ? <details style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                <summary style={{fontSize: props.size}}>
                    <BrowserView>
                        <ManageNotePC mainNote={props.mainNote} children={children} dispatch={props.dispatch} />
                    </BrowserView>
                    <MobileView>
                        <ManageNoteMobile mainNote={props.mainNote} children={children} dispatch={props.dispatch} />
                    </MobileView>
                </summary>
                {props.mainNote && children?.length && children.sort(compareLatest).map(x => (
                    <li style={{padding:'5px'}} key={x.id}>
                        <ReusableObject reloadChildren={reloadChildren} dispatch={props.dispatch} mainNote={x} size={props.size!-1}></ReusableObject>
                    </li>
                ))}
              </details>
              :
              <div>
                <span style={{fontSize: props.size}}>
                    <BrowserView>
                        <ManageNotePC mainNote={props.mainNote} children={children} dispatch={props.dispatch} />
                    </BrowserView>
                    <MobileView>
                        <ManageNoteMobile mainNote={props.mainNote} children={children} dispatch={props.dispatch} />
                    </MobileView>
                </span>
              </div>}
          </>: <div>loading...</div>}
      </>
    );
});
