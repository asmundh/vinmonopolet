import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import './ListItem.css';

class ListItem extends Component {

    // Bindings
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }

    // Handler for user selecting an item
    handleChange = () => {
        this.props.onClick(this.props.index);
    };

    // Handler for user giving a rating (like/dislike)
    handleRating = (isLike) =>
        this.props.handleRating(this.props.index, isLike);

    // Returns appropriate icon-type based on keywords in item type.
    getIconType = () => {
        if(this.props.type.toLowerCase().includes("vin")) return "wine";
        if(this.props.type.toLowerCase().includes("cha")) return "wine";
        else if(this.props.type.toLowerCase().includes("øl")) return "beer";
        else if(this.props.type.toLowerCase().includes("ale")) return "beer";
        else if(this.props.type.toLowerCase().includes("lager")) return "beer";
        else if(this.props.type.toLowerCase().includes("saison")) return "beer";
        else return "liquor";
    };

    render() {
        return (
                <Table.Row className='db-item' style={{cursor: "pointer"}}>
                    <Table.Cell className='db-item-field-image'
                                onClick={() => this.handleChange()} textAlign={"center"}>
                        <div className={"image-container"}>
                            <img className="item-icon" src={require(`../../../resources/${this.getIconType()}icon.png`)}
                                alt={"Icon"} />
                        </div>
                    </Table.Cell>
                    <Table.Cell className='db-item-field-name' onClick={() => this.handleChange()} >{this.props.name}</Table.Cell>
                    <Table.Cell className='db-item-field-type' onClick={() => this.handleChange()} >{this.props.type}</Table.Cell>
                    <Table.Cell className='db-item-field-alcohol' onClick={() => this.handleChange()} >{this.props.alcohol}</Table.Cell>
                    <Table.Cell className='db-item-field-volume' onClick={() => this.handleChange()} >{this.props.volume}</Table.Cell>
                    <Table.Cell className='db-item-field-price' onClick={() => this.handleChange()} >{this.props.price}</Table.Cell>
                    <Table.Cell className='db-item-field-country' onClick={() => this.handleChange()} >{this.props.country}</Table.Cell>
                    <Table.Cell className='db-item-field-apk' onClick={() => this.handleChange()}>
                        <b style={this.props.apk < 0.05 ? {color: `rgba(206, 58, 28, ${(1-this.props.apk*10)})`} :
                            {color: `rgba(89, 204, 22, ${this.props.apk*10})`}}>
                        {Math.round(this.props.apk*1000)/1000}</b>
                    </Table.Cell>
                    <Table.Cell className='db-item-field-rating' textAlign={'center'}>
                        <div style={{overflow: "hidden"}}>
                            <Icon name={"thumbs down outline"} id="thumbs-down" onClick={() => this.handleRating(false)}/>
                            <b id="score" style={
                                (this.props.likes-this.props.dislikes) < 0 ? {color: "#ce3a1c"} : {color: "#59cc16"}
                            }>{(this.props.likes-this.props.dislikes)}</b>
                            <Icon name={"thumbs up outline"} id="thumbs-up" onClick={() => this.handleRating(true)}
                                  style={{marginLeft: "5px"}}/>
                        </div>
                    </Table.Cell>
                </Table.Row>
        );
    }
}

export default ListItem;
