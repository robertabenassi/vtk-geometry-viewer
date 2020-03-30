import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface VtkSourceSelectorProps {
    value: string,
    onChange(newValue: string): void;
}


const VtkSourceSelector = (props: VtkSourceSelectorProps) => {
    const { value, onChange } = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as string);
      };

    return(
        <FormControl 
            style={{maxWidth: 300}}
            fullWidth
        >
            <Select 
                id="source-selector"
                value={value} 
                onChange={handleChange}
            >
                <MenuItem value="cow.xml">Cow</MenuItem>
                <MenuItem value="single-pin.xml">Single Pin</MenuItem>
              
            </Select>
        </FormControl>
    )
}

export default VtkSourceSelector;