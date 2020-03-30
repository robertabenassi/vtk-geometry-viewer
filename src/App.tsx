import React from 'react';

import VtkControlPanel from 'ui/VtkControlPanel';
import VtkLoader from 'ui/VtkLoader';

import { getVtpFormatReader, getVtkFullScreenRenderComponents, getColorOptions, setScalarColorInfo  } from 'middleware/services/vtk';


const App = () => {

  const [ visibility, setVisibility ] = React.useState(100);
  const [ representationSelector, setRepresentationSelector] = React.useState('1:2:0');
  const [ source, setSource ] = React.useState('');
  const [ scalars, setScalars ] = React.useState(getColorOptions(null))
  const [ scalar, setScalar ] = React.useState('-');
  const [ loading, setLoading ] = React.useState(false);
  const [ data, setData ] = React.useState();

  const [ reader ] = React.useState(getVtpFormatReader());

  const [ renderer, setRenderer ] = React.useState();
  const [ renderWindow, setRenderWindow ] = React.useState();
  const [ actor, setActor ] = React.useState();
  const [ mapper, setMapper] = React.useState();

  React.useEffect(() => {
     // @ts-ignore
     const renderComponents = getVtkFullScreenRenderComponents();
    //  renderComponents.renderer.setBackground(1, 0, 0);
     renderComponents.actor.getProperty().setColor(0.83, 0, 0.83);
     setRenderer(renderComponents.renderer as any);
     setRenderWindow(renderComponents.renderWindow as any);
     setActor(renderComponents.actor as any)
     setMapper(renderComponents.mapper)
     renderComponents.renderWindow.render();
  }, [])

  const handleVisibility = (value: number) => {
    setVisibility(value);
    const opacity = Number(value) / 100;
    actor.getProperty().setOpacity(opacity);
    renderWindow.render();
  } 

  const handleRepresentationSelector = (value: string) => {
    setRepresentationSelector(value);
    const [
      visibility,
      representation,
      edgeVisibility,
    ] = value.split(':').map(Number);
    actor.getProperty().set({ representation, edgeVisibility });
    actor.setVisibility(!!visibility);
    renderWindow.render();
  }

  const handleSourceChange = (value: string) => {
    setSource(value);
    setScalar('-');
    setLoading(true)
  }

  const handleScalarChange = (value: string) => {
    const [location, colorByArrayName] = value.split('-');
    setScalar(value);
    setScalarColorInfo(data, mapper, location, colorByArrayName);
    renderWindow.render();
  }

  React.useEffect(() => {
    reader.setUrl(`/data/${source}`).then((data: any) => {
      data = reader.getOutputData(0);
      mapper.setInputData(data);
      
      actor.setMapper(mapper);
      setScalars(getColorOptions(data))
      setScalar('-')
      setScalarColorInfo(data, mapper, '', '')
      renderer.resetCamera();
      renderWindow.render();
      setData(data)
      setLoading(false)
    })
  }, [source])

  return(
    <>
      <VtkControlPanel
        source={source}
        representationSelector={representationSelector}
        visibility={visibility}
        scalar={scalar}
        scalars={scalars}
        onSourceChange={(value) => handleSourceChange(value)}
        onRepresentationSelectorChange={(value) => handleRepresentationSelector(value)}
        onVisibilityChange={(value) => handleVisibility(value)} 
        onScalarChange={(value) => handleScalarChange(value)}
      />

      { 
        loading &&
          <VtkLoader />
      }


    </>
  )
}

export default App;