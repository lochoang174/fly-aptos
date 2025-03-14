import { API } from "src/api";

// Import utils
// import { APIUtils } from "src/utils/api";
import { OtherUtils } from "src/utils/other";
import { TuskyUtils } from "src/utils/tusky";

// Import types
// import type { AxiosHeaders } from "axios";
// import type { ChatBotResponseDataType } from "./types";

const api = new API({
  baseURL: import.meta.env.VITE_FLYFISH_BASE_URL,
});

export class KnowledgeAPI {
  /**
   * Use to get conversation dialogs
   * @returns
   */

  static async getKnowledge(address: string) {
    try {
      const data = await TuskyUtils.getFolderByUserAddress(address); // input the user wallet address

      if (!data) return;

      if (typeof data != "string") {
        console.log(data);
        const dataList = data.map((item: any) => {
          if (!item.data.msg) {
            // @ts-ignore
            return item.data.map((i) => {
              return {
                ...i,
                uploadInfo: item,
              };
            });
          } else {
            console.log("item", item);
          }
        });
        console.log(dataList.filter((i) => i));
        return dataList.filter((i) => i) as any;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  //to check that user have been created a folder and create if not
  static async checkUserFolder(folderName: string) {
    if (!import.meta.env.VITE_TUSKY_URL || !import.meta.env.VITE_TUSKY_API_KEY) {
      throw new Error("TUS_API_URL or TUSKY_API_KEY is not set");
    }
    const folders = await fetch(
        `${import.meta.env.VITE_TUSKY_URL}/folders?vaultId=${import.meta.env.VITE_DEFAULT_VAULT}&parentId=${import.meta.env.VITE_DEFAULT_PARENT_ID}`,
        {
            method: 'GET',
            headers: {
                'Api-key': import.meta.env.VITE_TUSKY_API_KEY,
            },
        },
    ).then((response) => response.json())
    console.log("tusky",folders)

    const folder = folders.items.find((folder: any) => folder.name == folderName)

    if (folder) {
        return folder
    } else {
        return createFolder(folderName)
    }
}
}
