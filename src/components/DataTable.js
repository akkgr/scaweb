import React from "react";
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
} from "devextreme-react/ui/data-grid";

const pageSizes = [10, 20, 50, 100];

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    this.props.update(e.data);
  }

  render() {
    return (
      <DataGrid
        allowColumnReordering={true}
        showBorders={true}
        dataSource={this.props.data}
        showRowLines={true}
        onRowUpdated={this.handleUpdate}
      >
        <Export enabled={true} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Selection mode={"single"} />
        <FilterRow visible={true} />
        {this.props.children}
        <Summary>
          <TotalItem column={this.props.countField} summaryType={"count"} />
        </Summary>
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={20} />
        <Editing mode="popup" allowUpdating="true" />
      </DataGrid>
    );
  }
}

export default DataTable;
