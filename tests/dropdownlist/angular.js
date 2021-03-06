(function () {
    module("DropDownList AngularJS integration", {
        teardown: function() {
             kendo.destroy(QUnit.fixture);
        }
    });

    ngTest("dropdown recognizes selected primitive items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ "red", "green", "blue" ];
            $scope.selectedColor = "green";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoDropDownList().value(), "green");
    });

    ngTest("dropdown recognizes selected object items with k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[1];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(JSON.stringify(QUnit.fixture.find("select").getKendoDropDownList().dataItem()), JSON.stringify({ color: "green" }));
    });

    ngTest("dropdown works with data-value-primitive in k-ng-model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        equal(QUnit.fixture.find("select").getKendoDropDownList().value(), "green");
    });

    ngTest("dropdown returns primitives to model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = $scope.colors[1];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = QUnit.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger('change');
        equal(JSON.stringify(scope.selectedColor), JSON.stringify({ color: 'blue' }));
    });

    ngTest("dropdown returns primitives to model with primitive", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'"></select></div>');
    },

    function() {
        var dropdown = QUnit.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger("change");
        equal(JSON.stringify(scope.selectedColor), JSON.stringify('blue'));
    });

    ngTest("dropdown sets optionLabel object to the model", 1, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            $scope.colors = [ { color: "red" }, { color: "green" }, { color: "blue" } ];
            $scope.selectedColor = "green";
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-value-primitive="false" k-ng-model=selectedColor k-data-source=colors k-data-value-field="\'color\'" k-data-text-field="\'color\'" k-option-label="\'select...\'"></select></div>');
    },

    function() {
        var dropdown = QUnit.fixture.find("select").getKendoDropDownList();
        var scope = dropdown.element.scope();
        dropdown.value('blue');
        dropdown.trigger("change");

        dropdown.value('');
        dropdown.trigger("change");

        equal(JSON.stringify(scope.selectedColor), '{"color":""}');
    });

    ngTest("dropdown with autoBind:false skips binding when value is set", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = colors[1];
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoDropDownList();

        equal(widget.listView.isBound(), false);
        equal(widget.value(), 2);
        equal(widget.text(), "green");
    });

    ngTest("dropdown with autoBind:false and primitiveValue:false skips binding when value is set", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-value-primitive="true" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoDropDownList();

        equal(widget.listView.isBound(), false);
        equal(widget.value(), 2);
        equal(widget.text(), "");
    });

    ngTest("dropdown with autoBind:false sets text to options.text", 3, function() {
        angular.module("kendo.tests").controller("mine", function($scope) {
            var colors = new kendo.data.ObservableArray([ { color: "red", value: 1 }, { color: "green", value: 2 }, { color: "blue", value: 3 } ]);

            $scope.colors = new kendo.data.DataSource({ data: colors }),
            $scope.selectedColor = 2;
        });

        QUnit.fixture.html('<div ng-controller=mine><select kendo-drop-down-list k-auto-bind="false" k-value-primitive="true" k-text="\'custom text\'" k-ng-model=selectedColor k-data-source=colors k-data-text-field="\'color\'" k-data-value-field="\'value\'"></select></div>');
    },

    function() {
        var widget = QUnit.fixture.find("select").getKendoDropDownList();

        equal(widget.listView.isBound(), false);
        equal(widget.value(), 2);
        equal(widget.text(), "custom text");
    });
})();
