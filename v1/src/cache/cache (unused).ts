import Doubly from "./doubly (unused)";
import Node from "./node (unused)";

export default class Cache extends Doubly {
    size: number;
    constructor() {
        super();
        this.size = 0;
    }

    print(): void {
        let currentNode = this.head;
        let output = '<First> ';

        while(currentNode !== null) {
            output += `#${currentNode.id} `;
            currentNode = currentNode.getNextNode();
        }
        output += ' <Last>';
        console.log(output);
    }
    reset(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    add(data: unknown, id: string | number): Node | null {
        if (data && id) {
            if (typeof id === 'string' || typeof id === 'number') {
                if (this.isEmpty()) {
                    this.size++;
                    return this.addToHead(data, id);
                }
        
                let currentNode = this.head;
                while(currentNode !== null) {
                    if (currentNode.id === id) {
                        return currentNode;
                    }
                    currentNode = currentNode.getNextNode();
                }
                this.size++;
                return this.addToTail(data, id);
            } else {
                console.error('The id must be either a string or a number');
                return null;
            }    
        } else {
            console.error('Cannot add a falsey value or an empty argument');
            return null;
        }
    }
    remove(id: string | number): null {
        if (id) {
            if(typeof id === 'string' || typeof id === 'number') {
                if (this.isEmpty()) {
                    return null;
                }
                let currentNode = this.head;
                while(currentNode !== null) {
                    if (currentNode.id === id) {
                        const previous = currentNode.getPreviousNode();
                        const next = currentNode.getNextNode();
                        previous?.setNextNode(next);
                        next?.setPreviousNode(previous);
                        this.size--;
                        return null;
                    }
                    currentNode = currentNode.getNextNode();
                }
                return null;
            } else {
                console.error('The id must be either a string or a number');
                return null;
            }
        } else {
            console.error('You must specify an id.');
            return null;
        }
    }
    isEmpty(): boolean {
        if (!this.head && !this.tail) {
            return true;
        } else {
            return false;
        }
    }
    get(id: string | number): unknown | null {
        let currentNode = this.head;

        if (id) {
            if (typeof id === 'string' || typeof id === 'number') {
                while(currentNode !== null) {
                    if (currentNode.id === id) {
                        return currentNode.data;
                    }
                    currentNode = currentNode.getNextNode();
                }
                return null;
            } else {
                console.error('The id must be either a string or a number');
                return null;
            }
        } else {
            console.error('You must specify an id.');
            return null;
        }
    }
    length(): number {
        return this.size;
    }
}