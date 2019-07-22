export default function (width: number, x: number, y: number) {
  return (width * (y - 1) + x - 1) * 4;
};
