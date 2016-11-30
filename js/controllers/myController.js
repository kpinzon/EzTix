app.controller("myController", function ($scope, $http, $q) {

  $scope.showPage = false;

  $q.all([getEvents, getPerformers, getVenues]).then(function () {


    $scope.showPage = true;

  }); /*end q.all*/

  $scope.currentVenueEvents = [];
  $scope.currentPerformerEvents = [];


  //Getting current Performer Selected on Dropdown
  $scope.currentPerformer = null;

  $scope.selectPerformer = function (performer) {
    $scope.currentPerformer = null;
    $scope.currentPerformerEvents = [];
    $scope.currentPerformer = performer;

    for (var i = 0; i < $scope.currentPerformer.events.length; i++) {
      for (var j = 0; j < $scope.eventData.length; j++) {
        if ($scope.currentPerformer.events[i] == $scope.eventData[j].id) {
          $scope.currentPerformerEvents.push($scope.eventData[j])
        }
      }
    }

  }

  //Getting current Venue selected on Dropdown
  $scope.currentVenue = null;
  $scope.selectVenue = function (venue) {
    $scope.currentVenue = null;
    $scope.currentVenueEvents = [];
    $scope.currentVenue = venue;
    //setting selected venues events into array to insert for all events at a venue
    for (var i = 0; i < $scope.currentVenue.events.length; i++) {
      for (var j = 0; j < $scope.eventData.length; j++) {
        if ($scope.currentVenue.events[i] == $scope.eventData[j].id) {
          $scope.currentVenueEvents.push($scope.eventData[j]);
        }
      }

    }
  }



  /*Need 3 buckets: 
  1.) Tickets in event
  2.) Tickets in cart
  3.) Tickets that were purchased
  */

  /*bucket 1: tickets in event */
  $scope.ticketsInEvent = [];
  /*Bucket 2: Tickets in cart*/
  $scope.ticketsInCart = [];
  /*bucket 3: Tickets Purchased*/
  $scope.ticketsOwned = [];

  $scope.hasPurchasedTickets = true;



  /*Function to go to tix for event when selecting an event from the venues list of events */
  $scope.currentEvent = {};



  $scope.selectEvent = function (event) {
    $scope.currentEvent = event;;
    $scope.ticketsInEvent = $scope.currentEvent.tickets;
  }


  /*Add ticket to cart when you click button associated with each ticket, on click set value of show buy button to false to remove the buy button*/
  $scope.addTicketToCartBtn = function (ticket) {
    if (ticket.showButton == true) {
      ticket.showButton = false;
    }
    $scope.ticketsInCart.push(ticket)
  }

  $scope.indexOfSelectedTicket = null;

  $scope.removeTicketFromCartBtn = function (ticket) {
    if (ticket.showButton == false) {
      ticket.showButton = true;
    }
    /*Need to get index of current ticket on click*/
    for (var i = 0; i < $scope.ticketsInCart.length; i++) {
      if ($scope.ticketsInCart[i].id == ticket.id && $scope.ticketsInCart[i].eventId == ticket.eventId) {
        $scope.indexOfSelectedTicket = i;
      }
      else {
        $scope.indexOfSelectedTicket = null;
      }
    }
    /*removing ticket*/
    $scope.ticketsInCart.splice($scope.indexOfSelectedTicket, 1);
  }

  /*When clicking cart:
  get price of tickets in currently in cart before showing the cart
  reset Tickets Purchased In This Order*/
  $scope.sumOfTicketsInCart = null;
  $scope.clickCartFromEventPage = function () {
    for (var i = 0; i < $scope.ticketsInCart.length; i++) {
      $scope.sumOfTicketsInCart += $scope.ticketsInCart[i].price;
    }
    $scope.ticketsPurchasedThisOrder = [];
  }

  $scope.ticketsPurchasedThisOrder = [];
  /*When Purchase Complete: 
  Function to add tickets to Owned Tickets and also to Tickets Purchased This Order*/
  $scope.clickPurchaseBtn = function () {
    for (var i = 0; i < $scope.ticketsInCart.length; i++) {
      $scope.ticketsPurchasedThisOrder.push($scope.ticketsInCart[i]);
      $scope.ticketsOwned.push($scope.ticketsInCart[i]);
    }

    if ($scope.ticketsOwned.length > 0) {
      $scope.hasPurchasedTickets = false;
    }
    /*Removing tickets from cart*/
    $scope.ticketsInCart = [];
    /*Remove sum of tickets in Cart*/
    $scope.sumOfTicketsInCart = null;

    /*Removing tickets from event data*/
    $scope.indexOfTicketInEventData = null;
    for (var i = 0; i < $scope.ticketsPurchasedThisOrder.length; i++) {
      for (var j = 0; j < $scope.eventData.length; j++) {
        for (var k = 0; k < $scope.eventData[j].tickets.length; k++) {
          if ($scope.ticketsPurchasedThisOrder[i].id == $scope.eventData[j].tickets[k].id
            && $scope.ticketsPurchasedThisOrder[i].eventId == $scope.eventData[j].tickets[k].eventId) 
            { $scope.eventData[j].tickets.splice(k, 1);}
          }
        }
      }
    } /*end clickPurchaseBtn fxn*/

  $scope.showPerformerNameInSellBtn = false;
  $scope.performerSelectedSell = null;
  $scope.performerSelectedEvents = [];
  /*Fxn to when clicking performer when adding a ticket to sell*/

  $scope.selectPerformerSell = function(performer) {
    $scope.performerSelectedSell = null;
    $scope.showPerformerNameInSellBtn = true;
    $scope.performerSelectedEvents = [];

    $scope.performerSelectedSell = performer; 
    
    for (var i=0; i < $scope.performerSelectedSell.events.length; i++){
      for (var j=0; j < $scope.eventData.length; j++) {
        if ($scope.performerSelectedSell.events[i] == $scope.eventData[j].id) {
          $scope.performerSelectedEvents.push($scope.eventData[j]);
        }
      }
    }
  }
  $scope.selectedEventSellDropdown = null;
  $scope.showEventNameInSellBtn = false;

 
  $scope.idOfSelectedEventForSell = null;
  

  $scope.selectEventForSell = function(event) {
    $scope.idOfSelectedEventForSell = null;
    $scope.idOfSelectedEventForSell = event.id;
    $scope.showEventNameInSellBtn = true;
    $scope.selectedEventSellDropdown = event.name;
  }

  /* Variables to store the inputs for tickets to sell - ng-models */
  $scope.sellTicketInfo = {}
  $scope.sellTicketInfo.price = null;
  $scope.sellTicketInfo.seatNumber = null;
  $scope.sellTicketInfo.row = null;
  $scope.sellTicketInfo.section = null;

  /* tickets that are listed for sale*/
  $scope.myTicketsForSale = []
  $scope.ticketsSoldThisOrder = [];

  /*Fxn to add ticket to the event to make it available to be purchased*/
  $scope.ticketID = 1000;

  $scope.listTicketForSale = function () {   
    $scope.ticketsSoldThisOrder = [];
    $scope.tempTicket = {
      id: $scope.ticketID+=1, 
      date: $scope.eventData[$scope.idOfSelectedEventForSell].date,
      time: $scope.eventData[$scope.idOfSelectedEventForSell].time,
      price: $scope.sellTicketInfo.price,
      seatNumber: $scope.sellTicketInfo.seatNumber,
      row: $scope.sellTicketInfo.row,
      section: $scope.sellTicketInfo.section,
      eventId: $scope.idOfSelectedEventForSell,
      venueId: $scope.eventData[$scope.idOfSelectedEventForSell].venue,
      showButton: true
    };
    $scope.eventData[$scope.idOfSelectedEventForSell].tickets.push($scope.tempTicket);
    $scope.myTicketsForSale.push($scope.tempTicket);
    $scope.ticketsSoldThisOrder.push($scope.tempTicket);
    $scope.tempTicket = {};

    $scope.sellTicketInfo.price = null;
    $scope.sellTicketInfo.seatNumber = null;
    $scope.sellTicketInfo.row = null;
    $scope.sellTicketInfo.section = null;
    $scope.showPerformerNameInSellBtn = false;
    $scope.showEventNameInSellBtn = false;
  }

  /*Setting up my models for editing*/
  $scope.updateListedTicket = {};
  
 
  

  /*When clicking edit on MyListed Ticket, slide down the edit form, add current values to form*/
  $scope.slideDownTicketEditForm = function(ticket) {
    $('.editListedTicket').slideUp(0);
    $("#" + ticket.id).slideDown('slow');
    $scope.updateListedTicket.row = angular.copy(ticket.row);
    $scope.updateListedTicket.price = angular.copy(ticket.price);
    $scope.updateListedTicket.section = angular.copy(ticket.section);
    $scope.updateListedTicket.seatNumber = angular.copy(ticket.seatNumber);
  }

  /*On Click, update Ticket Listed For Sale*/
  $scope.updateListedTicketOnClick = function(ticket) {
    ticket.row = $scope.updateListedTicket.row;
    ticket.price = $scope.updateListedTicket.price;
    ticket.section = $scope.updateListedTicket.section;
    ticket.seatNumber = $scope.updateListedTicket.seatNumber;
    $("#" + ticket.id).slideUp('slow');
  }

  /*On click delete ticket from my tickets and event*/
  $scope.deleteTicketFromMyTickets = function(ticket) {
    $scope.indexOfTicketInMyTickets = $scope.myTicketsForSale.indexOf(ticket);
    for (var i=0; i <  $scope.eventData[ticket.eventId].tickets.length; i++)
      if (ticket.id == $scope.eventData[ticket.eventId].tickets[i].id) {
        $scope.indexOfTicketInData = $scope.eventData[ticket.eventId].tickets.indexOf(ticket);
        $scope.eventData[ticket.eventId].tickets.splice($scope.indexOfTicketInData,1);
      }


    $scope.myTicketsForSale.splice($scope.indexOfTicketInMyTickets, 1);
  }

  var getEvents = $http.get("http://localhost:8080/js/data/events.json")
    .then(function (response) {
      $scope.eventData = response.data;

    });

  var getPerformers = $http.get("http://localhost:8080/js/data/performers.json")
    .then(function (response) {
      $scope.performerData = response.data;

    });

  var getVenues = $http.get("http://localhost:8080/js/data/venues.json")
    .then(function (response) {
      $scope.venueData = response.data;
    });
});