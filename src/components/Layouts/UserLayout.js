import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'

const { Content } = Layout

class UserLayout extends Component {
  renderRoutes = (navData) => {
    return navData && navData.children && navData.children.map(item => {
      console.log('tttt', `${navData.path}/${item.path}`)
      return (<Route key={item.path} path={`${navData.path}/${item.path}`} component={item.component}/>)
    })
  }

  render() {
    console.log('UserLayout')
    const { navData } = this.props
    return (
      <Layout>
        <Content>
          <Switch>
            {this.renderRoutes(navData)}
          </Switch>
        </Content>
      </Layout>
    )
  }
}

export default UserLayout
