import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


interface VtkScalarSelectorProps {
    items: any[],
    value: any,
    onChange(newValue: string): void;
}

const VtkScalarSelector = (props: VtkScalarSelectorProps ) => {
    const { items, value, onChange } = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as string);
      };

    return(
        <FormControl 
            style={{maxWidth: 300}}
            fullWidth
        >
            <Select 
                id="scalar-selector"
                value={value} 
                onChange={handleChange}
            >
                {
                    items.map((item: any, index: number) => 
                        <MenuItem key={`scalar-selector-${index}`} value={item.value}>{item.label}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )

}

export default VtkScalarSelector;