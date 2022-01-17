import * as React from 'react';

export type ReusableType = {
    id: number,
    text: string,
    children?: ReusableType[],
    size?: number
}

export interface IReusableObjectProps {
    data: ReusableType;
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
      <div>
          {props.data.children?.length ? <details>
            <summary style={{fontSize: fontSize}}>
              parent = {props.data!.text} - {props.data.children?.length}
            </summary>
            {props.data && props.data.children?.length && props.data.children?.map(x => (
                <span key={x.id}>
                    <ReusableObject data={{...x, size: fontSize}}></ReusableObject>
                </span>
            ))}
          </details>
          :
          <div>
            <summary style={{fontSize: fontSize}}>
              parent = {props.data!.text} - {props.data.children?.length}
            </summary>
            {props.data && props.data.children?.length && props.data.children?.map(x => (
                <span key={x.id}>
                    <ReusableObject data={{...x, size: fontSize}}></ReusableObject>
                </span>
            ))}
          </div>}
      </div>
    );
});
