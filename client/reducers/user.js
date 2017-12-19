import LOGGED_IN from '../actions'

const init = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: 5555559292,
  company: 'Boss Fight Dev',
  companyPicture: 'http://res.cloudinary.com/bossfight/image/upload/v1513200109/ybknnlqfa0pmwaztokcc.jpg',
  email: 'wzrdjim@gmail.com',
  openhouses: []
}


export default (state = init, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return Object.assign(state, action.payload)
    default:
      return state;
  }
}