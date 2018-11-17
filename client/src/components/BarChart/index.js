import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';


class BarChart extends Component {

    // Standardrops in case no props are sent into the component
    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        topText: 'data',
    };

    render() {

        return(
            <div className="chart">
                <Bar
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: 'Number of units',
                            text: this.props.topText,
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition,
                        }
                    }}
                />
            </div>
        )
    }

}

export default BarChart;