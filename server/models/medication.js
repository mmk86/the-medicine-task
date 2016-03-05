module.exports = function(Medication) {
  Medication.disableRemoteMethod("createChangeStream", true);
  Medication.disableRemoteMethod("updateAll", true);
  Medication.disableRemoteMethod("find", true);
  Medication.disableRemoteMethod("findAll", true);
  Medication.disableRemoteMethod("upsert", true);
  Medication.disableRemoteMethod("updateAttributes", false);
  Medication.disableRemoteMethod("exists", true);
  Medication.disableRemoteMethod("count", true);
  Medication.disableRemoteMethod("findOne", true);
  Medication.disableRemoteMethod("deleteById", true);
};
