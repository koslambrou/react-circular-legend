import React, { PropTypes, Component } from 'react';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { max as d3Max, descending as d3Descending } from 'd3-array';
import numeral from 'numeral';

const propTypes = {
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  domainMax: PropTypes.number,
  domainMin: PropTypes.number,
  rangeMax: PropTypes.number,
  rangeMin: PropTypes.number,
  tickExtend: PropTypes.number,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  innerSvg: PropTypes.bool,
};

const defaultProps = {
  tickExtend: 5,
  textMargin: 5,
  rangeMax: 50,
  rangeMin: 0,
  fontSize: 10,
  innerSvg: false,
};

function renderTick(tick, index, r, xEndTick, textMargin, fontSize){
  const textStyle = {
    fontSize: fontSize,
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
      fontSize,
      innerSvg,
    } = this.props;

    const domainMax = this.props.domainMax || d3Max(ticks);
    const domainMin = this.props.domainMin || 0;

    const scale = d3ScaleLinear()
      .domain([domainMin, domainMax])
      .range([rangeMin, rangeMax]);

    const sortedTicks = ticks.sort(d3Descending);
    const xEndTick = scale(sortedTicks[0]) + tickExtend;
    const wordWidth = fontSize/12 * 7;

    const getFormatTextLength = (tick) => String(numeral(tick).format('(0.0a)').toUpperCase()).length;

    const maxText = sortedTicks.reduce((a, b) => getFormatTextLength(a) > getFormatTextLength(b) ? a : b );
    const maxTextWidth = getFormatTextLength(maxText) * wordWidth;

    const diameter = rangeMax * 2;

    const renderGelement = (
      <g className={'circle-legend'} transform={`translate(${xEndTick+textMargin+maxTextWidth}, ${diameter})`}>
        {sortedTicks.map((tick, index) => renderTick(tick, index, scale(tick), xEndTick, textMargin, fontSize))}
      </g>
    );

    return innerSvg ? renderGelement : (
      <svg width={rangeMax*2.5} height={rangeMax*2.5}>
        {renderGelement}
      </svg>
    );
  }
}

CircularLegend.propTypes = propTypes;
CircularLegend.defaultProps = defaultProps;
export default CircularLegend;
