import React from 'react';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const VtkLoader = () => {
    return (
        <Paper style={{
                zIndex: 2000, 
                width: 300, 
                height: 300, 
                verticalAlign: 'middle', 
                lineHeight: '150px', 
                textAlign: 'center', 
                position: 'absolute',  
                top: '50%', 
                left: `50%`,  
                transform: `translate(-50%, -50%)`}
        }>
            <CircularProgress 
                style={{
                    position: 'absolute',  
                    top: '50%', 
                    left: `50%`,  
                    transform: `translate(-50%, -50%)`
                }}
                size={50} />
        </Paper>
    )
}

export default VtkLoader;