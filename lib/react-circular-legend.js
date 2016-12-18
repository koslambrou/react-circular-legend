import React, { PropTypes, Component } from 'react';
import * as d3 from 'd3';
import numeral from 'numeral';

const propTypes = {
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  domainMax: PropTypes.number,
  domainMin: PropTypes.number,
  rangeMax: PropTypes.number,
  rangeMin: PropTypes.number,
  tickExtend: PropTypes.number,
  textMargin: PropTypes.number
};

const defaultProps = {
  tickExtend: 5,
  textMargin: 5,
  rangeMax: 50,
  rangeMin: 0
};

function renderTick(tick, index, r, xEndTick, textMargin){
  const textStyle = {
    fontSize: '10px',
    fontSamily: 'sans-serif',
    textAnchor: 'end',
  };

  const lineStyle = {
    stroke: '#000',
    shapeRendering: 'crispEdges',
  };

  const circleStyle = {
    stroke: '#ccc',
    strokeDasharray: '4, 2',
    fill: 'none',
    transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1) 10ms'
  };

  return (
    <g
      className={'tick'}
      key={index}
    >
      <circle
        cx={0}
        cy={-r}
        r={r}
        style={circleStyle}
      />
      <line
        y1={-r}
        y2={-r}
        x1={-r}
        x2={-xEndTick}
        style={lineStyle}
      />
      <text
        dy={'.35em'}
        transform={`translate(${-xEndTick-textMargin}, ${-r})`}
        style={textStyle}
      >
        {numeral(tick).format('(0.0a)').toUpperCase()}
      </text>
    </g>
  );
}

class CircularLegend extends Component {
  render() {
    const {
      ticks,
      rangeMax,
      rangeMin,
      tickExtend,
      textMargin,
    } = this.props;

    const domainMax = this.props.domainMax || d3.max(ticks);
    const domainMin = this.props.domainMin || 0;

    const scale = d3.scaleLinear()
      .domain([domainMin, domainMax])
      .range([rangeMin, rangeMax]);

    const sortedTicks = ticks.sort(d3.descending);
    const xEndTick = scale(sortedTicks[0]) + tickExtend;
    const maxDiameter = scale(sortedTicks[0])*2;
    const maxLabelLength = String(sortedTicks[0]).length;

    return (
      <g className={'circle-legend'} transform={`translate(${maxDiameter+maxLabelLength}, ${maxDiameter})`}>
        {sortedTicks.map((tick, index) => renderTick(tick, index, scale(tick), xEndTick, textMargin))}
      </g>
    );
  }
}

CircularLegend.propTypes = propTypes;
CircularLegend.defaultProps = defaultProps;
export default CircularLegend;
