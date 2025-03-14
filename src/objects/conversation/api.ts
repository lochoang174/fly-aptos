import { API } from "src/api";

// Import utils
// import { APIUtils } from "src/utils/api";
import { OtherUtils } from "src/utils/other";

// Import types
// import type { AxiosHeaders } from "axios";
import type { ChatAIResponseDataType } from "./types";

const api = new API({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
});

export class ConversationAPI {
  /**
   * Use to get conversation dialogs
   * @returns
   */
  static async getConversationDialogs() {
    try {
      // Test url
      const url = "/conversations/many.json";
      const response = await api.get(url);
      return response.data as any;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Use to get agent ids
   * @returns
   */
  static async getAgentIds() {
    try {
      const url = "/agents";
      const response = await api.get(url);
      return response.data as any;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Use to list supported models
   * @returns
   */
  static async askBot(input: string, agentId: string) {
    try {
      // Test url
      // const url = "/conversations/one.json";
      const url = `/${agentId}/message`;
      const newInput: string = input.toLowerCase();
      if (
        newInput.includes("insight") ||
        newInput.includes("give me insight") ||
        newInput.includes("what post about") ||
        newInput.includes("give me") ||
        newInput.includes("data") ||
        newInput.includes("purpose") ||
        newInput.includes("author post") ||
        newInput.includes("post about") ||
        newInput.includes("post about author")
      ) {
        input = newInput + " this is action DATA_INSIGHT";
      }
      const response = await api.post<any, Array<ChatAIResponseDataType>>(url, {
        text: input,
        user: "user",
      });

      // Simulate delay of response
      // await OtherUtils.wait(1000);

      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
