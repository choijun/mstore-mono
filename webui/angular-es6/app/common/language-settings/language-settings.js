'use strict';

class LanguageSettingsController {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
    this.systemLanguage = this.$translate.use() || 'en_US';
  }
  
  changeLanguage() {
    this.$translate.use(this.systemLanguage);
  }
}

export default class LanguageSettings {
  constructor() {
    return {
      replace: true,
      scope: true,
      bindToController: {
        languages: '=languageSettings'
      },
      controller: LanguageSettingsController,
      controllerAs: 'languageSettings',
      templateUrl: 'app/common/language-settings/language-settings.html'
    };
  }
}