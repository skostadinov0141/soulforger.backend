import { CharacterProperty } from '../character-property/character-property.entity';
import { PropertyGraphNode } from './property-graph-node.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from '../character-property/derived-number-metadata.entity';

export class PropertyGraph {
  nodes: PropertyGraphNode[];

  constructor(properties: CharacterProperty[]) {
    // Initialize nodes from properties
    this.nodes = properties.map((property) => {
      return new PropertyGraphNode(property);
    });
    // Construct dependencies between nodes
    this.constructDependencies(this.nodes);
  }

  /**
   * Constructs dependencies between nodes based on their content
   * @param nodes Array of PropertyGraphNode
   */
  private constructDependencies(nodes: PropertyGraphNode[]) {
    // Iterate through each node and set its dependencies
    nodes.forEach((node) => {
      // Extract the content of the node
      const content = node.content;
      switch (content.type) {
        // If the property is a derived number, find its dependencies
        case PropertyTypes.DERIVED_NUMBER:
          // Extract all correlation IDs from the expression
          const regex = /\$\{([a-zA-Z_][a-zA-Z0-9_-]*)}/g;
          const matches = (
            content.metadata as DerivedNumberMetadata
          ).expression.match(regex);
          // If matches are found, set the dependencies
          if (matches) {
            node.dependsOn = matches.map((match) => {
              // Remove the ${} from the match to get the correlation ID
              match = match.replace('${', '').replace('}', '');
              // Find the corresponding node in the node array and return it
              return nodes.find((n) => n.content.guid === match);
            });
          } else {
            // If no matches are found, set an empty array
            node.dependsOn = [];
          }
          break;

        // If the property is not a derived number, set an empty array for dependencies
        default:
          node.dependsOn = [];
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
      const nodeId = this.sanitizeId(node.content.guid);
      const nodeType = node.content.type;
      mermaidString += `    ${nodeId}["${node.content.guid} (${nodeType})"]\n`;
    });

    // Add all dependencies
    this.nodes.forEach((node) => {
      const sourceId = this.sanitizeId(node.content.guid);

      node.dependsOn.forEach((dependency) => {
        if (dependency) {
          const targetId = this.sanitizeId(dependency.content.guid);
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

  /**
   * Tarjan's algorithm to find strongly connected components (SCCs)
   * @returns Array of strongly connected components, each represented as an array of PropertyGraphNode
   */
  private tarjan(): PropertyGraphNode[][] {
    const index = new Map<PropertyGraphNode, number>();
    const lowLink = new Map<PropertyGraphNode, number>();
    const onStack = new Map<PropertyGraphNode, boolean>();
    const stack: PropertyGraphNode[] = [];
    let indexCounter = 0;
    const sccs: PropertyGraphNode[][] = [];

    const strongConnect = (node: PropertyGraphNode) => {
      // Set the depth index for node
      index.set(node, indexCounter);
      lowLink.set(node, indexCounter);
      indexCounter++;
      stack.push(node);
      onStack.set(node, true);

      // Consider successors of node
      node.dependsOn.forEach((dep) => {
        if (dep) {
          // Ensure dependency exists
          if (!index.has(dep)) {
            // Successor has not yet been visited; recurse on it
            strongConnect(dep);
            lowLink.set(node, Math.min(lowLink.get(node), lowLink.get(dep)));
          } else if (onStack.get(dep)) {
            // Successor is in stack and hence in the current SCC
            // If successor is not on stack, then (node, successor) is a cross-edge
            // in the DFS tree and must be ignored
            lowLink.set(node, Math.min(lowLink.get(node), index.get(dep)));
          }
        }
      });

      // If node is a root node, pop the stack and generate an SCC
      if (lowLink.get(node) === index.get(node)) {
        const scc: PropertyGraphNode[] = [];
        let w: PropertyGraphNode;
        do {
          w = stack.pop();
          onStack.set(w, false);
          scc.push(w);
        } while (w !== node);

        sccs.push(scc);
      }
    };

    // Call strongConnect for each unvisited node
    this.nodes.forEach((node) => {
      if (!index.has(node)) {
        strongConnect(node);
      }
    });

    return sccs;
  }

  /**
   * Returns all cycles in the graph
   * @returns Array of cycles, each represented as an array of PropertyGraphNode
   */
  getCycles(): PropertyGraphNode[][] {
    return this.tarjan().filter((item) => item.length > 1);
  }

  /**
   * Checks if the graph has cycles
   * @returns boolean indicating if the graph has cycles
   */
  hasCycles(): boolean {
    return this.getCycles().length != 0;
  }

  /**
   * Performs a topological sort on the graph
   * @returns Array of correlation IDs in topologically sorted order
   */
  topologicalSort(): string[] {
    // Top sort is not possible if the graph has cycles
    if (this.hasCycles()) throw new Error('Graph has cycles');

    // Initialize visited set, stack, and result array
    const visited = new Set<PropertyGraphNode>();
    const stack: PropertyGraphNode[] = [];
    const result: PropertyGraphNode[] = [];

    const visit = (node: PropertyGraphNode) => {
      // If the node has not been visited, mark it as visited and visit its dependencies
      if (!visited.has(node)) {
        visited.add(node);
        // Recursively visit all dependencies
        node.dependsOn.forEach((dep) => {
          if (dep) {
            visit(dep);
          }
        });
        // Push the node onto the stack after visiting all dependencies
        stack.push(node);
      }
    };

    // Visit all nodes
    this.nodes.forEach((node) => {
      visit(node);
    });

    // Pop all nodes from the stack to get the topological order
    while (stack.length > 0) {
      result.push(stack.pop());
    }

    // Return the correlation IDs of the nodes in topologically sorted order
    // Reverse the result to get the correct order
    return result.reverse().map((i) => i.content.guid);
  }
}
