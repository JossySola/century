import Doubly from "./doubly";
import Node from "./node";

export default class Cache extends Doubly {
    size: number;
    constructor() {
        super();
        this.size = 0;
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
        this.size = 0;
    }
    add(data: unknown, id: string): Node | null {
        if (data && id) {
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
            console.error('Cannot add a falsey value');
            return null;
        }
    }
    remove(id: string): null {
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
    length() {
        return this.size;
    }
}