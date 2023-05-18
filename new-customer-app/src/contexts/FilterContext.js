import React, { createContext, useState } from 'react';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [selectedLabels, setSelectedLabels] = useState([]);

  // Add functions to update the selected labels state as needed

  return (
    <FilterContext.Provider value={{ selectedLabels, setSelectedLabels }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
