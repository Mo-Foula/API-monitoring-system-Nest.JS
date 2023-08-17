export function arrayToObject(arr: any[], value: any = true) {
  return arr.reduce((accumulator, key) => {
    return { ...accumulator, [key]: value }
  }, {})
}
