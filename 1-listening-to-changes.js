/**
 * Function used to watch object for any changes and apply
 * an observer function whenever change is detected.
 *
 * @param  {Object}    target    Target object to listen for changes on (Observable).
 * @param  {Function}  observer  Listner function to invoke when change is detected.
 *
 * @return {Proxy}  Proxy object.
 */
const
  observe = (target, observer) => {
    const
      handler = {
        /**
         * Property value setter trap.
         *
         * @param {Object} target Observable target.
         * @param {String} prop   Property name.
         * @param {*}      val    Property value.
         *
         * @return {void}
         *
         * @notes
         * [1] : Caches the old value of the target property.
         * [2] : Set the new value using `Reflect` API.
         * [3] : Executing the `observer` function with the `oldVal` and (`newVal` === `val`).
         */
        set(target, prop, val) {
          const
            oldVal = target[prop];            // [1]

          Reflect.set(target, prop, val);     // [2]
          observer(target, prop, oldVal, val) // [3]
        }

        /**
         * `delete` operator trap.
         *
         * @param  {Object} target Observable target.
         * @param  {String} prop   Property name to delete.
         *
         * @return {void}
         *
         * @notes
         * [1] : Caches the old value of the target property before deleting process.
         * [2] : Deleting property using `Reflect` API.
         * [3] : Executing the `observer` function with the `oldVal` and (`newVal` as undefined).
         */
        deleteProperty(target, prop) {
          const
            oldVal = target[prop];                  // [1]

          Reflect.deleteProperty(target, prop);     // [2]
          observer(target, prop, oldVal, undefined) // [3]
        }
      };

    return new Proxy(target, handler)
  };
