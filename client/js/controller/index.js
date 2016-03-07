"use strict";

var Firebase = require("firebase");

function controller($scope, Restangular) {
  Restangular.setBaseUrl("/api");
  var medications = Restangular.all("Medications");

  var firebaseRef = new Firebase("https://the-medicine-task.firebaseio.com");
  var firebaseChild;

  var vm = this;
  vm.med = {
    name: "",
    count: 0,
    show: false
  };
  vm.status = {
    show: false,
    isError: false,
    title: "",
    message: ""
  };

  function updateMedicationCount(snapshot) {
    if (snapshot.exists()) {
      vm.med.count = snapshot.val();
    }
    $scope.$apply();
  }

  function restError(err) {
    vm.status.isError = true;
    vm.status.title = "Error";
    vm.status.message = err.data.error.message;
    vm.status.show = true;
    vm.med.show = false;
  }

  function add() {
    medications.post({Name: vm.med.name})
    .then(function () {
      vm.status.isError = false;
      vm.status.message = "Added medication: " + vm.med.name;
      vm.status.title = "Success";
      vm.status.show = true;
      vm.med.show = false;
    })
    .catch(restError);
  }

  function get() {
    medications.one(vm.med.name).get()
    .then(function (medication) {
      var name = medication.Name;
      vm.med.show = true;
      vm.status.show = false;
      if (firebaseChild) {
        firebaseChild.off("value", updateMedicationCount);
      }
      firebaseChild = firebaseRef.child(name);
      firebaseChild.on("value", updateMedicationCount);
    })
    .catch(restError);
  }

  vm.add = add;
  vm.get = get;
}

var app = require("angular").module("theMedicineTask");

app.controller("controller", ["$scope", "Restangular", controller]);