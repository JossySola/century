import Doubly from "./doubly";
import Node from "./node";

export default class Cache extends Doubly {
    constructor() {
        super();
    }

    print() {
        let currentNode = this.head;
        let output = '<First> ';

        while(currentNode !== null) {
            output += `#${currentNode.id} `;
            currentNode = currentNode.getNextNode();
        }
        output += ' <Last>';
        console.log(output);
    }
    reset() {
        this.head = null;
        this.tail = null;
    }
    add(data: unknown, id: string): Node {
        if (this.isEmpty()) {
            return this.addToHead(data, id);
        }
        return this.addToTail(data, id);
    }
    isEmpty(): boolean {
        if (!this.head && !this.tail) {
            return true;
        } else {
            return false;
        }
    }
    get(id: string): unknown | null {
        let currentNode = this.head;

        while(currentNode !== null) {
            if (currentNode.id === id) {
                return currentNode.data;
            }
            currentNode = currentNode.getNextNode();
        }

        return null;
    }
}