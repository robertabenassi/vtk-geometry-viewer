import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import VtkScalarSelector from 'ui/VtkScalarSelector';
import VtkRepresentationSelector from 'ui/VtkRepresentationSelector';
import VtkSourceSelector from 'ui/VtkSourceSelector';
import VtkSlider from 'ui/VtkSlider';

interface IVtkControlPanelProps {
    source: string,
    representationSelector: string,
    visibility: number,
    scalars: any[],
    scalar: any,
    onSourceChange(value: string): void,
    onRepresentationSelectorChange(value: string): void,
    onVisibilityChange(value: number): void;
    onScalarChange(value: string): void,
}


const VtkControlPanel = (props: IVtkControlPanelProps) => {
    const { source, representationSelector, visibility, scalars, scalar, onSourceChange, onRepresentationSelectorChange, onVisibilityChange, onScalarChange} = props;

    return (
        <Paper style={{zIndex: 1000, position: 'relative', width: '90%', margin: '0 auto'}}>
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid xs={3} item>
                       <VtkSourceSelector
                            value={source}
                            onChange={onSourceChange}
                       />
                    </Grid>
                    <Grid xs={3} item>
                        <VtkRepresentationSelector 
                            value={representationSelector}
                            onChange={onRepresentationSelectorChange}
                        />
                    </Grid>
                    <Grid xs={3} item>
                        <VtkScalarSelector 
                            value={scalar}
                            items={scalars}
                            onChange={onScalarChange}
                        />
                    </Grid>
                    <Grid xs={3} item>
                        Opacity <br />
                        <VtkSlider 
                            min={1} 
                            max={100} 
                            value={visibility} 
                            onChange={(event: any, newValue: number | number[] ) => onVisibilityChange(typeof newValue === 'number' ? newValue : newValue[0])} 
                            style={{maxWidth: 300}} 
                        /> 
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export default VtkControlPanel