import { FunctionComponent, useEffect } from 'react';

interface IExportProps {
}

const Export: FunctionComponent<IExportProps> = (props) => {

    useEffect(() => {
        
    }, [])
    
  return <>
    {JSON.stringify(localStorage.getItem('Notes'))}
  </>;
};

export default Export;
