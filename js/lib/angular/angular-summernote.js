/*
  angular-summernote v0.3.0
  Copyright 2014 Jeonghoon Byun
  License: MIT
 */
angular.module("summernote", []).controller("SummernoteController", ["$scope", "$attrs", function($scope, $attrs) {
    "use strict";
    var currentElement, summernoteConfig = $scope.summernoteConfig || {};
    if (angular.isDefined($attrs.height) && (summernoteConfig.height = $attrs.height), angular.isDefined($attrs.focus) && (summernoteConfig.focus = !0), angular.isDefined($attrs.airmode) && (summernoteConfig.airMode = !0), angular.isDefined($attrs.lang)) {
        if (!angular.isDefined($.summernote.lang[$attrs.lang])) throw new Error('"' + $attrs.lang + '" lang file must be exist.');
        summernoteConfig.lang = $attrs.lang
    }
    summernoteConfig.oninit = $scope.init, summernoteConfig.onenter = function(evt) {
        $scope.enter({
            evt: evt
        })
    }, summernoteConfig.onfocus = function(evt) {
        $scope.focus({
            evt: evt
        })
    }, summernoteConfig.onblur = function(evt) {
        $scope.blur({
            evt: evt
        })
    }, summernoteConfig.onpaste = function(evt) {
        $scope.paste({
            evt: evt
        })
    }, summernoteConfig.onkeyup = function(evt) {
        $scope.keyup({
            evt: evt
        })
    }, summernoteConfig.onkeydown = function(evt) {
        $scope.keydown({
            evt: evt
        })
    }, angular.isDefined($attrs.onImageUpload) && (summernoteConfig.onImageUpload = function(files, editor, welEditable) {
        angular.isDefined($attrs.editable) && ($scope.editable = welEditable, ("$apply" !== $scope.$$phase || "$digest" !== $scope.$$phase) && $scope.$apply()), $scope.imageUpload({
            files: files,
            editor: editor
        })
    }), this.activate = function(scope, element, ngModel) {
        var updateNgModel = function() {
            var newValue = element.code();
            ngModel && ngModel.$viewValue !== newValue && (ngModel.$setViewValue(newValue), "$apply" !== scope.$$phase && "$digest" !== scope.$$phase && scope.$apply())
        };
        summernoteConfig.onChange = function(contents, editable$) {
            updateNgModel(), angular.isDefined($attrs.editable) && ($scope.editable = editable$, ("$apply" !== $scope.$$phase || "$digest" !== $scope.$$phase) && $scope.$apply()), $scope.change({
                contents: contents
            })
        }, element.summernote(summernoteConfig);
        var unwatchNgModel, editor$ = element.next(".note-editor");
        editor$.find(".note-toolbar").click(function() {
            updateNgModel(), editor$.hasClass("codeview") ? (editor$.on("keyup", updateNgModel), ngModel && (unwatchNgModel = scope.$watch(function() {
                return ngModel.$modelValue
            }, function(newValue) {
                editor$.find(".note-codable").val(newValue)
            }))) : (editor$.off("keyup", updateNgModel), angular.isFunction(unwatchNgModel) && unwatchNgModel())
        }), ngModel && (ngModel.$render = function() {
            element.code(ngModel.$viewValue || "")
        }), currentElement = element, element.on("$destroy", function() {
            element.destroy(), $scope.summernoteDestroyed = !0
        })
    }, $scope.$on("$destroy", function() {
        $scope.summernoteDestroyed || currentElement.destroy()
    })
}]).directive("summernote", [function() {
    "use strict";
    return {
        restrict: "EA",
        transclude: !0,
        replace: !0,
        require: ["summernote", "^?ngModel"],
        controller: "SummernoteController",
        scope: {
            summernoteConfig: "=config",
            editable: "=",
            init: "&onInit",
            enter: "&onEnter",
            focus: "&onFocus",
            blur: "&onBlur",
            paste: "&onPaste",
            keyup: "&onKeyup",
            keydown: "&onKeydown",
            change: "&onChange",
            imageUpload: "&onImageUpload"
        },
        template: '<div class="summernote"></div>',
        link: function(scope, element, attrs, ctrls) {
            var summernoteController = ctrls[0],
                ngModel = ctrls[1];
            summernoteController.activate(scope, element, ngModel)
        }
    }
}]);