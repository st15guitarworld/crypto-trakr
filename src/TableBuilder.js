import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let TableBuilder = {};
TableBuilder.buildSimpleTable = (data) => {
  if(!data || data.length <=0){
    return null;
  }
let keys = Object.keys(data[0]);

return (
    <Table>
      <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
        <TableRow>
      {keys.map(key => (
           <TableHeaderColumn>{key}</TableHeaderColumn>
      ))}
       </TableRow>
      </TableHeader>
      <TableBody
          displayRowCheckbox={false}
        >
        {data.map(obj => (
            <TableRow>
              {Object.keys(obj).map(key => (
                <TableRowColumn>{obj[key]}</TableRowColumn>
              ))}
            </TableRow>
        ))}
      </TableBody>
    </Table>
);
}
export default TableBuilder;
