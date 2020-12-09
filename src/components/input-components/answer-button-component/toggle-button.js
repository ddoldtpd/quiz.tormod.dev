import * as React from 'react';

const ToggleButton = props => {
  const { checked, onClick } = props;
  return <div onClick={onClick} style={checked ? Checked : Unchecked} />;
};

const Unchecked = {
  height: '100%',
  width: '100%',
  border: '1px'
};
const Checked = {
  height: '100%',
  width: '100%',
  border: '1px',
  background: 'green'
};

export default ToggleButton;
