const
  intercept = (target, operation, interceptor) => {
    const
      handler = {
        /**
         * Property value getter trap that intercepts the provided operation.
         *
         * @param {Object} target Target object to intercept operation on.
         * @param {String} prop   Property name.
         *
         * @return {Functrion} Function to execute as a target method.
         *
         * @notes
         */
        get(target, prop) {
          if (prop === operation)
            return ...args => Reflect.apply(target[prop], target, args)
        }
      }

    return new Proxy(target, handler);
  }

const
  file = {
    // Huge file request
    request(hash) {
      // Loading file logic
    }
  };


const
  cachLoader = hash => {
    // Loading from cache logic
  };

const data = intercept(file, 'request', cachLoader);
