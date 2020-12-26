import React from 'react';

function DropDown(props) {
  const selectItem = props.selectItem;

  const handleChange = e => {
    e.preventDefault();
    selectItem(e.target.value);
  };

  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <select
          // value={optionsState}
          onChange={handleChange}
          className="custom-select my-select"
        >
          <option defaultValue>Choose...</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
}

export default DropDown;
