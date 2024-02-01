const express = require('express');
const authRoute = require('./auth.route');
const commonRoute = require('./common.route')
const supportRoute = require('./support.route')
const supportDetailsRoute = require('./supportDetails.route')
const bookingRoute = require('./booking.route')
const bookingDetailsRoute = require('./bookingDetails.route')
const roomsRoute = require('./rooms.route')
const roomTypesRoute = require('./roomTypes.route')
const paymentRoute = require('./payment.route')
const addressRoute = require('./address.route')
const ratingRoute = require('./rating.route')
const hotelRoute = require('./hotel.route')
const categoryRoute = require('./category.route')
const subscriptionRoute = require('./subscription.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/fetch',
    route: commonRoute
  },  {
    path: '/support',
    route: supportRoute
  },
  ,  {
    path: '/supportDetails',
    route: supportDetailsRoute
  },
  ,  {
    path: '/booking',
    route: bookingRoute
  },
  ,  {
    path: '/bookingDetails',
    route: bookingDetailsRoute
  },
  ,  {
    path: '/rooms',
    route: roomsRoute
  },
  ,  {
    path: '/roomTypes',
    route: roomTypesRoute
  },
  ,  {
    path: '/payment',
    route: paymentRoute
  },
  ,  {
    path: '/address',
    route: addressRoute
  },
  {
    path: '/rating',
    route: ratingRoute
  },
  {
    path: '/hotel',
    route: hotelRoute
  },{
    path: '/category',
    route: categoryRoute
  },{
    path: '/subscription',
    route: subscriptionRoute
  },
  
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
