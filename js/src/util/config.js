/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import { isElement, toType } from './index'

class Config {
  constructor(config = null) {
    this._config = this._initializeConfig(config)
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

  _initializeConfig(config) {
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
    Object.keys(this.constructor.DefaultType).forEach(property => {
      const expectedTypes = this.constructor.DefaultType[property]
      const value = config[property]
      const valueType = value && isElement(value) ? 'element' : toType(value)

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`
        )
      }
    })
  }
}

export default Config
