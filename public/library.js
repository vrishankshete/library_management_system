"use strict";

var libraryApp = angular.module('LibraryApp', []);

libraryApp.controller('LibraryController', function($scope, $http) {
  var getAllBooks = function() {
    $http.get('/books').then(function(response) {
      $scope.books = response.data;
    }, function(error){
      console.log("Error getting data from server.");
    });
  };

  $scope.addBook = function() {
    console.log($scope.tempBook);
    if($scope.tempBook.availability === "" || $scope.tempBook.availability === undefined){
      $scope.tempBook.availability = true;
    }
    $http.post('/books', $scope.tempBook).then(function(response) {
      console.log(response);
      getAllBooks();
    }, function(error){
      console.log("Error POSTing data to server.");
    });
  };

  $scope.remove = function(id) {
  console.log(id);
  $http.delete('/books/' + id).then(function(response) {
    getAllBooks();
  }, function(error){
      console.log("Error removing data from server.");
    });
};

  $scope.makeUnavailable = function(id){
    $http.put('/books/' + id, {"availability": false}).then(function(response) {
      getAllBooks();
    }, function(error){
      console.log("Error PUTing data to server.");
    });
  };

  $scope.makeAvailable = function(id){
    $http.put('/books/' + id, {"availability": true}).then(function(response) {
      getAllBooks();
    }, function(error){
      console.log("Error PUTing data to server.");
    });
  };

  getAllBooks();
});﻿