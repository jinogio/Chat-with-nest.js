import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { send } from 'process';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected:${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    const { from } = client.handshake.headers;

    this.logger.log(`client connected:${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleUserSendMessage(client: Socket, payload: IUpdate): void {
    const { id, message } = payload;

    this.wss.emit('joinRoom', payload);
  }

  @SubscribeMessage('edit')
  handleEdit(client: Socket, payload: any): void {
    this.wss.emit('edit', payload);
  }
  @SubscribeMessage('delete')
  handleDelete(client: Socket, payload: any): void {
    this.wss.emit('delete', payload);
  }
}

interface IUpdate {
  message: string;
  id: string;
}
