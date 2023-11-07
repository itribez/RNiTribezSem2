import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`

  flex: 1;
  height: 60px;
  box-shadow: 0px 2px 20px #173A6E;
  padding: 20px 20px 20px 20px;
  border: 2px solid #ccc;
  border-radius: 30px;
`;

const SearchButton = styled.Button``;

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Perform search logic here using the searchQuery state
    console.log('Search query:', searchQuery);
    // ...
  };

  return (
    <Container>
      <SearchInput
        placeholder="Enter your search query"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    
    </Container>
  );
};

export default SearchComponent;
