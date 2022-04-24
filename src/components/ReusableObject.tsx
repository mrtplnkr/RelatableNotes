import * as React from 'react';
import randomColor from 'randomcolor';
import { ENoteType, INote } from '../data/NotepadReducer';
import { Dispatch, useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';
import { ManageNotePC } from './molecules/ManageNotePC';
import { BrowserView, MobileView } from 'react-device-detect';
import { ManageNoteMobile } from './molecules/ManageNoteMobile';
import { compareLatest } from '../pages/Notepad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { InitialInputWithTypes } from './organisms/InitialInputWithTypes';
import { SearchInputWithTypes } from './organisms/SearchInputWithTypes';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    mainNote: INote;
    reloadChildren?: () => void;
    size?: number;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
    dispatch: React.Dispatch<{
        type: string;
        payload: INote;
    }>;
}

export const ReusableObject = React.memo((props: IReusableObjectProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [children, setChildren] = useState<INote[]>([]);
    const [showChildren, setShowChildren] = useState<boolean>(false);

    const { notes, filter, highlighted } = useNotepadContext();

    React.useEffect(() => {
        reloadChildren();
    }, []);

    const checkShowChildren = () => {
        if (!highlighted.includes(mainNote.id))
            setShowChildren(s => !s);
    }

    const reloadChildren = () => {
        setChildren(notes.filter((x: INote) => x.parentId === mainNote!.id));
        setLoading(false);
    };

    const { setShowOptions, mainNote, showOptions, dispatch } = props;

    return (
        <>
            {!loading ? <>
                <>
                    <div>
                        {children?.length ? <div style={{ border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px' }}>
                            <div style={{ fontSize: props.size }} onKeyUp={e => e.preventDefault()}>
                                <BrowserView>
                                    <ManageNotePC {...{
                                        showChildren, setShowChildren, setShowOptions,
                                        mainNote: mainNote!,
                                        dispatch: dispatch,
                                        hasChildren: children.length > 0,
                                        isAnythingCut: notes.filter(a => a.cut).length > 0,
                                        hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1
                                    }} />
                                </BrowserView>
                            </div>
                            <MobileView>
                                <ManageNoteMobile {...{
                                    showOptions, setShowOptions, showChildren, setShowChildren,
                                    mainNote: mainNote,
                                    dispatch: dispatch,
                                    hasChildren: children.length > 0,
                                    isAnythingCut: notes.filter(a => a.cut).length > 0,
                                    hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1
                                }} />
                            </MobileView>
                            
                            {(filter.text !== '' && highlighted.includes(mainNote.id)) ? <div>
                                {children?.length && children.sort(compareLatest).map((x, index) => {
                                    return (
                                        <div style={{ padding: '5px' }} key={x.id}>
                                            <ReusableObject {...{ showOptions, setShowOptions, reloadChildren, dispatch }} mainNote={x} size={props.size! - 1}></ReusableObject>
                                        </div>
                                    );
                                })}
                            </div> :
                            <div style={{border:'1px black dotted'}}>
                            {showChildren && children?.length && children.sort(compareLatest).map((x, index) => {
                                return (
                                    <div style={{ padding: '5px' }} key={x.id}>
                                        <ReusableObject {...{ showOptions, setShowOptions, reloadChildren, dispatch }} mainNote={x} size={props.size! - 1}></ReusableObject>
                                    </div>
                                );
                            })}
                        </div>}
                        </div>
                            :
                            <div>
                                {mainNote && <span style={{ fontSize: props.size }}>
                                    <BrowserView>
                                        <ManageNotePC {...{
                                            showChildren, setShowChildren, setShowOptions,
                                            mainNote: mainNote!,
                                            dispatch: dispatch,
                                            hasChildren: children.length > 0,
                                            isAnythingCut: notes.filter(a => a.cut).length > 0,
                                            hasBrothers: notes.filter(a => a.parentId === mainNote!.parentId).length > 1
                                        }} />
                                    </BrowserView>
                                    <MobileView>
                                        <ManageNoteMobile {...{
                                            showOptions, setShowOptions, showChildren, setShowChildren,
                                            mainNote: mainNote!,
                                            dispatch: dispatch,
                                            hasChildren: children.length > 0,
                                            isAnythingCut: notes.filter(a => a.cut).length > 0,
                                            hasBrothers: notes.filter(a => a.parentId === mainNote!.parentId).length > 1
                                        }} />
                                    </MobileView>
                                </span>}
                            </div>}
                    </div>
                </>
            </> : <div>loading...</div>}
        </>
    );
});
