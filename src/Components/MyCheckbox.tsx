import React from 'react';
import { TouchableOpacity } from 'react-native';

interface MyCheckboxProps {
  isSelected: boolean;
  onCheckboxClick: () => void;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ isSelected, onCheckboxClick }) => {
  return (
    <TouchableOpacity 
      style={{
        height: 20,
        width: 20,
        backgroundColor: isSelected ? 'blue' : 'white',
        borderColor: 'black',
        borderWidth: 1,
      }} 
      onPress={onCheckboxClick} 
    />
  );
};

export default MyCheckbox;
