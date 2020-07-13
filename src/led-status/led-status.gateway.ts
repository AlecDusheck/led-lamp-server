import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {LedStatusService} from "./led-status.service";
import {Subscription} from "rxjs";

WebSocketGateway()
export class LedStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    subscriptions: Map<Socket, Subscription>;

    constructor(
        private readonly ledStatusService: LedStatusService,
    ) {
        this.subscriptions = new Map();
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