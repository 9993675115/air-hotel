const allRoles = {
  Admin: ['manageUser','mangeCategory',],
  User: ['manageBrand'],
  Vendor:['mangeVendorHotel']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};
