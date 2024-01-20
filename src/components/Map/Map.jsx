import React, { useCallback, useState, useMemo, useRef } from 'react'
import render from 'react-dom'
import { MapContainer, TileLayer, Popup, Rectangle, useMap, useMapEvent, Circle } from 'react-leaflet'
import { useEventHandlers } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css'

import { getPriorityColor } from '../../helpers/getPriorityColor'

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

const MinimapBounds = ({ parentMap, zoom }) => {
  const minimap = useMap()

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

const MinimapControl = ({ position, zoom }) => {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={true}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

const Map = ({ sections, currentSection }) => {
  const mapRef = useRef()

  // Fonction pour mettre à jour le centre de la carte
  const SetCenter = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  return (
    <MapContainer
      center={[currentSection.lat, currentSection.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className='map-container'
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sections.map((section) => {
        return (
          <Circle
            key={section.id}
            center={[section.lat, section.lng]}
            radius={200}
            color={getPriorityColor(parseFloat(section.p))}
          >
            <Popup>
              <div>{section.name}</div>
              <div>Accidents : {section.nbOfAccident}</div>
            </Popup>
          </Circle>
        )
      })}
      <MinimapControl position="topright" />
      <SetCenter center={[currentSection.lat, currentSection.lng]} />
    </MapContainer>
  )
}

export default Map