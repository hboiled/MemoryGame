import { Difficulty } from './difficult-enum';

export class DifficultyModel {    

    constructor(
        public wordLimit: number,
        public hideBlocksOnMatch: boolean,
        public actionLimit: number,
        public setting: Difficulty        
    ) {}
}