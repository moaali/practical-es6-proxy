/**
 * Function to validate object properties before
 * assigning them to a specific value.
 *
 * @param  {Object}  target     Target object containing the properties to validate.
 * @param  {Object}  validator  Validator object containing the validation functions
 *                              for target object properties.
 *
 * @return {Proxy} Proxy object.
 */
const
  validate = (target, validators) => {
    const
      handler = {
        /**
         * Property value setter trap.
         *
         * @param {Object} target Target object containing the properties to validate.
         * @param {String} prop   Property name.
         * @param {*}      val    Property value.
         *
         * @return {void}
         *
         * @notes
         * [1] : Checks if the property already exits on the target object,
         *       if not throw an error.
         *
         * [2] : Checks if the validator function is passed, if not throw an error.
         */
        set(target, prop, val) {
          // [1]
          if (target.hasOwnProperty(prop)) {
            const
              validator = validators[prop]; // [1]

            // [2]
            if (!!validator(val))
              return Reflect.set(target, prop, val);
            else
              throw new Error(`ValidationError: Can't assign "${val}" to "${prop}"`)
          } else {
            throw new Error(`"${prop}" isn't a valid property`)
          }
        }
      };

    return new Proxy(target, handler)
  };
