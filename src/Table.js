import React, { Component } from 'react';
import './Table.css';

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Reference</th>
            <th>Name</th>
            <th>Price</th>
            <th>Gender</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Description</th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tbody>
            <tr key={index}>
                <td>{row.reference}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td>{row.gender}</td>
                <td>{row.category}</td>
                <td>{row.subcategory}</td>
                <td>{row.description}</td>
                <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
            </tr>
            </tbody>
        );
    });

    return <tbody>{rows}</tbody>;
}


class Table extends Component {
    render() {
        const { characterData, removeCharacter } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody
                    characterData={characterData}
                    removeCharacter={removeCharacter}
                />
            </table>
        );
    }
}

export default Table;