import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


interface VtkRepresentationSelectorProps {
    value: string,
    onChange(newValue: string): void;
}

const VtkRepresentationSelector = (props: VtkRepresentationSelectorProps ) => {
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
                id="representation-selector"
                value={value} 
                onChange={handleChange}
            >
                <MenuItem value="1:0:0">Points</MenuItem>
                <MenuItem value="1:1:0">Wireframe</MenuItem>
                <MenuItem value="1:2:0">Surface</MenuItem>
            </Select>
        </FormControl>
    )

}

export default VtkRepresentationSelector;