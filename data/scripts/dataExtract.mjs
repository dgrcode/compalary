import fs from 'fs'
import path from 'path'
import jsdom from 'jsdom'
import fetch from './fetch.mjs'

const targetUrl = 'https://www.numbeo.com/cost-of-living/rankings_current.jsp'
const columnMapping = {
  Rank: 'rank',
  City: 'name',
  'Cost of Living Index': 'costOfLiving',
  'Rent Index': 'rent',
  'Cost of Living Plus Rent Index': 'costOfLivingPlusRent',
  'Groceries Index': 'groceries',
  'Restaurant Price Index': 'restaurantPrice',
  'Local Purchasing Power Index': 'purchasingPower',
}

const sortByProperty = property => (a, b) => {
  if (a[property] < b[property]) return -1
  if (a[property] > b[property]) return 1
  return 0
}

const main = async () => {
  console.log('👉 Running the extraction script')
  console.log(`👉 Fetching from ${targetUrl}`)
  let response
  try {
    response = await fetch(targetUrl)
  } catch (error) {
    console.error(
      `\n❌ Fetching the data failed with status code ${error.statusCode}`
    )
    return
  }

  console.log('✅ Received response')

  const dom = new jsdom.JSDOM(response)
  console.log('👉 Trying to get the table with id: "t2"')
  const table = dom.window.document.getElementById('t2')
  if (table === null) {
    console.log(`\n❌ Couldn't find that table`)
    return
  }

  console.log('✅ Found the table')
  console.log('\n🔎 Table headers:')
  const headerElements = table.querySelectorAll('th')
  const unknownColumns = []
  const orderedColumnVariableNames = []
  headerElements.forEach(element => {
    const columnLabel = element.textContent
    const columnVariable = columnMapping[columnLabel]
    const isColumnKnown = columnVariable !== undefined
    console.log(
      ` - ${element.textContent} [${isColumnKnown ? columnVariable : '❌'}]`
    )

    if (!isColumnKnown) {
      unknownColumns.push(columnLabel)
    }
    orderedColumnVariableNames.push(columnVariable)
  })
  if (unknownColumns.length > 0) {
    console.log(
      '\n❌ There are unkown column labels. Please, reveiew the following columns and update columnMapping at dataExtract.mjs'
    )
    console.log('\nUnkown columns:')
    unknownColumns.forEach(label => console.log(` - ${label}`))
    return
  }
  const bodyElements = table.querySelectorAll('tbody tr')
  console.log(`\nBody with ${bodyElements.length} cities`)

  console.log('\n👉 Trying to parse the table')
  /**
   * Expected city shape
   * {
   *  "city": "Albany",
   *  "country": "United States",
   *  "indices": {
   *    "costOfLiving": 75.44,
   *    "costOfLivingPlusRent": 55.14,
   *    "groceries": 69.52,
   *    "purchasingPower": 105.08,
   *    "rent": 33,
   *    "restaurantPrice": 80.36
   *  },
   *  "state": "NY"
   * }
   */
  const citiesArray = []
  const citiesWithProblems = new Set()
  const parsingCitiesErrors = []
  bodyElements.forEach(cityRow => {
    const cells = cityRow.querySelectorAll('td')
    const cityData = { indices: {} }
    let currentCity

    cells.forEach((cell, idx) => {
      const prop = orderedColumnVariableNames[idx]
      if (prop === 'rank') {
        return
      }
      if (prop === 'name') {
        const cityFullName = cell.textContent
        currentCity = cityFullName
        const [cityName, ...cityStateAndCountry] = cityFullName
          .split(',')
          .map(str => str.trim())
        cityData.name = cityName
        cityData.country = cityStateAndCountry.pop()
        if (cityStateAndCountry.length > 0) {
          cityData.state = cityStateAndCountry.pop()
        }
        return
      }
      const numericIndex = Number(cell.textContent)
      if (isNaN(numericIndex)) {
        parsingCitiesErrors.push({
          name: currentCity,
          error: `Can't convert ${prop} to number`,
        })
        citiesWithProblems.add(currentCity)
        console.log(`  -> ❌ Can't convert ${prop} to number`)
      }
      cityData.indices[prop] = numericIndex
    })
    citiesArray.push(cityData)
  })

  if (citiesWithProblems.size > 0) {
    console.log('⚠️  Got some errors while parsing cities')
    parsingCitiesErrors.forEach(({ name, error }) => {
      console.log(` - ${name}: ${error}`)
    })
  } else {
    console.log(`✅ Parsed successfully`)
  }

  console.log('👉 Saving the data in files')
  try {
    fs.writeFileSync(
      path.resolve('./citiesData_readable.json'),
      JSON.stringify(citiesArray.sort(sortByProperty('city')), null, 2)
    )

    fs.writeFileSync(
      path.resolve('./citiesData.json'),
      JSON.stringify(citiesArray.sort(sortByProperty('city')))
    )
    console.log(`✅ Success!! 💪`)
  } catch (error) {
    console.log(`\n❌ There was an error saving the data`)
    console.log(error)
  }
}

main()
