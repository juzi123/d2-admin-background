// import { request } from './service'

// const files = require.context('./modules', false, /\.js$/)
// const apiGenerators = files.keys().map(key => files(key).default)

// const api = {}
// apiGenerators.forEach(generator => {
//   const apiInstance = generator({
//     request
//   })
//   for (const apiName in apiInstance) {
//     if (Object.prototype.hasOwnProperty.call(apiInstance, apiName)) {
//       api[apiName] = apiInstance[apiName]
//     }
//   }
// })

// export default api

import { assign, map } from 'lodash'
import faker from 'faker/locale/zh_CN'
import { service, request, serviceForMock, requestForMock, mock } from './service'
import * as tools from './tools'

const files = require.context('./modules', true, /\.api\.js$/)
const generators = files.keys().map(key => files(key).default)

export default assign({}, ...map(generators, generator => generator({
  service,
  request,
  serviceForMock,
  requestForMock,
  mock,
  faker,
  tools
})))
