/**
 * Function used to achieve true privacy JavaScript object properties.
 *
 * @param  {Object}    target  Target object to blackbox properties on.
 * @param  {Function}  filter  Function that mark the private properties.
 *
 * @return {Proxy}  Proxy object.
 */
const
  blackbox = (target, filter) => {
    const handler = {
      /**
       * Property value getter trap that prevents returning
       * private property value.
       *
       * @param {Object} target Target object to blackbox properties on.
       * @param {String} prop   Property name.
       *
       * @return {*} The property value.
       *
       * @notes
       * [1] : Checks if the property isn't private.
       * [2] : Bind the returned value if it's a function to the target object itself.
       */
      get(target, prop) {
        // [1]
        if (!filter(prop)) {
          let
            val = Reflect.get(target, prop);

          if (typeof val !== 'function')
            return val;

          return val.bind(target) // [2]
        } else {
          throw new Error(`"${prop}" property is blackboxed.`)
        }
      }

      /**
       * Property value setter trap that prevent
       * assigning values to private properties.
       *
       * @param {Object} target Target object to blackbox properties on.
       * @param {String} prop   Property name.
       * @param {*}      val    Property value.
       *
       * @return {void}
       */
      set(target, prop, val) {
        if (filter(prop))
          throw new Error(`"${prop}" property is blackboxed.`);

        return Reflect.set(target, prop, val)
      },

      /**
       * Enumeration tarp that prevent the private properties from
       * being enumerated.
       *
       * @param {Object} target Target object to blackbox properties on.
       * @param {String} prop   Property name.
       *
       * @return {Boolean}
       *     false if the property is private
       */
      has(target, prop) {
        return filter(prop) ? false : Reflect.has(target, prop)
      }

      /**
       * Prevents private properties from being accessed via
       * methods that get object keys like `Object.keys()`.
       *
       * @param {Object} target Target object to blackbox properties on.
       *
       * @return {Array}
       *     Array of all keys minus the private properties.
       */
      ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => !filter(key))
      }

      /**
       * Prevents private properties from being
       * accessed via `Object.getOwnPropertyDescriptor()`.
       *
       * @param {Object} target Target object to blackbox properties on.
       * @param {String} prop   Property name.
       *
       * @return {Object|undefined}
       *     `undefined` in case private properties
       */
      getOwnPropertyDescriptor(target, prop) {
        return filter(prop) ? undefined : Reflect.getOwnPropertyDescriptor(target, prop);
      }
    };

    return new Proxy(target, handler)
  };
