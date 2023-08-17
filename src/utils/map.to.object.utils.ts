export function mapToObject(map: Map<any, any>): Record<any, any> {
  // return Array.from(map).reduce((obj, [key, value]) => {
  //   obj[key] = value
  //   return obj
  // }, {})
  if (!map) return map
  return Object.fromEntries(map)
}
