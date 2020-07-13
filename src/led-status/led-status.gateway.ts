import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {LedStatusService} from "./led-status.service";
import {Subscription} from "rxjs";

import {Server, Socket} from 'socket.io';

@WebSocketGateway()
export class LedStatusGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;

    subscriptions: Map<Socket, Subscription>;

    constructor(
        private readonly ledStatusService: LedStatusService,
    ) {
        this.subscriptions = new Map();
    }

    afterInit(server: any) {
        console.log('Gateway initialized');
    }

    handleConnection(client: Socket): void {
        client.emit('status', this.ledStatusService.ledStatus);

        this.subscriptions.set(
            client,
            this.ledStatusService.ledStatusSubject.subscribe(value => client.emit('status', value)))
    }

    handleDisconnect(client: Socket): void {
        this.subscriptions.get(client).unsubscribe();
    }
}