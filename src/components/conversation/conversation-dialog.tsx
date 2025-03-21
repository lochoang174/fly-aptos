import React from "react";
import AIWriter from "react-aiwriter";
import cn from "classnames";
import { ThumbsUp, ThumbsDown, User } from "lucide-react";

// Import components
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { CopyButton } from "../copy-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import MDContent from "../markdown";
import SwapTabContainer from "../swap-token/swap-tab-container";
import DepositeTabContainer from "../deposit-token/deposit-tab-container";
import WithdrawTabContainer from "../withdraw-token/deposit-tab-container";

// Import types
import type {
  ConversationDialogProps,
  TextContentContainerProps,
} from "./types";

function TextContentContainer(props: TextContentContainerProps) {
  const textContainerClassName =
    "w-full border break-words rounded-3xl shadow-sm px-5 py-2 hover:ring-2 ";

  return (
    <div
      className={cn(
        {
          [`${textContainerClassName} bg-[#0085FF] text-white max-w-max`]: props.isUser,
        },
        { [`${textContainerClassName} bg-slate-50`]: !props.isUser }
      )}
    >
      {props.hasAIWriterAnimation ? (
        <AIWriter>
          <MDContent>{props.data.text}</MDContent>
          {/* <MDContent>
          {`
  | Feature        | Support     |
  | -------------- | ----------- |
  | Tables         | ✅ Yes      |
  | Strikethrough  | ~~text~~    |
  | Task Lists     | - [x] Done  |
  | URLs           | https://example.com |
  `}
</MDContent> */}
        </AIWriter>
      ) : (
        <MDContent>{props.data.text}</MDContent>
      )}
    </div>
  );
}

const ConversationDialog = React.forwardRef<
  HTMLDivElement,
  ConversationDialogProps
>(function (props: ConversationDialogProps, ref) {
  // console.log("Data:", props.data);

  const wrapperClassName = "flex flex-col w-full max-w-[1220px] mt-3";
  const containerClassName = "flex justify-start items-start text-[18px] m-[0px]";

  const isUser = props.data.sender === "user";

  // Choose type of content container
  let ContentContainer;

  // If has action and it is `swap`
  if (props.data.action === "SWAP_TOKEN" && props.data.params) {
    const params = props.data.params;
    const amount = parseFloat(params.amount);
    const txBytes = params.txBytes;
    const fromSymbol = params.from_token.symbol;
    const toSymbol = params.destination_token.symbol;

    ContentContainer = (
      <SwapTabContainer
        isOpen={true}
        fromSymbol={fromSymbol}
        toSymbol={toSymbol}
        amount={amount}
        txBytes={txBytes}
        logs={params as any}
      />
    );
  } else if (props.data.action === "" && props.data.params) {
    const params = props.data.params as any;
    const amount = parseFloat(params.amount);
    const symbol = params.coinMetadata.symbol;
    const txBytes = params.txBytes;

    ContentContainer = (
      <WithdrawTabContainer
        amount={amount}
        symbol={symbol}
        txBytes={txBytes}
        logs={params as any}
      />
    );
  } else if (props.data.action === "" && props.data.params) {
    const params = props.data.params as any;
    const amount = parseFloat(params.amount);
    const symbol = params.coinMetadata.symbol;
    const txBytes = params.txBytes;

    ContentContainer = (
      <DepositeTabContainer
        amount={amount}
        symbol={symbol}
        txBytes={txBytes}
        logs={params as any}
      />
    );
  } else {
    ContentContainer = <TextContentContainer {...props} isUser={isUser} />;
  }

  return (
    <div
      ref={ref}
      className={cn(
        {
          [`${wrapperClassName} items-end `]: isUser,
        },
        { [`${wrapperClassName}`]: !isUser }
      )}
    >
      <div
        className={cn(
          {
            [`${containerClassName} flex-row-reverse`]: isUser,
          },
          { [`${containerClassName}`]: !isUser }
        )}
      >
        <div className="mx-2">
          {isUser ? (
            <Avatar className="me-3 w-full bg-white rounded-full p-1 flex items-center justify-center">
              <User className="w-6 h-auto"/>
            </Avatar>
          ) : (
            <Avatar className="me-3 w-full bg-white rounded-full p-1 flex items-center justify-center">
              <AvatarImage src="/logo.svg" className="w-6 h-auto" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="w-9/12">
          {ContentContainer}
          {/* Message controller */}
          {!isUser && (
            <div className="mt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CopyButton text={props.data.text} />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ThumbsUp />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Like</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ThumbsDown />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Dislike</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ConversationDialog;
