
const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    userInfo: state => state.user.info,
}

export default getters
