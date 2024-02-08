import React from "react";
import { Button } from "@mantine/core";

const ProcessButton = ({ onClick, loading }) => {
  return (
    // Centering the button similar to the TextInput component for consistency
    <div className="flex justify-center mt-4 ">
      <Button
        size="md"
        radius="xl"
        onClick={onClick}
        loading={loading}
        color="rgba(59,129,246)"
      >
        Process Text
      </Button>
    </div>
  );
};

export default ProcessButton;
