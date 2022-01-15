import * as React from 'react';

type ReusableType = {
    id: string,
    children?: ReusableType[]
}

export interface IReusableObjectProps {
    data: ReusableType;
}

export const ReusableObject = React.memo(function RecursiveObject(props: IReusableObjectProps) {
    
    const [loading, setLoading] = React.useState<boolean>(false);
    const [children, setChildren] = React.useState<ReusableType[]>([]);

    React.useEffect(() => {
        downloadChildren();
    }, []);

    const downloadChildren = () => {
        setTimeout(() => {
            setChildren([{id: 'er', children: []}])
            setLoading(true);
        }, 5000);
    }

    return (
      <div>
        parent = {props.data!.id} 
        {props.data && props.data.children?.length && loading && children.map(x => (
            <div key={x.id}>
                <ReusableObject data={x}></ReusableObject>
            </div>
        ))}
      </div>
    );
});
