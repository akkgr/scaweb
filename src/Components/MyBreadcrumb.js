import React from 'react'
import { Tag } from 'antd'

function MyBreadcrumb(props) {
  const { context } = props
  return (
    <div style={{ margin: '16px 0' }}>
      {context.selectedNodes
        .slice(0)
        .reverse()
        .map(item => {
          return (
            <Tag color="blue" key={item.id}>
              {item.node.title}
            </Tag>
          )
        })}
    </div>
  )
}

export default MyBreadcrumb
