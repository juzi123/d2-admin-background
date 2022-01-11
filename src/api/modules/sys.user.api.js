import { postAction } from '../manage'
export default () => ({
  /**
   * @description 登录
   * @param {Object} data 登录携带的信息
   */
  SYS_USER_LOGIN (data = {}) {
    // // 模拟数据
    // mock
    //   .onAny('/login')
    //   .reply(config => {
    //     const user = find(users, tools.parse(config.data))
    //     return user
    //       ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
    //       : tools.responseError({}, '账号或密码不正确')
    //   })
    // // 接口请求
    // return requestForMock({
    //   url: '/api/User/Login',
    //   method: 'post',
    //   data
    // })
    return postAction('/api/User/Login', data)
  }
})
