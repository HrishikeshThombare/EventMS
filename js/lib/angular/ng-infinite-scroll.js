/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;

mod = angular.module('infinite-scroll', []);

mod.directive('infiniteScroll', [
  '$rootScope', '$window', '$timeout', 'deviceDetector', function($rootScope, $window, $timeout, deviceDetector) {
    return {
      link: function(scope, elem, attrs) {
        var checkWhenEnabled, handler, scrollDistance, scrollEnabled, initialCall;
		var currentWindow = $window;
		if(angular.isDefined(attrs.infiniteScrollElement) && attrs.infiniteScrollElement !== 'body') {
			currentWindow = '#'+attrs.infiniteScrollElement;
		}
        scrollDistance = 0;
		if (deviceDetector.isDesktop() === true) {
			if (attrs.infiniteScrollDistance != null) {
			  scope.$watch(attrs.infiniteScrollDistance, function(value) {
				return scrollDistance = parseInt(value, 10);
			  });
			}
		} else {
			if (attrs.mobileInfiniteScrollDistance != null) {
			  scope.$watch(attrs.mobileInfiniteScrollDistance, function(value) {
				return scrollDistance = parseInt(value, 10);
			  });
			}
		}
		
        scrollEnabled = true;
        checkWhenEnabled = false;
        if (attrs.infiniteScrollDisabled != null) {
          scope.$watch(attrs.infiniteScrollDisabled, function(value) {
            scrollEnabled = !value;
            if (scrollEnabled && checkWhenEnabled) {
              checkWhenEnabled = false;
              return handler();
            }
          });
        }
		initialCall = false;
		if (attrs.initialCall != null) {
			initialCall = true;
		}
        handler = function() {
          var elementBottom, remaining, shouldScroll, windowBottom;
          windowBottom = angular.element(currentWindow).height() + angular.element(currentWindow).scrollTop();
          elementBottom = elem.offset().top + elem.height();
          remaining = elementBottom - windowBottom;
          shouldScroll = remaining <= scrollDistance;
          if (shouldScroll && scrollEnabled) {
			if (initialCall && $rootScope.initial_call) {
				return;
			}
			$timeout(function() {
				if ($rootScope.$$phase) {
				  return scope.$eval(attrs.infiniteScroll);
				} else {
				  return scope.$apply(attrs.infiniteScroll);
				}
			}, 100);
          } else if (shouldScroll) {
            return checkWhenEnabled = true;
          }
        };
        scope.$on('$destroy', function() {
          return angular.element(currentWindow).off('scroll', handler);
        });
        return $timeout((function() {
		  angular.element(currentWindow).on('scroll', handler);
          if (attrs.infiniteScrollImmediateCheck) {
            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }), 0);
      }
    };
  }
]);
