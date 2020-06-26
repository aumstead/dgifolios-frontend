function calcDivs(months) {
  let bank = 50000
  let year = 2014

  for (let i = 0; i < months; i++) {
    if (i % 12 === 0) {
      year ++
    }

    let monthlyDivs = (bank * .035) / 12
    console.log(i, year, monthlyDivs)

    bank += 1000
    bank += monthlyDivs

  }
}

calcDivs(60)