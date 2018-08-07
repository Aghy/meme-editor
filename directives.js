(function() {
	var app = angular.module('directives', []);
	app.controller("generalController", generalController);

	generalController.$inject = ['$scope', '$compile'];

	function generalController($scope, $compile) {

		$scope.updateColor = function(color) {
			$scope.Ccolor = color;
		}
	}

	app.directive("targetDir", targetDirective);

	function targetDirective() {
		return {
			restrict: 'E',
			templateUrl: 'target-dir.html',
			controller: targetController,
			controllerAs: 'tc'
		}
	}

	targetController.$inject = ['$scope', '$compile'];

	function targetController($scope, $compile) {
		var mousePositionX, mousePositionY;

		this.startMoveElement = _startMoveElement;
		this.stopMoveElement = _stopMoveElement;
		this.moveElement = _moveElement;

		$scope.textStyle = '';
		var isUnderlined = false;
		var uuid = guid();
		var elements = {};
		var filters = {};

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
		}

		$scope.countit = function($event) {
			mousePositionX = $event.originalEvent.layerX;
			mousePositionY = $event.originalEvent.layerY;

			$("h1[is-moving='true']").first().css("top", mousePositionY);
			$("h1[is-moving='true']").first().css("left", mousePositionX);
		}

		function _startMoveElement(event, bold) {
			console.log('Starting to moooooooove!');
			console.log(bold, $scope);
			$('#' + event.target.id).attr("is-moving", true);
			$('#' + event.target.id).css("color", $scope.Ccolor);
		}

		function _stopMoveElement(event) {
			console.log('Stop to moooooooove!');
			$('#' + event.target.id).attr("is-moving", false);
		}

		function _moveElement(event) {
			if ($('#' + event.target.id).attr("is-moving") === true) {
				console.log('Moving!');
				$('#' + event.target.id).css("top", mousePositionY);
				$('#' + event.target.id).css("left", mousePositionX);
			}
		}

		function getLabelCount() {
			return $('#parent h1').length;
		}

		$scope.createLabel = function() {
			if (getLabelCount() < 2) {
				var uuid = guid();
				var caption = "top_caption";
				if (getLabelCount() == 1) {
					caption = "bot_caption";
				}
				var newElement = '<h1 ng-class="{boldStyle: isBold, italicStyle: isItalic, underlineStyle: isUnderlined}" draggable="true" ng-mouseup="tc.stopMoveElement($event)" ng-mousedown="tc.startMoveElement($event)" ng-mousemove="tc.moveElement($event)" id="' + uuid + '">{{' + caption + '}}</h1>';
				var element = angular.element(newElement);
				elements[uuid] = element;
				$('#parent').append($compile(element)($scope));
				$('#' + uuid).css("position", "absolute");
				$('#' + uuid).css("top", mousePositionY);
				$('#' + uuid).css("left", mousePositionX);
				$('#' + uuid).css("color", $scope.Ccolor);
				console.log($('#' + uuid));
			}
		}
	}

	app.directive("editorDir", editorDirective);

	function editorDirective() {
		return {
			restrict: 'E',
			templateUrl: 'editor-dir.html',
			controller: editorController,
			controllerAs: 'ec'
		}
	}

	function editorController() {

	}

})();