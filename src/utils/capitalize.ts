// capitialise the first letter of a string
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitalize;