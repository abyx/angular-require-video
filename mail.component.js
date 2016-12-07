angular.module('app').component('mail', {
  template: `
    <div ng-class="{selected: $ctrl.isSelected()}"
         ng-click="$ctrl.inboxCtrl.selectOnly($ctrl.mail)">
      <input ng-checked="$ctrl.inboxCtrl.isMultiSelected($ctrl.mail)"
             ng-click="$ctrl.checkboxChecked($event)"
             type="checkbox">
      <span class="from">{{ $ctrl.mail.from }}:</span>
      <span class="subject">{{ $ctrl.mail.subject }}</span>
    </div>
  `,
  bindings: {
    mail: '<'
  },
  require: {
    inboxCtrl: '^^inbox'
  },
  controller: function() {
    this.checkboxChecked = ($event) => {
      $event.stopPropagation();

      this.inboxCtrl.toggleMultiSelect(this.mail, !this.inboxCtrl.isMultiSelected(this.mail));
    }

    this.isSelected = () => this.inboxCtrl.isSingleSelected(this.mail)
      || this.inboxCtrl.isMultiSelected(this.mail);
  }
});
