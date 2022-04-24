import { FunctionComponent } from 'react';

interface ILabelProps {
    text: string;
    color: string;
}

const Label: FunctionComponent<ILabelProps> = (props) => {

  return <label style={{color: props.color}}>
      {props.text}
  </label>;
};

export default Label;
