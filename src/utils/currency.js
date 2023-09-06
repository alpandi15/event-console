export const formatIDR = (money) => {
  return new Intl.NumberFormat('en-ID',
    { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money)
    .replace(/[,]/gi, '.')
}

export const currentcyKiloFormat = (money) => {
  if (money >= 1000) {
    return new Intl.NumberFormat('en-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money / 1000)
      .replace(/[,]/gi, '.')
      .replace(/[IDR]/gi, '')
      .concat('K')
  }
  return money
}

export const numberFormatIDR = (money) => {
  return new Intl.NumberFormat('en-ID',
    { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money)
    .replace(/[,]/gi, '.')
    .replace(/[IDR]/gi, '')
}

export const local = (int) => {
  if (typeof int === 'undefined') return 0;
  let output = ''
  if (int < 0) {
    output = '-' + parseInt(int)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  } else {
    output = parseInt(int)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  return output
}
