import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import useTable from './useTable'
import TextField from 'components/Textfield/TextField'
import Typography from 'components/Typography/Typography'
import styles from './Table.module.scss'

const Table = ({ columns, data, rowsPerPage, onRowClick }) => {
    const [page, setPage] = useState(1)
    const [tableData, setTableData] = useState(data)
    const [search, setSearch] = useState('')
    const { slice, range } = useTable(tableData, page, rowsPerPage)

    useEffect(() => {
        if (data) {
            setTableData(data)
        }
    }, [data])

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
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {columns.map((column, i) => {
                        return (
                            <th key={i} style={column.style}>
                                <Typography variant="subtitle1" gutterBottom={false}>
                                    {column.label}
                                </Typography>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {slice.length === 0
                    ? (
                        <tr>
                            <td>Geen resultaten gevonden</td>
                        </tr>
                    )
                    : slice.map((row) => {
                        return (
                            <tr key={row.id} onClick={() => onRowClick?.(row)}>
                                {Object.keys(row).map((rowKey, i) => {
                                    const column = columns.find(c => c.key === rowKey)
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
                            </tr>
                        )
                    })}
            </tbody>
        </table>
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
    columns: PropTypes.array,
    data: PropTypes.array,
    rowsPerPage: PropTypes.number,
    onRowClick: PropTypes.func
}

export default Table
