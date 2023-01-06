const degToRad = (a: number) => (Math.PI / 180) * a;
const radToDeg = (a: number) => (180 / Math.PI) * a;

const latlonToXyz = (latlon: number[]) => {
  const [lat, lon] = latlon.map(degToRad);
  return [
    Math.cos(lat) * Math.cos(lon),
    Math.cos(lat) * Math.sin(lon),
    Math.sin(lat),
  ];
};

const xyzToLatlon = (xyz: number[]) => {
  const [x, y, z] = xyz;
  return [Math.atan2(z, (x ** 2 + y ** 2) ** 0.5), Math.atan2(y, x)].map(
    radToDeg
  );
};

const midXyz = (xyz1: number[], xyz2: number[]) => [
  (xyz1[0] + xyz2[0]) / 2,
  (xyz1[1] + xyz2[1]) / 2,
  (xyz1[2] + xyz2[2]) / 2,
];

export const calculateCenter = (latlon1: number[], latlon2: number[]) =>
  xyzToLatlon(midXyz(latlonToXyz(latlon1), latlonToXyz(latlon2)));
