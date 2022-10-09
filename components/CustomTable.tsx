import { AdminPages } from "../const/const";
import { Table } from "@nextui-org/react";

type StringKeyObject = Record<string, any>

type TableProps<T extends StringKeyObject> = {
  rows: T[],
  tablename: AdminPages,
  keycol: keyof T,
  cols: (keyof T)[]
};

const CustomTable = <T extends StringKeyObject,>(props: TableProps<T>) => {
  return (
    <Table aria-label={props.tablename + " table"}>
      <Table.Header>
        {props.cols.map((col) => {
          const colstr = col as string
          return (
            <Table.Column key={colstr}>{colstr}</Table.Column>
          )
        })}
      </Table.Header>
      <Table.Body>
        {props.rows.map((row) => (
          <Table.Row key={row[props.keycol]}>
            {props.cols.map((col) => {
              const colstr = col as string
              return (
                <Table.Cell key={colstr}>{row[colstr]}</Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CustomTable
