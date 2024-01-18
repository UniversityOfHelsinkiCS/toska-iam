const isNumber = (value: string) => !Number.isNaN(parseInt(value, 10))

/**
 * TODO: Better explanation needed. Remove hardcodings
 */
export const normalizeOrganisationCode = (code: string) => {
  if (code.startsWith('T')) {
    return code.replace('T', '7')
  }
  if (!code.includes('_')) {
    return code
  }

  const [left, right] = code.split('_')
  const prefix = [...left].filter(isNumber).join('')
  const suffix = `${left[0]}${right}`
  const providercode = `${prefix}0-${suffix}`
  return providercode
}

/**
 * TODO: Better explanation needed. Remove hardcodings
 */
export const mapToDegreeCode = (organisationCode: string) => {
  if (!organisationCode) return ''

  const isKielikeskusOrAvoin = ['H906', 'H930'].includes(organisationCode)
  if (isKielikeskusOrAvoin) {
    return organisationCode
  }

  if (organisationCode.length < 7) return ''
  const doctoral = organisationCode[0] === 'T'
  if (doctoral) {
    return organisationCode
  }

  const [start, end] = organisationCode.split('-')
  if (end && end.length < 3) return ''
  if (start.length < 2) return ''
  const masters = end[0] === 'M'
  const code = `${masters ? 'M' : 'K'}H${start.substr(0, 2)}_${end.substr(-3)}`
  return code
}

// Year starting month
const MONTH = 8

export const startOfStudyYear = (date: Date|string|number) => {
  let d = null
  if (typeof date !== 'object') {
    d = new Date(date)
  } else {
    d = date
  }

  const year = d.getFullYear() - (d.getMonth() + 1 < MONTH ? 1 : 0)

  return new Date(`${year}-${MONTH}-01`)
}
