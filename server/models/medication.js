var Firebase = require("firebase");

module.exports = function(Medication) {
  "use strict";

  const firebaseRef = new Firebase("https://the-medicine-task.firebaseio.com");
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

  Medication.afterRemote("findById", function (ctx, medication, next) {
    if (ctx.result) {
      const medicationRef = firebaseRef.child(ctx.result.Name);
      medicationRef.transaction(function (current) {
        if (current === null) {
          return 1;
        }
        return current + 1;
      });
      next();
    } else {
      const name = ctx.req.params.id;
      var err = new Error(`The requested medication: "${name}" could not be found.`);
      err.status = 404;
      next(err);
    }
  });

  Medication.afterRemoteError("create", function (ctx, next) {
    const name = ctx.req.body.Name;
    Medication.exists(name, function(err, exists) {
      if (exists) {
        next(new Error(`The medication "${name}" already exists`));
      } else {
        next();
      }
    });

  });

};
