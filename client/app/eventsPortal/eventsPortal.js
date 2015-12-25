'use strict';

angular.module('erp2015App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('eventsPortalCores', {
        url: '/eventsPortal/cores',
        templateUrl: 'app/eventsPortal/cores/cores.html',
        controller: 'EventsPortalCoresCtrl',
        access: {
          allow: ['superCoord', 'core', 'admin']
        }                
      })
      .state('eventsPortalDashboard', {
        url: '/eventsPortal/dashboard',
        templateUrl: 'app/eventsPortal/dashboard/dashboard.html',
        controller: 'EventsPortalDashboardCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('event', {
        url: '/eventsPortal/event/:id',
        templateUrl: 'app/eventsPortal/event/event.html',
        controller: 'EventsPortalEventCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('allEvents', {
        url: '/eventsPortal/allEvents',
        templateUrl: 'app/eventsPortal/allEvents/allEvents.html',
        controller: 'EventsPortalAllEventsCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('eventList', {
        url: '/eventsPortal/eventList',
        templateUrl: 'app/eventsPortal/eventList/eventList.html',
        controller: 'EventsPortalEventListCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('eventMarqueeNotifications', {
        url: '/eventsPortal/eventMarqueeNotifications/:eventId',
        templateUrl: 'app/eventsPortal/eventMarqueeNotifications/eventMarqueeNotifications.html',
        controller: 'EventMarqueeNotificationsCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('registrations', {
        url: '/eventsPortal/registrations/:eventId',
        templateUrl: 'app/eventsPortal/registrations/registrations.html',
        controller: 'RegistrationsCtrl',
        access: {
          allow: ['coord', 'superCoord', 'core', 'admin']
        }                
      })
      .state('shaastraFellowship', {
        url: '/eventsPortal/shaastra-fellowship',
        templateUrl: 'app/eventsPortal/sis-registrations/sis-registrations.html',
        controller: 'SisRegistrationsCtrl',
        access: {
          allow: ['superCoord', 'core', 'admin']
        }                
      });           
  });