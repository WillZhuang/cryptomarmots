//Code generated by solts. DO NOT EDIT.
import { Readable } from "stream";
interface Provider<Tx> {
    deploy(msg: Tx, callback: (err: Error, addr: Uint8Array) => void): void;
    call(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    listen(signature: string, address: string, callback: (err: Error, event: any) => void): Readable;
    payload(data: string, address?: string): Tx;
    encode(name: string, inputs: string[], ...args: any[]): string;
    decode(data: Uint8Array, outputs: string[]): any;
}
function Call<Tx, Output>(client: Provider<Tx>, addr: string, data: string, callback: (exec: Uint8Array) => Output): Promise<Output> {
    const payload = client.payload(data, addr);
    return new Promise((resolve, reject) => {
        client.call(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); });
    });
}
function Replace(bytecode: string, name: string, address: string): string {
    address = address + Array(40 - address.length + 1).join("0");
    const truncated = name.slice(0, 36);
    const label = "__" + truncated + Array(37 - truncated.length).join("_") + "__";
    while (bytecode.indexOf(label) >= 0)
        bytecode = bytecode.replace(label, address);
    return bytecode;
}
export module GeneScience {
    export function Deploy<Tx>(client: Provider<Tx>): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b5060f88061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80630d9f5aed14603757806354c15b8214608a575b600080fd5b607460048036036060811015604b57600080fd5b8101908080359060200190929190803590602001909291908035906020019092919050505060aa565b6040518082815260200191505060405180910390f35b609060ba565b604051808215151515815260200191505060405180910390f35b6000818385010190509392505050565b6000600190509056fea265627a7a7231582008db82e781ebe05351c2ea7b3ddf217f6ac91967fe266b5518e5d5919e0f557164736f6c634300050c0032";
        const data = bytecode;
        const payload = client.payload(data);
        return new Promise((resolve, reject) => {
            client.deploy(payload, (err, addr) => {
                if (err)
                    reject(err);
                else {
                    const address = Buffer.from(addr).toString("hex").toUpperCase();
                    resolve(address);
                }
            });
        });
    }
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        isGeneScience() {
            const data = Encode(this.client).isGeneScience();
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isGeneScience();
            });
        }
        mixGenes(genes1: number, genes2: number, targetBlock: number) {
            const data = Encode(this.client).mixGenes(genes1, genes2, targetBlock);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).mixGenes();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        isGeneScience: () => { return client.encode("54C15B82", []); },
        mixGenes: (genes1: number, genes2: number, targetBlock: number) => { return client.encode("0D9F5AED", ["uint256", "uint256", "uint256"], genes1, genes2, targetBlock); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        isGeneScience: (): [boolean] => { return client.decode(data, ["bool"]); },
        mixGenes: (): [number] => { return client.decode(data, ["uint256"]); }
    }; };
}