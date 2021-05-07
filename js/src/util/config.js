/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta3): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import { typeCheckConfig } from './index'

class Config {
  constructor(config) {
    this._config = this._getConfig(config)
  }

  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!')
  }

  static get Default() {
    return {}
  }

  static get DefaultType() {
    return {}
  }

  _getConfig(config) {
    config = this._mergeConfigObj(config)
    this._typeCheckConfig(config)
    return config
  }

  _mergeConfigObj(config) {
    return {
      ...this.constructor.Default,
      ...(typeof config === 'object' ? config : {})
    }
  }

  _typeCheckConfig(config) {
    typeCheckConfig(this.constructor.NAME, config, this.constructor.DefaultType)
  }
}

export default Config
