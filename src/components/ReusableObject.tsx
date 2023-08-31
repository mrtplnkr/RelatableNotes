/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch, useCallback, useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';
import { compareLatest } from '../helpers';
import { ManageViews } from './organisms/ManageViews';

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

    const { notes, highlighted } = useNotepadContext();

    React.useEffect(() => {
        reloadChildren();
    }, [notes]);

    React.useEffect(() => {
        if (highlighted.includes(mainNote.id)) setShowChildren(true);
    }, [highlighted])

    const reloadChildren = () => {
        setChildren(notes.filter((x: INote) => x.parentId === mainNote!.id));
        setLoading(false);
    };

    const { setShowOptions, mainNote, showOptions, dispatch } = props;

    const sortByOrder = useCallback((c: INote[]) => {
        return c.sort(compareLatest);
    }, [children]);

    return (
        <div style={{ fontSize: props.size }}>
            {!loading ? <>
                <>
                    {<div style={{ border: children.length > 0 ? `1px solid ${randomColor()}` : 'none', borderRadius: '50%', padding: children.length > 0 ? '25px' : '5px' }}>
                        <ManageViews {...{
                            showOptions, showChildren, setShowChildren, setShowOptions,
                            children,
                            mainNote: mainNote!,
                            dispatch: dispatch,
                            hasChildren: children.length > 0,
                            isAnythingCut: notes.filter(a => a.cut).length > 0,
                            hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1,
                            isHighlighted: highlighted.includes(props.mainNote.id)
                        }} />
                        <div style={{border: highlighted.includes(mainNote.id) ? '1px red dotted' : '1px black dotted'}}>
                            {showChildren && children?.length > 0 && sortByOrder(children).map((x) => {
                                return (
                                    <div style={{ padding: '5px' }} key={x.id}>
                                        <ReusableObject {...{ showOptions, setShowOptions, reloadChildren, dispatch }} mainNote={x} size={props.size! - 1}></ReusableObject>
                                    </div>
                                );
                            })}
                        </div>
                    </div>}
                </>
            </> : <span>loading...</span>}
        </div>
    );
});
