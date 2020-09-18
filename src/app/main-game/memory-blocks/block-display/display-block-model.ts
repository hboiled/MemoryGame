
export class DisplayBlock {
    // refactor possibility? proper getters and setters    

    constructor(
        public assignedWord: string,
        public completedStatus: boolean,
        public revealed: boolean,
        public indexNum?: number // temp nullable, may remove in future
    ) {}
}