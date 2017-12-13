/* eslint-disable */
import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import UserLayout from './components/Layouts/UserLayout'
import Menus from './components/Menus'
import DashBoardA from './components/DashBoard/A'
import DashBoardB from './components/DashBoard/B'
import DashBoardC from './components/DashBoard/C'
import FormA from './components/Form/A'
import FormB from './components/Form/B'
import Login from './pages/Login'

const nav = [
  {
    component: UserLayout,
    name: '账户',
    path: '/user',
    children: [
      {
        name: '登录',
        path: 'login',
        component: Login
      }
    ]
  },
  {
    component: MainLayout,
    name: '首页',
    path: '/',
    redirect: '/dashboard/a',
    children: [
      {
        component: DashBoardB,
        name: 'dashboardb',
        path: 'dashboardb'
      },
      {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            component: DashBoardA,
            name: 'dashboarda',
            icon: 'dashboard',
            exact: true,
            path: 'a', //此处的下一级如果还有子路由就会与预想（在子视图里面有菜单）的不一致
          },
          {
            component: DashBoardB,
            name: 'dashboardb',
            icon: 'book',
            path: 'b'
          },
          {
            name: 'select',
            path: 'c',
            component: DashBoardC
          },
          {
            name: 'dashboard',
            hidMenu: true,
            path: 'a/:id',
            component: DashBoardA
          },
        ]
      },
      {
        name: 'form',
        icon: 'form',
        path: 'form',
        children: [
          {
            component: FormA,
            name: 'forma',
            path: 'a'
          },
          {
            component: FormB,
            name: 'formb',
            path: 'b'
          }
        ]
      },
      {
        name: '登录',
        path: 'user/login',
        component: Login
      }
    ]
  }
]

class App extends Component {

  renderRoutes = () => {
    const routes = nav.map(item => {
      const passProps = {
        navData: item,
      }
      return <Route key={item.path} exact={item.exact} path={item.path} render={props => <item.component {...props} {...passProps} />}/>
    })
    return routes
  }

  renderRedirect = () => {
    const routes = nav.filter(item => item.redirect).map(item => {
      const passProps = {
        navData: item,
      }
      return (
        <Redirect key={'redirect' + item.path} exact from={item.path} to={item.redirect} />
      )
    })
    return routes 
  }

  render() {
    return (
      <Router>
        <Switch>
          {this.renderRedirect()}
          {this.renderRoutes()}
        </Switch>
      </Router>
    )
  }
}

export default App
