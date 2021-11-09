import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/pages/Dashboard')



// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')



const Properties = () => import('@/views/pages/properties/Index')
const RemovedProperties = () => import('@/views/pages/properties/Removed')
const ShowProperty = () => import('@/views/pages/properties/Show')
const CreateProperty = () => import('@/views/pages/properties/Create')
const EditProperty = () => import('@/views/pages/properties/Edit')

const Contracts = () => import('@/views/pages/contracts/Index')
const ShowContract = () => import('@/views/pages/contracts/Show')
const CreateContract = () => import('@/views/pages/contracts/Create')
const EditContract = () => import('@/views/pages/contracts/Edit')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'properties',
          meta: { label: 'Propriedades'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Properties,
            },
            {
              path: 'create',
              meta: { label: 'Cadastrar'},
              name: 'CreateProperty',
              component: CreateProperty,
            },
            {
              path: 'show/:id',
              meta: { label: 'Registro'},
              name: 'ShowProperty',
              component: ShowProperty,
            },
            {
              path: 'edit/:id',
              meta: { label: 'Editar'},
              name: 'EditProperty',
              component: EditProperty,
            },
            {
              path: 'removed',
              meta: { label: 'Excluídos'},
              name: 'RemodeProperties',
              component: RemovedProperties,
            },
          ]
        },
        {
          path: 'contracts',
          meta: { label: 'Contratos'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Contracts,
            },
            {
              path: 'create',
              meta: { label: 'Cadastrar'},
              name: 'CreateContract',
              component: CreateContract,
            },
            {
              path: 'show/:id',
              meta: { label: 'Cadastro'},
              name: 'ShowContract',
              component: ShowContract,
            },
            {
              path: 'edit/:id',
              meta: { label: 'Editar'},
              name: 'EditContract',
              component: EditContract,
            },
          ]
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    }
  ]
})



/*

    {
      path: '/',
      redirect: '/login',
      name: 'Login',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
      ]
    },

*/
