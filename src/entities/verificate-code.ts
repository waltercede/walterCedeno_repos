interface codeVerificationInterface {
    id: number;
    state: number;
}
export class VerificateCode {
    public id: number;
    public state: number;
    constructor(id: number, state: number) {
        this.id = id;
        this.state = state
    }
}