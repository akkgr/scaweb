import React from 'react'
import { Tag } from 'antd'

function MyBreadcrumb(props) {
  const { context } = props
  return (
    <div style={{ margin: '16px 0', minHeight: '45.2px' }}>
      {context.selectedNodes
        .slice(0)
        .reverse()
        .map(item => {
          return (
            <Tag color="blue" key={item.id}>
              {item.title}
            </Tag>
          )
        })}
    </div>
  )
}

export default MyBreadcrumb
