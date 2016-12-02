angular.module('app').component('mail', {
  template: `
    <div ng-class="{selected: $ctrl.isSelected()}"
         ng-click="$ctrl.selectOnly({mail: $ctrl.mail})">
      <input ng-checked="$ctrl.isMultiSelected({mail: $ctrl.mail})"
             ng-click="$ctrl.checkboxChecked($event)"
             type="checkbox">
      <span class="from">{{ $ctrl.mail.from }}:</span>
      <span class="subject">{{ $ctrl.mail.subject }}</span>
    </div>
  `,
  bindings: {
    mail: '<',
    selectOnly: '&',
    toggleMultiSelect: '&',
    isSingleSelected: '&',
    isMultiSelected: '&'
  },
  controller: function() {
    this.checkboxChecked = ($event) => {
      $event.stopPropagation();

      this.toggleMultiSelect({
        mail: this.mail,
        selected: !this.isMultiSelected({mail: this.mail})
      });
    }

    this.isSelected = () => this.isSingleSelected({mail: this.mail})
      || this.isMultiSelected({mail: this.mail});
  }
});
