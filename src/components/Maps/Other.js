
import React, { useEffect, useRef, useState, useCallback } from "react";
import {OpenStreetMapProvider, GeoSearchControl} from 'leaflet-geosearch'
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import L from "leaflet";


const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const LeafeltMap = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  center = [3.590446, 98.678430],
  getLatLng,
}) => {
  const [position, setPosition] = useState(center)
  // create map
  const mapRef = useRef()

  const mapInit = useCallback(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
      iconUrl: '/leaflet/images/marker-icon.png',
      shadowUrl: '/leaflet/images/marker-shadow.png',
    });
    mapRef.current = L.map('map', {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
       ],
    }).setView(position, 7)

    
    const searchControl = new GeoSearchControl({
      provider: OpenStreetMapProvider,
      resultFormat: function (t) {
        return '' + t.label
      },
    })
    mapRef.current.addControl(searchControl)
  }, [position])

  useEffect(() => {
    (async () => {
      mapInit()
    })();
  }, [mapInit]);

  useEffect(() => {
    if (!mapRef.current) return

    let Marker = L.marker(center, {
      draggable: true,
    })

    Marker.on('dragend', (e) => {
      const updPosition = Marker.getLatLng();
      if (getLatLng) getLatLng(updPosition)
    })

    mapRef.current.addLayer(Marker)

    return () => {
      mapRef.current.removeLayer(Marker)
    }
  }, [center, getLatLng])

  useEffect(() => {
    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <div id="map" style={{ aspectRatio: width / height }} className="w-full h-full">
    </div>
  )
}

export default LeafeltMap
