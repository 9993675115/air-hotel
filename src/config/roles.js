const allRoles = {
  Admin: ['manageUser','mangeCategory','addHotelByAdmin'],
  User: ['manageBrand'],
  Vendor:['mangeVendorHotel','addHotelByVendor']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};
