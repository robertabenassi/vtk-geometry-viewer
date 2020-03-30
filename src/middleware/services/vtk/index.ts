
//@ts-ignore
import vtkXMLPolyDataReader from 'vtk.js/Sources/IO/XML/XMLPolyDataReader';
//@ts-ignore
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';

//@ts-ignore
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
//@ts-ignore
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';

//@ts-ignore
import { ColorMode, ScalarMode } from 'vtk.js/Sources/Rendering/Core/Mapper/Constants';


export interface VtkActor {
    getProperty(): any,
}

export interface VtkRenderer {
    addActor(actor: any): void,
    resetCamera(): void,
    setBackground(r: number, g: number, b: number): void,
}

export interface VtkRenderWindow {
    render(): void,
    getInteractor(): any,
}

export interface VtkMapper {
    getLookupTable(): any,
    set(options: any): void,
}

export interface VtkXMLPolyDataReader {
    setUrl(url: string): Promise<any>
}

export const VtkDefaultColor = {
    value: '-', 
    label: 'Solid color'
}



export const getVtkFullScreenRenderComponents = () => {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
    const actor = vtkActor.newInstance();
    const mapper = vtkMapper.newInstance();

    actor.setMapper(mapper);
    //mapper.setInputConnection(source.getOutputPort());

    const renderer = fullScreenRenderer.getRenderer();
    renderer.addActor(actor);
    renderer.resetCamera();

    const renderWindow = fullScreenRenderer.getRenderWindow();
    return {renderer: renderer as VtkRenderer, renderWindow: renderWindow as VtkRenderWindow, actor: actor as VtkActor, mapper: mapper as VtkMapper} 
}

export const getVtpFormatReader = () => {
    return vtkXMLPolyDataReader.newInstance({fetchGzip: false})
}

export const getColorOptions = (source: any) => {
    if (source === null) {
        return [VtkDefaultColor];
    }
    return [VtkDefaultColor].concat(
        source
          .getPointData()
          .getArrays()
          .map((a: any) => ({
            label: `(p) ${a.getName()}`,
            value: `PointData-${a.getName()}`,
          })),
        source
          .getCellData()
          .getArrays()
          .map((a: any) => ({
            label: `(c) ${a.getName()}`,
            value: `CellData-${a.getName()}`,
          }))
      );
} 


export const setScalarColorInfo  = (source: any, mapper: VtkMapper, location: string, colorByArrayName: string) => {
    let colorMode = ColorMode.DEFAULT;
    let scalarMode = ScalarMode.DEFAULT;
    const scalarVisibility = location.length > 0;
    const interpolateScalarsBeforeMapping = location === 'PointData';
    if (scalarVisibility) {
      const newArray = source[`get${location}`]().getArrayByName(
        colorByArrayName
      );
      colorMode = ColorMode.MAP_SCALARS;
      scalarMode =
        location === 'PointData'
          ? ScalarMode.USE_POINT_FIELD_DATA
          : ScalarMode.USE_CELL_FIELD_DATA;

      const numberOfComponents = newArray.getNumberOfComponents();
      if (numberOfComponents > 1) {
        // always start on magnitude setting
        if (mapper.getLookupTable()) {
          const lut = mapper.getLookupTable();
          lut.setVectorModeToMagnitude();
        }
      }
    }

    mapper.set({
        colorByArrayName,
        colorMode,
        interpolateScalarsBeforeMapping,
        scalarMode,
        scalarVisibility,
      });
}
