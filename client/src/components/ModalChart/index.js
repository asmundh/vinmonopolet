import React, { Component } from 'react';
import BarChart from '../BarChart';
import DoughnutChart from '../DoughnutChart';
import Modal from "react-responsive-modal";

class ModalChart extends Component {

    render() {
        // Structures props into compatible format for the charts
        let feedbackData = getFeedback(this.props.likes, this.props.dislikes);
        let tasteData = getTastes(this.props.friskhet, this.props.bitterhet, this.props.sodme);
        return (
            <div>
                <Modal
                    open={this.props.open}
                    onClose={() => this.props.onClose(-1)}
                    blockScroll={false}
                    showCloseIcon={false}
                    center={this.props.center}
                    styles={{modal:{overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}}
                    animationDuration={200}
                >
                    <div style={{padding: "10px"}}>
                        <h2>{this.props.topText}</h2><br/>
                        <div style={{
                            display:"grid", gridTemplateColumns: "2fr 2fr", gridTemplateRows: "2fr 2fr",
                            gridRow: "auto auto", gridColumnGap: "20px", gridRowGap: "20px"}}>
                            <div style={{display: "flex", alignItems: "top", justifyContent: "center"}}>
                                <p><b>Smak</b><br/>{this.props.smak}</p>
                                <p style={{marginLeft: "10px"}}><b>Lukt</b><br/>{this.props.lukt}</p>
                            </div>
                            <div>
                                <b>Passer til</b><br/>
                                {this.props.passerTil.map((s, i) => s !== '' ? <li key={i}>{s}</li> : '')}
                            </div>
                            <div>
                                <b>Årgang</b><br/>
                                {this.props.argang}
                            </div>
                            <div>
                                <b>Literpris</b><br/>
                                {this.props.literPris}
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <DoughnutChart
                                    chartData={tasteData}
                                    legendPosition="bottom"
                                    topText="Smakssammensetning"
                                />
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <BarChart
                                    chartData={feedbackData}
                                    legendPosition="bottom"
                                    topText="Tilbakemeldinger"
                                    displayLegend={false}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

    // Retrieves data for the Like/Dislike graph
const getFeedback = (likes, dislikes) => {
    return {
        labels: ['Liker', 'Misliker'],
            datasets: [{
            label: '',
            data: [likes, dislikes, 0],
            backgroundColor: ['rgba(10, 255, 25, 0.6)', 'rgba(255, 0, 0, 0.6)'],
        }],
    };
};

    // Retrieves data for the tastes-graph
const getTastes = (frisk, bitter, sodme) => {
    return {
        labels: ['Friskhet', 'Bitterhet', 'Sødme'],
        datasets: [{
            label: 'Fjern data',
            data: [frisk, bitter, sodme, 0],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 245, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        }],
    };
};

export default ModalChart;