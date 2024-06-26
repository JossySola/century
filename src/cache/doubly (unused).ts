import Node from "./node (unused)";

export default class Doubly {
    head: Node | null;
    tail: Node | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToHead(data: unknown, id: string | number): Node | null{
        let currentHead = this.head;
        const newHead = new Node(data, id);

        if (typeof id === 'string' || typeof id === 'number') {
            if (!currentHead) {
                currentHead = newHead;
                this.head = currentHead;
                this.tail = currentHead;
                currentHead.setNextNode(null);
                currentHead.setPreviousNode(null);
                return this.head;
            }
    
            currentHead.setPreviousNode(newHead);
            newHead.setNextNode(currentHead);
            newHead.setPreviousNode(null);
            this.head = newHead;
            return this.head;
        } else {
            console.error('The id must be either a string or a number');
            return null
        }
    }
    addToTail(data: unknown, id: string | number): Node | null {
        let currentTail = this.tail;
        const newTail = new Node(data, id);

        if (typeof id === 'string' || typeof id === 'number') {
            if(!this.head && !this.tail) {
                currentTail = newTail;
                this.head = currentTail;
                this.tail = currentTail;
                currentTail.setNextNode(null);
                currentTail.setPreviousNode(null);
                return this.tail;
            }
    
            currentTail?.setNextNode(newTail);
            newTail.setPreviousNode(currentTail);
            newTail.setNextNode(null);
            this.tail = newTail;
            return this.tail;
        } else {
            console.error('The id must be either a string or a number');
            return null;
        }
        
    }
    removeHead(): Node | null {
        const currentHead = this.head;

        if (!currentHead) {
            console.error('There is no current head to remove.');
            return this.head;
        }
        
        const newHead = currentHead.getNextNode();

        if (!newHead) {
            this.head = null;
            return this.head;
        }

        newHead.setPreviousNode(null);
        this.head = newHead;
        return this.head;
    }
    removeTail(): Node | null {
        const currentTail = this.tail;

        if (!currentTail) {
            console.error('There is no current tail to remove');
            return this.tail;
        }

        const newTail = currentTail.getPreviousNode();
        
        if (!newTail) {
            console.error('There is no current tail to remove');
            return this.tail;
        }

        newTail.setNextNode(null);
        this.tail = newTail;
        return this.tail;
    }
    printDoubly() {
        let currentNode = this.head;
        let output = '<head> ';

        while (currentNode !== null) {
            output += `#${currentNode.data} `;
            currentNode = currentNode.getNextNode();
        }
        output += ' <tail>';
        console.log(output);
    }
}