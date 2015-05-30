describe('LeagueController', function () {
  var $scope, $rootScope, $location, $httpBackend, createController, League, $controller, $state;

  beforeEach(module('app'));
  beforeEach(inject(function ($injector){
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    League = $injector.get('League');
    $scope = $rootScope.$new();
    $state = $injector.get('$state');
    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('leagueController', {
        $scope: $scope,
        $location: $location,
        League: League
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a getLeagues method', function() {
    expect($scope.getLeagues).to.be.a('function');
  });

  it('should have a leagues object', function() {
    expect($scope.leagues).to.be.a('object');
  });

  it('should have a newLeague method', function() {
    expect($scope.newLeague).to.be.a('funciton');
  });

  it('should GET request to /user/leagues when getLeagues is called', function() {
    var leagues = [{}, {}];
    $httpBackend.expect('GET', '/user/leagues').respond(leagues);

    $scope.getLeagues();

    $httpBackend.flush();
  });

  it('should GET request to /user/leagues when Leagues factory is called through getLeagues scope function', function() {
    var leagues = [{}, {}];
    $httpBackend.expect('GET', '/user/leagues').respond(leagues);

    League.getLeagues();

    $httpBackend.flush();
  });

  it('should newLeague method go to the angular route leagues.new', function() {
    var leagues = [{}, {}];
    $httpBacked.expect('GET', 'app/leagues/new/new.html').respond(leagues);

    $scope.newLeague();

    $httpBackend.flush();
  });

});