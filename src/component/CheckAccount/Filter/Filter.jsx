import axios from "axios";
import React from "react";
import "./Filter.sass";

const Filter = (props) => {
  return (
    <div className="filter-container">
      <RemoveDuplicates />
      <div className="filter-container-wrapper-2">
        <FilterButton {...props} />
        <CheckLive {...props} />
      </div>
    </div>
  );
};

const RemoveDuplicates = (props) => {
  return (
    <div className="filter-container-remove-duplicates">
      Remove duplicate&nbsp;
      <input
        type="checkbox"
        name="duplicate"
        className="filter-duplicate-input"
      />
    </div>
  );
};

const FilterButton = (props) => {
  return <div className="filter-container-filter-button">Filter</div>;
};

const CheckLive = (props) => {
  const checklive = async () => {
    try {
      const res = await axios({
        url: `https://graph.facebook.com/${props.idCheck?.trim()}/picture`,
        method: "get",
        params: {
          type: "normal",
        },
        responseType: "json",
      });
      const result = res.status;
      if (result === 200) {
        return props.setAlive(() => true);
      } else {
        return props.setAlive(() => false);
      }
    } catch (error) {
      return props.setAlive(() => false);
    }
  };
  return (
    <div className="filter-container-check-live" onClick={() => checklive()}>
      Check live
    </div>
  );
};

export default Filter;
