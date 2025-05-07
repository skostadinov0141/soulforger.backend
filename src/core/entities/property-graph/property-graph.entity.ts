import { CharacterProperty } from '../character-property/character-property.entity';
import { PropertyGraphNode } from './property-graph-node.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from '../character-property/derived-number-metadata.entity';

export class PropertyGraph {
  nodes: PropertyGraphNode[];

  constructor(properties: CharacterProperty[]) {
    this.nodes = properties.map((property) => {
      return new PropertyGraphNode(property);
    });
    this.constructDependencies(this.nodes);
  }

  private constructDependencies(nodes: PropertyGraphNode[]) {
    nodes.forEach((node) => {
      const content = node.content;
      switch (content.type) {
        case PropertyTypes.TEXT:
        case PropertyTypes.NUMBER:
        case PropertyTypes.BOOLEAN:
          node.dependsOn = [];
          break;
        case PropertyTypes.DERIVED_NUMBER:
          const regex = /\$\{([a-zA-Z_][a-zA-Z0-9_-]*)}/g;
          const matches = (
            content.metadata as DerivedNumberMetadata
          ).expression.match(regex);
          if (matches) {
            node.dependsOn = matches.map((match) => {
              match = match.replace('${', '').replace('}', '');
              return nodes.find((n) => n.content.correlationId === match);
            });
          } else {
            node.dependsOn = [];
          }
          break;
      }
    });
  }

  /**
   * Generates a Mermaid graph representation of the property graph
   * @returns string containing Mermaid graph definition
   */
  public toMermaid(): string {
    let mermaidString = 'graph TD\n';

    // Add all nodes
    this.nodes.forEach((node) => {
      const nodeId = this.sanitizeId(node.content.correlationId);
      const nodeType = node.content.type;
      mermaidString += `    ${nodeId}["${node.content.correlationId} (${nodeType})"]\n`;
    });

    // Add all dependencies
    this.nodes.forEach((node) => {
      const sourceId = this.sanitizeId(node.content.correlationId);

      node.dependsOn.forEach((dependency) => {
        if (dependency) {
          const targetId = this.sanitizeId(dependency.content.correlationId);
          mermaidString += `    ${sourceId} --> ${targetId}\n`;
        }
      });
    });

    return mermaidString;
  }

  /**
   * Sanitizes IDs for Mermaid compatibility
   * @param id The original ID
   * @returns Sanitized ID safe for Mermaid
   */
  private sanitizeId(id: string): string {
    // Replace characters that might cause issues in Mermaid
    return id.replace(/[^a-zA-Z0-9]/g, '_');
  }

  tarjan() {
    const index = new Map<PropertyGraphNode, number>();
    const lowlink = new Map<PropertyGraphNode, number>();
    const stack = new Set<PropertyGraphNode>();
    // const unvisited = new Set<PropertyGraphNode>(this.nodes);
    let indexCounter = 0;
    const sccs: PropertyGraphNode[][] = [];

    function findScc(node: PropertyGraphNode) {
      // Housekeeping
      index.set(node, indexCounter);
      lowlink.set(node, indexCounter);
      stack.add(node);
      indexCounter++;

      // Visit all dependencies
      node.dependsOn.forEach((dep) => {
        if (!index.has(dep)) {
          findScc(dep);
        }
        if (stack.has(dep)) {
          lowlink.set(node, Math.min(lowlink.get(node), lowlink.get(dep)));
        }
      });

      if (index.get(node) == lowlink.get(node)) {
        const loop: PropertyGraphNode[] = [];
        for (const item of stack) {
          stack.delete(item);
          lowlink.set(item, index.get(node));
          loop.push(item);
          if (item == node) break;
        }
        sccs.push(loop);
      }
    }

    this.nodes.forEach((node) => findScc(node));
    return sccs;
  }
}
