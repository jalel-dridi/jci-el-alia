/** Up to two initials for a name, shown when there's no photo. */
export function initials(name = '') {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase()
}
