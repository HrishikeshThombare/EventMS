/**
 * @license MIT http://jseppi.mit-license.org/license.html
 * reference http://angular-js.in/angular-dropdown/
*/
(function(window, angular, undefined) {
'use strict';

var dd = angular.module('ngDropdowns', []);

dd.run(['$templateCache', function ($templateCache) {
  $templateCache.put('ngDropdowns/template/dropdownSelect.html', [
    '<div class="wrap-dd-select">',
      '<span class="selected {{labelClass}}" ng-if="dropdownModel[labelField]">{{dropdownModel[labelField]}}</span>',
	  '<span class="selected {{labelClass}}" ng-if="!dropdownModel[labelField]">{{placeholder}}</span>',	  
      '<ul class="dropdown">',
        '<li ng-repeat="item in dropdownSelect"',
        ' class="dropdown-item"',
        ' dropdown-select-item="item"',
        ' dropdown-item-label="labelField"',
        ' inner-lable-class="{{labelClass}}">',
        '</li>',
      '</ul>',
    '</div>'
  ].join(''));

  $templateCache.put('ngDropdowns/template/dropdownSelectItem.html', [
    '<li ng-click="selectItem()">',
      '<span  class="dropdown-item {{innerLableClass}}">',
        '{{dropdownSelectItem[dropdownItemLabel]}}',
      '</span>',
    '</li>'
  ].join(''));
}]);

dd.directive('dropdownSelect', ['DropdownService',
  function (DropdownService) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        dropdownSelect: '=',
        dropdownModel: '=',
        dropdownItemLabel: '@',
        dropdownOnchange: '&',
		    dropdownPlaceholder: '@',
        labelClass: '@',
      },

      controller: ['$scope', '$element', function ($scope, $element) {
        $scope.labelField = $scope.dropdownItemLabel || 'text';
		    $scope.placeholder = $scope.dropdownPlaceholder;
        DropdownService.register($element);
        this.select = function (selected) {
          if (selected !== $scope.dropdownModel) {
            angular.copy(selected, $scope.dropdownModel);
          }
          $scope.dropdownOnchange({
            selected: selected
          });
        };

        $element.bind('click', function (event) {
          event.stopPropagation();
          DropdownService.toggleActive($element);
        });
        
        $scope.$on('$destroy', function () {
          DropdownService.unregister($element);
        });
      }],
      templateUrl: 'ngDropdowns/template/dropdownSelect.html' 
    };
  }
]);

dd.directive('dropdownSelectItem', [
  function () {
    return {
      require: '^dropdownSelect',
      replace: true,
      scope: {
        dropdownItemLabel: '=',
        dropdownSelectItem: '=',
        innerLableClass: '@',
      },
      link: function (scope, element, attrs, dropdownSelectCtrl) {
        if(attrs.innerLableClass !== undefined) {
            scope.innerLableClass = attrs.innerLableClass;
        }
        scope.selectItem = function () {
          dropdownSelectCtrl.select(scope.dropdownSelectItem);
        };
      },
      templateUrl: 'ngDropdowns/template/dropdownSelectItem.html' 
    };
  }
]);
dd.factory('DropdownService', ['$document',
  function ($document) {
    var body = $document.find('body'),
        service = {},
        _dropdowns = [];

    body.bind('click', function () {
      angular.forEach(_dropdowns, function (el) {
        el.removeClass('active');
      });
    });

    service.register = function (ddEl) {
      _dropdowns.push(ddEl);
    };

    service.unregister = function (ddEl) {
      var index;
      index = _dropdowns.indexOf(ddEl);
      if (index > -1) {
        _dropdowns.splice(index, 1);
      }
    };

    service.toggleActive = function (ddEl) {
      angular.forEach(_dropdowns, function (el) {
        if (el !== ddEl) {
          el.removeClass('active');
        }
      });

      ddEl.toggleClass('active');
    };

    return service;
  }
]);
})(window, window.angular);
