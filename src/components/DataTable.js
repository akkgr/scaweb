import React from 'react'
import PropTypes from 'prop-types'
import DataGrid, {
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection,
  Summary,
  TotalItem,
  FilterRow,
  Editing,
  Export
} from 'devextreme-react/ui/data-grid'

const pageSizes = [10, 20, 50, 100]

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handelDelete = this.handelDelete.bind(this)
    this.handelInsert = this.handelInsert.bind(this)
  }

  handleUpdate(e) {
    this.props.update(e)
  }

  handelDelete(e) {
    this.props.delete(e)
  }

  handelInsert(e) {
    this.props.insert(e)
  }

  render() {
    const { countField, sumFields } = this.props
    let sumItems = null
    if (sumFields) {
      sumItems = this.props.sumFields.map(field => (
        <TotalItem key={field} column={field} summaryType={'sum'} />
      ))
    }
    return (
      <DataGrid
        allowColumnReordering={true}
        allowColumnResizing={true}
        showBorders={true}
        dataSource={this.props.data}
        showRowLines={true}
        onRowUpdated={this.handleUpdate}
        onRowRemoved={this.handelDelete}
        onRowInserted={this.handelInsert}
      >
        <Export enabled={true} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Selection mode={'single'} />
        <FilterRow visible={true} />
        {this.props.children}
        <Summary>
          {countField != null && (
            <TotalItem column={countField} summaryType={'count'} />
          )}
          {sumItems != null && sumItems}
        </Summary>
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={20} />
        <Editing
          mode="popup"
          allowUpdating={this.props.update !== undefined}
          allowDeleting={this.props.delete !== undefined}
          allowAdding={this.props.insert !== undefined}
        />
      </DataGrid>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  countField: PropTypes.string,
  sumFields: PropTypes.arrayOf(PropTypes.string),
  update: PropTypes.func,
  delete: PropTypes.func,
  insert: PropTypes.func
}

export default DataTable
