import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = (props) => {
    const {filter, onFilter} = props;
  return (
    <>
      <label className={css['filter-label']} htmlFor="">
        Find contacts by name
        <input
          className={css['filter-input']}
          type="text"
          value={filter}
          onChange={onFilter}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}

export default Filter;