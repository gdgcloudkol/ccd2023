export const randomColor = () => {
  let color = [
    'text-google-blue',
    'text-google-red',
    'text-google-green',
    'text-google-yellow'
  ]
  return (color[Math.floor(Math.random() * color.length)])
}