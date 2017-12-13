import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import { Link, Route, Redirect, Switch } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup

class MainLayout extends Component {
  static Proptypes = {
    header: PropTypes.element,
    navData: PropTypes.object,
    footer: PropTypes.element,
  }

  static defaultProps = {
    header: 'header',
    footer: 'footer'
  }

  renderMenus = (menusData, parentPath = '') => {
    return menusData
      .filter(menusData => !menusData.hidMenu)
      .map(menuData => {
        let itemPath = `${parentPath}${menuData.path}`
        if (menuData.children && menuData.children.length > 0) {
          return (
            <SubMenu key={itemPath} title={<span><Icon type={menuData.icon} /><span>{menuData.name}</span></span>}>
              {this.renderMenus(menuData.children, `${itemPath}/`)}
            </SubMenu>
          )
        }
        return (
          <MenuItem key={itemPath}>
            <Link to={itemPath}>
              <Icon type={menuData.icon} /><span>{menuData.name}</span>
            </Link>
          </MenuItem>
        )
      })
  }

  // 抽出所有的children放在首位
  renderRoutes = (navData) => {
    let routes = []
    function getRoute(item, parentPath = '') {
      let itemPath = `${parentPath}${item.path}`
      if (item.component) {
        routes.push({ type: 'Route', ...item, path: itemPath })
      }
      if (item.redirect) {
        routes.push({ type: 'Redirect', from: itemPath, to: item.redirect })
      }
      if (item.children && item.children.length > 0) {
        itemPath = `${itemPath}/`
        item.children.forEach((route) => getRoute(route, itemPath))
      }
    }
    navData.children.forEach((item) => getRoute(item, navData.path))
    routes = routes.map(route => {
      switch (route.type) {
        case 'Redirect':
          return (<Redirect exact from={route.from} to={route.to} />)
        case 'Route':
          return (<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)
      }
    })
    return routes
  }

  render() {
    const { header, navData, footer } = this.props
    console.log('this.props', this.props)
    console.log('defaultSelectedKeys', this.props.location.pathname.split('/'))
    const pathnames = this.props.location.pathname.split('/')
    const defaultSelectedKeys = [`/${pathnames[1]}`, `/${pathnames[1]}/${pathnames[2]}`]
    console.log('defaultSelectedKeys', defaultSelectedKeys)
    return (
      <div>
        <Layout>
          <Header>{header}</Header>
          <Layout>
            <Sider>
              <Menu
                mode='inline'
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={['/' + this.props.location.pathname.split('/')[1]]}
              >
                {this.renderMenus(navData.children, navData.path)}
              </Menu>
            </Sider>
            <Content>
              <Switch>
                {this.renderRoutes(navData)}
              </Switch>
            </Content>
          </Layout>
          <Footer>{footer}</Footer>
        </Layout>
      </div>
    )
  }
}

export default MainLayout
