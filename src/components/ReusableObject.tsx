import * as React from 'react';
import randomColor from 'randomcolor';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    data: ReusableType;
    addNote: (id: number, newNote: string) => void;
}

export const ReusableObject = React.memo(function RecursiveObject(props: IReusableObjectProps) {
    
    const [fontSize, setFontSize] = React.useState<number>(18);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<ReusableType[]>([]);

    React.useEffect(() => {
        setFontSize(props.data?.size ? props.data.size! - 3 : 18);
        // downloadChildren();
    }, []);

    const downloadChildren = () => {
        setTimeout(() => {
            setChildren(props.data.children ? props.data.children! : []);
            setLoading(true);
        }, 5000);
    }

    return (
      <>
          {props.data.children?.length ? <details style={{border: `1px solid ${randomColor()}`, borderRadius: '50%', padding: '25px'}}>
            <summary style={{fontSize: fontSize}}>
              {props.data!.text} - {props.data.children?.length > 1 ? props.data.children?.length : ''}
              <button onClick={() => props.addNote(props.data.id, 'new parent child')}>+</button>
            </summary>
            {props.data && props.data.children?.length && props.data.children?.map(x => (
                <span key={x.id}>
                    <ReusableObject addNote={props.addNote} data={{...x, size: fontSize}}></ReusableObject>
                </span>
            ))}
          </details>
          :
          <span style={{"display": "inlineFlex"}}>
            <span style={{fontSize: fontSize}}>
              {props.data!.text},<span> </span>
              <button onClick={() => props.addNote(props.data.id, 'new note child')}>+</button>
            </span>
            {props.data && props.data.children?.length && props.data.children?.map(x => (
                <span key={x.id}>
                    <ReusableObject addNote={props.addNote} data={{...x, size: fontSize}}></ReusableObject>
                </span>
            ))}
          </span>}
      </>
    );
});
