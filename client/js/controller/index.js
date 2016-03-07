"use strict";

var Firebase = require("firebase");

function controller($scope, Restangular) {
  Restangular.setBaseUrl("/api");
  var medications = Restangular.all("Medications");

  var firebaseRef = new Firebase("https://the-medicine-task.firebaseio.com");
  var firebaseChild;

  var vm = this;
  vm.name = "";
  vm.count = 0;
  vm.showResult = false;
  vm.result = "";
  vm.showFetchCount = false;

  function updateMedicationCount(snapshot) {
    if (snapshot.exists()) {
      vm.count = snapshot.val();
    }
    $scope.$apply();
  }

  function restError(err) {
    vm.result = "Error: " + err.data.error.message;
    vm.showResult = true;
    vm.showFetchCount = false;
  }

  function add() {
    medications.post({Name: vm.name})
    .then(function () {
      vm.result = "Successfully added medication: " + vm.name;
      vm.showResult = true;
      vm.showFetchCount = false;
    })
    .catch(restError);
  }

  function get() {
    medications.one(vm.name).get()
    .then(function (medication) {
      var name = medication.Name;
      vm.result = "Fetched: " + name;
      vm.showResult = true;
      vm.showFetchCount = true;
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