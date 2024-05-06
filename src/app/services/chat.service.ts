import { Injectable } from '@angular/core';
import { Chat } from '../chat';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Message } from '../message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/*export class ChatService {

 /* baseUrl = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { }


  updateChat(message: Message, chatId: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/chats/message/" + `${chatId}`, message);
  }

  getChatById(chatId: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/" + chatId)
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/addWithMessages", chat);
  }

  getChatByFirstUserNameAndSecondUserName(firstUserName: String, secondUserName: String) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameAndSecondUserName" + '?firstUserName=' + firstUserName + '&secondUserName=' + secondUserName)
  }

  getChatByFirstUserNameOrSecondUserName(username: any) {
    if (username !== null) {
      return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameOrSecondUserName/" + username);
    } else {
      // Gérer le cas où username est null, par exemple, renvoyer un Observable vide ou générer une erreur
      return EMPTY; // Ou renvoyer un Observable vide
    }
  }
  
  
}*/

export class ChatService {

  baseUrl = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { }


  updateChat(message: Message, chatId: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/chats/message/" + `${chatId}`, message);
  }

  getChatById(chatId: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/" + chatId)
  }

  addMessageToChatRoom(message: Message): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/add/message1", message);
  }

  getAllMessagesByChatId(chatId: any) {
    return this.httpClient.get<Message[]>(this.baseUrl + "/chats/all/messages/from/chat/" + chatId)
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/chats/add", chat);
  }

  getChatByFirstUserNameAndSecondUserName(firstUserName: String, secondUserName: String) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameAndSecondUserName" + '?firstUserName=' + firstUserName + '&secondUserName=' + secondUserName)
  }

  getChatByFirstUserNameOrSecondUserName(username: any) {
    return this.httpClient.get<Chat>(this.baseUrl + "/chats/getChatByFirstUserNameOrSecondUserName/" + username)
  }

  searchMessagesByWord(chatId: number, word: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.baseUrl}/chats/${chatId}/search?word=${word}`);
  }
}
