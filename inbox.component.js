angular.module('app').component('inbox', {
  template: `
    <div>
      <button ng-disabled="!$ctrl.hasSelection()">Archive</button>
      <button ng-disabled="!$ctrl.hasSelection()">Star</button>
    </div>
    <mail ng-repeat="mail in $ctrl.mails"
      mail="mail" select-only="$ctrl.selectOnly(mail)"
      toggle-multi-select="$ctrl.toggleMultiSelect(mail, selected)"
      is-single-selected="$ctrl.isSingleSelected(mail)"
      is-multi-selected="$ctrl.isMultiSelected(mail)"
    </mail>
  `,
  controller: function() {
    this.mails = [
      {from: 'Alice', subject: 'Lunch', id: 1},
      {from: 'Bob', subject: 'Meeting summary', id: 2},
      {from: 'Mom', subject: 'FWD: FWD: You have to see this', id: 3},
      {from: 'Jane', subject: 'Code review', id: 4}
    ];

    this.selectionModel = {
      singleSelected: null,
      multipleSelection: {}
    };

    this.selectOnly = (mail) => {
      this.selectionModel.multipleSelection = {};
      this.selectionModel.singleSelected = mail;
    };

    this.toggleMultiSelect = (mail, selected) => {
      if (selected) {
        this.selectionModel.multipleSelection[mail.id] = true;
      } else {
        delete this.selectionModel.multipleSelection[mail.id];
      }

      this.selectionModel.singleSelected = null;
    };

    this.isSingleSelected = (mail) => {
      return this.selectionModel.singleSelected === mail;
    };

    this.isMultiSelected = (mail) => {
      return this.selectionModel.multipleSelection[mail.id];
    };

    this.hasSelection = () => {
      return (this.selectionModel.singleSelected
        || Object.keys(this.selectionModel.multipleSelection).length > 0);
    };
  }
});
