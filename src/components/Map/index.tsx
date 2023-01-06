import styles from './index.module.scss';

import { TileLayer } from 'react-leaflet';
import { MapContainer, Marker } from 'react-leaflet';
import L, { FeatureGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.motion/dist/leaflet.motion.js';
import { useEffect, useState } from 'react';

import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IChangeView } from '../../types/types';
import Spin from 'antd/es/spin';
import { Alert } from 'antd';

const IconFrom = () => {
  return L.icon({
    iconUrl: require('../../assets/images/icon_from.png'),
    iconSize: new L.Point(40, 40),
  });
};

const IconTo = () => {
  return L.icon({
    iconUrl: require('../../assets/images/icon_to.png'),
    iconSize: new L.Point(40, 40),
  });
};

const Map: React.FC = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const { coords, route, loading, error } = useSelector(
    (state: RootState) => state.route
  );

  const light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const dark =
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

  const drawPolyline = (L as any).motion.polyline(
    [route],
    {
      color: 'red',
    },
    {
      auto: true,
      duration: 3000,
    },
    {
      removeOnEnd: true,
      showMarker: true,
      icon: L.icon({
        iconUrl: require('../../assets/images/icon_truck.png'),
        iconSize: new L.Point(50, 50),
      }),
    }
  );

  console.log(route);
  console.log(drawPolyline);

  const ChangeOnView = ({ markers }: IChangeView) => {
    const map = useMap();
    const group = new FeatureGroup();

    markers.forEach((marker: { lat: number; lon: number }) => {
      L.marker([marker.lat, marker.lon]).addTo(group);
    });

    map.fitBounds(group.getBounds(), { padding: [35, 35] });

    useEffect(() => {
      return () => map.removeLayer(drawPolyline);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (route) {
      drawPolyline.addTo(map);
    }

    return null;
  };
  console.log(loading);

  return (
    <div className={`${styles.map} ${loading ? styles.map__loading : ''}`}>
      <MapContainer
        center={[59.940082, 30.312814]}
        zoom={10}
        className={styles.map__container}
        zoomSnap={0.5}
        zoomDelta={0.25}
      >
        <TileLayer url={colorMode === 'light' ? light : dark} />
        {!Object.values(coords).includes(null) && (
          <>
            <Marker
              position={[coords.latfrom, coords.lngfrom]}
              icon={IconFrom()}
            />
            <Marker position={[coords.latto, coords.lngto]} icon={IconTo()} />
            <ChangeOnView
              markers={[
                { lat: coords.latfrom, lon: coords.lngfrom },
                { lat: coords.latto, lon: coords.lngto },
              ]}
            />
          </>
        )}
      </MapContainer>
      {loading && <Spin size='large' className={styles.map__loader} />}
      {error && (
        <Alert
          message='Error'
          type='error'
          description={error}
          showIcon
          className={styles.map__error}
        />
      )}
    </div>
  );
};

export default Map;
