import fetch from '@/config/fetch'

export const login = data => fetch('/api/login', data);//登录
export const getUserInfo = data => fetch('/api/secret/getUserInfo', data);//获取用户信息
export const logout = data => fetch('/api/secret/logout', data);//登出
export const register = data => fetch('/api/open/reg/register', data);//注册
export const resetPassword = data => fetch('/api/open/forget/reset', data);//重置密码
export const regCheckMobile = data => fetch('/api/open/reg/checkMobile', data);//注册检查手机号
export const forgetCheckMobile = data => fetch('/api/open/forget/checkMobile', data);//重置密码检查手机号
export const sendMobileCodeForRegister = data => fetch('/api/open/reg/sendMobileCodeForRegister', data);//注册发送手机短信
export const sendMobileCode = data => fetch('/api/open/forget/sendMobileCode', data);//忘记密码发送短信

export const getKaptchaImage = "/api/open/kaptcha/getKaptchaImage" ;//验证码图片地址

export const getAllMsg = data => fetch('/api/secret/personal/getAllMsg', data);//查询消息列表
export const deleteSingleMsg = data => fetch('/api/secret/personal/deleteSingleMsg', data);//删除一条消息
export const deleteUserMsg = data => fetch('/api/secret/personal/deleteUserMsg', data);//删除所有消息
export const getCompanyList = data => fetch('/api/secret/personal/getCompanyList', data);//查询我的企业列表
export const deleteUserRelEtr = data => fetch('/api/secret/personal/deleteUserRelEtr', data);//取消企业关联
export const getPersonalInfo = data => fetch('/api/secret/personal/getPersonalInfo', data);//查询个人资料
export const updateUser = data => fetch('/api/secret/personal/updateUser', data);//修改个人资料
export const checkAccount = data => fetch('/api/secret/personal/checkAccount', data);//检查账户是否存在
export const setDefaultCorp = data => fetch('/api/secret/sysusercorp/setDefaultCorp', data);//设置默认企业
export const readMsg = data => fetch('/api/secret/personal/readMsg', data);//设置消息已读

export const getBankList = data => fetch('/api/secret/bank/getBankList', data);//查询银行列表
export const addBank = data => fetch('/api/secret/bank/addBank', data);//添加银行
export const getBranchList = data => fetch('/api/secret/bank/getBranchList', data);//查询银行分支
export const getBranchBankArea = data => fetch('/api/secret/bank/getBranchBankArea', data);//查询银行分支区域
export const addBranchBank = data => fetch('/api/secret/bank/addBranchBank', data);//添加和修改银行分支区域
export const deleteBranchBank = data => fetch('/api/secret/bank/deleteBranchBank', data);//删除银行分支

export const getBankUserList = data => fetch('/api/secret/bankUser/getUserList', data);//查询银行用户列表
export const addBankUser = data => fetch('/api/secret/bankUser/addBankUser', data);//添加银行用户
export const deleteBankUser = data => fetch('/api/secret/bankUser/deleteBankUser', data);//删除银行用户
export const checkBankUser = data => fetch('/api/secret/bankUser/checkUser', data);//核对银行用户
export const forbidUser = data => fetch('/api/secret/bankUser/forbidUser', data);//禁用银行用户
export const getUserBankInfo = data => fetch('/api/secret/bankUser/getUserBankInfo', data);//获取银行用户信息
export const getBranchBankList = data => fetch('/api/secret/bankUser/getBranchBankList', data);//获取银行用户所选分行
export const getUserValidList = data => fetch('/api/secret/bankUser/getUserValidList', data);//获取银行用户分页

export const getSiteList = data => fetch('/api/secret/site/getSiteList', data);//逻辑站点列表
export const getSingleSite = data => fetch('/api/secret/site/getSingleSite', data);//站点地区
export const deleteSingleSite = data => fetch('/api/secret/site/deleteSingleSite', data);//删除站点
export const addSite = data => fetch('/api/secret/site/addSite', data);//添加站点

export const getSiteUserList = data => fetch('/api/secret/siteUser/getSiteList', data);//逻辑站点用户列表
export const deleteSiteUser = data => fetch('/api/secret/siteUser/deleteSiteUser', data);//删除站点用户
export const addSiteUser = data => fetch('/api/secret/siteUser/addSiteUser', data);//添加站点用户
export const checkUser = data => fetch('/api/secret/siteUser/checkUser', data);//检查站点用户
export const getUserSite = data => fetch('/api/secret/siteUser/getUserSite', data);//获取用户站点

//*****************以下是应用系统管理员管理模块相关配置*************************************************************************************
export const getSysAdminList     = data => fetch('/api/secret/sysAppUser/getUserList', data);           //获取应用系统管理员列表
export const getSysAdminSysList  = data => fetch('/api/secret/sysAppUser/getUserApp', data);            //获取管理员负责的应用系统列表
export const addSysAdmin         = data => fetch('/api/secret/sysAppUser/addSysAppUser', data);         //新增应用系统管理员
export const deleteSysAppUserRel = data => fetch('/api/secret/sysAppUser/deleteSysAppUserRel', data);   //删除应用系统管理员（删除关联表，不删除用户表）
export const checkSysAdmin       = data => fetch('/api/secret/sysAppUser/checkUser', data);             //检查应用系统管理员
export const getSysList          = data => fetch('/api/secret/sysApp/getAll', data);                    //应用系统列表
//****************************************************************************************************************************************

export const upload = '/api/open/fileUpload/upload';//文件上传地址
export const region = data => fetch('/api/open/region/all', data);//获取省市
export const regionlist = data => fetch('/api/open/region/list', data);//获取省市


export const asbPageAddress = data => fetch('/api/secret/temp/asbPageAddress', data);//获取爱税宝绑定地址
export const asbBinding = data => fetch('/api/secret/temp/asbBinding', data);//爱税宝绑定







