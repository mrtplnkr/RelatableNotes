import * as React from 'react';
import { Dispatch } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { INote } from '../../data/NotepadReducer';
import { ManageNoteMobile } from '../molecules/ManageNoteMobile';
import { ManageNotePC } from '../molecules/ManageNotePC';

export interface IManageViewsProps {
    mainNote: INote;
    children: INote[];
    hasChildren: boolean;
    dispatch: Dispatch<{ type: string; payload: INote }>;
    showChildren: boolean;
    showOptions: number;
    setShowChildren: React.Dispatch<React.SetStateAction<boolean>>;
    isAnythingCut: boolean;
    hasBrothers: boolean;
    isHighlighted: boolean;
    setShowOptions: React.Dispatch<React.SetStateAction<number>>;
}

export function ManageViews (props: IManageViewsProps) {

  const {dispatch, mainNote, children, showChildren, showOptions, isAnythingCut, isHighlighted, hasBrothers, setShowChildren, setShowOptions} = props;

  return (
    <div>
        <BrowserView>
            <ManageNotePC {...{
                showChildren, setShowChildren, showOptions, setShowOptions,
                mainNote: mainNote!,
                dispatch: dispatch,
                hasChildren: children.length > 0,
                isAnythingCut,
                hasBrothers,
                isHighlighted
            }} />
        </BrowserView>
        <MobileView>
            <ManageNoteMobile {...{
                showChildren, setShowChildren, showOptions, setShowOptions, 
                mainNote: mainNote,
                dispatch: dispatch,
                hasChildren: children.length > 0,
                isAnythingCut,
                hasBrothers,
                isHighlighted
            }} />
        </MobileView>
    </div>
  );
}
