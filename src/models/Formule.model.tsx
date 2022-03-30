export class Formule {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public quantity: number,
        public isActive: boolean,
        public productType: number,
        public expirationDateTime: string,
        public image: string,
    ) {}
}