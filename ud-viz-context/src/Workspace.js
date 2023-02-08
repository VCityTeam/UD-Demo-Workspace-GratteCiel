import * as d3 from 'd3';
import { tokenizeURI } from './URI';
import { SparqlQueryWindow } from '../View/SparqlQueryWindow';
import { Graph } from '../UD-Viz/packages/browser/src/Component/Widget/Server/SPARQL/Model/Graph';

export class Workspace extends Graph {
  /**
   * Create a new D3 graph from an RDF JSON object.
   * Adapted from https://observablehq.com/@d3/force-directed-graph#chart and
   * https://www.d3indepth.com/zoom-and-pan/
   *
   * @param {SparqlQueryWindow} window the window this graph is attached to.
   * @param {object} configSparql The sparqlModule configuration.
   * @param {number} configSparql.height The SVG height.
   * @param {number} configSparql.width The SVG width.
   * @param {number} configSparql.fontSize The font size to use for node and link labels.
   * @param {object} configSparql.prefixes Prefix declarations which will replace text labels in the Legend.
   *                                       This doesn't (yet) affect the legend font size.
   */
  constructor(window, configSparql) {
    super(window, configSparql);
  }

  // / Data Functions ///

  /**
   * Create a new graph based on an graph dataset.
   *
   * @param {object} response an RDF JSON object.
   */
  update(response) {
    const data = this.formatResponseData(response);
    this.clear();

    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));
    const legend = data.legend;
    const setColor = function (d, default_color, override_color = undefined) {
      if (override_color && data.colorSetOrScale) return override_color;
      else if (data.colorSetOrScale) return data.colorSetOrScale(d);
      return default_color;
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-60))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const zoom = d3.zoom().on('zoom', this.handleZoom);

    this.svg.call(zoom);

    const link = this.svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = this.svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 4)
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 0.75)
      .attr('stroke', (d) => setColor(d.color_id, '#ddd', '#111'))
      .attr('fill', (d) => setColor(d.color_id, 'black'))
      .on('click', (event) => {
        this.window.sendEvent(
          Graph.EVENT_NODE_CLICKED,
          event.target.textContent
        );
      })
      .on('mouseover', (event, d) => {
        event.target.style['stroke'] = setColor(
          nodes[d.index].color_id,
          'white',
          'white'
        );
        event.target.style['fill'] = setColor(nodes[d.index].color_id, '#333');
        node_label
          .filter((e, j) => {
            return d.index == j;
          })
          .style('fill', 'white')
          .style('opacity', '1');
        link_label
          .filter((e) => {
            return d.index == e.source.index || d.index == e.target.index;
          })
          .style('fill', 'white')
          .style('opacity', '1');
        this.window.sendEvent(
          Graph.EVENT_NODE_MOUSEOVER,
          event.target.textContent
        );
      })
      .on('mouseout', (event, d) => {
        event.target.style['stroke'] = setColor(
          nodes[d.index].color_id,
          '#ddd',
          '#111'
        );
        event.target.style['fill'] = setColor(nodes[d.index].color_id, 'black');
        node_label
          .filter((e, j) => {
            return d.index == j;
          })
          .style('fill', 'grey')
          .style('opacity', '0.5');
        link_label
          .filter((e) => {
            return d.index == e.source.index || d.index == e.target.index;
          })
          .style('fill', 'grey')
          .style('opacity', '0.5');
        this.window.sendEvent(
          Graph.EVENT_NODE_MOUSEOUT,
          event.target.textContent
        );
      })
      .call(this.drag(simulation));

    node.append('title').text((d) => d.id);

    const node_label = this.svg
      .selectAll('.node_label')
      .data(nodes)
      .enter()
      .append('text')
      .text(function (d) {
        const uri = tokenizeURI(d.id);
        return uri.id;
      })
      .style('text-anchor', 'middle')
      .style('font-family', 'Arial')
      .style('font-size', this.fontSize)
      .style('text-shadow', '1px 1px black')
      .style('fill', 'grey')
      .style('opacity', '0.5')
      // .style('fill', 'white')
      // .style('visibility', 'hidden')
      .style('pointer-events', 'none')
      .attr('class', 'node_label');

    const link_label = this.svg
      .selectAll('.link_label')
      .data(links)
      .enter()
      .append('text')
      .text(function (d) {
        const label = tokenizeURI(d.label);
        return label.id;
      })
      .style('text-anchor', 'middle')
      .style('font-family', 'Arial')
      .style('font-size', this.fontSize)
      .style('text-shadow', '1px 1px black')
      .style('fill', 'grey')
      .style('opacity', '0.5')
      // .style('fill', 'white')
      // .style('visibility', 'hidden')
      .style('pointer-events', 'none')
      .attr('class', 'link_label');

    simulation.on('tick', () => {
      node_label
        .attr('x', function (d) {
          return d.x;
        })
        .attr('y', function (d) {
          return d.y - 10;
        });
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      link_label
        .attr('x', function (d) {
          return (d.source.x + d.target.x) / 2;
        })
        .attr('y', function (d) {
          return (d.source.y + d.target.y) / 2;
        });
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    // Create legend
    this.svg
      .append('text')
      .attr('x', 12)
      .attr('y', 24)
      .style('font-size', '18px')
      .style('text-decoration', 'underline')
      .text(legend.title)
      .style('fill', 'FloralWhite');

    // legend colors
    this.svg
      .append('g')
      .attr('stroke', '#111')
      .attr('stroke-width', 1)
      .selectAll('rect')
      .data(legend.content)
      .join('rect')
      .attr('x', 12)
      .attr('y', (d, i) => 32 + i * 16)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', (d, i) => {
        return setColor(i, '#000');
      })
      .append('title')
      .text((d) => d);

    // legend text
    this.svg
      .append('g')
      .selectAll('text')
      .data(legend.content)
      .join('text')
      .attr('x', 26)
      .attr('y', (d, i) => 41 + i * 16)
      .text((d) => d)
      .style('fill', 'FloralWhite')
      .style('font-size', '14px');
  }

  /**
   * return a SPARQL endpoint query response formatted for a D3.js graph.
   *
   * @param {object} response A JSON object returned by a SparqlEndpointResponseProvider.EVENT_ENDPOINT_RESPONSE_UPDATED event
   * @returns {object} A data object formatted for constructing a D3.js graph svg
   */
  formatResponseData(response) {
    const graphData = {
      nodes: [
        // { id: 'x', color_id: 1 },
        // { id: 'y', color_id: 2 },
      ],
      links: [
        // { source: 'x', target: 'y', value: 1 }
      ],
      legend: {
        title: '',
        content: [],
      },
      colorSetOrScale: d3.scaleOrdinal(d3.schemeCategory10),
    };

    if (
      response.head.vars.includes('subject') &&
      response.head.vars.includes('predicate') &&
      response.head.vars.includes('object')
    ) {
      if (
        response.head.vars.includes('subjectType') &&
        response.head.vars.includes('objectType')
      ) {
        /* If the query is formatted using subject, subjectType, predicate, object,
           and objectType variables the node color based on the type of the subject
           or object's respective type */
        for (const triple of response.results.bindings) {
          if (
            // if the subject doesn't exist yet
            graphData.nodes.find((n) => n.id == triple.subject.value) ==
            undefined
          ) {
            const subjectTypeId = this.getNodeColorId(triple.subjectType.value);
            const node = { id: triple.subject.value, color_id: subjectTypeId };
            graphData.nodes.push(node);
          }
          if (
            // if the object doesn't exist yet
            graphData.nodes.find((n) => n.id == triple.object.value) ==
            undefined
          ) {
            let objectTypeId;
            if (
              // if there is an objectType
              triple.objectType
            ) {
              objectTypeId = this.getNodeColorId(triple.objectType.value);
            } else {
              // if not color it black
              objectTypeId = undefined;
            }
            const node = { id: triple.object.value, color_id: objectTypeId };
            graphData.nodes.push(node);
          }
          const link = {
            source: triple.subject.value,
            target: triple.object.value,
            label: triple.predicate.value,
          };
          graphData.links.push(link);
          graphData.legend.title = 'Legend';
          graphData.legend.content = this.typeList;
        }
      } else {
        /* If the query is formatted using just subject, predicate, and object,
           variables the node color is left black */
        for (const triple of response.results.bindings) {
          if (
            // if the subject doesn't exist yet
            graphData.nodes.find((n) => n.id == triple.subject.value) ==
            undefined
          ) {
            const node = { id: triple.subject.value, color_id: undefined };
            graphData.nodes.push(node);
          }
          if (
            // if the object doesn't exist yet
            graphData.nodes.find((n) => n.id == triple.object.value) ==
            undefined
          ) {
            const node = { id: triple.object.value, color_id: undefined };
            graphData.nodes.push(node);
          }
          const link = {
            source: triple.subject.value,
            target: triple.object.value,
            label: triple.predicate.value,
          };
          graphData.links.push(link);
          graphData.legend.title = '';
          graphData.colorSetOrScale = undefined;
        }
      }
    } else {
      console.warn(
        'Unrecognized endpoint response format for graph construction'
      );
    }

    console.debug(graphData);
    return graphData;
  }
}
