export function getRedirectTo(type, header) {
  let path = '';
  console.log(type);
  if (type === 'ni') {
    path = 'dashen'
  } else {
    path = 'laoban'
  }
  if (!header) {
    path += '-info'
  }

  return path
}
