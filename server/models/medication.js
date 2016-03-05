module.exports = function(Medication) {
  var isStatic = true;
  Medication.disableRemoteMethod("createChangeStream", isStatic);
  Medication.disableRemoteMethod("updateAll", isStatic);
  Medication.disableRemoteMethod("find", isStatic);
  Medication.disableRemoteMethod("findAll", isStatic);
  Medication.disableRemoteMethod("upsert", isStatic);
  Medication.disableRemoteMethod("updateAttributes", isStatic);
  Medication.disableRemoteMethod("exists", isStatic);
  Medication.disableRemoteMethod("count", isStatic);
  Medication.disableRemoteMethod("findOne", isStatic);
  Medication.disableRemoteMethod("deleteById", isStatic);

};
