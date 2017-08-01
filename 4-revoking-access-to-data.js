/**
 * Sensitve Data
 */
const
  db = {
    username: 'Mo'
  };

/**
 * Function used to revoke access to certain data
 * at certain point of app life cycle.
 *
 * @param  {Object}    target  Target object to secure.
 *
 * @return {Proxy}  Revocable proxy object.
 */
const
  secure = target => {
    const
      handler = {};

    return Proxy.revocable(target, handler);
  }

const {data, revoke} = secure(db);
