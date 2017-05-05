(function() {
  angular.module('builder.components', ['builder', 'validator.rules']).config([
    '$builderProvider', function($builderProvider) {
	  $builderProvider.registerComponent('text', {
        group: 'Default',
        label: 'Text Input',
        description: '',
        placeholder: '',
        required: false,
        validationOptions: [
          {
            label: 'none',
            rule: '/.*/'
          }, {
            label: 'number',
            rule: '[number]'
          }, {
            label: 'email',
            rule: '[email]'
          }, {
            label: 'url',
            rule: '[url]'
          }
        ],
        template: "<div class=\"form-group mob-no-mar text\" >\n  <label class=\"col-lg-2 col-sm-3 control-label mob-clr\" for=\"{{formName+index}}\"  ng-class=\"{'fb-required':required}\">{{label}}</label>\n  <div class=\"col-lg-4 col-sm-5 mob-clr mob-top-mar\">\n <input type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" name='{{fieldName}}' class=\"form-control\" placeholder=\"{{placeholder}}\"/>\n         <span class=\"help-block\">{{description}}</span>\n     </div>\n </div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('textarea', {
        group: 'Default',
        label: 'Text Area',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group mob-no-mar text\">\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-lg-4 col-sm-5 mob-clr mob-top-mar\">\n        <textarea  ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" name='{{fieldName}}' class=\"form-control\" rows='6' placeholder=\"{{placeholder}}\"/>\n        <span class=\"help-block\">{{description}}</span>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('true_false', {
        group: 'Default',
        label: 'Checkbox',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group\" ng-show=\"conditionalLogic(logicRules)\">\n    <label for=\"{{formName+index}}\" class=\"col-md-4 text-right control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-md-8\">\n        <input type='checkbox' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" name='{{fieldName}}'  id=\"{{formName+index}}\" />\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('checkbox', {
        group: 'Default',
        label: 'Checkbox',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        arrayToText: true,
        template: "<div class=\"form-group mob-no-mar\" >\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-lg-8 col-sm-5 col-md-8 mob-clr mob-top-mar\">\n          <div class='form-group checkbox no-mar' ng-repeat=\"item in options track by $index\">\n            <input type='checkbox' id=\"{{item}}{{index}}\"  ng-model=\"$parent.inputArray[$index]\" value=\"item\">\n                <label for=\"{{item}}{{index}}\">{{item}}\n            </label>\n        </div>\n        <span class='help-block'>{{description}}</span>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
      $builderProvider.registerComponent('radio', {
        group: 'Default',
        label: 'Radio',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group\" >\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-lg-8 col-sm-5 col-md-8 mob-clr mob-top-mar\">\n        <div class='form-group radio no-mar' ng-repeat=\"item in options track by $index\">\n            <input id=\"{{item}}{{index}}\" ng-model=\"$parent.inputText\" validator-group=\"{{formName}}\" value='{{item}}' type='radio' name='{{fieldName}}' />\n              <label for=\"{{item}}{{index}}\">  {{item}}\n            </label>\n        </div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('repeater', {
        group: 'Default',
        label: 'Repeater',
        description: '',
        placeholder: '',
        required: false,
		options: [],
        template: "<div class=\"form-group js-clone\"><h3>{{label}}</h3><div  class=\"js-field-list\" ng-model=\"input\" fb-form=\"repeaterFieldName\" fb-default=\"options['repeaterFieldName']\"></div><div class=\"js-field-list js-field-list-base\" ng-model=\"input\" fb-form=\"{{fieldName}}\"></div><div class=\"form-group mob-no-mar text\"><div ng-class=\"{'col-lg-2 col-sm-3 control-label mob-clr' : !is_modal, 'col-lg-3 col-sm-3 control-label mob-clr' : is_modal}\"><div ng-if=\"$index == 0\"><a href=\"\" ng-click=\"addsubfields()\" title=\"Add More\"><span class=\"text-18\"><i class=\"fa fa-plus-circle\"></i></span><span class=\"blackc\">Add More</span></a></div><div ng-if=\"$index != 0\"><a href=\"\" ng-click=\"removesubfields(fields)\" title=\"Remove\"><span class=\"text-18\"><i class=\"fa fa-minus-circle right-mar-sm\"></i></span><span class=\"blackc\">Remove</span></a></div></div></div></div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('datepicker', {
        group: 'Default',
        label: 'Date',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group mob-no-mar\" >\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr mob-no-mar\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\" col-sm-4\"><div class=\"input-group date text\" ng-date-picker>\n <input size=\"16\" type=\"text\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" name='{{fieldName}}' class=\"form-control\" placeholder=\"{{placeholder}}\"/><span class=\"input-group-addon\"><i class=\"fa fa-times\"></i></span><span class=\"input-group-addon cur\"><i class=\"fa fa-calendar\"></i></span>\n </div> <span class=\"help-block\">{{description}}</span>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('number', {
        group: 'Default',
        label: 'Number',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group mob-no-mar text\" >\n  <label class=\"col-lg-2 col-sm-3 control-label mob-clr\" for=\"{{formName+index}}\"  ng-class=\"{'fb-required':required}\">{{label}}</label>\n  <div class=\"col-lg-4 col-sm-5 mob-clr mob-top-mar\">\n <input type=\"number\" ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" id=\"{{formName+index}}\" name='{{fieldName}}' class=\"form-control\" placeholder=\"{{placeholder}}\"/>\n         <span class=\"help-block\">{{description}}</span>\n     </div>\n </div>\n",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('attachment', {
        group: 'Default',
        label: 'Attachment',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group\" >\n<label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-sm-6 mob-clr\">\n<input type=\"hidden\" file-model=\"inputText\" validator-required=\"{{required}}\" id=\"{{formName+index}}\" name='{{fieldName}}' /> <div class=\"preview-input-wrapper\"><div class=\"preview-block\"><div class=\"preview-img-block clearfix black-box img-thumbnail no-pad no-bor pr\"><span class=\"pa col-xs-pull-0 cur z-top close_show_{{formName}}_{{index}}\" ng-show=\"inputText\"  ng-confirm-click=\"Are you sure you want to delete\" confirmed-click=\"delete_preview(this)\" data-index= \"{{index}}\"><img src=\"../img/icon-close.png\" alt=\"[Image: Delete]\" title=\"Delete\"></span><img class=\"img-responsive pa img-thumbnail space-xs hover-img col-xs-12 attachment_img custom_attachment_{{formName}}_{{index}}\" ng-src=\"{{AWS_BASE_URL}}/Channel/0/default.png\" data-default-image= \"{{AWS_BASE_URL}}/Channel/0/default.png\" ng-if=\"!inputText\"><img class=\"img-responsive pa img-thumbnail space-xs hover-img col-xs-12 attachment_img custom_attachment_{{formName}}_{{index}}\" ng-src=\"{{AWS_BASE_URL}}/{{inputText}}\" ng-if=\"inputText\"><span class=\"preview-input-block pr\"><span class=\"text-muted show\"><i class=\"fa fa-picture-o fa-2x\"></i></span><span class=\"show whitec\">Click to Add An Image</span></span><span class=\"pa space-lg col-xs-12 col-xs-pull-0 hide\"><span class=\"cssloader\"></span></span><input type=\"file\" onchange=\"angular.element(this).scope().fileAttached(this)\" id=\"{{fieldName}}\" data-index= \"{{index}}\"    name='inputText' ng-disabled=\"disabled\"></div></div></div><span class=\"help-block\">{{description}}</span></div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n    <div class=\"form-group\" ng-if=\"validationOptions.length > 0\">\n        <label class='control-label'>Validation</label>\n        <select ng-model=\"$parent.validation\" class='form-control' ng-options=\"option.rule as option.label for option in validationOptions\"></select>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	  $builderProvider.registerComponent('chosen', {
        group: 'Default',
        label: 'Chosen',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group mob-no-mar text\" >\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\">{{label}}</label>\n    <div class=\"col-lg-4 col-sm-5 mob-clr mob-top-mar\">\n        <select ng-options=\"option for option in options\" chosen multiple  id=\"{{formName+index}}\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\" name='{{fieldName}}' class=\"form-control\"\n            ng-model=\"inputText\" ng-init=\"inputText = options[0].id\"/>\n        <span class=\"help-block word-break\">{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	 
      $builderProvider.registerComponent('mediumeditor', {
        group: 'Default',
        label: 'Text Area',
        description: '',
        placeholder: '',
        required: false,
        template: "<div class=\"form-group\" ng-show=\"conditionalLogic(logicRules)\">\n    <label for=\"{{formName+index}}\" class=\"col-md-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-md-8 no-mar\">\n        <div medium-editor ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"   class=\"editable \" placeholder=\"{{placeholder}}\"/><textarea class=\"hide\" id=\"{{formName+index}}\" name='{{fieldName}}' ></textarea></div>\n        <p class='help-block'>{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Placeholder</label>\n        <input type='text' ng-model=\"placeholder\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required</label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
	  });
      return $builderProvider.registerComponent('select', {
        group: 'Default',
        label: 'Select',
        description: '',
        placeholder: '',
        required: false,
        options: ['value one', 'value two'],
        template: "<div class=\"form-group mob-no-mar text\" >\n    <label for=\"{{formName+index}}\" class=\"col-lg-2 col-sm-3 control-label mob-clr\">{{label}}</label>\n    <div class=\"col-lg-4 col-sm-5 mob-clr mob-top-mar\">\n        <select ng-options=\"option for option in options\" id=\"{{formName+index}}\" name='{{fieldName}}' validator-required=\"{{required}}\" validator-group=\"{{formName}}\" class=\"form-control\"\n            ng-model=\"inputText\" ng-init=\"inputText = options[0].id\"/>\n        <span class=\"help-block word-break\">{{description}}</p>\n    </div>\n</div>",
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
	
    }
  ]);

}).call(this);
