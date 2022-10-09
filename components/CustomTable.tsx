import { AdminPages } from "../const/const";
import { Table } from "@nextui-org/react";

type StringKeyObject = {
  [key: string]: any;
}

type TableProps<StringKeyObject> = {
  rows: StringKeyObject[],
  tablename: AdminPages,
  keycol: string,
  cols: string[]
};

const CustomTable = <T extends StringKeyObject,>(props: TableProps<T>) => {
  return (
    <Table aria-label={props.tablename + " table"}>
      <Table.Header>
        {props.cols.map((col) => {
          return (
            <Table.Column key={col}>{col}</Table.Column>
          )
        })}
      </Table.Header>
      <Table.Body>
        {props.rows.map((row) => (
          <Table.Row key={row[props.keycol]}>
            {props.cols.map((col) => {
              return (
                <Table.Cell key={col}>{row[col]}</Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CustomTable
