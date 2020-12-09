import React, { useContext, useEffect, useState } from 'react';
import ToggleButton from './toggle-button';

const AnswerButtonComponent = props => {
  const { options, onClick } = props;
  const [selected, setSelected] = useState('');

  const handleOnClick = value => {
    onClick && onClick(value);
    setSelected(value);
  };

  const renderButtons = () => {
    return options.map(text => {
      return (
        <ToggleButton
          key={text}
          onClick={() => handleOnClick(text)}
          checked={selected === text}
        />
      );
    });
  };

  return (
    <>
      <div style={Wrapper}>{renderButtons()}</div>
    </>
  );
};

const Wrapper = {
  diplay: 'flex',
  width: '120px',
  height: '50px',
  // flexGrow: '1',
  flexDirection: 'row'
};
export default AnswerButtonComponent;

// import * as React from 'react';
// import { ToggleButton } from 'react-native-paper';

// const ToggleButtonExample = () => {
//   const [status, setStatus] = React.useState('checked');

//   const onButtonToggle = value => {
//     setStatus(status === 'checked' ? 'unchecked' : 'checked');
//   };

//   return (
//     <ToggleButton
//       icon="bluetooth"
//       value="bluetooth"
//       status={status}
//       onPress={onButtonToggle}
//     />
//   );
// };

// export default ToggleButtonExample;
