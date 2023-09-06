import { useCallback, useEffect, useRef } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import clsx from 'clsx';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const { MapContainer, useMap } = ReactLeaflet;

// @ts-ignore
const searchControl = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
});

const SearchField = () => {
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export function ChangeView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom);

  // useEffect(() => {
  //   return () => {
  //     console.log('WEB ')
  //   }
  // }, [])

  return null;
}

const Map = ({ children, className, width, height, center, zoom, ...rest }) => {
  const mapInit = useCallback(() => {
    delete Leaflet.Icon.Default.prototype._getIconUrl;
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
      iconUrl: '/leaflet/images/marker-icon.png',
      shadowUrl: '/leaflet/images/marker-shadow.png',
    });
  }, [])

  useEffect(() => {
    (async () => {
      mapInit()
      console.log('MAP INIT ')
    })();

    return () => {
      // mapContent.removeLayer()
      // console.log('MAP DESTROY ')
    }
  }, [ mapInit]);

  return (
    <MapContainer className={clsx("w-full h-full", className)} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <ChangeView coords={center} zoom={zoom} />
      {/* <SearchField /> */}
    </MapContainer>
  )
}

export default Map;