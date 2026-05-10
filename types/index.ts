export interface Message {
  id: string;        
  text: string;      
  sender: "user" | "ai";  
  timestamp: number; 
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}


export interface SendMessageInput {
  text: string;
}