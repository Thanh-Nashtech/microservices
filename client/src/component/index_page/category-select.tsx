import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Category } from '../../entity/category.entity';

export interface CategorySelectProp {
    categories: Category[];
    selectedCategoryId: string;
    setSelectedCategoryId: (value: string) => void;
}

export default function CategorySelect({ categories, selectedCategoryId, setSelectedCategoryId }: CategorySelectProp) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value);
  };

  return (
    <div
        style={{
            marginBottom: '12px'
        }}
    >
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedCategoryId}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value={''}>Select category</MenuItem>
          {
            categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}