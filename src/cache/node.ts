export default class Node {
    data: unknown;
    next: null | Node;
    previous: null | Node;
    id: string | number;

    constructor (data: unknown, id: string) {
        this.data = data;
        this.id = id;
        this.next = null;
        this.previous = null;
    }

    setNextNode(node: Node | null): void {
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error('You have to set a Node instance.');
        }
    }
    getNextNode(): Node | null{
        return this.next;
    }
    setPreviousNode(node: Node | null): void {
        if (node instanceof Node || node === null) {
            this.previous = node;
        } else {
            throw new Error('You have to set a Node instance.');
        }
    }
    getPreviousNode(): Node | null {
        return this.previous;
    }
}