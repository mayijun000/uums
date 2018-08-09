import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const agreement = r => require.ensure([], () => r(require('@/page/agreement')), 'agreement');
const main = r => require.ensure([], () => r(require('@/page/main')), 'main');
const myInfo = r => require.ensure([], () => r(require('@/page/common/myInfo')), 'myInfo');
const myMsgList = r => require.ensure([], () => r(require('@/page/common/myMsgList')), 'myMsgList');
const myCompanyList = r => require.ensure([], () => r(require('@/page/companyUser/myCompanyList')), 'myCompanyList');
const bankList = r => require.ensure([], () => r(require('@/page/bank/bankList')), 'bankList');
const addBank = r => require.ensure([], () => r(require('@/page/bank/addBank')), 'addBank');
const branchList = r => require.ensure([], () => r(require('@/page/bank/branchList')), 'branchList');
const bankUserList = r => require.ensure([], () => r(require('@/page/bankUser/bankUserList')), 'bankUserList');
const addBankUser = r => require.ensure([], () => r(require('@/page/bankUser/addBankUser')), 'addBankUser');
const editBankUser = r => require.ensure([], () => r(require('@/page/bankUser/editBankUser')), 'editBankUser');

const siteList = r => require.ensure([], () => r(require('@/page/site/siteList')), 'siteList');
const addSite = r => require.ensure([], () => r(require('@/page/site/addSite')), 'addSite');
const editSite = r => require.ensure([], () => r(require('@/page/site/editSite')), 'editSite');

const siteUserList = r => require.ensure([], () => r(require('@/page/siteUser/siteUserList')), 'siteUserList');
const addSiteUser = r => require.ensure([], () => r(require('@/page/siteUser/addSiteUser')), 'addSiteUser');
const editSiteUser = r => require.ensure([], () => r(require('@/page/siteUser/editSiteUser')), 'editSiteUser');

const sysAdminList = r => require.ensure([], () => r(require('@/page/sysAdmin/sysAdminList')), 'sysAdminList');
const addSysAdmin = r => require.ensure([], () => r(require('@/page/sysAdmin/addSysAdmin')), 'addSysAdmin');
const editSysAdmin = r => require.ensure([], () => r(require('@/page/sysAdmin/editSysAdmin')), 'editSysAdmin');

const aishuibao = r => require.ensure([], () => r(require('@/page/aishuibao')), 'aishuibao');

const routes = [

	{
		path: '/',
		component: login,
	},
	{
		path: '/agreement',
		component: agreement,
	},
	{
		path: '/aishuibao',
		component: aishuibao,
	},
	{
		path: '/main',
		component: main,
		redirect: '/myMsgList',
		children: [{
			path: '/myInfo',
			component: myInfo ,
		},
		{
			path: '/myMsgList',
			component: myMsgList ,
		},
		{
			path: '/myCompanyList',
			component: myCompanyList ,
		},
		{
			path: '/bankList',
			component: bankList ,
		},
		{
			path: '/addBank',
			component: addBank ,
		},
		{
			path: '/branchList',
			component: branchList ,
		},
		{
			path: '/bankUserList',
			component: bankUserList ,
		},
		{
			path: '/addBankUser',
			component: addBankUser ,
		},
		{
			path: '/editBankUser',
			component: editBankUser ,
		},
		
		{
			path: '/siteList',
			component: siteList ,
		},
		{
			path: '/addSite',
			component: addSite ,
		},
		{
			path: '/editSite',
			component: editSite ,
		},
		
		{
			path: '/siteUserList',
			component: siteUserList ,
		},
		{
			path: '/addSiteUser',
			component: addSiteUser ,
		},
		{
			path: '/editSiteUser',
			component: editSiteUser ,
		},
		
		{
			path: '/sysAdminList',
			component: sysAdminList ,
		},
		{
			path: '/addSysAdmin',
			component: addSysAdmin ,
		},
		{
			path: '/editSysAdmin',
			component: editSysAdmin ,
		},
		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production'
})
