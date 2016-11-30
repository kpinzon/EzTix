var app = angular.module("myApp", ["ui.router"]);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});


app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home')

    $stateProvider

        .state('home', {
            name: 'home',
            url: '/home',
            templateUrl: './views/home.html'
           
        })

        .state('venue', {
            name: 'venue',
            url: '/venue',
            templateUrl: './views/venue.html'
           
        })
        .state('event', {
            name: 'event',
            url: '/event',
            templateUrl: './views/event.html'
           
        })
        .state('performer', {
            name: 'performer',
            url: '/performer',
            templateUrl: './views/performer.html'
           
        })
        .state('cart', {
            name: 'cart',
            url: '/cart',
            templateUrl: './views/cart.html'
           
        })
        .state('ticketConfirmation', {
            name: 'ticketConfirmation',
            url: '/ticketConfirmation',
            templateUrl: './views/ticketConfirmation.html'
           
        })
        .state('myTickets', {
            name: 'myTickets',
            url: '/myTickets',
            templateUrl: './views/myTickets.html'
           
        })
        .state('sellHome', {
            name: 'sellHome',
            url: '/sellHome',
            templateUrl: './views/sellHome.html'
           
        })
        .state('sellTicket', {
            name: 'sellTicket',
            url: '/sellTicket',
            templateUrl: './views/sellTicket.html'
           
        })
        .state('sellConfirmation', {
            name: 'sellConfirmation',
            url: '/sellConfirmation',
            templateUrl: './views/sellConfirmation.html'
           
        })





});