const geoLocationAddress = 'Киевская, 8a'
const geoLocationDistrict = 'Софиеская борщаговка'

export const Contacts = {
  geoLocationAddress,
  geoLocationDistrict,
  geoLocationUrl: `http://maps.google.com/?q=${geoLocationDistrict}, ${geoLocationAddress}`,
  mail: 'st.ivan.al@gmail.com',
  socials: [
    {
      icon: 'facebook',
      url: decodeURIComponent('https://facebook.com/vagbanda.com.ua/')
    },
    {
      icon: 'instagram',
      url: decodeURIComponent('https://instagram.com/vagbanda_kiev/')
    }
  ]
}
