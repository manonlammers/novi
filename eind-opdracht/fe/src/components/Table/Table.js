import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import PropTypes from 'prop-types'
import styles from './Table.module.scss'
import useTable from './useTable'
import TextField from '../Textfield/TextField'
import Typography from '../Typography/Typography'

const Table = ({ columns, data, rowsPerPage, actions = null }) => {
    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState(data)
    const [search, setSearch] = useState('')
    const { slice, range } = useTable(tableData, page, rowsPerPage)

    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1)
        }
    }, [slice, page, setPage])

    const handleSearch = (event) => {
        const search = event.target.value
        setSearch(search)

        const filtered = data.filter(row => {
            return Object.values(row).find(r => {
                return String(r).toLowerCase().includes(search.toLowerCase())
            })
        })

        setTableData(filtered)
    }

    return <div className={styles.tableComponent}>
        <TextField
            placeholder="Zoeken..."
            className={styles.search}
            value={search}
            onChange={handleSearch}
        />
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {columns.map((column, i) => {
                            return (
                                <th key={i} style={column.style}>
                                    <Typography variant="subtitle1" gutterBottom={false}>
                                        {column.label}
                                        {}
                                    </Typography>
                                </th>
                            )
                        })}
                        {actions && (
                            <th>
                                <Typography variant="subtitle1" gutterBottom={false}>
                                    Acties
                                </Typography>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {slice.map((row) => {
                        return (
                            <tr key={row.id}>
                                {Object.keys(row).map((rowKey, i) => {
                                    const column = columns.find(c => c.key?.toLowerCase() === rowKey)
                                    if (!column) {
                                        return null
                                    }

                                    const rowValue = row[rowKey]

                                    return (
                                        <td key={i} style={column.style}>
                                            <Typography variant="body1" gutterBottom={false}>
                                                {rowValue}
                                            </Typography>
                                        </td>
                                    )
                                })}
                                {actions && (
                                    <td>{actions}
                                        <span>
                                            <BsFillTrashFill className={styles.delete}/>
                                            <BsFillPencilFill />
                                        </span>
                                    </td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div className={styles.footer}>
            {range.map((el, index) => (
                <button
                    key={index}
                    className={`${styles.button} ${
                        page === el ? styles.activeButton : styles.inactiveButton
                    }`}
                    onClick={() => setPage(el)}
                >
                    {el}
                </button>
            ))}
        </div>
    </div>
}

Table.propTypes = {
    theadData: PropTypes.array,
    tbodyData: PropTypes.array
}

export default Table
