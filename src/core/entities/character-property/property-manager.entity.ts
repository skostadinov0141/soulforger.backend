import { PropertyGraph } from '../property-graph/property-graph.entity';
import { CharacterProperty } from './character-property.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from './derived-number-metadata.entity';
import { Parser } from 'expr-eval';

export class PropertyManager {
  /**
   * Returns the calculation order of properties based on their dependencies
   * @param properties Array of CharacterProperty
   * @returns Array of CharacterProperty in the order they should be calculated
   */
  private getCalculationOrder(
    properties: CharacterProperty[],
  ): CharacterProperty[] {
    // Create a new PropertyGraph instance
    const propertyGraph = new PropertyGraph(properties);
    // Initialize an empty array to hold the calculation order
    const calculationOrder: string[] = propertyGraph.topologicalSort();
    // Initialize an empty array to hold the final order
    const finalOrder: CharacterProperty[] = [];
    // Iterate through the calculation order
    for (const correlationId of calculationOrder) {
      // Find the corresponding property in the original properties array
      const property: CharacterProperty = properties.find(
        (p: CharacterProperty) => p.correlationId === correlationId,
      );
      // If found, push it to the final order
      if (property) {
        finalOrder.push(property);
      }
    }
    return finalOrder;
  }

  /**
   * Parses a derived number expression and replaces its correlation IDs with their corresponding values
   * @param property The correlation ID of the property to parse
   * @param properties Array of CharacterProperty
   * @returns The parsed expression with correlation IDs replaced by their values
   */
  private parseExpression(
    property: string,
    properties: CharacterProperty[],
  ): string {
    const propertyObject: CharacterProperty = properties.find(
      (p: CharacterProperty) => p.correlationId === property,
    );
    // If property is not found, throw an error
    if (!propertyObject) throw new Error('Property not found');
    // If the property is not a derived number, throw an error
    if (propertyObject.type !== PropertyTypes.DERIVED_NUMBER)
      throw new Error('Property is not a derived number');
    // Extract all correlation IDs from the expression
    const regex = /\$\{([a-zA-Z_][a-zA-Z0-9_-]*)}/g;
    const matches = (
      propertyObject.metadata as DerivedNumberMetadata
    ).expression.match(regex);
    // If no matches are found, return the expression as is
    if (!matches)
      return (propertyObject.metadata as DerivedNumberMetadata).expression;
    // Iterate through all matches and replace them with the corresponding property value
    let expression = (propertyObject.metadata as DerivedNumberMetadata)
      .expression;
    matches.forEach((match) => {
      // Remove the ${} from the match to get the correlation ID
      const correlationId = match.replace('${', '').replace('}', '');
      // Find the corresponding property in the original properties array
      const foundProperty: CharacterProperty = properties.find(
        (p: CharacterProperty) => p.correlationId === correlationId,
      );
      // If the property is not found, throw an error
      if (!foundProperty)
        throw new Error(`Property ${correlationId} not found`);
      // If found, replace the match with its value
      expression = expression.replace(match, foundProperty.value);
    });
    // Return the modified expression
    return expression;
  }

  /**
   * Safely evaluates a mathematical expression
   * @param expression The expression to evaluate
   * @returns The result of the expression
   */
  private evaluateExpression(expression: string): number {
    const expr = new Parser().parse(expression);
    const result = expr.evaluate();
    // Check if the result is a number
    if (typeof result === 'number') {
      return result;
    } else {
      throw new Error('Expression did not evaluate to a number');
    }
  }

  /**
   * Calculates the properties based on their dependencies
   * @param properties Array of CharacterProperty
   * @returns Array of CharacterProperty with calculated values
   */
  calculateProperties(properties: CharacterProperty[]): CharacterProperty[] {
    // Get the calculation order
    const calculationOrder = this.getCalculationOrder(properties);
    // Iterate through the properties in the calculation order
    for (const property of calculationOrder) {
      // If the property is a derived number, parse and evaluate its expression
      if (property.type === PropertyTypes.DERIVED_NUMBER) {
        const expression = this.parseExpression(
          property.correlationId,
          properties,
        );
        // Set the value of the property to the result
        property.value = this.evaluateExpression(expression);
      }
    }
    return properties;
  }
}
