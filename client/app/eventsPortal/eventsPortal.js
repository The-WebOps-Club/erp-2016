'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventsPortalCores', {
        url: '/eventsPortal/cores',
        templateUrl: 'app/eventsPortal/cores/cores.html',
        controller: 'EventsPortalCoresCtrl'
      })
      .state('eventsPortalDashboard', {
        url: '/eventsPortal/dashboard',
        templateUrl: 'app/eventsPortal/dashboard/dashboard.html',
        controller: 'EventsPortalDashboardCtrl'
      })
      .state('event', {
        url: '/eventsPortal/event/:id',
        templateUrl: 'app/eventsPortal/event/event.html',
        controller: 'EventsPortalEventCtrl'
      })
      .state('allEvents', {
        url: '/eventsPortal/allEvents',
        templateUrl: 'app/eventsPortal/allEvents/allEvents.html',
        controller: 'EventsPortalAllEventsCtrl'
      })
      .state('eventList', {
        url: '/eventsPortal/eventList',
        templateUrl: 'app/eventsPortal/eventList/eventList.html',
        controller: 'EventsPortalEventListCtrl'
      });
  });