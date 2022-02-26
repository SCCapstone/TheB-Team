function calculateRoute(platform) {
    var router = platform.getEnterpriseRoutingService(),
      parameters = {
        waypoint0: '41.9798,-87.8801',
        waypoint1: '41.9043,-87.9216',
        mode: 'fastest;truck'};
  
    router.calculateRoute(parameters,
      function (result) {
        alert(result);
      }, function (error) {
        alert(error);
      });
  }