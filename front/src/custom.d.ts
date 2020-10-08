// declare type IControl = import('mapbox-gl').IControl;
// declare type Control = import('mapbox-gl').Control;

declare module '@mapbox/mapbox-gl-geocoder' {
  import mapboxgl, { IControl } from "mapbox-gl";
  type Item = {
      place_name: string;
  }
  export type MapboxGeocoderParams = {
    accessToken: string;
    mapboxgl: any;
    zoom: number,
    flyTo: boolean,
    trackProximity: boolean,
    minLength: number,
    reverseGeocode: boolean,
    limit: number,
    origin: string,
    enableEventLogging: boolean,
    marker: boolean,
    mapboxgl: mapboxgl,
    collapsed: boolean,
    clearAndBlurOnEsc: boolean,
    clearOnBlur: boolean,
    placeholder: string;
    getItemValue(item: Item): string;
    render(item: Item): string;
  };
  class MapboxGeocoder extends IControl {
    constructor(param: Partial<MapboxGeocoderParams>);
    addTo(container: string|HTMLElement|mapboxgl.Map): void;
    onAdd(map: Map): HTMLElement;
    createIcon(name: string, path: string): HTMLElement;
    onRemove(map: Map): any;
    getDefaultPosition?: () => string;
    setLanguage(language: string): MapboxGeocoder;
    getLanguage(): string;
    getZoom(): number;
    getZoom(zoom: number): MapboxGeocoder;
    getFlyTo(): boolean;
    getFlyTo(flyTo: boolean): MapboxGeocoder;
    getPlaceholder(): string;
    setPlaceholder(placeholder: string): MapboxGeocoder;
    // WIP
  }
  export default MapboxGeocoder; 
}
