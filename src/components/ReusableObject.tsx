import * as React from 'react';
import randomColor from 'randomcolor';
import { INote } from '../data/NotepadReducer';
import { Dispatch, useCallback, useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';
import { compareLatest } from '../helpers';
import { ManageViews } from './organisms/ManageViews';
import Loading from './atoms/Loading';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    mainNote: INote;
    size?: number;
    showOptions: number;
    setShowOptions: Dispatch<React.SetStateAction<number>>;
    dispatch: React.Dispatch<{
        type: string;
        payload: INote;
    }>;
}

export const ReusableObject = (props:IReusableObjectProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [showChildren, setShowChildren] = useState<boolean>(false);

    const { notes, highlighted } = useNotepadContext();
    const { setShowOptions, mainNote, showOptions, dispatch } = props;

    React.useEffect(() => {
        if (highlighted.includes(mainNote.id)) setShowChildren(true);
    }, [highlighted.length])

    const filterChildren = !mainNote ? [] : notes.filter((x: INote) => x.parentId === mainNote!.id);

    const sortByOrder = useCallback((c: INote[]) => {
        return c.sort(compareLatest);
    }, [filterChildren]);

    return (
        <div style={{ fontSize: props.size }}>
            {!loading ? <>
                <>
                    {<div style={{ border: filterChildren.length > 0 ? `1px solid ${randomColor()}` : 'none', borderRadius: '50%', padding: filterChildren.length > 0 ? '25px 0' : '5px 0' }}>
                        <ManageViews {...{
                            showOptions, showChildren, setShowChildren, setShowOptions,
                            children: filterChildren,
                            mainNote: mainNote!,
                            dispatch: dispatch,
                            hasChildren: filterChildren.length > 0,
                            isAnythingCut: notes.filter(a => a.cut).length > 0,
                            hasBrothers: notes.filter(a => a.parentId === mainNote.parentId).length > 1,
                            isHighlighted: highlighted.includes(props.mainNote.id)
                        }} />
                        <div style={{border: highlighted.includes(mainNote.id) ? '1px red dotted' : '1px black dotted'}}>
                            {showChildren && filterChildren?.length > 0 && sortByOrder(filterChildren).map((x) => {
                                return (
                                    <div style={{ padding: '5px' }} key={x.id}>
                                        <ReusableObject {...{ showOptions, setShowOptions, dispatch }} mainNote={x} size={props.size! - 1}></ReusableObject>
                                    </div>
                                );
                            })}
                        </div>
                    </div>}
                </>
            </> : <Loading />}
        </div>
    );
};
