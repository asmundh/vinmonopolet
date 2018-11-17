import React, { Component } from 'react';
import ListItem from './ListItem/index';
import { Table } from 'semantic-ui-react';
import './ListView.css';
import {setSorting, setField, toggleModal} from "../../actions";
import connect from "react-redux/es/connect/connect";
import ModalChart from "../ModalChart";
import axios from "axios";

class ListView extends Component {

    // Bindings
    constructor() {
        super();
        this.handleRating = this.handleRating.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    // Handler that is run upon sorting table-elements. Will query db for a new sorted result set.
    handleSort = clickedColumn => () => {
            this.props.set_sorting({
                column: (this.props.sorting.column !== clickedColumn) ? clickedColumn : this.props.sorting.column,
                direction: (this.props.sorting.column !== clickedColumn) ?
                    'descending' : (this.props.sorting.direction === 'ascending' ? 'descending' : 'ascending')
            }).then(()=>{
                this.props.onSort(); // Inform parent of sorting-action (async)
            });
    };

    // Handler that is run upon giving a like or dislike on an item in ListItem.
    handleRating = (index, isLike) => {
        axios.put(`http://it2810-46.idi.ntnu.no:12000/Product?Varenummer=${this.props.items[index].Varenummer}&${isLike ? 'Liker' : 'Misliker'}=True`
            ).catch(error => {
                console.log('Feil');console.log(error); } );
                    //this.props.set_field(index, (isLike ? 'Liker' : 'Misliker'), true)
                    /*this.props.set_sorting(this.props.sorting).then(()=>{
                        this.props.onSort(); // Inform parent of sorting-action (async)
                    });*/

        this.props.set_field(index, isLike ? 'Liker' : 'Misliker', 1);
    };

    // Handler that is run upon clicking an item / table entry. Toggles advanced view
    toggleModal = (index) =>
        this.props.toggle_modal(index+1 ? index : this.props.index);

    // Renders modal component. Checks if items are loaded before loading.
    renderModal() {
        if(this.props.items.length > 0 && this.props.items !== undefined) {
            let item = this.props.items[this.props.index];
            return(<ModalChart
                // Is modal opened?
                open={this.props.modalOpen}
                // Handler to be run upon closing modal
                onClose={this.toggleModal}
                // Header text
                topText={item.Varenavn}
                // Misc. info
                likes={item.Liker}                                          // Integer
                dislikes={item.Misliker}                                        // Integer
                argang={item.Argang}                                       // Integer
                literPris={item.Literpris}                                 // Float
                friskhet={item.Friskhet}                                        // Integer
                bitterhet={item.Bitterhet}                                       // Integer
                sodme={item.Sodme}                                           // Integer
                lukt={item.Lukt}                                        // String
                smak={item.Smak}                                 // String
                passerTil={[item.Passertil01, item.Passertil02, item.Passertil03]}       // Array of strings
                // Show close icon?
                showCloseIcon={false}
                // Should content be centered?
                center={true}
            />);
        } else {
            return(''); // Return empty string if no items are loaded yet.
        }
    }

    render() {

        // Shortcuts for sorting
        let direction = this.props.sorting.direction, column = this.props.sorting.column;

        // Array for generating headers via functional syntax
        let headers = [{key:'Varenavn', field:'Varenavn'}, {key:'Varetype', field:'Varetype'},
            {key:'Alkohol', field:'Alkohol'}, {key:'Volum', field:'Volum'}, {key:'Pris', field:'Pris'},
            {key:'Land', field:'Land'}, /*{key:'Argang', field:'Årgang'},*/ {key:'APK', field:'Alkohol/Krone'}];

            return (
               <div>
                   {this.renderModal()}
                    <Table inverted sortable fixed selectable size={'large'}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell style={{width: "7%"}} />
                                {
                                    // Generates column headers via functional syntax
                                    headers.map(
                                        (header, i) =>
                                            (<Table.HeaderCell
                                                key={i}
                                                sorted={column === header.key ? direction : null}
                                                onClick={this.handleSort(header.key)}
                                            >
                                                {header.field}
                                            </Table.HeaderCell>)
                                    )
                                }
                                <Table.HeaderCell style={{width: "12%"}} />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body className='db-result'>
                            {
                                // Generates rows via functional syntax
                                this.props.items.map(
                                    (item, i) => <ListItem
                                                index={i}
                                                key={item.Varenummer}
                                                name={item.Varenavn}
                                                type={item.Varetype}
                                                alcohol={item.Alkohol}
                                                volume={item.Volum}
                                                price={item.Pris}
                                                country={item.Land}
                                                year={item.Argang}
                                                apk={item.APK}
                                                likes={item.Liker}
                                                dislikes={item.Misliker}
                                                handleRating={this.handleRating}
                                                onClick={this.toggleModal}
                                            />)
                            }
                        </Table.Body>
                    </Table>
                </div>
        );
    }
}

// Redux-props for accessing state and dispatching actions.
const mapState = state => ({
    sorting: state.sorting,
    modalOpen: state.modalOpen,
    index: state.index,
    items: state.items
});

const mapDispatch = dispatch => ({
    set_sorting: sorting => dispatch(setSorting(sorting)),
    set_field: (rating, isLike, val) => dispatch(setField(rating, isLike, val)),
    toggle_modal: index => dispatch(toggleModal(index))
});

export default connect(
    mapState,
    mapDispatch
)(ListView);




