import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../chat';
import { Message } from '../message';
import { ChatService } from '../services/chat.service';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';






@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] ,

})
export class ChatComponent implements OnInit {

  userImageURL: string = ''; // Propriété pour stocker l'URL de l'image de l'utilisateur
  searchWord!: string;

  messages: Message[] = [];
  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  public messageList: any = [];
  public chatList: any = [];
  replymessage: string = "checking";
  public chatData: any;
  meetForm: FormGroup;
  chatId!: string;
  color = "";
  secondUserName = "";
  firstUserName = ""; // Ajout de la propriété firstUserName
  public alluser: any = [];
  currentUser: any;
  refreshInterval: any; 
  users: any[] = [];
  selectedUser: any; // Déclaration de la propriété selectedUser
  userList: any[] = [];
  meetingLink: string = '';
  constructor(
    private chatService: ChatService, 
    private router: Router, 
    private userService: UserService,
    private tokenStorageService: StorageService,
    private route: ActivatedRoute // Ajout de ActivatedRoute ici

  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
    this.meetForm = new FormGroup({
      meetingLink: new FormControl('')
    });
}

  ngOnInit(): void {
    
    this.loadUsers();
    this.currentUser = this.tokenStorageService.getUser();
    this.loadChatList();
    this.refreshInterval = setInterval(() => this.loadChatMessages(), 1000)
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => user.id !== this.currentUser.id); // Filtrer l'utilisateur actuel
    });
   
    
  }
  
 
  
  ngOnDestroy(): void {
    // Assurez-vous de nettoyer l'interval lorsque le composant est détruit
    clearInterval(this.refreshInterval);
  }
  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any[]) => {
        this.userList = users;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs :', error);
      }
    );
  }

  loadChatList() {
    if (this.currentUser) {
      const currentUsername = this.currentUser.username;
      this.chatService.getChatByFirstUserNameOrSecondUserName(currentUsername).subscribe(data => {
        this.chatData = data;
        this.chatList = this.chatData;
      });
    }
  }

  loadChatByEmail(event: string, event1: string) {
    sessionStorage.removeItem("chatId");
    this.chatService.getChatByFirstUserNameAndSecondUserName(event, event1).subscribe(data => {
      this.chatData = data;
      this.chatId = this.chatData[0]?.chatId; // Using optional chaining to avoid null/undefined error
      if (this.chatId) {
        sessionStorage.setItem('chatId', this.chatId);
      }
      this.loadChatMessages();
    });
  }

  loadChatMessages() {
    if (this.chatId) {
      this.chatService.getChatById(this.chatId).subscribe(data => {
        this.chatData = data;
        this.secondUserName = this.chatData.secondUserName;
        this.firstUserName = this.chatData.firstUserName; // Assignation de la propriété firstUserName
        this.chatService.getAllMessagesByChatId(this.chatId).subscribe(data => {
          this.chatData = data;
          this.messageList = this.chatData;
        });
      });
    }
  }

  

sendMessage() {
  if (this.chatId) {
    this.messageObj.replymessage = this.chatForm.value.replymessage;
    this.messageObj.senderEmail = this.currentUser.username;
    this.chatObj.chatId = parseInt(this.chatId, 10) || 0;

    this.messageObj.chat = this.chatObj;
    this.chatService.addMessageToChatRoom(this.messageObj).subscribe(data => {
      this.chatForm.reset();
      this.loadChatMessages();
    });
  }
}
  routeX() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(username: any) {
    if (this.currentUser) {
      const currentUsername = this.currentUser.username;
      this.chatService.getChatByFirstUserNameAndSecondUserName(username, currentUsername).subscribe(
        (data) => {
          this.chatId = data.chatId.toString();
          sessionStorage.setItem("chatId", this.chatId);
          this.loadChatMessages();
        },
        (error) => {
          if (error.status == 404) {
            this.chatObj.firstUserName = currentUsername;
            this.chatObj.secondUserName = username;
            this.chatService.createChatRoom(this.chatObj).subscribe(
              (data) => {
                this.chatData = data;
                this.chatId = this.chatData.chatId;
                sessionStorage.setItem("chatId", this.chatData.chatId);
                this.loadChatMessages();
              })
          }
        });
    }
  }
  
    addMessageToChatRoom(message: string) {
      if (this.chatId) {
        this.messageObj.replymessage = message;
        this.messageObj.senderEmail = this.currentUser.username;
        // Convertir la valeur en chaîne de caractères avant de l'assigner
        this.chatObj.chatId = parseInt(this.chatId, 10) || 0;
    
        this.messageObj.chat = this.chatObj;
        this.chatService.addMessageToChatRoom(this.messageObj).subscribe(data => {
          this.chatForm.reset();
          this.loadChatMessages();
        });
      }
    
  
  
      

  }

 
  
 
  

}



