import React from 'react'
import { Tag } from 'antd'

function MyBreadcrumb(props) {
  const { context } = props
  return (
    <div style={{ minHeight: '66px', padding: '0px 20px 20px 20px' }}>
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
