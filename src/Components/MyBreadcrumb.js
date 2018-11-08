import React from 'react'
import { Breadcrumb } from 'antd'

function MyBreadcrumb(props) {
  const { context } = props
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {context.selectedNodes.reverse().map(item => {
        return (
          <Breadcrumb.Item key={item.id}>{item.node.title}</Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default MyBreadcrumb
