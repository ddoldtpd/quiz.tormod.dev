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
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}

export default DropDown;
