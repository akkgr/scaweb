import React from 'react'
import { withRouter } from 'react-router-dom'
import Toolbar from 'devextreme-react/ui/toolbar'
import notify from 'devextreme/ui/notify'

class TopBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      link: ''
    }
  }

  render() {
    const items = [
      {
        location: 'before',
        widget: 'dxSelectBox',
        locateInMenu: 'auto',
        options: {
          width: 140,
          items: [
            {
              title: 'Διαχείρηση',
              link: ''
            },
            {
              title: 'Εταιρείες',
              link: 'companies'
            },
            {
              title: 'Υπηρεσίες',
              link: 'services'
            },
            {
              title: 'Προγράμματα',
              link: 'programs'
            },
            {
              title: 'Περιοχές',
              link: 'areas'
            },
            {
              title: 'Δράσεις',
              link: 'actions'
            },
            {
              title: 'Menu',
              link: 'menu'
            },
            {
              title: 'SubMenu',
              link: 'submenu'
            }
          ],
          valueExpr: 'link',
          displayExpr: 'title',
          value: this.state.link,
          onValueChanged: args => {
            this.setState({ link: args.value })
            this.props.history.push('/' + args.value)
          }
        }
      },
      {
        locateInMenu: 'always',
        text: 'Save',
        onClick: () => {
          notify('Save option has been clicked!')
        }
      },
      {
        locateInMenu: 'always',
        text: 'Print',
        onClick: () => {
          notify('Print option has been clicked!')
        }
      },
      {
        locateInMenu: 'always',
        text: 'Settings',
        onClick: () => {
          notify('Settings option has been clicked!')
        }
      }
    ]

    return <Toolbar items={items} />
  }
}

export default withRouter(TopBar)
