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
import { ShowHideInput } from './organisms/ShowHideInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

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
    const [childAdded, setShowOptions] = useState(false);
    const [showChildren, setShowChildren] = useState(false);

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
              {children?.length ? <div style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                {<div style={{fontSize: props.size}} onKeyUp={e => e.preventDefault()} >
                    <BrowserView>
                        <ManageNotePC {...{showChildren, setShowChildren}} setShowOptions={setShowOptions} mainNote={props.mainNote} hasChildren={children.length > 0} dispatch={props.dispatch} />
                    </BrowserView>
                </div>}
                <MobileView>
                    <ManageNoteMobile showChildren={showChildren} setShowChildren={setShowChildren} mainNote={props.mainNote} dispatch={props.dispatch} hasChildren={children.length > 0} />
                </MobileView>
                {showChildren && props.mainNote && children?.length && children.sort(compareLatest).map(x => (
                    <div style={{padding:'5px'}} key={x.id}>
                        <ReusableObject reloadChildren={reloadChildren} dispatch={props.dispatch} mainNote={x} size={props.size!-1}></ReusableObject>
                    </div>
                ))}
              </div>
              :
              <div>
                <span style={{fontSize: props.size}}>
                    <BrowserView>
                        <ManageNotePC {...{showChildren, setShowChildren, setShowOptions}} mainNote={props.mainNote} hasChildren={children.length > 0} dispatch={props.dispatch} />
                    </BrowserView>
                    <MobileView>
                        <ManageNoteMobile showChildren={showChildren} setShowChildren={setShowChildren} mainNote={props.mainNote} hasChildren={children.length > 0} dispatch={props.dispatch} />
                    </MobileView>
                </span>
              </div>}
          </>: <div>loading...</div>}
      </>
    );
});
