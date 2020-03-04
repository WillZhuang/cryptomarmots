import { MarmotCore } from "./contracts/CryptoMarmots";
import { Client } from "./client";
import { CallTx } from "@hyperledger/burrow/proto/payload_pb";
import { GeneScience } from "./contracts/GeneScience";

export async function Deploy(account: string): Promise<MarmotCore.Contract<CallTx>> {
    const client = new Client('localhost:10997', account);
    const kittyCoreAddress = await MarmotCore.Deploy(client);
    console.log(`Address: ${kittyCoreAddress}\n`);
    const kittyCore = new MarmotCore.Contract(client, kittyCoreAddress);
    const geneScienceAddress = await GeneScience.Deploy(client);
    await kittyCore.setGeneScienceAddress(geneScienceAddress);
    await kittyCore.setCFO(account);
    await kittyCore.setCOO(account);
    return kittyCore;
}

