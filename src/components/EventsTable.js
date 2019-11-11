import {
    Table, TableBody, TableHeader, TableHeaderColumn,
    TableRow, TableRowColumn
} from 'material-ui/Table';



const row = (x, i, header) => {
    <div>
    <TableRow key={`tr-${i}`}>
        header.map((y,k)=>(
            <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
        ))
    </TableRow>
    </div>
}

export default ({ data, header }) => {
    <div>
        <Table>

            <TableHeader>
                <TableRow>
                    {header.map((x, i) => (
                        <TableHeaderColumn key={`thc-${i}`}></TableHeaderColumn>
                    ))}
                </TableRow>
            </TableHeader>
           <div> <TableBody>{data.map((x, i) => row(x, i, header))}</TableBody></div>

        </Table>
    </div>
}