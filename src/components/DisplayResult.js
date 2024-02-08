import React from "react";
import { Paper, CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const DisplayResult = ({ text }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-16">
      <div className="max-w-3xl w-full">
        <Paper
          shadow="lg"
          padding="lg"
          radius="lg"
          className="mt-6 mx-auto min-h-64 relative" 
        >
          {/* Material Design-inspired typography for the heading */}
          <div className="flex justify-center items-center mb-2"> {/* Added flex container */}
            <h2 className="text-lg py-2  pr-2 font-semibold text-gray-700 mb-2">Processed Text</h2>
            <CopyButton value={text} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                  <ActionIcon
                    color={copied ? "teal" : "gray"}
                    variant="subtle"
                    onClick={copy}
                    style={{ cursor: "pointer" }}
                  >
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </div>
          {/* Styled paragraph for the processed text, ensuring readability */}
          <p className="px-4 text-gray-700 text-base whitespace-pre-wrap text-left">
            {text}
          </p>
        </Paper>
      </div>
    </div>
  );
};

export default DisplayResult;
