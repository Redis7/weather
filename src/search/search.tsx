import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

interface SearchProps {
  onSearchChange: (searchData: any) => void;
}

interface Option {
  value: string;
  label: string;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<Option | null>(null);

  const API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

  const loadOptions = async (
    inputValue: string,
    loadedOptions: any
  ) => {
    const geoApiOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '63e7733078msh8f8d0f16ece3e11p17020ejsnb3df5cec3dd8',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(
        `${API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      const responseData = await response.json();

      const options = responseData.data.map((city: any) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return {
        options: options,
        hasMore: true,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        options: [],
      };
    }
  };

  
  const handleOnChange = (searchData: Option | null) => {
    setSearch(searchData);
    console.log(search);
    onSearchChange(searchData);
  };

  return (
    <div className="search5">
      <div style={{ width: '100%' }}>
        <AsyncPaginate
          placeholder="Search   "
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
    </div>
  );
};

export default Search;
