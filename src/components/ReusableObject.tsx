import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch, useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';
import { ManageNotePC } from './molecules/ManageNotePC';
import { BrowserView, MobileView } from 'react-device-detect';
import { ManageNoteMobile } from './molecules/ManageNoteMobile';
import { compareLatest } from '../pages/Notepad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { InitialInputWithTypes } from './organisms/InitialInputWithTypes';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    mainNote?: INote;
    reloadChildren?: () => void;
    size?: number;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
}

export const ReusableObject = React.memo(function RecursiveObject(props: IReusableObjectProps) {
    
    const { notes, dispatchNotes } = useNotepadContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [children, setChildren] = useState<INote[]>([]);
    const [showChildren, setShowChildren] = useState(false);

    React.useEffect(() => {
        reloadChildren();
    }, [notes]);

    const reloadChildren = () => {
        if (mainNote) {
            setChildren(notes.filter((x: INote) => x.parentId === mainNote!.id));
        } else {
            setChildren(notes.filter((x: INote) => x.parentId === null));
        }
        setLoading(false);
    }
    
    const { setShowOptions, mainNote, showOptions } = props;
    
    return (
      <>
        {!loading ? <>
            <>
                {mainNote ? <div>
                    {children?.length ? <div style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
                        <div style={{fontSize: props.size}} onKeyUp={e => e.preventDefault()}>
                            <BrowserView>
                                <ManageNotePC {...{showChildren, setShowChildren, setShowOptions,
                                    mainNote: mainNote!,
                                    dispatch: dispatchNotes,
                                    hasChildren: children.length > 0,
                                    isAnythingCut: notes.filter(a => a.cut).length > 0,
                                    hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1}} />
                            </BrowserView>
                        </div>
                        <MobileView>
                            <ManageNoteMobile {...{showOptions, setShowOptions, showChildren, setShowChildren, 
                                mainNote: mainNote, 
                                dispatch: dispatchNotes,
                                hasChildren: children.length > 0, 
                                isAnythingCut: notes.filter(a => a.cut).length > 0, 
                                hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1}} />
                        </MobileView>
                        <div>
                            {showChildren && children?.length && children.sort(compareLatest).map((x, index) => { 
                            return (
                                <div style={{padding:'5px'}} key={x.id}>
                                    <ReusableObject {...{showOptions, setShowOptions, reloadChildren, dispatchNotes}} mainNote={x} size={props.size!-1}></ReusableObject>
                                </div>
                            )
                            })}
                        </div>
                    </div>
                    :
                    <div>
                        {mainNote && <span style={{fontSize: props.size}}>
                            <BrowserView>
                                <ManageNotePC {...{showChildren, setShowChildren, setShowOptions, 
                                    mainNote: mainNote!,
                                    dispatch: dispatchNotes, 
                                    hasChildren: children.length > 0, 
                                    isAnythingCut: notes.filter(a => a.cut).length > 0, 
                                    hasBrothers: notes.filter(a => a.parentId === mainNote!.parentId).length > 1
                                }} />
                            </BrowserView>
                            <MobileView>
                                <ManageNoteMobile {...{showOptions, setShowOptions, showChildren, setShowChildren,
                                    mainNote: mainNote!,     
                                    dispatch: dispatchNotes,
                                    hasChildren: children.length > 0, 
                                    isAnythingCut: notes.filter(a => a.cut).length > 0, 
                                    hasBrothers: notes.filter(a => a.parentId === mainNote!.parentId).length > 1}} />
                            </MobileView>
                        </span>}
                    </div>}
                </div>
                : <div>
                    <InitialInputWithTypes dispatch={dispatchNotes} />
                    {notes.some(x => x.cut) && <span style={{position: 'absolute',  right: 0}}>
                        {notes.find(x => x.cut)!.text} 
                        <FontAwesomeIcon onClick={() => dispatchNotes({type: 'cancelCut', payload: notes[0]})} title='undo' cursor={'pointer'} icon={faUndo} style={{padding: '0 0.5em'}} />
                    </span>}
                    {children?.length && children.sort(compareLatest).map((x, index) => { 
                      return (
                          <div style={{padding:'5px'}} key={x.id}>
                              <ReusableObject {...{showOptions, setShowOptions, reloadChildren}} mainNote={x} size={props.size!-1}></ReusableObject>
                          </div>
                      )
                    })}
                </div>}
            </>
          </>: <div>loading...</div>}
      </>
    );
});
