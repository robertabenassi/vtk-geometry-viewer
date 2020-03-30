import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const VtkSlider = withStyles({
    root: {
      color: '#666666',
      height: 4,
      width: '100%',
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -4,
      marginLeft: -6,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 2px)',
    },
    track: {
      height: 4,
      borderRadius: 2,
    },
    rail: {
      height: 4,
      borderRadius: 2,
    },
  })(Slider);

  export default VtkSlider;